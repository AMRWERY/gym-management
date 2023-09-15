<template>
    <div>
        <div class="mb-8" >
        <p class="text-3xl">Trainer Info</p>
        
        <div class="mt-2 bg-white p-3 grid grid-cols-5 gap-3">
            <div>
                <b>{{ $t('users.branches') }}</b>
                <li v-for="branch in trainer?.branches" :key="branch.id">{{ branch.name_en }}</li>
            </div>
            <div>
                <b>{{ $t('users.designation') }}</b>
                <p>{{ trainer?.general?.name_en ?? '-' }}</p>
            </div>
            <div>
                <b>{{ $t('users.name') }}</b>
                <p>{{ trainer?.name   ?? '-' }}</p>
            </div>
            <div>
                <b>{{ $t('users.email') }}</b>
                <p>{{ trainer?.email   ?? '-' }}</p>
            </div>
            <div>
                <b>{{ $t('users.mobile') }}</b>
                <p>{{ trainer?.mobile   ?? '-' }}</p>
            </div>
            <div>
                <b>{{ $t('users.commission_type') }}</b>
                <p>{{ trainer?.commission_type ?? '-' }}</p>
            </div>
            <div>
                <b>{{ $t('users.commission_value') }}</b>
                <p>{{ trainer?.commission_value   ?? '-' }}</p>
            </div>
            <div>
                <b>{{ $t('users.remark') }}</b>
                <p>{{ trainer?.remark   ?? '-' }}</p>
            </div>
            <div>
                <b>{{ $t('users.status') }}</b>
                <p><span class="text-xs rounded-md text-white px-3 py-1" :class="trainer?.is_active ? 'text-bg-green' : 'text-bg-red'" >{{ trainer?.is_active ? $t('datatable.active') : $t('datatable.inactive') }}</span></p>
            </div>
        </div>  
        </div>
        <div>
            <p class="text-3xl text-uppercase">{{ $t('users.lesson_configurations') }}</p>
            <hr class="mb-5" />
            
            <div class="mt-8">
                <custom-data-table
                    :enableHeader="true"
                    :searchBox="true"
                    :searchInNestedObject="true"
                    :nestedObjNames="nested_obj_names"
                    :searchFields="search_fields"
                    :isAddNew="has_add_permission"
                    :addBtnText="$t('datatable.add_new')"
                    :onAddBtnClicked="onAddNewLessonConfiguration"
                    :columns="columns" 
                    :view="true" 
                    :edit="has_edit_permission" 
                    :del="has_delete_permission" 
                    :onView="viewLessonConfigurationInfo"
                    :onEdit="editLessonConfiguration" 
                    :onDelete="deleteLessonConfigurations" 
                    :quickAction="has_edit_permission" 
                    :rows="lesson_configurations_list">
                </custom-data-table>
            </div>

            <LessonConfigurationFormModal v-if="show_lesson_configuration_form" :lessons="lesson_packages" :trainer_id="trainer_id" :lesson_types="lesson_types" :duty_types="duty_types" :selected_lesson_configuration="selected_lesson_configuration_info" @close-modal="show_lesson_configuration_form = false"/>
            <LessonConfigurationDetailsModal v-if="show_details_form" :lesson_configuration="lesson_configuration_info" @close-modal="show_details_form = false"/>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import LessonConfigurationFormModal from './LessonConfigurationFormModal.vue';
import LessonConfigurationDetailsModal from './LessonConfigurationDetailsModal.vue';

export default {
    components: { LessonConfigurationFormModal, LessonConfigurationDetailsModal },
    data() {
        return {
            trainer_id: this.$route.params.id,
            show_lesson_configuration_form: false,
            show_details_form: false,
            nested_obj_names: ["lesson_package", "general"],
            search_fields: ["start_time", "end_time", "commission_type", "commission_value", "lesson_package_name_en", "general_name_en"],
            columns: [
                { name: "#", attribute: "#", sortable: false },
                { name: this.$t('datatable.lesson'), nestedObject: "lesson_package", attribute: "name_en", sortable: false },
                { name: this.$t('datatable.duty_type'), nestedObject: "general", attribute: "name_en", sortable: false },
                { name: this.$t('datatable.start_time'), attribute: "start_time", sortable: false },
                { name: this.$t('datatable.end_time'), attribute: "end_time", sortable: false  },
                { name: this.$t('datatable.days'), attribute: "days_text", sortable: false  },
                { name: this.$t('datatable.commission_type'), attribute: "commission_type", sortable: false  },
                { name: this.$t('datatable.commission_value'), attribute: "commission_value", sortable: false  },
                { name: this.$t('datatable.action'), attribute: "action", sortable: false  }
            ],
            lesson_configurations_list: [],
            trainer: [],
            duty_types: [],
            lesson_types: [],
            lesson_packages: [],
            has_add_permission: false,
            has_edit_permission: false,
            has_delete_permission: false
        }
    },
    computed:{
        ...mapGetters(["lessonConfigurations", "lessonConfigurationsToast", "updateLessonConfigurationResponse"]),
    },
    methods: {
        ...mapActions(["getLessonConfigurations", "updateLessonConfiguration", "deleteLessonConfiguration"]),

        viewLessonConfigurationInfo(id, data) {
            this.lesson_configuration_info = data
            this.show_details_form = true
        },
        onAddNewLessonConfiguration() {
            this.showPopup('add')
        },
        showPopup(type, data) {
            if(type == "add"){
                this.selected_lesson_configuration_info = "";
                this.show_lesson_configuration_form = true;
            } else if(type == "edit"){
                this.selected_lesson_configuration_info = data;
                this.show_lesson_configuration_form = true;
            }
        },
        closePopup() {
            this.show_lesson_configuration_form = false;
        },
        editLessonConfiguration(id, data) {
            this.showPopup('edit', data);
        },
        deleteLessonConfigurations(id){
            if (confirm(this.$t('datatable.are_you_sure'))) {
                this.deleteLessonConfiguration(id);
            }
        },
        checkPermissions() {
        let page_permissions = this.$root.getScreenPermissions("Trainers")
            this.has_add_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "add_lesson_configuration")
            this.has_edit_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "edit_lesson_configuration")
            this.has_delete_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "delete_lesson_configuration")
        }
    },
    watch: {
        lessonConfigurations(data) {
            if(data != null) {
                this.lesson_configurations_list = data.lesson_configurations
                this.duty_types = data.duty_types
                this.lesson_types = data.lesson_types
                this.trainer = data.trainer
                this.lesson_packages = data.lesson_packages

                this.lesson_configurations_list.forEach(lesson_configuration => {
                    lesson_configuration.is_active = lesson_configuration.is_active == 0 ? false : true
                });
            }
        },
        lessonConfigurationsToast(data) {
            if(data.status) {
                this.$toast.success(data.message)
            } else {
                this.$toast.error(data.message)
            }
        },
        updateLessonConfigurationResponse(data) {
            if(data.status) {
                this.$toast.success(data.message)
            } else {
                this.$toast.error(data.message)
            }
        }
    },
    mounted() {
        this.checkPermissions()
        this.getLessonConfigurations(this.trainer_id)
    },
}
</script>