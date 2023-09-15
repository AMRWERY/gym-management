<template>
    <div>
        <p class="text-3xl">{{ $t('packages.lessons') }}</p>
        <hr class="mb-5" />
        
        <div class="mt-8">
            <custom-data-table
                :enableHeader="true"
                :searchBox="true"
                :searchFields="search_fields"
                :searchInNestedObject="true"
                :nestedObjNames="nested_obj_names"
                :isAddNew="has_add_permission"
                :addBtnText="$t('datatable.add_new')"
                :onAddBtnClicked="onAddNewLessonPackage"
                :columns="columns" 
                :view="true" 
                :edit="has_edit_permission" 
                :del="has_delete_permission" 
                :onView="viewLessonPackageInfo"
                :onEdit="editLessonPackage" 
                :onDelete="deleteLessonPackages" 
                :quickAction="has_edit_permission" 
                :onQuickActionPerformed="onCheck" 
                :rows="lesson_packages_list">
            </custom-data-table>
        </div>

        <LessonPackageDetailsModal v-if="show_details_form" :lesson_package="lesson_package_info" @close-modal="show_details_form = false"/>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import LessonPackageDetailsModal from './LessonPackageDetailsModal.vue';

export default {
    components: { LessonPackageDetailsModal },
    data() {
        return {
            show_lesson_package_form: false,
            show_details_form: false,
            nested_obj_names: ["lesson_type"],
            search_fields: ["name_en", "name_ar", "duration", "amount", "lesson_type_name_en"],
            columns: [
                { name: "#", attribute: "#", sortable: false },
                { name: this.$t('master.image'), attribute: "image", field: "image", sortable: false },
                { name: this.$t('datatable.type'), attribute: "name_en", nestedObject: 'lesson_type', sortable: false },
                { name: this.$t('datatable.title_en'), attribute: "name_en", sortable: false },
                { name: this.$t('datatable.title_ar'), attribute: "name_ar", sortable: false },
                { name: this.$t('datatable.duration'), attribute: "duration", sortable: false },
                { name: this.$t('datatable.amount'), attribute: "amount", sortable: false },
                { name: this.$t('datatable.is_active'), attribute: "is_active", sortable: false  },
                { name: this.$t('datatable.action'), attribute: "action", sortable: false  }
            ],
            lesson_packages_list: [],
            branches: [],
            lesson_types: [],
            has_add_permission: false,
            has_edit_permission: false,
            has_delete_permission: false
        }
    },
    computed:{
        ...mapGetters(["lessonPackages", "lessonPackagesToast", "updateLessonPackageResponse"]),
    },
    methods: {
        ...mapActions(["getLessonPackages", "updateLessonPackage", "deleteLessonPackage"]),

        viewLessonPackageInfo(id, data) {
            this.lesson_package_info = data
            this.show_details_form = true
        },
        onAddNewLessonPackage() {
            this.$router.push('/lessons/add')
        },
        showPopup(type, data) {
            if (type === 'add') {
                this.selected_lesson_package_info = '';
                this.show_lesson_package_form = true;
                this.$router.push({ name: 'LessonPackageFormModal' });
            } else if (type === 'edit') {
                this.selected_lesson_package_info = data;
                this.show_lesson_package_form = true;
                this.$router.push({ name: 'LessonPackageFormModal', params: { id: data.id } });
            }
        },
        editLessonPackage(id, data) {
            // this.showPopup('edit', data);
            this.$router.push({ name: 'LessonPackageFormModal', params: { id: id } });
        },
        deleteLessonPackages(id){
            if (confirm(this.$t('datatable.are_you_sure'))) {
                this.deleteLessonPackage(id);
            }
        },
        onCheck(event, id, data){
            this.updateLessonPackage({
                id:id,
                lesson_package: {
                    is_active: event.target.checked ? 1 : 0,
                    type: "status",
                },
                
            })
        },

        checkPermissions() {
            let page_permissions = this.$root.getScreenPermissions("Lessons")
            this.has_add_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "add_lesson_package")
            this.has_edit_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "edit_lesson_package")
            this.has_delete_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "delete_lesson_package")
        }
    },
    watch: {
        lessonPackages(data) {
            if(data != null) {
                this.lesson_packages_list = data.lesson_packages
                this.branches = data.branches
                this.lesson_types = data.lesson_types

                this.lesson_packages_list.forEach(lesson_package => {
                    lesson_package.is_active = lesson_package.is_active == 0 ? false : true
                });
            }
        },
        lessonPackagesToast(data) {
            if(data.status) {
                this.$toast.success(data.message)
            } else {
                this.$toast.error(data.message)
            }
        },
        updateLessonPackageResponse(data) {
            if(data.status) {
                this.$toast.success(data.message)
            } else {
                this.$toast.error(data.message)
            }
        }
    },
    mounted() {
        this.checkPermissions()
        this.getLessonPackages()
    },
}
</script>