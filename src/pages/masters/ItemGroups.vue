<template>
    <div>
        <p class="text-3xl">{{ $t('master.item_groups') }}</p>
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
                :onAddBtnClicked="onAddNewItemGroup"
                :columns="columns"
                :view="true" 
                :edit="has_edit_permission" 

                :onView="viewItemGroupInfo"
                :onEdit="editItemGroup" 

                :quickAction="has_edit_permission" 
                :onQuickActionPerformed="onCheck" 
                :rows="item_groups_list">
            </custom-data-table>
        </div>

        <ItemGroupFormModal v-if="show_item_group_form" :item_types="item_types" :selected_item_group="selected_item_group_info" @close-modal="show_item_group_form = false"/>
        <ItemGroupDetailsModal v-if="show_details_form" :item_group="item_group_info" @close-modal="show_details_form = false"/>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ItemGroupFormModal from './ItemGroupFormModal.vue';
import ItemGroupDetailsModal from './ItemGroupDetailsModal.vue';

export default {
    components: { ItemGroupFormModal, ItemGroupDetailsModal },
    data() {
        return {
            show_item_group_form: false,
            show_details_form: false,
            nested_obj_names: ["item_type"],
            search_fields: ["name_en", "name_ar", "remark", "item_type_name_en"],
            columns: [
                { name: "#", attribute: "#", sortable: false },
                { name: this.$t('datatable.item_type'), nestedObject: "item_type", attribute: "name_en", sortable: false },
                { name: this.$t('datatable.title_en'), attribute: "name_en", sortable: false },
                { name: this.$t('datatable.title_ar'), attribute: "name_ar", sortable: false },
                { name: this.$t('datatable.remark'), attribute: "remark", sortable: false },
                { name: this.$t('datatable.is_active'), attribute: "is_active", sortable: false  },
                { name: this.$t('datatable.action'), attribute: "action", sortable: false  }
            ],
            item_types: [],
            item_groups_list: [],
            has_add_permission: false,
            has_edit_permission: false,
            has_delete_permission: false
        }
    },
    computed:{
        ...mapGetters(["itemGroups", "itemGroupsToast", "updateItemGroupResponse"]),
    },
    methods: {
        ...mapActions(["getItemGroups", "updateItemGroup", "deleteItemGroup"]),

        viewItemGroupInfo(id, data) {
            this.item_group_info = data
            this.show_details_form = true
        },
        onAddNewItemGroup() {
            this.showPopup('add')
        },
        showPopup(type, data) {
            if(type == "add"){
                this.selected_item_group_info = "";
                this.show_item_group_form = true;
            } else if(type == "edit"){
                this.selected_item_group_info = data;
                this.show_item_group_form = true;
            }
        },
        closePopup() {
            this.show_item_group_form = false;
        },
        editItemGroup(id, data) {
            this.showPopup('edit', data);
        },
        deleteItemGroups(id){
            if (confirm(this.$t('datatable.are_you_sure'))) {
                this.deleteItemGroup(id);
            }
        },
        onCheck(event, id, data){
            this.updateItemGroup({
                id: id,
                item_type_id: data.item_type_id,
                name_en: data.name_en,
                name_ar: data.name_ar,
                remark: data.remark,
                is_active: event.target.checked
            })
        },

        checkPermissions() {
            let page_permissions = this.$root.getScreenPermissions("Item Groups")
            this.has_add_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "add_item_group")
            this.has_edit_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "edit_item_group")
            this.has_delete_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "delete_item_group")
        }
    },
    watch: {
        itemGroups(data) {
            if(data != null) {
                this.item_types = data.item_types
                this.item_groups_list = data.item_groups
                this.item_groups_list.forEach(item_group => {
                    item_group.is_active = item_group.is_active == 0 ? false : true
                });
            }
        },
        itemGroupsToast(data) {
            if(data.status) {
                this.$toast.success(data.message)
            } else {
                this.$toast.error(data.message)
            }
        },
        updateItemGroupResponse(data) {
            if(data.status) {
                this.$toast.success(data.message)
            } else {
                this.$toast.error(data.message)
            }
        }
    },
    mounted() {
        this.checkPermissions()
        this.getItemGroups()
    },
}
</script>