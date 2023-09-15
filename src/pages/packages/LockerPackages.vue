<template>
    <div>
        <p class="text-3xl">{{ $t('packages.lockers') }}</p>
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
                :onAddBtnClicked="onAddNewLockerPackage"
                :columns="columns" 
                :view="true" 
                :edit="has_edit_permission" 
                :del="has_delete_permission" 
                :onView="viewLockerPackageInfo"
                :onEdit="editLockerPackage" 
                :onDelete="deleteLockerPackages" 
                :quickAction="has_edit_permission" 
                :onQuickActionPerformed="onCheck" 
                :rows="locker_packages_list">
            </custom-data-table>
        </div>

        <LockerPackageDetailsModal v-if="show_details_form" :locker_package="locker_package_info" @close-modal="show_details_form = false"/>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import LockerPackageDetailsModal from './LockerPackageDetailsModal.vue';

export default {
    components: { LockerPackageDetailsModal },
    data() {
        return {
            show_locker_package_form: false,
            show_details_form: false,
            nested_obj_names: ["locker_type"],
            search_fields: ["name_en", "name_ar", "duration", "amount", "locker_type_name_en"],
            columns: [
                { name: "#", attribute: "#", sortable: false },
                { name: this.$t('datatable.type'), attribute: "name_en", nestedObject: 'locker_type', sortable: false },
                { name: this.$t('datatable.title_en'), attribute: "name_en", sortable: false },
                { name: this.$t('datatable.title_ar'), attribute: "name_ar", sortable: false },
                { name: this.$t('datatable.duration'), attribute: "duration", sortable: false },
                { name: this.$t('datatable.amount'), attribute: "amount", sortable: false },
                { name: this.$t('datatable.is_active'), attribute: "is_active", sortable: false  },
                { name: this.$t('datatable.action'), attribute: "action", sortable: false  }
            ],
            locker_packages_list: [],
            branches: [],
            locker_types: [],
            has_add_permission: false,
            has_edit_permission: false,
            has_delete_permission: false
        }
    },
    computed:{
        ...mapGetters(["lockerPackages", "lockerPackagesToast", "updateLockerPackageResponse"]),
    },
    methods: {
        ...mapActions(["getLockerPackages", "updateLockerPackage", "deleteLockerPackage"]),

        viewLockerPackageInfo(id, data) {
            this.locker_package_info = data
            this.show_details_form = true
        },
        onAddNewLockerPackage() {
            this.$router.push('/package-lockers/add')
        },
    
        showPopup(type, data) {
            if (type === 'add') {
                this.selected_locker_package_info = '';
                this.show_locker_package_form = true;
                this.$router.push({ name: 'LockerPackageFormModal' });
            } else if (type === 'edit') {
                this.selected_locker_package_info = data;
                this.show_locker_package_form = true;
                this.$router.push({ name: 'LockerPackageFormModal', params: { id: data.id } });
            }
        },
        editLockerPackage(id, data) {
            this.$router.push({ name: 'LockerPackageFormModal', params: { id: id } });
        },
        deleteLockerPackages(id){
            if (confirm(this.$t('datatable.are_you_sure'))) {
                this.deleteLockerPackage(id);
            }
        },
        onCheck(event, id, data){
            let branch_ids = []

            data.branches.forEach(branch => {
                branch_ids.push(branch.id);
            });

            this.updateLockerPackage({
                id: data.id,
                branch_ids: branch_ids,
                locker_type_id: data.locker_type_id,
                name_en: data.name_en,
                name_ar: data.name_ar,
                amount: data.amount,
                duration: data.duration,
                freeze_quantity: data.freeze_quantity,
                total_freeze_days: data.total_freeze_days,
                insurance_amount: data.insurance_amount,
                insurance_refund_days: data.insurance_refund_days,
                remark: data.remark,
                is_active: event.target.checked
            })
        },

        checkPermissions() {
            let page_permissions = this.$root.getScreenPermissions("Locker")
            this.has_add_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "add_locker_package")
            this.has_edit_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "edit_locker_package")
            this.has_delete_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "delete_locker_package")
        }
    },
    watch: {
        lockerPackages(data) {
            if(data != null) {
                this.locker_packages_list = data.locker_packages
                this.branches = data.branches
                this.locker_types = data.locker_types

                this.locker_packages_list.forEach(locker_package => {
                    locker_package.is_active = locker_package.is_active == 0 ? false : true
                });
            }
        },
        lockerPackagesToast(data) {
            if(data.status) {
                this.$toast.success(data.message)
            } else {
                this.$toast.error(data.message)
            }
        },
        updateLockerPackageResponse(data) {
            if(data.status) {
                this.$toast.success(data.message)
            } else {
                this.$toast.error(data.message)
            }
        }
    },
    mounted() {
        this.checkPermissions()
        this.getLockerPackages()
    },
}
</script>