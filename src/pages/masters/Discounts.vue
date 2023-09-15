<template>
    <div>
        <p class="text-3xl">{{ $t('master.discounts') }}</p>
        <hr class="mb-5" />
        
        <div class="mt-8">
            <custom-data-table
                :enableHeader="true"
                :searchBox="true"
                :searchFields="search_fields"
                :isAddNew="has_add_permission"
                :addBtnText="$t('datatable.add_new')"
                :onAddBtnClicked="onAddNewDiscount"
                :columns="columns" 
                :view="true" 
                :edit="has_edit_permission" 
                :onView="viewDiscountInfo"
                :onEdit="editDiscount"
                :quickAction="has_edit_permission" 
                :onQuickActionPerformed="onCheck" 
                :rows="discounts_list">
            </custom-data-table>
        </div>

        <DiscountDetailsModal v-if="show_details_form" :discount="discount_info" @close-modal="show_details_form = false"/>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import DiscountDetailsModal from './DiscountDetailsModal.vue';

export default {
    components: { DiscountDetailsModal },
    data() {
        return {
            show_details_form: false,
            search_fields: ["code", "name_en", "name_ar", "discount_type", "discount_value", "start_date", "end_date", "remark"],
            columns: [
                { name: "#", attribute: "#", sortable: false },
                { name: this.$t('datatable.code'), attribute: "code", sortable: false },
                { name: this.$t('datatable.title_en'), attribute: "name_en", sortable: false },
                { name: this.$t('datatable.title_ar'), attribute: "name_ar", sortable: false },
                { name: this.$t('datatable.discount_type'), attribute: "discount_type", sortable: false },
                { name: this.$t('datatable.discount_value'), attribute: "discount_value", sortable: false },
                { name: this.$t('datatable.start_date'), attribute: "start_date", sortable: false },
                { name: this.$t('datatable.end_date'), attribute: "end_date", sortable: false },
                { name: this.$t('datatable.is_active'), attribute: "is_active", sortable: false  },
                { name: this.$t('datatable.action'), attribute: "action", sortable: false  }
            ],
            discounts_list: [],
            has_add_permission: false,
            has_edit_permission: false,
            has_delete_permission: false
        }
    },
    computed:{
        ...mapGetters(["discounts", "discountsToast", "updateDiscountResponse"]),
    },
    methods: {
        ...mapActions(["getDiscounts", "updateDiscount", "deleteDiscount"]),

        viewDiscountInfo(id, data) {
            this.discount_info = data
            this.show_details_form = true
        },
        onAddNewDiscount() {
            this.$router.push('discounts/add')
        },
        editDiscount(id, data) {
            this.$router.push({ name: 'DiscountFormModal', params: { id: id } });
        },
        deleteDiscounts(id){
            if (confirm(this.$t('datatable.are_you_sure'))) {
                this.deleteDiscount(id);
            }
        },
        onCheck(event, id, data){
            this.updateDiscount({
                id: id,
                name_en: data.name_en,
                name_ar: data.name_ar,
                code: data.code,
                discount_type: data.discount_type,
                discount_value: data.discount_value,
                start_date: data.start_date,
                end_date: data.end_date,
                remark: data.remark,
                is_active: event.target.checked
            })
        },
        checkPermissions() {
            let page_permissions = this.$root.getScreenPermissions("Discounts")
            this.has_add_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "add_discount")
            this.has_edit_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "edit_discount")
            this.has_delete_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "delete_discount")
        }
    },
    watch: {
        discounts(data) {
            if(data != null) {
                this.discounts_list = data
                this.discounts_list.forEach(discount => {
                    discount.is_active = discount.is_active == 0 ? false : true
                });
            }
        },
        discountsToast(data) {
            if(data.status) {
                this.$toast.success(data.message)
            } else {
                this.$toast.error(data.message)
            }
        },
        updateDiscountResponse(data) {
            if(data.status) {
                this.$toast.success(data.message)
            } else {
                this.$toast.error(data.message)
            }
        }
    },
    mounted() {
        this.checkPermissions()
        this.getDiscounts()
    },
}
</script>