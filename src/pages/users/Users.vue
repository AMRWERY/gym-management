<template>
    <div>
        <p class="text-3xl">{{ $t('users.admin_users') }}</p>
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
                :onAddBtnClicked="onAddNewUser"
                :columns="columns" 
                :view="true" 
                :edit="has_edit_permission" 
                :del="has_delete_permission" 
                :onView="viewUserInfo"
                :onEdit="editUser" 
                :onDelete="deleteUsers" 
                :quickAction="has_edit_permission" 
                :onQuickActionPerformed="onCheck" 
                :rows="users_list">
            </custom-data-table>
        </div>

        <UserFormModal v-if="show_user_form" :admin_groups="admin_groups" :branches="branches" :generals="generals" :selected_user="selected_user_info" @close-modal="show_user_form = false"/>
        <UserDetailsModal v-if="show_details_form" :user="user_info" @close-modal="show_details_form = false"/>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import UserFormModal from './UserFormModal.vue';
import UserDetailsModal from './UserDetailsModal.vue';

export default {
    components: { UserFormModal, UserDetailsModal },
    data() {
        return {
            show_user_form: false,
            show_details_form: false,
            nested_obj_names: ["admin_group"],
            search_fields: ["name", "email", "mobile", "admin_group_title_en"],
            columns: [
                { name: "#", attribute: "#", sortable: false },
                { name: this.$t('datatable.name'), attribute: "name", sortable: false },
                { name: this.$t('datatable.email'), attribute: "email", sortable: false },
                { name: this.$t('datatable.mobile'), attribute: "mobile", sortable: false },
                { name: this.$t('datatable.role'), nestedObject: "admin_group", attribute: "title_en", sortable: false },
                { name: this.$t('datatable.is_active'), attribute: "is_active", sortable: false  },
                { name: this.$t('datatable.action'), attribute: "action", sortable: false  }
            ],
            users_list: [],
            branches: [],
            generals: [],
            admin_groups: [],
            has_add_permission: false,
            has_edit_permission: false,
            has_delete_permission: false
        }
    },
    computed:{
        ...mapGetters(["users", "usersToast", "updateUserResponse"]),
    },
    methods: {
        ...mapActions(["getUsers", "updateUser", "deleteUser"]),

        viewUserInfo(id, data) {
            this.user_info = data
            this.show_details_form = true
        },
        onAddNewUser() {
            // this.showPopup('add')
            this.$router.push('/admin-users/add')
        },
        showPopup(type, data) {
            if(type == "add"){
                this.selected_user_info = "";
                this.show_user_form = true;
            } else if(type == "edit"){
                this.selected_user_info = data;
                this.show_user_form = true;
            }
        },
        closePopup() {
            this.show_user_form = false;
        },
        editUser(id, data) {
            this.showPopup('edit', data);
        },
        deleteUsers(id){
            if (confirm(this.$t('datatable.are_you_sure'))) {
                this.deleteUser(id);
            }
        },
        onCheck(event, id, data){
            let branch_ids = []

            data.branches.forEach(branch => {
                branch_ids.push(branch.id);
            });
            this.updateUser({
                id: id,
                branch_ids: branch_ids,
                general_id: data.general_id,
                admin_group_id: data.admin_group_id,
                name: data.name,
                email: data.email,
                mobile: data.mobile,
                commission_type: data.commission_type,
                commission_value: data.commission_value,
                is_active: event.target.checked
            })
        },

        checkPermissions() {
            let page_permissions = this.$root.getScreenPermissions("Admin Users")
            this.has_add_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "add_admin_user")
            this.has_edit_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "edit_admin_user")
            this.has_delete_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "delete_admin_user")
        }
    },
    watch: {
        users(data) {
            if(data != null) {
                this.users_list = data.users
                this.branches = data.branches
                this.generals = data.generals
                this.admin_groups = data.admin_groups
                this.users_list.forEach(user => {
                    user.is_active = user.is_active == 0 ? false : true
                });
            }
        },
        usersToast(data) {
            if(data.status) {
                this.$toast.success(data.message)
            } else {
                this.$toast.error(data.message)
            }
        },
        updateUserResponse(data) {
            if(data.status) {
                this.$toast.success(data.message)
            } else {
                this.$toast.error(data.message)
            }
        }
    },
    mounted() {
        this.checkPermissions()
        this.getUsers()
    },
}
</script>