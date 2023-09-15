<template>
    <div>
        <p class="text-3xl">{{$t('reports.item_invoice_reprint')}}</p>
        <hr />

        <div class="mt-5 grid grid-cols-8 gap-3 bg-white px-3 py-5">
            <div class="col-span-2 mb-1.5">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="branch_id">
                    {{ $t('reports.select_branch') }} *
                </label>
                <select name="branch_id" id="branch_id" v-model="form_data.branch_id" aria-placeholder="Select branch"
                    class="h-10 shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    <option v-for="(branch, index) in branches" :key="index" :value="branch.id">{{ branch.name_en }}
                    </option>
                </select>
                <span class="text-sm text-red-400" v-if="v$.form_data.branch_id.$error"> {{
                    v$.form_data.branch_id.$errors[0].$message
                }}</span>
            </div>

            <div class="col-span-2 mb-1.5">
                <label for="start_date" class="font-bold">{{$t('home.start_date')}}</label>
                <input type="date" :min="todaysDate" v-model="form_data.start_date" format="dd/MM/yyyy"
                    :placeholder="$t('transactions.start_date')"
                    class="shadow appearance-none border rounded w-full mt-1 p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>

            <div class="col-span-2 mb-1.5">
                <label for="end_date" class="font-bold">{{$t('home.end_date')}}</label>
                <input type="date" :min="form_data.start_date" v-model="form_data.end_date" format="dd/MM/yyyy"
                    :placeholder="$t('transactions.end_date')"
                    class="shadow p-2 appearance-none border mt-1 rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>

            <div class="col-span-2 mt-3">
                <button type="button" @click="getReports"
                    class="w-full mt-4 inline-flex justify-center border-2 border-color-primary shadow-sm px-5 py-2 font-semibold text-base btn-outline-primary focus:outline-none sm:text-sm">
                    {{ $t('button.search') }}
                </button>
            </div>

        </div>

        <div v-if="response" class="mt-4 bg-white">

            <div class="grid grid-cols-3 justify-content-between">
                <div class="col-span-2 font-bold px-2 pt-5">

                    <h4 v-if="reports?.start_date && reports?.end_date">Item invoices From {{ reports?.start_date }} to {{ reports?.end_date }} for Branch: {{ branchesNames }}</h4>
                    <h4 v-else-if="reports?.start_date">Item invoices From {{ reports?.start_date }} for Branch:  {{ branchesNames }}</h4>
                    <h4 v-else-if="reports?.end_date">Item invoices till {{ reports?.end_date }} for Branch: {{ branchesNames }}</h4>
                    <h4 v-else class="font-bold px-2 pt-2">Item invoices for Branch: {{ branchesNames }}</h4>
                </div>
            </div>


            <div class="mt-1" id="reportData">
                <h4 class="bg-gray-200 p-1 pt-2 font-bold text-center" >ITEM INVOICE RE{{ $t('button.print_report') }}</h4>
                <table class="min-w-full border" >
                    <thead class="border-b py-1" >
                        <tr>
                            <th scope="col" class="text-sm font-bold text-gray-900 text-left">Invoice No #</th>
                            <th scope="col" class="text-sm font-bold text-gray-900 text-left ps-2 py-2" >Member Code</th>
                            <th scope="col" class="text-sm font-bold text-gray-900 text-left">Member Name</th>
                            <th scope="col" class="text-sm font-bold text-gray-900 text-left">Invoice Date</th>
                            <th scope="col" class="text-sm font-bold text-gray-900 text-right">Amount</th>
                            <th scope="col" class="text-sm font-bold text-gray-900 text-center">Show/Print Invoice</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(row, index) in response?.item_sales" :key="index" class="border border-bottom" >
                            <td class="whitespace-nowrap ps-2 pb-1 pt-2 text-sm font-medium text-gray-900">{{ row.invoice_no ?? '-' }}</td>
                            <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-left">{{ row.member_code }}</td>
                            <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-left">{{ row.member_name_en }}</td>
                            <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-left">{{ row.invoice_date }}</td>
                            <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-right">{{ row.total_amount?.toFixed(3) }}</td>
                            <td class="whitespace-nowrap text-sm py-2 font-medium text-gray-900 text-center">
                                    <button type="button" @click="showPopup(row)"
                                        class="w-full justify-center border-1 border-color-primary 
                                            shadow-sm px-4 py-1 font-semibold text-base btn-primary 
                                            focus:outline-none sm:w-auto sm:text-sm">
                                        Show Detailed Invoice
                                    </button>
                                </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <ItemInvoiceModal v-if="show_invoice_details" :invoice_details="invoiceDetails" @close-modal="show_invoice_details = false" />

    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import useValidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import ItemInvoiceModal from './ItemInvoiceModal.vue';


export default {
    data() {
        return {
            v$: useValidate(),
            has_permission: false,
            show_invoice_details: false,
            form_data: {
                branch_id: '',
                start_date: '',
                end_date: ''
            },
            branches: [],
            response: null,
            invoiceDetails: null
        }
    },
    components: { ItemInvoiceModal },
    validations() {
        return {
            form_data: {
                branch_id: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('master.branch')), required) },
            }
        };
    },
    computed: {
        ...mapGetters(["invoiceReprintFormData", "invoiceReprintData", "invoiceReprintDetails"]),
        branchesNames() {
            return this.branches.map(branch => branch.name_en).toString();
        },
    },
    methods: {
        ...mapActions(["getInvoiceReprintFormData", "getInvoiceReprintData", "getInvoiceReprintDetails"]),
        getReports() {
            this.v$.$validate()
            if (!this.v$.$error) {
                this.getInvoiceReprintData({
                    branch_id: this.form_data.branch_id,
                    start_date: this.$root.formatDateAPI(this.form_data.start_date),
                    end_date: this.$root.formatDateAPI(this.form_data.end_date)
                })
            }
        },
        checkPermissions() {
            let page_permissions = this.$root.getScreenPermissions("Freeze Report")
            this.has_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "freeze_report")
        },
        showPopup(data) {
            this.getInvoiceReprintDetails(data.id)
        },

        closePopup() {
            this.show_invoice_details = false;
        },
        printReport() {
            const options = {
                name: "Platinum Gym - Item Invoice Re{{ $t('button.print_report') }}",
                specs: [],
                styles: [],
            };
            this.$htmlToPaper("reportData", options);
        },
    },
    watch: {
        invoiceReprintFormData(data) {
            if (data != null) this.branches = data
        },
        invoiceReprintData(data) {
            if (data != null) this.response = data
        },
        invoiceReprintDetails(data) {
            if (data != null) {
                this.invoiceDetails = data
                this.show_invoice_details = true;
                console.log(data)
            }
        },
    },
    mounted() {
        this.checkPermissions()
        this.getInvoiceReprintFormData()
    },
}
</script>