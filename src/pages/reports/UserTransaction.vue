<template>
    <div>
        <p class="text-3xl">{{$t('reports.user_wise_transaction_report')}}</p>
        <hr />

        <div class="mt-5 grid grid-cols-4 gap-3 bg-white px-3 py-5">
            <div>
                <label class="block text-gray-700 text-sm font-bold mb-2" for="branch_ids">
                    {{ $t('transactions.select_branches') }} *
                </label>
                <Multiselect mode="tags" :searchable="true" :createTag="true" v-model="form_data.branch_ids"
                    :multiple="true" label="name_en" valueProp='id' placeholder="Select Branches"
                    class="shadow border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    :options="branches" />
                <span class="text-sm text-red-400" v-if="v$.form_data.branch_ids.$error"> {{
                    v$.form_data.branch_ids.$errors[0].$message
                }}</span>
            </div>
            <div>
                <label class="block text-gray-700 text-sm font-bold mb-2" for="type_ids">
                    {{ $t('transactions.select_types') }}
                </label>
                <Multiselect mode="tags" :searchable="true" :createTag="true" v-model="form_data.type_ids" :multiple="true"
                    label="name_en" valueProp='id' placeholder="Select Types"
                    class="shadow border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    :options="userTypes" />
            </div>
            <div>
                <label for="start_date" class="font-bold">{{ $t('transactions.start_date') }}</label>
                <input type="date" :min="todaysDate" v-model="form_data.start_date" format="dd/MM/yyyy"
                    :placeholder="$t('transactions.start_date')"
                    class="shadow appearance-none border rounded w-full mt-1 p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>

            <div>
                <label for="end_date" class="font-bold">{{ $t('transactions.end_date') }}</label>
                <input type="date" :min="form_data.start_date" v-model="form_data.end_date" format="dd/MM/yyyy"
                    :placeholder="$t('transactions.end_date')"
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

        <div v-if="reports.length" class="mt-4 bg-white">


            <div class="grid grid-cols-2 gap-x-6 p-4 mb-4">


                <div>
                    <p class="font-medium text-3xl pt-2 color-primary">USER WISE TRANSACTION REPORT</p>

                    <div class="text-base font-medium text-gray-800">
                        <span v-if="form_data.start_date">From {{ form_data?.start_date }} </span>
                        <span v-if="form_data.end_date">Upto {{ form_data?.end_date }} </span>
                        <span>&nbsp;{{ $t('reports.for_branch') }}: {{ branchesNames }} </span>
                    </div>
                </div>

                <div class="print:hidden text-right">

                    <button v-if="has_permission" type="button" @click="printBookingDetails"
                        class="h-10 px-4 font-semibold text-base btn-primary mx-2">
                        {{ $t('button.print_report') }}
                    </button>

                </div>

            </div>

            <div>
                <table class="min-w-full border ">
                    <thead class="border-b py-1 bg-gray-100">
                        <tr>
                            <th scope="col" class="text-sm ps-2 py-2 font-bold text-gray-900 text-left">User Name</th>
                            <th scope="col" class="text-sm ps-2 py-2 font-bold text-gray-900 text-left">Amount</th>
                            <th scope="col" class="text-sm ps-2 py-2 font-bold text-gray-900 text-left">Report</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(row, index) in reports" :key="index" class="border border-bottom">
                            <td class="whitespace-nowrap ps-2 text-sm font-medium text-gray-900">{{ row.name }}</td>
                            <td class="whitespace-nowrap ps-2 text-sm font-medium text-gray-900">{{ row.total_amount?.toFixed(3) }}</td>

                            <td class="whitespace-nowrap text-sm py-2 font-medium text-gray-900 text-left">
                                <button type="button" 
                                    @click="showPopup(row)"
                                    class="w-full justify-center border-1 border-color-primary 
                                        shadow-sm px-4 py-1 font-semibold text-base btn-primary 
                                        focus:outline-none sm:w-auto sm:text-sm">
                                    Show Detailed Report
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <UserTransactionReportModal v-if="show_transaction_report" :transaction_report="selected_transaction_report"
            @close-modal="show_transaction_report = false" />





    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import useValidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import UserTransactionReportModal from './UserTransactionReportModal.vue';
import JsonCSV from 'vue-json-csv'

export default {
    data() {
        return {
            v$: useValidate(),
            has_permission: false,
            show_transaction_report: false,
            selected_transaction_report: {},
            form_data: {
                branch_ids: [],
                type_ids: [],
                start_date: '',
                end_date: ''
            },
            branches: [],
            types: [],
            reports: [],
        }
    },
    components: { UserTransactionReportModal, downloadCsv: JsonCSV },
    validations() {
        return {
            form_data: {
                branch_ids: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('master.branch')), required) },
            }
        };
    },
    computed: {
        ...mapGetters(["userTransactionFormData", "userTransactionData"]),
        branchesNames() {
            const selectedBranches = this.branches?.filter(branch => this.form_data.branch_ids.indexOf(branch.id) !== -1);
            return selectedBranches?.map(branch => ' ' + branch.name_en).toString();
        },
        userTypes() {
            return [
                {
                    id: 'membership_type',
                    name_en: 'Membership Type',
                    name_ar: 'Membership Type'
                },
                {
                    id: 'locker_type',
                    name_en: 'Locker Type',
                    name_ar: 'Locker Type'
                },
                {
                    id: 'service_type',
                    name_en: 'Service Type',
                    name_ar: 'Service Type'
                },
                {
                    id: 'lesson_type',
                    name_en: 'Lesson Type',
                    name_ar: 'Lesson Type'
                }
            ]
        },
    },
    methods: {
        ...mapActions(["getUserTransactionFormData", "getUserTransactionData"]),

        showPopup(data) {
            this.selected_transaction_report = data;
            this.show_transaction_report = true;
        },

        closePopup() {
            this.show_transaction_report = false;
        },
        getReports(type = 'details') {
            this.v$.$validate()
            if (!this.v$.$error) {
                this.getUserTransactionData({
                    branch_ids: this.form_data.branch_ids,
                    types: this.form_data.type_ids,
                    start_date: this.$root.formatDateAPI(this.form_data.start_date),
                    end_date: this.$root.formatDateAPI(this.form_data.end_date),
                    report_type: type
                })
            }
        },
        checkPermissions() {
            let page_permissions = this.$root.getScreenPermissions("Freeze Report")
            this.has_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "freeze_report")
        }
    },
    watch: {
        userTransactionData(data) {
            console.log(data)
            if (data != null) {
                this.reports = data
            }
        },
        userTransactionFormData(data) {
            console.log(data)
            if (data != null) {
                this.branches = data
            }
        }
    },
    mounted() {
        this.checkPermissions()
        this.getUserTransactionFormData()
    },
}
</script>