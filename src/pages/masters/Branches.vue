<template>
    <div>
        <p class="text-3xl">{{ $t('master.branches') }}</p>
        <hr class="mb-5" />

        <div class="mt-8">
            <custom-data-table :enableHeader="true" :searchBox="true" :searchFields="search_fields"
                :isAddNew="has_add_permission" :addBtnText="$t('datatable.add_new')" :onAddBtnClicked="onAddNewBranch"
                :columns="columns" :view="true" :edit="has_edit_permission" :onView="viewBranchInfo" :onEdit="editBranch"
                :quickAction="has_edit_permission" :onQuickActionPerformed="onCheck" :rows="branches_list">
            </custom-data-table>
        </div>

        <BranchDetailsModal v-if="show_details_form" :branch="branch_info" @close-modal="show_details_form = false" />
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import BranchDetailsModal from './BranchDetailsModal.vue';

export default {
    components: { BranchDetailsModal },
    data() {
        return {
            show_details_form: false,
            search_fields: ["name_en", "name_ar", "address_en", "remark"],
            columns: [
                { name: "#", attribute: "#", sortable: false },
                { name: this.$t('master.suprema_group_id'), attribute: "suprema_group_id", sortable: false },
                { name: this.$t('datatable.title_en'), attribute: "name_en", sortable: false },
                { name: this.$t('datatable.title_ar'), attribute: "name_ar", sortable: false },
                { name: this.$t('datatable.prefix'), attribute: "invoice_prefix", sortable: false },
                { name: this.$t('datatable.remark'), attribute: "remark", sortable: false },
                { name: this.$t('datatable.is_active'), attribute: "is_active", sortable: false },
                { name: this.$t('datatable.action'), attribute: "action", sortable: false }
            ],
            branches_list: [],
            has_add_permission: false,
            has_edit_permission: false,
            has_delete_permission: false
        }
    },
    computed: {
        ...mapGetters(["branches", "branchesToast", "updateBranchResponse"]),
    },
    methods: {
        ...mapActions(["getBranches", "updateBranch", "deleteBranch"]),

        viewBranchInfo(id, data) {
            this.branch_info = data
            this.show_details_form = true
        },
        onAddNewBranch() {
            this.$router.push('branches/add')
        },
        editBranch(id, data) {
            this.$router.push({ name: 'BranchFormModal', params: { id: id } });
        },
        deleteBranches(id) {
            if (confirm(this.$t('datatable.are_you_sure'))) {
                this.deleteBranch(id);
            }
        },
        onCheck(event, id, data) {
            this.updateBranch({
                id: id,
                image_size_error: data.image_size_error,
                name_en: data.name_en,
                suprema_group_id: data.suprema_group_id,
                name_ar: data.name_ar,
                address_en: data.address_en,
                address_ar: data.address_ar,
                invoice_type: data.invoice_type,
                invoice_prefix: data.invoice_prefix,
                branch_manager_name: data.branch_manager_name,
                contact_no: data.contact_no,
                terms_condition_en: data.terms_condition_en,
                terms_condition_ar: data.terms_condition_ar,
                remark: data.remark,
                is_active: event.target.checked
            })
        },
        checkPermissions() {
            let page_permissions = this.$root.getScreenPermissions("Branches")
            this.has_add_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "add_branches")
            this.has_edit_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "edit_branch")
            this.has_delete_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "delete_branch")
        }
    },
    watch: {
        branches(data) {
            if (data != null) {
                this.branches_list = data.branches
                this.branches_list.forEach(branch => {
                    branch.is_active = branch.is_active == 0 ? false : true
                });
            }
        },
        branchesToast(data) {
            if (data.status) {
                this.$toast.success(data.message)
            } else {
                this.$toast.error(data.message)
            }
        },
        updateBranchResponse(data) {
            if (data.status) {
                this.$toast.success(data.message)
            } else {
                this.$toast.error(data.message)
            }
        }
    },
    mounted() {
        this.checkPermissions()
        this.getBranches()
    },
}
</script>