<template>
    <div>
        <p class="text-3xl">{{ $t('master.locker_types') }}</p>
        <hr class="mb-5" />
        
        <div class="mt-8">
            <custom-data-table
                :enableHeader="true"
                :searchBox="true"
                :searchFields="search_fields"
                :isAddNew="has_add_permission"
                :addBtnText="$t('datatable.add_new')"
                :onAddBtnClicked="onAddNewLockerType"
                :columns="columns" 
                :view="true" 
                :edit="has_edit_permission" 

                :onView="viewLockerTypeInfo"
                :onEdit="editLockerType" 

                :quickAction="has_edit_permission" 
                :onQuickActionPerformed="onCheck" 
                :rows="locker_types_list">
            </custom-data-table>
        </div>

        <LockerTypeFormModal v-if="show_locker_type_form" :selected_locker_type="selected_locker_type_info" @close-modal="show_locker_type_form = false"/>
        <LockerTypeDetailsModal v-if="show_details_form" :locker_type="locker_type_info" @close-modal="show_details_form = false"/>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import LockerTypeFormModal from './LockerTypeFormModal.vue';
import LockerTypeDetailsModal from './LockerTypeDetailsModal.vue';

export default {
    components: { LockerTypeFormModal, LockerTypeDetailsModal },
    data() {
        return {
            show_locker_type_form: false,
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
            locker_types_list: [],
            has_add_permission: false,
            has_edit_permission: false,
            has_delete_permission: false
        }
    },
    computed:{
        ...mapGetters(["lockerTypes", "lockerTypesToast", "updateLockerTypeResponse"]),
    },
    methods: {
        ...mapActions(["getLockerTypes", "updateLockerType", "deleteLockerType"]),

        viewLockerTypeInfo(id, data) {
            this.locker_type_info = data
            this.show_details_form = true
        },
        onAddNewLockerType() {
            this.showPopup('add')
        },
        showPopup(type, data) {
            if(type == "add"){
                this.selected_locker_type_info = "";
                this.show_locker_type_form = true;
            } else if(type == "edit"){
                this.selected_locker_type_info = data;
                this.show_locker_type_form = true;
            }
        },
        closePopup() {
            this.show_locker_type_form = false;
        },
        editLockerType(id, data) {
            this.showPopup('edit', data);
        },
        deleteLockerTypes(id){
            if (confirm(this.$t('datatable.are_you_sure'))) {
                this.deleteLockerType(id);
            }
        },
        onCheck(event, id, data){
            this.updateLockerType({
                id: id,
                name_en: data.name_en,
                name_ar: data.name_ar,
                remark: data.remark,
                is_active: event.target.checked
            })
        },

        checkPermissions() {
            let page_permissions = this.$root.getScreenPermissions("Locker Types")
            this.has_add_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "add_locker_types")
            this.has_edit_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "edit_locker_types")
            this.has_delete_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "delete_locker_types")
        }
    },
    watch: {
        lockerTypes(data) {
            if(data != null) {
                this.locker_types_list = data
                this.locker_types_list.forEach(locker_type => {
                    locker_type.is_active = locker_type.is_active == 0 ? false : true
                });
            }
        },
        lockerTypesToast(data) {
            if(data.status) {
                this.$toast.success(data.message)
            } else {
                this.$toast.error(data.message)
            }
        },
        updateLockerTypeResponse(data) {
            if(data.status) {
                this.$toast.success(data.message)
            } else {
                this.$toast.error(data.message)
            }
        }
    },
    mounted() {
        this.checkPermissions()
        this.getLockerTypes()
    },
}
</script>