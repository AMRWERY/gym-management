<template>
    <div>
        <p class="text-3xl">{{ $t('master.generals') }}</p>
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
                :onAddBtnClicked="onAddNewGeneral"
                :columns="columns" 
                :view="true" 
                :edit="has_edit_permission" 

                :onView="viewGeneralInfo"
                :onEdit="editGeneral" 

                :quickAction="has_edit_permission" 
                :onQuickActionPerformed="onCheck" 
                :rows="generals_list">
            </custom-data-table>
        </div>

        <GeneralFormModal v-if="show_general_form" :general_types="general_types" :selected_general="selected_general_info" @close-modal="show_general_form = false"/>
        <GeneralDetailsModal v-if="show_details_form" :general="general_info" @close-modal="show_details_form = false"/>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import GeneralFormModal from './GeneralFormModal.vue';
import GeneralDetailsModal from './GeneralDetailsModal.vue';

export default {
    components: { GeneralFormModal, GeneralDetailsModal },
    data() {
        return {
            show_general_form: false,
            show_details_form: false,
            nested_obj_names: ["general_type"],
            search_fields: ["name_en", "name_ar", "remark", "general_type_name_en"],
            columns: [
                { name: "#", attribute: "#", sortable: false },
                { name: this.$t('datatable.type'), attribute: "name_en", nestedObject: 'general_type', sortable: false },
                { name: this.$t('datatable.title_en'), attribute: "name_en", sortable: false },
                { name: this.$t('datatable.title_ar'), attribute: "name_ar", sortable: false },
                { name: this.$t('datatable.remark'), attribute: "remark", sortable: false },
                { name: this.$t('datatable.is_active'), attribute: "is_active", sortable: false  },
                { name: this.$t('datatable.action'), attribute: "action", sortable: false  }
            ],
            generals_list: [],
            general_types: [],
            has_add_permission: false,
            has_edit_permission: false,
            has_delete_permission: false
        }
    },
    computed:{
        ...mapGetters(["generals", "generalsToast", "updateGeneralResponse"]),
    },
    methods: {
        ...mapActions(["getGenerals", "updateGeneral", "deleteGeneral"]),

        viewGeneralInfo(id, data) {
            this.general_info = data
            this.show_details_form = true
        },
        onAddNewGeneral() {
            this.showPopup('add')
        },
        showPopup(type, data) {
            if(type == "add"){
                this.selected_general_info = "";
                this.show_general_form = true;
            } else if(type == "edit"){
                this.selected_general_info = data;
                this.show_general_form = true;
            }
        },
        closePopup() {
            this.show_general_form = false;
        },
        editGeneral(id, data) {
            this.showPopup('edit', data);
        },
        deleteGenerals(id){
            if (confirm(this.$t('datatable.are_you_sure'))) {
                this.deleteGeneral(id);
            }
        },
        onCheck(event, id, data){
            this.updateGeneral({
                id: id,
                general_type_id: data.general_type_id,
                name_en: data.name_en,
                name_ar: data.name_ar,
                remark: data.remark,
                is_active: event.target.checked
            })
        },

        checkPermissions() {
            let page_permissions = this.$root.getScreenPermissions("Generals")
            this.has_add_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "add_general")
            this.has_edit_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "edit_general")
            this.has_delete_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "delete_general")
        }
    },
    watch: {
        generals(data) {
            if(data != null) {
                this.generals_list = data.generals
                this.general_types = data.general_types
                this.generals_list.forEach(general => {
                    general.is_active = general.is_active == 0 ? false : true
                });
            }
        },
        generalsToast(data) {
            if(data.status) {
                this.$toast.success(data.message)
            } else {
                this.$toast.error(data.message)
            }
        },
        updateGeneralResponse(data) {
            if(data.status) {
                this.$toast.success(data.message)
            } else {
                this.$toast.error(data.message)
            }
        }
    },
    mounted() {
        this.checkPermissions()
        this.getGenerals()
    },
}
</script>