<template>
    <div>
        <p class="text-3xl">{{ $t('master.item_types') }}</p>
        <hr class="mb-5" />
        
        <div class="mt-8">
            <custom-data-table
                :enableHeader="true"
                :searchBox="true"
                :searchFields="search_fields"
                :isAddNew="has_add_permission"
                :addBtnText="$t('datatable.add_new')"
                :onAddBtnClicked="onAddNewItemType"
                :columns="columns" 
                :view="true" 
                :edit="has_edit_permission" 

                :onView="viewItemTypeInfo"
                :onEdit="editItemType" 

                :quickAction="has_edit_permission" 
                :onQuickActionPerformed="onCheck" 
                :rows="item_types_list">
            </custom-data-table>
        </div>

        <ItemTypeFormModal v-if="show_item_type_form" :selected_item_type="selected_item_type_info" @close-modal="show_item_type_form = false"/>
        <ItemTypeDetailsModal v-if="show_details_form" :item_type="item_type_info" @close-modal="show_details_form = false"/>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ItemTypeFormModal from './ItemTypeFormModal.vue';
import ItemTypeDetailsModal from './ItemTypeDetailsModal.vue';

export default {
    components: { ItemTypeFormModal, ItemTypeDetailsModal },
    data() {
        return {
            show_item_type_form: false,
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
            item_types_list: [],
            has_add_permission: false,
            has_edit_permission: false,
            has_delete_permission: false
        }
    },
    computed:{
        ...mapGetters(["itemTypes", "itemTypesToast", "updateItemTypeResponse"]),
    },
    methods: {
        ...mapActions(["getItemTypes", "updateItemType", "deleteItemType"]),

        viewItemTypeInfo(id, data) {
            this.item_type_info = data
            this.show_details_form = true
        },
        onAddNewItemType() {
            this.showPopup('add')
        },
        showPopup(type, data) {
            if(type == "add"){
                this.selected_item_type_info = "";
                this.show_item_type_form = true;
            } else if(type == "edit"){
                this.selected_item_type_info = data;
                this.show_item_type_form = true;
            }
        },
        closePopup() {
            this.show_item_type_form = false;
        },
        editItemType(id, data) {
            this.showPopup('edit', data);
        },
        deleteItemTypes(id){
            if (confirm(this.$t('datatable.are_you_sure'))) {
                this.deleteItemType(id);
            }
        },
        onCheck(event, id, data){
            this.updateItemType({
                id: id,
                name_en: data.name_en,
                name_ar: data.name_ar,
                remark: data.remark,
                is_active: event.target.checked
            })
        },

        checkPermissions() {
            let page_permissions = this.$root.getScreenPermissions("Item Types")
            this.has_add_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "add_item_type")
            this.has_edit_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "edit_item_type")
            this.has_delete_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "delete_item_type")
        }
    },
    watch: {
        itemTypes(data) {
            if(data != null) {
                this.item_types_list = data
                this.item_types_list.forEach(item_type => {
                    item_type.is_active = item_type.is_active == 0 ? false : true
                });
            }
        },
        itemTypesToast(data) {
            if(data.status) {
                this.$toast.success(data.message)
            } else {
                this.$toast.error(data.message)
            }
        },
        updateItemTypeResponse(data) {
            if(data.status) {
                this.$toast.success(data.message)
            } else {
                this.$toast.error(data.message)
            }
        }
    },
    mounted() {
        this.checkPermissions()
        this.getItemTypes()
    },
}
</script>