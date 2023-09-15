<template>
    <div>
        <p class="text-3xl">{{$t('datatable.areas')}}</p>
        <hr class="mb-5" />
        
        <div class="mt-8">
            <custom-data-table
                :enableHeader="true"
                :searchBox="true"
                :searchFields="search_fields"
                :isAddNew="has_add_permission"
                :addBtnText="'Add New'"
                :onAddBtnClicked="addAreaClicked"
                :columns="columns" 
                :edit="has_edit_permission" 
                :onEdit="editAreaClicked" 
                :quickAction="has_edit_permission" 
                :onQuickActionPerformed="onCheck" 
                :rows="areas_list">
            </custom-data-table>
        </div>

        <AreaFormModal v-if="show_area_form" :countries=countries :modal_title=modalTitle :selected_area="selectedArea" @close-modal="show_area_form = false"/>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AreaFormModal from './AreaFormModal.vue';

export default {
    components: { AreaFormModal },
    data() {
        return {
            show_area_form: false,
            search_fields: ["name_en", "name_ar"],
            columns: [
                { name: "#", attribute: "#", sortable: false },
                { name: this.$t("datatable.title_en"), attribute: "name_en", sortable: false },
                { name: this.$t("datatable.title_ar"), attribute: "name_ar", sortable: false },
                { name: this.$t("datatable.country"), nestedObject: "country",  attribute: "name_en", sortable: false},
                { name: this.$t("home.remark"), attribute: "remark", sortable: false },
                { name: this.$t('master.is_active'), attribute: "is_active", sortable: false  },
                { name: this.$t('activity_log.action'), attribute: "action", sortable: false  }
            ],
            areas_list: [],
            countries: [],
            selectedArea: null,
            has_add_permission: false,
            has_edit_permission: false,
            has_delete_permission: false,
        }
    },
    computed:{
        ...mapGetters(["areasResponse", "areasToast"]),
        modalTitle() {
            return this.selectedArea != null ? 'Edit Area' : 'Add Area'
        },
    },
    methods: {
        ...mapActions(["getAreas", "updateArea"]),
        addAreaClicked() {
            this.selectedArea = null
            this.show_area_form = true;
        },
        editAreaClicked(id) {
            const editArea = this.areas_list.find(area => area.id == id)
            this.selectedArea = editArea
            this.show_area_form = true;
        },
        closePopup() {
            this.show_area_form = false;
        },
        onCheck(event, id, data){
            this.updateArea({
                id: id, 
                form_data: {
                    country_id: data.country_id,
                    name_en: data.name_en,
                    name_ar: data.name_ar,
                    remark: data.remark,
                    is_active: event.target.checked
                }
            })
        },

        checkPermissions() {
            let page_permissions = this.$root.getScreenPermissions("Areas")

            this.has_add_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "add_area")
            this.has_edit_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "edit_area")
            this.has_delete_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "delete_area")
        }
    },
    watch: {

        areasResponse(data) {
            if(data != null) {
                this.areas_list = data.areas
                this.areas_list.forEach(area => {
                    area.is_active = area.is_active == 0 ? false : true
                });
                this.countries = data.countries
                this.show_area_form = false;
            }
        },
        areasToast(data) {
            data.status ? this.$toast.success(data.message) : this.$toast.error(data.message)
        }
    },
    mounted() {
        this.checkPermissions()
        this.getAreas()
    },
}
</script>