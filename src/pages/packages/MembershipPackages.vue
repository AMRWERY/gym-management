<template>
    <div>
        <p class="text-3xl">{{ $t('packages.memberships') }}</p>
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
                :onAddBtnClicked="onAddNewMembershipPackage"
                :columns="columns" 
                :view="true" 
                :edit="has_edit_permission" 
                :del="has_delete_permission" 
                :onView="viewMembershipPackageInfo"
                :onEdit="editMembershipPackage" 
                :onDelete="deleteMembershipPackages" 
                :quickAction="has_edit_permission" 
                :onQuickActionPerformed="onCheck" 
                :rows="membership_packages_list">
            </custom-data-table>
        </div>

        <MembershipPackageDetailsModal v-if="show_details_form" :membership_package="membership_package_info" @close-modal="show_details_form = false"/>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MembershipPackageDetailsModal from './MembershipPackageDetailsModal.vue';

export default {
    components: { MembershipPackageDetailsModal },
    data() {
        return {
            show_membership_package_form: false,
            show_details_form: false,
            nested_obj_names: ["membership_type"],
            search_fields: ["name_en", "name_ar", "duration", "amount", "membership_type_name_en"],
            columns: [
                { name: "#", attribute: "#", sortable: false },
                { name: this.$t('datatable.type'), attribute: "name_en", nestedObject: 'membership_type', sortable: false },
                { name: this.$t('datatable.title_en'), attribute: "name_en", sortable: false },
                { name: this.$t('datatable.title_ar'), attribute: "name_ar", sortable: false },
                { name: this.$t('datatable.duration'), attribute: "duration", sortable: false },
                { name: this.$t('datatable.amount'), attribute: "amount", sortable: false },
                { name: this.$t('datatable.is_active'), attribute: "is_active", sortable: false  },
                { name: this.$t('datatable.action'), attribute: "action", sortable: false  }
            ],
            membership_packages_list: [],
            branches: [],
            membership_types: [],
            service_types: [],
            service_packages: [],
            lesson_types: [],
            lesson_packages: [],
            locker_types: [],
            locker_packages: [],
            has_add_permission: false,
            has_edit_permission: false,
            has_delete_permission: false
        }
    },
    computed:{
        ...mapGetters(["membershipPackages", "membershipPackagesToast", "updateMembershipPackageResponse"]),
    },
    methods: {
        ...mapActions(["getMembershipPackages", "updateMembershipPackage", "deleteMembershipPackage"]),

        viewMembershipPackageInfo(id, data) {
            this.membership_package_info = data
            this.show_details_form = true
        },
        onAddNewMembershipPackage() {
            this.$router.push('/memberships/add')
        },
     
        showPopup(type, data) {
            if (type === 'add') {
                this.selected_membership_package_info = '';
                this.show_membership_package_form = true;
                this.$router.push({ name: 'MembershipPackageFormModal' });
            } else if (type === 'edit') {
                this.selected_membership_package_info = data;
                this.show_membership_package_form = true;
                this.$router.push({ name: 'MembershipPackageFormModal', params: { id: data.id } });
            }
        },
      
        editMembershipPackage(id, data) {
            this.$router.push({ name: 'MembershipPackageFormModal', params: { id: id } });
        },
        deleteMembershipPackages(id){
            if (confirm(this.$t('datatable.are_you_sure'))) {
                this.deleteMembershipPackage(id);
            }
        },
        onCheck(event, id, data){
            let branch_ids = []

            data.branches.forEach(branch => {
                branch_ids.push(branch.id);
            });

            this.updateMembershipPackage({
                id: data.id,
                membership_type_id: data.membership_type_id,
                branch_ids: branch_ids,
                name_en: data.name_en,
                name_ar: data.name_ar,
                amount: data.amount,
                duration: data.duration,
                start_date: data.start_date,
                end_date: data.end_date,
                min_age: data.min_age,
                freeze_quantity: data.freeze_quantity,
                total_freeze_days: data.total_freeze_days,
                remark: data.remark,
                is_active: event.target.checked
            })
        },

        checkPermissions() {
            let page_permissions = this.$root.getScreenPermissions("Memberships")
            this.has_add_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "add_membership_package")
            this.has_edit_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "edit_membership_package")
            this.has_delete_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "delete_membership_package")
        }
    },
    watch: {
        membershipPackages(data) {
            if(data != null) {
                this.membership_packages_list = data.membership_packages
                this.branches = data.branches
                this.membership_types = data.membership_types
                this.service_types = data.service_types
                this.service_packages = data.service_packages
                this.locker_types = data.locker_types
                this.locker_packages = data.locker_packages
                this.lesson_types = data.lesson_types
                this.lesson_packages = data.lesson_packages

                this.membership_packages_list.forEach(membership_package => {
                    membership_package.is_active = membership_package.is_active == 0 ? false : true
                });
            }
        },
        membershipPackagesToast(data) {
            if(data.status) {
                this.$toast.success(data.message)
            } else {
                this.$toast.error(data.message)
            }
        },
        updateMembershipPackageResponse(data) {
            if(data.status) {
                this.$toast.success(data.message)
            } else {
                this.$toast.error(data.message)
            }
        }
    },
    mounted() {
        this.checkPermissions()
        this.getMembershipPackages()
    },
}
</script>