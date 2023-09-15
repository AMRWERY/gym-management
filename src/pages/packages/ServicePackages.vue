<template>
    <div>
        <p class="text-3xl">{{ $t('packages.services') }}</p>
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
                :onAddBtnClicked="onAddNewServicePackage"
                :columns="columns" 
                :view="true" 
                :edit="has_edit_permission" 
                :del="has_delete_permission" 
                :onView="viewServicePackageInfo"
                :onEdit="editServicePackage" 
                :onDelete="deleteServicePackages" 
                :quickAction="has_edit_permission" 
                :onQuickActionPerformed="onCheck" 
                :rows="service_packages_list">
            </custom-data-table>
        </div>

        <ServicePackageDetailsModal v-if="show_details_form" :service_package="service_package_info" @close-modal="show_details_form = false"/>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ServicePackageDetailsModal from './ServicePackageDetailsModal.vue';

export default {
    components: { ServicePackageDetailsModal },
    data() {
        return {
            show_service_package_form: false,
            show_details_form: false,
            nested_obj_names: ["service_type"],
            search_fields: ["name_en", "name_ar", "duration", "amount", "service_type_name_en"],
            columns: [
                { name: "#", attribute: "#", sortable: false },
                { name: this.$t('datatable.type'), attribute: "name_en", nestedObject: 'service_type', sortable: false },
                { name: this.$t('datatable.title_en'), attribute: "name_en", sortable: false },
                { name: this.$t('datatable.title_ar'), attribute: "name_ar", sortable: false },
                { name: this.$t('datatable.duration'), attribute: "duration", sortable: false },
                { name: this.$t('datatable.amount'), attribute: "amount", sortable: false },
                { name: this.$t('datatable.is_active'), attribute: "is_active", sortable: false  },
                { name: this.$t('datatable.action'), attribute: "action", sortable: false  }
            ],
            service_packages_list: [],
            branches: [],
            service_types: [],
            has_add_permission: false,
            has_edit_permission: false,
            has_delete_permission: false
        }
    },
    computed:{
        ...mapGetters(["servicePackages", "servicePackagesToast", "updateServicePackageResponse"]),
    },
    methods: {
        ...mapActions(["getServicePackages", "updateServicePackage", "deleteServicePackage"]),

        viewServicePackageInfo(id, data) {
            this.service_package_info = data
            this.show_details_form = true
        },
        onAddNewServicePackage() {
            this.$router.push('/services/add')
        },
      
        showPopup(type, data) {
            if (type === 'add') {
                this.selected_service_package_info = '';
                this.show_service_package_form = true;
                this.$router.push({ name: 'BranchFormModal' });
            } else if (type === 'edit') {
                this.selected_service_package_info = data;
                this.show_service_package_form = true;
                this.$router.push({ name: 'ServicePackageFormModal', params: { id: data.id } });
            }
        },
       
        editServicePackage(id, data) {
            // this.showPopup('edit', data);
            this.$router.push({ name: 'ServicePackageFormModal', params: { id: id } });
        },
        deleteServicePackages(id){
            if (confirm(this.$t('datatable.are_you_sure'))) {
                this.deleteServicePackage(id);
            }
        },
        onCheck(event, id, data){
            let branch_ids = []

            data.branches.forEach(branch => {
                branch_ids.push(branch.id);
            });
            this.updateServicePackage({
                id: data.id,
                branch_ids: branch_ids,
                service_type_id: data.service_type_id,
                name_en: data.name_en,
                name_ar: data.name_ar,
                amount: data.amount,
                duration: data.duration,
                freeze_quantity: data.freeze_quantity,
                total_freeze_days: data.total_freeze_days,
                remark: data.remark,
                is_active: event.target.checked
            })
        },

        checkPermissions() {
            let page_permissions = this.$root.getScreenPermissions("Services")
            this.has_add_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "add_service_package")
            this.has_edit_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "edit_service_package")
            this.has_delete_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "delete_service_package")
        }
    },
    watch: {
        servicePackages(data) {
            if(data != null) {
                this.service_packages_list = data.service_packages
                this.branches = data.branches
                this.service_types = data.service_types

                this.service_packages_list.forEach(service_package => {
                    service_package.is_active = service_package.is_active == 0 ? false : true
                });
            }
        },
        servicePackagesToast(data) {
            if(data.status) {
                this.$toast.success(data.message)
            } else {
                this.$toast.error(data.message)
            }
        },
        updateServicePackageResponse(data) {
            if(data.status) {
                this.$toast.success(data.message)
            } else {
                this.$toast.error(data.message)
            }
        }
    },
    mounted() {
        this.checkPermissions()
        this.getServicePackages()
    },
}
</script>