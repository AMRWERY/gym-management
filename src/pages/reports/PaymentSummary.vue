<template>
    <div>
        <p class="text-3xl">{{$t('reports.payment_detail_report_caps')}}</p>
        <hr class="mb-5" />

        <div class="mt-8 grid grid-cols-4 gap-3 bg-white px-3 py-5">
            <div>
                <label class="block text-gray-700 text-sm font-bold mb-2" for="branch_ids">
                    {{ $t('reports.select_branches') }} *
                </label>
                <Multiselect mode="tags" :searchable="true" :createTag="true" v-model="form_data.branch_ids"
                    :multiple="true" label="name_en" valueProp='id' :placeholder="$t('reports.select_branches')"
                    class="shadow border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    :options="branches" />
                <span class="text-sm text-red-400" v-if="v$.form_data.branch_ids.$error"> {{
                    v$.form_data.branch_ids.$errors[0].$message }}</span>
            </div>
            <div>
                <label class="block text-gray-700 text-sm font-bold mb-2" for="payment_ids">
                    {{ $t('reports.payment_types') }}
                </label>
                <Multiselect mode="tags" :searchable="true" :createTag="true" v-model="form_data.payment_ids"
                    :multiple="true" label="name_en" valueProp='id' :placeholder="$t('reports.payment_types_hint')"
                    class="shadow border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    :options="payment_types" />
            </div>
            <div>
                <label for="start_date" class="font-bold">{{ $t('reports.start_date') }}</label>
                <input type="date" :min="todaysDate" v-model="form_data.start_date" format="dd/MM/yyyy"
                    :placeholder="$t('reports.start_date')"
                    class="shadow appearance-none border rounded w-full mt-1 p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>

            <div>
                <label for="end_date" class="font-bold">{{ $t('reports.end_date') }}</label>
                <input type="date" :min="form_data.start_date" v-model="form_data.end_date" format="dd/MM/yyyy"
                    :placeholder="$t('reports.end_date')"
                    class="shadow p-2 appearance-none border mt-1 rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>

            <div class="col-span-4 mt-3 gap-4 text-center">
                <button type="button" @click="getReports('details')"
                    class="border-2 border-color-primary shadow-sm px-5 py-2 font-semibold text-base btn-outline-primary mx-2">
                    {{ $t('button.detail_report') }}
                </button>

                <button type="button" @click="getReports('summary')"
                    class="border-2 border-color-primary shadow-sm px-5 py-2 font-semibold text-base btn-outline-primary mx-2">
                    {{ $t('button.summary_report') }}
                </button>
            </div>
        </div>

        <div v-if="reports?.payments?.length" class="my-4" id="bookingInfo">
            <div class="grid grid-cols-3 gap-x-6 p-4 bg-white">

                <div class="col-span-2">
                    <p class="font-medium text-3xl pt-2 color-primary">{{ $t('reports.payment_detail_report_caps') }}</p>

                    <div class="text-base font-medium text-gray-800">
                        <span v-if="form_data.start_date">From {{ form_data?.start_date }} </span>
                        <span v-if="form_data.end_date">Upto {{ form_data?.end_date }} </span>
                        <span>&nbsp;{{ $t('reports.for_branch') }}: {{ branchesNames }} </span>
                    </div>
                </div>

                <div class="print:hidden text-right">
                    <button type="button" @click="printBookingDetails"
                        class="h-10 px-4 font-semibold text-base btn-primary mx-2">
                        {{ $t('button.print_report') }}
                    </button>

                </div>
            </div>

            <div class="grid grid-cols-1 bg-white px-4 pb-4" v-for="(payment, index) in reports?.payments" :key="index">

                <div class="grid grid-cols-2 gap-4 border pt-2 px-2">

                    <p class="text-sm font-bold text-gray-900">{{ payment.branch_name_en }} / {{
                        payment.branch_name_ar }}</p>
                    <p class="text-sm font-bold text-gray-900 text-right">{{ payment.total_amount.toFixed(3) }}</p>

                </div>

                <table class="min-w-full border pb-4" v-if="payment.invoices?.length">
                    <thead class="border-b bg-gray-100">
                        <tr>
                            <th v-if="report_type == 'details'" scope="col" class="text-sm font-bold text-gray-900 py-1 text-left px-4">{{ $t('reports.invoice') }} #</th>
                            <th v-if="report_type == 'details'" scope="col" class="text-sm font-bold text-gray-900 py-1 text-left">{{ $t('reports.trans_date') }}</th>
                            <th v-if="report_type == 'details'" scope="col" class="text-sm font-bold text-gray-900 py-1 text-left">{{ $t('reports.description') }}</th>
                            <th scope="col" class="text-sm font-bold text-gray-900 py-1 text-left px-4">{{ $t('reports.payment_type') }}</th>
                            <th scope="col" class="text-sm text-right font-bold text-gray-900 py-1 text-left px-4">{{ $t('reports.amount') }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(invoice, index) in payment.invoices" :key="index">
                            <td v-if="report_type == 'details'" class="text-sm font-medium text-gray-900 py-1 px-4">{{ invoice.invoice_no }}</td>
                            <td v-if="report_type == 'details'" class="text-sm font-medium text-gray-900 py-1">{{ invoice.date }}</td>
                            <td v-if="report_type == 'details'" class="text-sm font-medium text-gray-900 py-1">{{ invoice.remark ?? '-' }}</td>
                            <td class="text-sm font-medium text-gray-900 py-1 px-4">{{ invoice.payment_type_en }}</td>
                            <td class="text-sm font-medium text-gray-900 text-right py-1 px-4">{{ parseFloat(invoice.amount)?.toFixed(3) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import useValidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import exportExcel from "vue-3-export-excel/ExportExcel.vue";

export default {
    data() {
        return {
            v$: useValidate(),
            has_permission: false,
            form_data: {
                branch_ids: [],
                payment_ids: [],
                start_date: '',
                end_date: ''
            },

            report_type: 'details',

            excelFields: {
                'Invoice #': 'invoice_no',
                'Trans Date': 'payment_date',
                'Description': 'desc',
                'Payment Type': 'payment_type',
                'Amount': 'amount'
            },

            branches: [],
            reports: []
        }
    },
    components: { exportExcel },

    validations() {
        return {
            form_data: {
                branch_ids: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('master.branch')), required) },
            }
        };
    },
    computed: {
        ...mapGetters(["paymentSummary", "paymentSummaryForm"]),
        branchesNames() {
            const selectedBranches = this.branches?.filter(branch => this.form_data.branch_ids.indexOf(branch.id) !== -1);
            return selectedBranches?.map(branch => ' ' + branch.name_en).toString();
        },
        dataExcel() {
            const arrayObj = []
            this.reports?.payments.forEach(payment => {

                const obj = {
                    invoice_no: payment.invoice_no,
                    payment_date: payment.date,
                    desc: payment.remark ?? '-',
                    payment_type: payment.payment_type_en,
                    amount: payment.amount ?? '0',
                }

                arrayObj.push(obj)
            });
            return arrayObj;
        },
    },
    methods: {
        ...mapActions(["getPaymentSummary", "getPaymentSummaryForm"]),

        printBookingDetails() {
            const options = {
                name: "Platinum Gym",
                specs: [],
                styles: [],
            };
            this.$htmlToPaper("bookingInfo", options);
        },

        getReports(type) {
            this.v$.$validate()
            if (!this.v$.$error) {
                this.report_type = type
                this.getPaymentSummary({
                    branch_ids: this.form_data.branch_ids,
                    payment_ids: this.form_data.payment_ids,
                    start_date: this.$root.formatDateAPI(this.form_data.start_date),
                    end_date: this.$root.formatDateAPI(this.form_data.end_date),
                    report_type: this.report_type
                })
            }
        },
        checkPermissions() {
            let page_permissions = this.$root.getScreenPermissions("Payment Summary")
            this.has_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "payment_summary")
        }
    },
    watch: {
        paymentSummary(data) {
            if (data != null) {
                this.reports = data
            }
        },
        paymentSummaryForm(data) {
            if (data != null) {
                this.branches = data.branches
                this.payment_types = data.payment_types
            }
        }
    },
    mounted() {
        this.checkPermissions()
        this.getPaymentSummaryForm()
    },
}
</script>