<template>
    <div>
        <p class="text-3xl">{{ $t('master.lockers') }}</p>
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
                :onAddBtnClicked="onAddNewLocker"
                :columns="columns" 
                :view="true" 
                :edit="has_edit_permission" 

                :onView="viewLockerInfo"
                :onEdit="editLocker" 

                :quickAction="has_edit_permission" 
                :onQuickActionPerformed="onCheck" 
                :rows="lockers_list">
            </custom-data-table>
        </div>

        <LockerFormModal v-if="show_locker_form" :branches="branches" :generals="generals" :locker_types="locker_types" :selected_locker="selected_locker_info" @close-modal="show_locker_form = false"/>
        <LockerDetailsModal v-if="show_details_form" :locker="locker_info" @close-modal="show_details_form = false"/>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import LockerFormModal from './LockerFormModal.vue';
import LockerDetailsModal from './LockerDetailsModal.vue';

export default {
    components: { LockerFormModal, LockerDetailsModal },
    data() {
        return {
            show_locker_form: false,
            show_details_form: false,
            nested_obj_names: ["locker_type", "branch", "general"],
            search_fields: ["name_en", "name_ar", "remark", "locker_type_name_en", "branch_name_en", "general_name_en"],
            columns: [
                { name: "#", attribute: "#", sortable: false },
                { name: this.$t('datatable.locker_type'), attribute: "name_en", nestedObject: "locker_type", sortable: false },
                { name: this.$t('datatable.title_en'), attribute: "name_en", sortable: false },
                { name: this.$t('datatable.title_ar'), attribute: "name_ar", sortable: false },
                { name: this.$t('datatable.branch'), nestedObject: "branch", attribute: "name_en", sortable: false },
                { name: this.$t('datatable.status'), nestedObject: "general", attribute: "name_en", sortable: false },
                { name: this.$t('datatable.remark'), attribute: "remark", sortable: false },
                { name: this.$t('datatable.is_active'), attribute: "is_active", sortable: false  },
                { name: this.$t('datatable.action'), attribute: "action", sortable: false  }
            ],
            lockers_list: [],
            branches: [],
            locker_types: [],
            generals: [],
            has_add_permission: false,
            has_edit_permission: false,
            has_delete_permission: false
        }
    },
    computed:{
        ...mapGetters(["lockers", "lockersToast", "updateLockerResponse"]),
    },
    methods: {
        ...mapActions(["getLockers", "updateLocker", "deleteLocker"]),

        viewLockerInfo(id, data) {
            this.locker_info = data
            this.show_details_form = true
        },
        onAddNewLocker() {
            this.showPopup('add')
        },
        showPopup(type, data) {
            if(type == "add"){
                this.selected_locker_info = "";
                this.show_locker_form = true;
            } else if(type == "edit"){
                this.selected_locker_info = data;
                this.show_locker_form = true;
            }
        },
        closePopup() {
            this.show_locker_form = false;
        },
        editLocker(id, data) {
            this.showPopup('edit', data);
        },
        deleteLockers(id){
            if (confirm(this.$t('datatable.are_you_sure'))) {
                this.deleteLocker(id);
            }
        },
        onCheck(event, id, data){
            this.updateLocker({
                id: id,
                locker_type_id: data.locker_type_id,
                branch_id: data.branch_id,
                name_en: data.name_en,
                name_ar: data.name_ar,
                general_id: data.general_id,
                display_order: data.display_order,
                remark: data.remark,
                is_active: event.target.checked
            })
        },

        checkPermissions() {
            let page_permissions = this.$root.getScreenPermissions("Lockers")
            this.has_add_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "add_locker")
            this.has_edit_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "edit_locker")
            this.has_delete_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "delete_locker")
        }
    },
    watch: {
        lockers(data) {
            if(data != null) {
                this.lockers_list = data.lockers
                this.branches = data.branches
                this.locker_types = data.locker_types
                this.generals = data.generals

                this.lockers_list.forEach(locker => {
                    locker.is_active = locker.is_active == 0 ? false : true
                });
            }
        },
        lockersToast(data) {
            if(data.status) {
                this.$toast.success(data.message)
            } else {
                this.$toast.error(data.message)
            }
        },
        updateLockerResponse(data) {
            if(data.status) {
                this.$toast.success(data.message)
            } else {
                this.$toast.error(data.message)
            }
        }
    },
    mounted() {
        this.checkPermissions()
        this.getLockers()
    },
}
</script>