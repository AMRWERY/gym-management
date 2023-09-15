<template>
    <div>
        <p class="text-3xl">{{$t('reports.daily_monthly_report')}}</p>
        <hr />

        <div class="mt-5 grid grid-cols-8 gap-3 bg-white px-3 py-5">
            <div class="col-span-2 mb-1.5">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="branch_id">
                    {{ $t('master.branch_hint') }} *
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
                <label for="start_date" class="font-bold">{{ $t('home.start_date') }}</label>
                <input type="date" :min="todaysDate" v-model="form_data.start_date" format="dd/MM/yyyy"
                    :placeholder="$t('transactions.start_date')"
                    class="shadow appearance-none border rounded w-full mt-1 p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                <span class="text-sm text-red-400" v-if="v$.form_data.start_date.$error"> {{
                    v$.form_data.start_date.$errors[0].$message
                }}</span>

            </div>

            <div class="col-span-2 mb-1.5">
                <label for="end_date" class="font-bold">{{ $t('home.end_date') }}</label>
                <input type="date" :min="form_data.start_date" v-model="form_data.end_date" format="dd/MM/yyyy"
                    :placeholder="$t('transactions.end_date')"
                    class="shadow p-2 appearance-none border mt-1 rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                <span class="text-sm text-red-400" v-if="v$.form_data.end_date.$error"> {{
                    v$.form_data.end_date.$errors[0].$message
                }}</span>
            </div>

            <div class="col-span-2 mt-3">
                <button type="button" @click="getReports"
                    class="w-full mt-4 inline-flex justify-center border-2 border-color-primary shadow-sm px-5 py-2 font-semibold text-base btn-outline-primary focus:outline-none sm:text-sm">
                    Search
                </button>
            </div>

        </div>

        <div v-if="response" class="mt-4 bg-white">

            <div class="grid grid-cols-3 justify-content-between">
                <div class="col-span-2 font-bold px-2 pt-5">
                    <h4>Daily Monthly Report From {{ report?.start_date }}
                        to {{ response?.end_date }} for Branch: {{ branchesNames }}</h4>
                </div>

                <div v-if="response?.subscriptions?.length" class="bg-white text-right py-2 px-3">
                    <button type="button" @click="printReport" class="w-full shadow-sm px-4 py-2 font-semibold text-base btn-primary 
                                focus:outline-none sm:w-auto sm:text-sm">
                        {{ $t('button.print_report') }}
                    </button>
                </div>
            </div>


            <div class="mt-1" id="reportData">

                <h4 class="bg-gray-300 col-span-2 p-1 pt-2 font-bold text-center">DAILY MONTHLY REPORT</h4>

                <div v-for="(row, index) in response?.subscriptions" :key="index" class="bg-white">

                    <div class="grid grid-cols-4 gap-x-4 py-2 bg-gray-200">
                        <div>
                            <p class="font-bold ps-2"><span class="font-normal">Code:</span> {{ row.code }}</p>
                        </div>
                        <div class="col-span-2">
                            <p class="font-bold text-center">{{ row.membership_package.name_en }} /
                                {{ row.membership_package.name_ar }}</p>
                        </div>
                        <div>
                            <p class="font-bold text-right pe-2"><span class="font-normal">Invoice #:</span>
                                {{ row.invoice_no }}</p>
                        </div>
                    </div>

                    <div class="grid grid-cols-4 gap-x-4 p-2">
                        <div>
                            <p class="font-medium"><span class="font-normal text-sm">Member: </span>{{ row.member_name_en }}</p>
                            <p class="font-medium"><span class="font-normal text-sm">Civil Id: </span> {{ row.civil_id }}</p>
                            <p class="font-medium"><span class="font-normal text-sm">Mobile: </span> {{ row.mobile }}</p>
                            <p class="font-medium"><span class="font-normal text-sm">Start Date: </span>{{ row.start_date }}</p>
                            <p class="font-medium"><span class="font-normal text-sm">End Date: </span>{{ row.end_date }}</p>
                        </div>
                        <div>
                            <p class="font-medium"><span class="font-normal text-sm">Member Code: </span>{{ row.member_code }}</p>
                            <p class="font-medium"><span class="font-normal text-sm">M'ship Type: </span>{{ row.membership_type.name_en }}</p>
                            <p class="font-medium"><span class="font-normal text-sm">Amount: </span>{{ row.membership_package?.amount?.toFixed(3) }}</p>
                            <p class="font-medium"><span class="font-normal text-sm">Start Date: </span>{{ row.membership_package.start_date }}</p>
                            <p class="font-medium"><span class="font-normal text-sm">End Date: </span>{{ row.membership_package.end_date }}</p>
                        </div>
                        <div class="text-right">
                            <p class="font-medium"><span class="font-normal text-sm">Membership Amount: </span>{{ row.membership_package_amount?.toFixed(3) }}</p>
                            <p class="font-medium"><span class="font-normal text-sm">Locker Total: </span>{{ row.locker_total_amount?.toFixed(3) }}</p>
                            <p class="font-medium"><span class="font-normal text-sm">Locker Insurance Total: </span>{{ row.locker_insurance_total_amount?.toFixed(3) }}</p>
                            <p class="font-medium"><span class="font-normal text-sm">Service Total: </span>{{ row.service_total_amount?.toFixed(3) }}</p>
                            <p class="font-medium"><span class="font-normal text-sm">Lesson Total: </span>{{ row.lesson_total_amount?.toFixed(3) }}</p>
                        </div>
                        <div class="text-right">
                            <p class="font-medium"><span class="font-normal text-sm">Sub Total: </span>{{ row.sub_total_amount?.toFixed(3) }}</p>
                            <p class="font-medium"><span class="font-normal text-sm">Discount Total: </span>{{ row.discount_total_amount?.toFixed(3) }}</p>
                            <p class="font-medium"><span class="font-normal text-sm">Total: </span>{{ row.total_amount?.toFixed(3) }}</p>
                            <p class="font-medium"><span class="font-normal text-sm">Total Paid: </span>{{ row.total_amount_paid?.toFixed(3) }}</p>
                            <p class="font-medium"><span class="font-normal text-sm">Total Remaining: </span>{{ row.total_amount_remaining?.toFixed(3) }}</p>

                        </div>
                    </div>


                    <div class="px-2 mb-4" v-if="row.subscription_lesson.length">
                        <h4 class="bg-gray-100 p-1 ps-2 font-bold text-left">Lessons</h4>
                        <table class="min-w-full border">
                            <thead class="border-b">
                                <tr>
                                    <th scope="col" class="text-sm font-bold text-gray-900 text-left ps-2">Name</th>
                                    <th scope="col" class="text-sm font-bold text-gray-900 text-left">Package</th>
                                    <th scope="col" class="text-sm font-bold text-gray-900 text-center">Trainer</th>
                                    <th scope="col" class="text-sm font-bold text-gray-900 text-center">Start Date</th>
                                    <th scope="col" class="text-sm font-bold text-gray-900 text-center">End Date</th>
                                    <th scope="col" class="text-sm font-bold text-gray-900 text-center">Classes</th>
                                    <th scope="col" class="text-sm pe-2 font-bold text-gray-900 text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(lesson, index) in row?.subscription_lesson" :key="index">
                                    <td class="whitespace-nowrap ps-2 pt-1 text-sm font-medium text-gray-900">
                                        {{ lesson.lesson_package.name_en }}</td>
                                    <td class="whitespace-nowrap text-sm font-medium text-gray-900">
                                        {{ lesson.lesson_type.name_ar }}</td>
                                    <td class="whitespace-nowrap text-sm font-medium text-gray-900">
                                        {{ lesson.trainer.name }}</td>
                                    <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                                        {{ lesson.start_date }}</td>
                                    <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                                        {{ lesson.end_date }}</td>
                                    <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                                        {{ lesson.classes }}</td>
                                    <td class="whitespace-nowrap pe-2 text-sm font-medium text-gray-900 text-right">
                                        {{ lesson.amount?.toFixed(3) }}</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr class="border-t bg-gray-100">
                                    <td colspan="6" class="whitespace-nowrap text-sm font-bold text-gray-900 text-right">Locker Total Amount</td>
                                    <td class="whitespace-nowrap text-sm font-bold text-gray-900 text-right pe-2">{{ row?.lesson_total_amount?.toFixed(3) }}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    <div class="px-2 mb-4" v-if="row.subscription_locker.length">
                        <h4 class="bg-gray-100 p-1 ps-2 font-bold text-left">Lockers</h4>
                        <table class="min-w-full border">
                            <thead class="border-b">
                                <tr>
                                    <th scope="col" class="text-sm font-bold text-gray-900 text-left ps-2">Name</th>
                                    <th scope="col" class="text-sm font-bold text-gray-900 text-left">Package</th>
                                    <th scope="col" class="text-sm font-bold text-gray-900 text-left">Type</th>
                                    <th scope="col" class="text-sm font-bold text-gray-900 text-center">Start Date</th>
                                    <th scope="col" class="text-sm font-bold text-gray-900 text-center">End Date</th>
                                    <th scope="col" class="text-sm pe-2 font-bold text-gray-900 text-right">Insurance</th>
                                    <th scope="col" class="text-sm pe-2 font-bold text-gray-900 text-right">Insurance Paid</th>
                                    <th scope="col" class="text-sm pe-2 font-bold text-gray-900 text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(loc, index) in row?.subscription_locker" :key="index">
                                    <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-left ps-2">
                                        {{ loc.locker.name_en }}</td>
                                    <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-left">
                                        {{ loc.locker_package.name_en }}</td>
                                    <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-left">
                                        {{ loc.locker_type.name_en }}</td>
                                    <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                                        {{ loc.start_date }}</td>
                                    <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                                        {{ loc.end_date }}</td>
                                    <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                                        {{ loc.insurance_amount?.toFixed(3) }}</td>
                                    <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                                        {{ loc.insurance_paid_amount?.toFixed(3) }}</td>
                                    <td class="whitespace-nowrap pe-2 text-sm font-medium text-gray-900 text-right">
                                        {{ loc.amount?.toFixed(3) }}</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr class="border-t bg-gray-100">
                                    <td colspan="7" class="whitespace-nowrap text-sm font-bold text-gray-900 text-right">Lesson Total Amount</td>
                                    <td class="whitespace-nowrap text-sm font-bold text-gray-900 text-right pe-2">{{ row?.locker_total_amount?.toFixed(3) }}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    <div class="px-2 mb-4" v-if="row.subscription_service.length">
                        <h4 class="bg-gray-100 p-1 ps-2 font-bold text-left">Services</h4>
                        <table class="min-w-full border">
                            <thead class="border-b">
                                <tr>
                                    <th scope="col" class="text-sm font-bold text-gray-900 text-left ps-2 py-1 ">Name</th>
                                    <th scope="col" class="text-sm font-bold text-gray-900 text-left">Type</th>
                                    <th scope="col" class="text-sm font-bold text-gray-900 text-center">Start Date</th>
                                    <th scope="col" class="text-sm font-bold text-gray-900 text-center">End Date</th>
                                    <th scope="col" class="text-sm font-bold text-gray-900 text-center">Duration</th>
                                    <th scope="col" class="text-sm pe-2 font-bold text-gray-900 text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(service, index) in row?.subscription_service" :key="index">
                                    <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-left ps-2">
                                        {{ service.service_package.name_en }}</td>
                                    <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-left">
                                        {{ service.service_type.name_ar }}</td>
                                    <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                                        {{ service.start_date }}</td>
                                    <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                                        {{ service.end_date }}</td>
                                    <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                                        {{ service.service_package.duration }}</td>
                                    <td class="whitespace-nowrap pe-2 text-sm font-medium text-gray-900 text-right">
                                        {{ service.amount?.toFixed(3) }}</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr class="border-t bg-gray-100">
                                    <td colspan="5" class="whitespace-nowrap text-sm font-bold text-gray-900 text-right">Lesson
                                        Total Amount</td>
                                    <td class="whitespace-nowrap text-sm font-bold text-gray-900 text-right pe-2">
                                        {{ row?.service_total_amount?.toFixed(3) }}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    <div class="px-2 mb-4" v-if="row.subscription_payment.length">
                        <h4 class="bg-gray-100 p-1 ps-2 font-bold text-left">Payment</h4>
                        <table class="min-w-full border">
                            <thead class="border-b">
                                <tr>
                                    <th scope="col" class="text-sm font-bold text-gray-900 ps-2">Name (En)</th>
                                    <th scope="col" class="text-sm font-bold text-gray-900">Name (Ar)</th>
                                    <th scope="col" class="text-sm font-bold text-gray-900 ">Remark</th>
                                    <th scope="col" class="text-sm font-bold text-gray-900">Date</th>
                                    <th scope="col" class="text-sm pe-2 font-bold text-gray-900 text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(row, index) in row?.subscription_payment" :key="index">
                                    <td class="whitespace-nowrap ps-2 pt-1 text-sm font-medium text-gray-900">
                                        {{ row.payment.name_en }}</td>
                                    <td class="whitespace-nowrap text-sm font-medium text-gray-900">
                                        {{ row.payment.name_ar }}</td>
                                    <td class="whitespace-nowrap text-sm font-medium text-gray-900">
                                        {{ row.remark ?? '-' }}</td>
                                    <td class="whitespace-nowrap text-sm font-medium text-gray-900">
                                        {{ this.$root.formatDateAPI(row.created_at) }}</td>
                                    <td class="whitespace-nowrap pe-2 text-sm font-medium text-gray-900 text-right">
                                        {{ row.amount?.toFixed(3) }}</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr class="border-t bg-gray-100">
                                    <td colspan="4" class="whitespace-nowrap text-sm font-bold text-gray-900 text-right">Total Paid Amount</td>
                                    <td class="whitespace-nowrap text-sm font-bold text-gray-900 text-right pe-2">{{ row?.total_amount_paid?.toFixed(3) }}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    <div class="px-2 mb-4" v-if="row.subscription_freezes.length">
                        <h4 class="bg-gray-100 p-1 ps-2 font-bold text-left">Freezes</h4>
                        <table class="min-w-full border">
                            <thead class="border-b">
                                <tr>
                                    <th scope="col" class="text-sm font-bold text-gray-900 ps-2">Invoice #</th>
                                    <th scope="col" class="text-sm font-bold text-gray-900">Start Date</th>
                                    <th scope="col" class="text-sm font-bold text-gray-900 ">End Date</th>
                                    <th scope="col" class="text-sm font-bold text-gray-900 text-center">Freeze Days</th>
                                    <th scope="col" class="text-sm pe-2 font-bold text-gray-900">Remark</th>
                                    <th scope="col" class="text-sm pe-2 font-bold text-gray-900 text-right">Subscription End Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(row, index) in row?.subscription_freezes" :key="index">
                                    <td class="whitespace-nowrap ps-2 pt-1 text-sm font-medium text-gray-900">
                                        {{ row.invoice_no }}</td>
                                    <td class="whitespace-nowrap text-sm font-medium text-gray-900">
                                        {{ row.start_date }}</td>
                                    <td class="whitespace-nowrap text-sm font-medium text-gray-900">
                                        {{ row.end_date }}</td>
                                    <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                                        {{ row.freeze_days }}</td>
                                    <td class="whitespace-nowrap pe-2 text-sm font-medium text-gray-900">
                                        {{ row.remark ?? '-' }}</td>
                                        <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                                        {{ row.new_subscription_end_date }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>



                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import useValidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";

export default {
    data() {
        return {
            v$: useValidate(),
            has_permission: false,
            form_data: {
                branch_id: '',
                start_date: '',
                end_date: ''
            },
            branches: [],
            response: null
        }
    },
    validations() {
        return {
            form_data: {
                branch_id: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('master.branch')), required) },
                start_date: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('home.start_date')), required) },
                end_date: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('home.end_date')), required) },
            }
        };
    },
    computed: {
        ...mapGetters(["dailyMonthlyFormData", "dailyMonthlyData"]),
        branchesNames() {
            return this.branches.map(branch => branch.name_en).toString();
        },
    },
    methods: {
        ...mapActions(["getDailyMonthlyFormData", "getDailyMonthlyData"]),
        getReports() {
            this.v$.$validate()
            if (!this.v$.$error) {
                this.getDailyMonthlyData({
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
        printReport() {
            const options = {
                name: "Platinum Gym - Daily Monthly Report",
                specs: [],
                styles: [],
            };
            this.$htmlToPaper("reportData", options);
        },
    },
    watch: {
        dailyMonthlyFormData(data) {
            if (data != null) this.branches = data
        },
        dailyMonthlyData(data) {
            console.log(data)
            if (data != null) this.response = data
        }
    },
    mounted() {
        this.checkPermissions()
        this.getDailyMonthlyFormData()
    },
}
</script>