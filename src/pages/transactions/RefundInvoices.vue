<template>
    <div>
        <p class="text-3xl">{{ $t('transactions.refund_invoices') }}</p>
        <hr class="mb-5" />
        
        <div class="mt-8">
            <custom-data-table
                :enableHeader="true"
                :searchBox="true"
                :searchFields="search_fields"
                :isAddNew="false"
                :addBtnText="$t('datatable.add_new')"
                :columns="columns" 
                :view="true" 
                :edit="false" 
                :del="false" 
                :onView="viewInvoiceInfo"
                :quickAction="false" 
                :rows="invoices_list">
            </custom-data-table>
        </div>

    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    data() {
        return {
            nested_obj_names: ["subscription"],
            search_fields: ["id", "type", "invoice_no", "refund_amount", "remark", "subscription_member_name_en", "created_at", "description_en"],
            columns: [
                { name: "#", attribute: "#", sortable: false },
                { name: this.$t('datatable.refund_type'), attribute: "type", sortable: false },
                { name: this.$t('datatable.invoice'), attribute: "invoice_no", sortable: false },
                { name: this.$t('datatable.refund_amount'), attribute: "refund_amount", sortable: false },
                { name: this.$t('datatable.remark'), attribute: "remark", sortable: false },
                { name: this.$t('datatable.member'), nestedObject: "subscription", attribute: "member_name_en", sortable: false },
                { name: this.$t('datatable.created_on'), attribute: "created_at", sortable: false },
                { name: this.$t('datatable.description'), attribute: "description_en", sortable: false },
                { name: this.$t('datatable.action'), attribute: "action", sortable: false  }
            ],
            invoices_list: [],
            has_view_permission: false
        }
    },
    computed:{
        ...mapGetters(["refundInvoices"]),
    },
    methods: {
        ...mapActions(["getRefundInvoices"]),

        viewInvoiceInfo(id, data) {
            if(this.has_view_permission){
                this.$router.push('/refund-invoices/' + data.id)
            }else{
                this.$toast.error('You do not have access to use this feature.')
            }
        },
        checkPermissions() {
            let page_permissions = this.$root.getScreenPermissions("Refund Invoices")
            this.has_view_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "refund_invoice_details")
        }
    },
    watch: {
        refundInvoices(data) {
            if(data != null) {
                this.invoices_list = data
            }
        }
    },
    mounted() {
        this.checkPermissions()
        this.getRefundInvoices()
    },
}
</script>