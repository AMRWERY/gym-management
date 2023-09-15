<template>
    <div>
        <p class="text-3xl">{{ $t('users.roles') }}</p>
        <hr class="mb-5" />
        
        <div class="mt-8">
            <custom-data-table
                :enableHeader="true"
                :searchBox="true"
                :searchFields="search_fields"
                :isAddNew="has_add_permission"
                :addBtnText="$t('datatable.add_new')"
                :onAddBtnClicked="onAddNewRole"
                :columns="columns" 
                :view="true" 
                :edit="has_edit_permission" 
                :del="has_delete_permission" 
                :onView="viewRoleInfo"
                :onEdit="editRole" 
                :onDelete="deleteRoles" 
                :quickAction="has_edit_permission" 
                :onQuickActionPerformed="onCheck" 
                :rows="roles_list">
            </custom-data-table>
        </div>

        <RoleFormModal v-if="show_role_form" :selected_role="selected_role_info" @close-modal="show_role_form = false"/>
        <RoleDetailsModal v-if="show_details_form" :role="role_info" @close-modal="show_details_form = false"/>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import RoleFormModal from './RoleFormModal.vue';
import RoleDetailsModal from './RoleDetailsModal.vue';

export default {
    components: { RoleFormModal, RoleDetailsModal },
    data() {
        return {
            show_role_form: false,
            show_details_form: false,
            search_fields: ["title_en", "title_ar"],
            columns: [
                { name: "#", attribute: "#", sortable: false },
                { name: this.$t('datatable.title_en'), attribute: "title_en", sortable: false },
                { name: this.$t('datatable.title_ar'), attribute: "title_ar", sortable: false },
                { name: this.$t('datatable.action'), attribute: "action", sortable: false  }
            ],
            roles_list: [],
            has_add_permission: false,
            has_edit_permission: false,
            has_delete_permission: false
        }
    },
    computed:{
        ...mapGetters(["roles", "rolesToast", "updateRoleResponse"]),
    },
    methods: {
        ...mapActions(["getRoles", "updateRole", "deleteRole"]),

        viewRoleInfo(id, data) {
            this.$router.push('/role-permissions/' + data.id)
        },
        onAddNewRole() {
            this.showPopup('add')
        },
        showPopup(type, data) {
            if(type == "add"){
                this.selected_role_info = "";
                this.show_role_form = true;
            } else if(type == "edit"){
                this.selected_role_info = data;
                this.show_role_form = true;
            }
        },
        closePopup() {
            this.show_role_form = false;
        },
        editRole(id, data) {
            this.showPopup('edit', data);
        },
        deleteRoles(id){
            if (confirm(this.$t('datatable.are_you_sure'))) {
                this.deleteRole(id);
            }
        },
        onCheck(event, id, data){
            this.updateRole({
                id: id,
                name_en: data.name_en,
                name_ar: data.name_ar,
                address_en: data.address_en,
                address_ar: data.address_ar,
                invoice_type: data.invoice_type,
                invoice_prefix: data.invoice_prefix,
                remark: data.remark,
                is_active: event.target.checked
            })
        },

        checkPermissions() {
            let page_permissions = this.$root.getScreenPermissions("Roles")
            this.has_add_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "add_admin_group")
            this.has_edit_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "edit_role")
            this.has_delete_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "delete_role")
        }
    },
    watch: {
        roles(data) {
            if(data != null) {
                this.roles_list = data
                this.roles_list.forEach(role => {
                    role.is_active = role.is_active == 0 ? false : true
                });
            }
        },
        rolesToast(data) {
            if(data.status) {
                this.$toast.success(data.message)
            } else {
                this.$toast.error(data.message)
            }
        },
        updateRoleResponse(data) {
            if(data.status) {
                this.$toast.success(data.message)
            } else {
                this.$toast.error(data.message)
            }
        }
    },
    mounted() {
        this.checkPermissions()
        this.getRoles()
    },
}
</script>