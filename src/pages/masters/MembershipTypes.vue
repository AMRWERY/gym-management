<template>
    <div>
        <p class="text-3xl">{{ $t('master.membership_types') }}</p>
        <hr class="mb-5" />
        
        <div class="mt-8">
            <custom-data-table
                :enableHeader="true"
                :searchBox="true"
                :searchFields="search_fields"
                :isAddNew="has_add_permission"
                :addBtnText="$t('datatable.add_new')"
                :onAddBtnClicked="onAddNewMembershipType"
                :columns="columns" 
                :view="true" 
                :edit="has_edit_permission" 

                :onView="viewMembershipTypeInfo"
                :onEdit="editMembershipType" 

                :quickAction="has_edit_permission" 
                :onQuickActionPerformed="onCheck" 
                :rows="membership_types_list">
            </custom-data-table>
        </div>

        <MembershipTypeFormModal v-if="show_membership_type_form" :selected_membership_type="selected_membership_type_info" :branches="branches" @close-modal="show_membership_type_form = false"/>
        <MembershipTypeDetailsModal v-if="show_details_form" :membership_type="membership_type_info" @close-modal="show_details_form = false"/>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MembershipTypeFormModal from './MembershipTypeFormModal.vue';
import MembershipTypeDetailsModal from './MembershipTypeDetailsModal.vue';

export default {
    components: { MembershipTypeFormModal, MembershipTypeDetailsModal },
    data() {
        return {
            show_membership_type_form: false,
            show_details_form: false,
            search_fields: ["name_en", "name_ar", "remark"],
            columns: [
                { name: "#", attribute: "#", sortable: false },
                { name: this.$t('datatable.title_en'), attribute: "name_en", sortable: false },
                { name: this.$t('datatable.title_ar'), attribute: "name_ar", sortable: false },
                { name: this.$t('datatable.description_en'), attribute: "description_en", sortable: false },
                { name: this.$t('datatable.description_ar'), attribute: "description_ar", sortable: false },
                { name: this.$t('datatable.is_active'), attribute: "is_active", sortable: false  },
                { name: this.$t('datatable.action'), attribute: "action", sortable: false  }
            ],
            membership_types_list: [],
            branches: [],
            has_add_permission: false,
            has_edit_permission: false,
            has_delete_permission: false
        }
    },
    computed:{
        ...mapGetters(["membershipTypes", "membershipTypesToast", "updateMembershipTypeResponse"]),
    },
    methods: {
        ...mapActions(["getMembershipTypes", "updateMembershipType", "deleteMembershipType"]),

        viewMembershipTypeInfo(id, data) {
            this.membership_type_info = data
            this.show_details_form = true
        },
        onAddNewMembershipType() {
            this.showPopup('add')
        },
        showPopup(type, data) {
            if(type == "add"){
                this.selected_membership_type_info = "";
                this.show_membership_type_form = true;
            } else if(type == "edit"){
                this.selected_membership_type_info = data;
                this.show_membership_type_form = true;
            }
        },
        closePopup() {
            this.show_membership_type_form = false;
        },
        editMembershipType(id, data) {
            this.showPopup('edit', data);
        },
        deleteMembershipTypes(id){
            if (confirm(this.$t('datatable.are_you_sure'))) {
                this.deleteMembershipType(id);
            }
        },
        onCheck(event, id, data){
            this.updateMembershipType({
                id: id,
                membership_type: {
                    is_active: event.target.checked ? 1 : 0,
                    type: "status",
                },
            })
        },

        checkPermissions() {
            let page_permissions = this.$root.getScreenPermissions("Membership Types")
            this.has_add_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "add_membership_type")
            this.has_edit_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "edit_membership_type")
            this.has_delete_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "delete_membership_type")
        }
    },
    watch: {
        membershipTypes(data) {
            if(data != null) {
                this.membership_types_list = data.membership_types
                this.branches = data.branches
                this.membership_types_list.forEach(membership_type => {
                    membership_type.is_active = membership_type.is_active == 0 ? false : true
                });
            }
        },
        membershipTypesToast(data) {
            if(data.status) {
                this.$toast.success(data.message)
            } else {
                this.$toast.error(data.message)
            }
        },
        updateMembershipTypeResponse(data) {
            if(data.status) {
                this.$toast.success(data.message)
            } else {
                this.$toast.error(data.message)
            }
        }
    },
    mounted() {
        this.checkPermissions()
        this.getMembershipTypes()
    },
}
</script>