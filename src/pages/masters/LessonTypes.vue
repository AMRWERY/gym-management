<template>
    <div>
        <p class="text-3xl">{{ $t('master.lesson_types') }}</p>
        <hr class="mb-5" />
        
        <div class="mt-8">
            <custom-data-table
                :enableHeader="true"
                :searchBox="true"
                :searchFields="search_fields"
                :isAddNew="has_add_permission"
                :addBtnText="$t('datatable.add_new')"
                :onAddBtnClicked="onAddNewLessonType"
                :columns="columns" 
                :view="true" 
                :edit="has_edit_permission" 

                :onView="viewLessonTypeInfo"
                :onEdit="editLessonType" 

                :quickAction="has_edit_permission" 
                :onQuickActionPerformed="onCheck" 
                :rows="lesson_types_list">
            </custom-data-table>
        </div>

        <LessonTypeFormModal v-if="show_lesson_type_form" :selected_lesson_type="selected_lesson_type_info" @close-modal="show_lesson_type_form = false"/>
        <LessonTypeDetailsModal v-if="show_details_form" :lesson_type="lesson_type_info" @close-modal="show_details_form = false"/>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import LessonTypeFormModal from './LessonTypeFormModal.vue';
import LessonTypeDetailsModal from './LessonTypeDetailsModal.vue';

export default {
    components: { LessonTypeFormModal, LessonTypeDetailsModal },
    data() {
        return {
            show_lesson_type_form: false,
            show_details_form: false,
            search_fields: ["name_en", "name_ar", "remark"],
            columns: [
                { name: "#", attribute: "#", sortable: false },
                { name: this.$t("notification.image"), attribute: "image", field: "image", sortable: false },
                { name: this.$t('datatable.title_en'), attribute: "name_en", sortable: false },
                { name: this.$t('datatable.title_ar'), attribute: "name_ar", sortable: false },
                { name: this.$t('datatable.remark'), attribute: "remark", sortable: false },
                { name: this.$t('datatable.is_active'), attribute: "is_active", sortable: false  },
                { name: this.$t('datatable.action'), attribute: "action", sortable: false  }
            ],
            lesson_types_list: [],
            has_add_permission: false,
            has_edit_permission: false,
            has_delete_permission: false
        }
    },
    computed:{
        ...mapGetters(["lessonTypes", "lessonTypesToast", "updateLessonTypeResponse"]),
    },
    methods: {
        ...mapActions(["getLessonTypes", "updateLessonType", "deleteLessonType"]),

        viewLessonTypeInfo(id, data) {
            this.lesson_type_info = data
            this.show_details_form = true
        },
        onAddNewLessonType() {
            this.showPopup('add')
        },
        showPopup(type, data) {
            if(type == "add"){
                this.selected_lesson_type_info = "";
                this.show_lesson_type_form = true;
            } else if(type == "edit"){
                this.selected_lesson_type_info = data;
                this.show_lesson_type_form = true;
            }
        },
        closePopup() {
            this.show_lesson_type_form = false;
        },
        editLessonType(id, data) {
            this.showPopup('edit', data);
        },
        deleteLessonTypes(id){
            if (confirm(this.$t('datatable.are_you_sure'))) {
                this.deleteLessonType(id);
            }
        },
        onCheck(event, id, data){
            this.updateLessonType({
                id: id,
                lesson_type: {
                    is_active: event.target.checked ? 1 : 0,
                    type: "status",
                },
            })
        },

        checkPermissions() {
            let page_permissions = this.$root.getScreenPermissions("Lesson Types")
            this.has_add_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "add_lesson_type")
            this.has_edit_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "edit_lesson_type")
            this.has_delete_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "delete_lesson_type")
        }
    },
    watch: {
        lessonTypes(data) {
            if(data != null) {
                this.lesson_types_list = data
                this.lesson_types_list.forEach(lesson_type => {
                    lesson_type.is_active = lesson_type.is_active == 0 ? false : true
                });
            }
        },
        lessonTypesToast(data) {
            if(data.status) {
                this.$toast.success(data.message)
            } else {
                this.$toast.error(data.message)
            }
        },
        updateLessonTypeResponse(data) {
            if(data.status) {
                this.$toast.success(data.message)
            } else {
                this.$toast.error(data.message)
            }
        }
    },
    mounted() {
        this.checkPermissions()
        this.getLessonTypes()
    },
}
</script>