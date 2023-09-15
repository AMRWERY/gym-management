<template>
    <div>
        <p class="text-3xl">{{ $t('stock_adjustment.title') }}</p>
        <hr class="mb-5" />
        
        <div class="mt-8">
            <custom-data-table
                :enableHeader="true"
                :searchBox="true"
                :searchFields="search_fields"
                :isAddNew="has_add_permission"
                :addBtnText="$t('datatable.add_new')"
                :onAddBtnClicked="onAddNewStock"
                :columns="columns" 
                :view="has_view_permission" 
                :edit="false" 
                :del="false" 
                :onView="viewStockInfo"
                :quickAction="false" 
                :rows="stocks_list">
            </custom-data-table>
        </div>

    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    data() {
        return {
            show_stock_form: false,
            show_details_form: false,
            search_fields: ["created_at", "adjusted_by", "remark"],
            columns: [
                { name: "#", attribute: "#", sortable: false },
                { name: this.$t('datatable.adjustment_date'), attribute: "created_at", sortable: false },
                { name: this.$t('datatable.adjust_by'), attribute: "adjusted_by", sortable: false },
                { name: this.$t('datatable.remark'), attribute: "remark", sortable: false },
                { name: this.$t('datatable.action'), attribute: "action", sortable: false  }
            ],
            stocks_list: [],
            has_add_permission: false,
            has_view_permission: false
        }
    },
    computed:{
        ...mapGetters(["stocks", "stocksToast"]),
    },
    methods: {
        ...mapActions(["getStocks"]),

        viewStockInfo(id, data) {
            if(this.has_view_permission){
                this.$router.push('/stock-adjustment-details/' + data.id)
            }else{
                this.$toast.error('You do not have access to use this feature.')
            }
        },
        onAddNewStock() {
            this.$router.push('/add-stock')
        },
        checkPermissions() {
            let page_permissions = this.$root.getScreenPermissions("Stock Adjustments")
            this.has_add_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "add_stock")
            this.has_view_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "view_stock_details")
        }
    },
    watch: {
        stocks(data) {
            if(data != null) {
                this.stocks_list = data
            }
        },
        stocksToast(data) {
            if(data.status) {
                this.$toast.success(data.message)
            } else {
                this.$toast.error(data.message)
            }
        }
    },
    mounted() {
        this.checkPermissions()
        this.getStocks()
    },
}
</script>