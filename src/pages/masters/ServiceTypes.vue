<template>
    <div>
        <p class="text-3xl">{{ $t('master.service_types') }}</p>
        <hr class="mb-5" />
        
        <div class="mt-8">
            <custom-data-table
                :enableHeader="true"
                :searchBox="true"
                :searchFields="search_fields"
                :isAddNew="has_add_permission"
                :addBtnText="$t('datatable.add_new')"
                :onAddBtnClicked="onAddNewServiceType"
                :columns="columns" 
                :view="true" 
                :edit="has_edit_permission" 

                :onView="viewServiceTypeInfo"
                :onEdit="editServiceType" 

                :quickAction="has_edit_permission" 
                :onQuickActionPerformed="onCheck" 
                :rows="service_types_list">
            </custom-data-table>
        </div>

        <ServiceTypeFormModal v-if="show_service_type_form" :selected_service_type="selected_service_type_info" @close-modal="show_service_type_form = false"/>
        <ServiceTypeDetailsModal v-if="show_details_form" :service_type="service_type_info" @close-modal="show_details_form = false"/>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ServiceTypeFormModal from './ServiceTypeFormModal.vue';
import ServiceTypeDetailsModal from './ServiceTypeDetailsModal.vue';

export default {
    components: { ServiceTypeFormModal, ServiceTypeDetailsModal },
    data() {
        return {
            show_service_type_form: false,
            show_details_form: false,
            search_fields: ["name_en", "name_ar", "remark"],
            columns: [
                { name: "#", attribute: "#", sortable: false },
                { name: this.$t('datatable.title_en'), attribute: "name_en", sortable: false },
                { name: this.$t('datatable.title_ar'), attribute: "name_ar", sortable: false },
                { name: this.$t('datatable.remark'), attribute: "remark", sortable: false },
                { name: this.$t('datatable.is_active'), attribute: "is_active", sortable: false  },
                { name: this.$t('datatable.action'), attribute: "action", sortable: false  }
            ],
            service_types_list: [],
            has_add_permission: false,
            has_edit_permission: false,
            has_delete_permission: false
        }
    },
    computed:{
        ...mapGetters(["serviceTypes", "serviceTypesToast", "updateServiceTypeResponse"]),
    },
    methods: {
        ...mapActions(["getServiceTypes", "updateServiceType", "deleteServiceType"]),

        viewServiceTypeInfo(id, data) {
            this.service_type_info = data
            this.show_details_form = true
        },
        onAddNewServiceType() {
            this.showPopup('add')
        },
        showPopup(type, data) {
            if(type == "add"){
                this.selected_service_type_info = "";
                this.show_service_type_form = true;
            } else if(type == "edit"){
                this.selected_service_type_info = data;
                this.show_service_type_form = true;
            }
        },
        closePopup() {
            this.show_service_type_form = false;
        },
        editServiceType(id, data) {
            this.showPopup('edit', data);
        },
        deleteServiceTypes(id){
            if (confirm(this.$t('datatable.are_you_sure'))) {
                this.deleteServiceType(id);
            }
        },
        onCheck(event, id, data){
            this.updateServiceType({
                id: id,
                name_en: data.name_en,
                name_ar: data.name_ar,
                remark: data.remark,
                is_active: event.target.checked
            })
        },

        checkPermissions() {
            let page_permissions = this.$root.getScreenPermissions("Service Types")
            this.has_add_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "add_service_type")
            this.has_edit_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "edit_service_type")
            this.has_delete_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "delete_service_type")
        }
    },
    watch: {
        serviceTypes(data) {
            if(data != null) {
                this.service_types_list = data
                this.service_types_list.forEach(service_type => {
                    service_type.is_active = service_type.is_active == 0 ? false : true
                });
            }
        },
        serviceTypesToast(data) {
            if(data.status) {
                this.$toast.success(data.message)
            } else {
                this.$toast.error(data.message)
            }
        },
        updateServiceTypeResponse(data) {
            if(data.status) {
                this.$toast.success(data.message)
            } else {
                this.$toast.error(data.message)
            }
        }
    },
    mounted() {
        this.checkPermissions()
        this.getServiceTypes()
    },
}
</script>