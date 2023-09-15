<template>
    <div>
        <p class="text-3xl">{{$t('reports.module_wise_report')}}</p>
        <hr />

        <div class="mt-5 grid grid-cols-9 gap-3 bg-white px-3 py-5">

            <div class="col-span-2 mb-1.5">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="branch_ids">
                        {{ $t('transactions.select_branches') }} *
                    </label>
                    <Multiselect
                        mode="tags"
                        :searchable="true"
                        :createTag="true"
                        v-model="form_data.branch_ids"
                        :multiple="true"
                        label="name_en"
                        valueProp='id'
                        placeholder="Select Branches"
                        class="shadow border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        :options="branches"/>
                    <span class="text-sm text-red-400" v-if="v$.form_data.branch_ids.$error"> {{ v$.form_data.branch_ids.$errors[0].$message }}</span>
            </div>

            <div class="col-span-2 mb-1.5">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="report_type">
                    {{ $t('transactions.select_type') }} *
                </label>
                <select name="report_type" id="report_type" v-model="form_data.report_type" aria-placeholder="Select branch"
                    class="h-10 shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    <option v-for="(reportType, index) in reportTypes" :key="index" :value="reportType.id">{{ reportType.name_en }}
                    </option>
                </select>
                <span class="text-sm text-red-400" v-if="v$.form_data.report_type.$error"> {{ v$.form_data.report_type.$errors[0].$message }}</span>
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

            <div class="col-span-1 mt-3">
                <button type="button" @click="getReports"
                    class="w-full mt-4 inline-flex justify-center border-2 border-color-primary shadow-sm px-5 py-2 font-semibold text-base btn-outline-primary focus:outline-none sm:text-sm">
                    {{ $t('button.search') }}
                </button>
            </div>

        </div>

        <div v-if="response" class="mt-4 bg-white">

            <div class="grid grid-cols-3 justify-content-between">
                <div class="col-span-2 font-bold px-2 pt-5">

                    <h4 v-if="reports?.start_date && reports?.end_date">Module Wise Transaction Report From {{ reports?.start_date }} to {{ reports?.end_date }} for Branch: {{ branchesNames }}</h4>
                    <h4 v-else-if="reports?.start_date">Module Wise Transaction Report From {{ reports?.start_date }} for Branch:  {{ branchesNames }}</h4>
                    <h4 v-else-if="reports?.end_date">Module Wise Transaction Report till {{ reports?.end_date }} for Branch: {{ branchesNames }}</h4>
                    <h4 v-else class="font-bold px-2 pt-2">Module Wise Transaction Report for Branch: {{ branchesNames }}</h4>
                </div>

                <div v-if="response?.subscriptions?.length" class="bg-white text-right py-2 px-3">
                    <button type="button" @click="printReport" class="w-full shadow-sm px-4 py-2 font-semibold text-base btn-primary 
                                focus:outline-none sm:w-auto sm:text-sm">
                        {{ $t('button.print_report') }}
                    </button>
                </div>
            </div>

            <div class="mt-1 bg-white" id="reportData" v-if="response?.subscriptions?.length">
                <h4 class="bg-gray-300 p-1 pt-2 font-bold text-center" >MODULE WISE TRANSACTION REPORT</h4>

                <div v-if="form_data.report_type == 'summary'" >
                    <div class="border mb-4" v-for="(row, index) in response?.subscriptions" :key="index">

                        <h4 class="bg-gray-200 p-2 font-bold text-left">{{ row.name }}</h4>

                        <div class="bg-gray-100 grid grid-cols-8 py-2 border-b-2">
                            <p class="text-sm font-medium text-gray-900 ps-1 mt-auto">Date</p>

                            <div class="text-sm text-gray-900 text-center mt-auto">
                                <p class="text-sm font-medium">Gross Amount</p>
                                <div class="grid grid-cols-2 justify-content-between mt-2">
                                    <p class="font-medium">Qty</p>
                                    <p class="font-medium">Amt</p>
                                </div>
                            </div>

                            <div class="text-sm text-gray-900 text-center mt-auto">
                                <p class="text-sm font-medium">Total Amount</p>
                                <div class="grid grid-cols-2 justify-content-between mt-2">
                                    <p class="font-medium">Qty</p>
                                    <p class="font-medium">Amt</p>
                                </div>
                            </div>

                            <div class="text-sm text-gray-900 text-center  mt-auto">
                                <p class="text-sm font-medium">Total</p>
                                <div class="grid grid-cols-2 justify-content-between mt-2">
                                    <p class="font-medium">Qty</p>
                                    <p class="font-medium">Amt</p>
                                </div>
                            </div>
                        </div>

                        <div class="grid grid-cols-8 border-b" v-for="(dateData, index) in row.date_datas" :key="index">
                            <p class="text-sm text-gray-900 ps-1 border-r-2 py-2">{{ dateData.date }}</p>

                            <div class="text-sm font-bold text-gray-900 text-center border-r py-2">
                                <div class="grid grid-cols-2 justify-content-between">
                                    <p class="font-normal">{{ dateData?.summary?.gross_amount?.quantity ?? '0' }}</p>
                                    <p class="font-normal">{{ dateData?.summary?.gross_amount?.amount?.toFixed(2) ?? '0.00' }}</p>
                                </div>
                            </div>

                            <div class="text-sm font-bold text-gray-900 text-center border-r py-2">
                                <div class="grid grid-cols-2 justify-content-between">
                                    <p class="font-normal">{{ dateData?.summary?.total_discount?.quantity ?? '0' }}</p>
                                    <p class="font-normal">{{ dateData?.summary?.total_discount?.amount?.toFixed(2) ?? '0.00' }}</p>
                                </div>
                            </div>

                            <div class="text-sm font-bold text-gray-900 text-center border-r py-2">
                                <div class="grid grid-cols-2 justify-content-between">
                                    <p class="font-normal">{{ dateData.total?.quantity ?? '0' }}</p>
                                    <p class="font-normal">{{ dateData.total?.amount?.toFixed(2) ?? '0.000' }}</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div v-else class="border mb-4" v-for="(row, index) in response?.subscriptions" :key="index">

                    <h4 v-show="row.uniquePackages.length" class="bg-gray-200 p-2 font-bold text-left">{{ row.name }}</h4>

                    <div v-show="row.uniquePackages.length" class="bg-gray-100 grid grid-cols-8 py-2 border-b-2">
                        <p class="text-sm font-medium text-gray-900 ps-1 mt-auto">Date</p>

                        <div class="text-sm text-gray-900 text-center mt-auto" v-for="(pkg, index) in row?.uniquePackages" :key="index">
                            <p class="text-sm font-medium">{{ pkg.pacakage_name_en }}</p>
                            <div class="grid grid-cols-2 justify-content-between mt-2">
                                <p class="font-medium">Qty</p>
                                <p class="font-medium">Amt</p>
                            </div>
                        </div>

                        <div class="text-sm text-gray-900 text-center  mt-auto">
                            <p class="text-sm font-medium">Total</p>
                            <div class="grid grid-cols-2 justify-content-between mt-2">
                                <p class="font-medium">Qty</p>
                                <p class="font-medium">Amt</p>
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-8 border-b" v-for="(dateData, index) in row?.date_datas" :key="index">
                        <p v-show="currentPackages(dateData).length" class="text-sm text-gray-900 ps-1 border-r-2 py-2">{{ dateData.date }}</p>

                        <div v-show="currentPackages(dateData).length" class="text-sm font-bold text-gray-900 text-center border-r py-2" v-for="(pkg, index) in row.uniquePackages" :key="index">
                            <div class="grid grid-cols-2 justify-content-between">
                                <p class="font-normal">{{ getTodayPackageById(dateData, pkg.package_id)?.quantity ?? '0' }}</p>
                                <p class="font-normal">{{ getTodayPackageById(dateData, pkg.package_id)?.amount?.toFixed(2) ?? '0.00' }}</p>
                            </div>
                        </div>

                        <div v-show="currentPackages(dateData).length" class="text-sm font-bold text-gray-900 text-center border-r py-2">
                            <div class="grid grid-cols-2 justify-content-between">
                                <p class="font-normal">{{ dateData.total?.quantity ?? '0' }}</p>
                                <p class="font-normal">{{ dateData.total?.amount?.toFixed(2) ?? '0.000' }}</p>
                            </div>
                        </div>
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
import ItemInvoiceModal from './ItemInvoiceModal.vue';


export default {
    data() {
        return {
            v$: useValidate(),
            has_permission: false,
            show_invoice_details: false,
            form_data: {
                branch_ids: [],
                start_date: '',
                end_date: '',
                report_type: '',
            },
            branches: [],
            response: null,
        }
    },
    components: { ItemInvoiceModal },
    validations() {
        return {
            form_data: {
                branch_ids: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('master.branch')), required) },
                report_type: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('users.report_type')), required) },
            }
        };
    },
    computed: {
        ...mapGetters(["moduleWiseFormData", "moduleWiseData"]),
        branchesNames() {
            return this.branches.map(branch => branch.name_en).toString();
        },
        reportTypes() {
            return [
                {
                    id: 'summary',
                    name_en: '--Summary--',
                },
                {
                    id: 'membership_type',
                    name_en: 'Membership Type'
                },
                {
                    id: 'service_type',
                    name_en: 'Service Type'
                },
                {
                    id: 'locker_type',
                    name_en: 'Locker Type'
                },
                {
                    id: 'lesson_type',
                    name_en: 'Lesson Type'
                }
            ]
        },
        
    },
    methods: {
        ...mapActions(["getModuleWiseFormData", "getModuleWiseData"]),
        getReports() {
            this.v$.$validate()
            if (!this.v$.$error) {
                this.getModuleWiseData({
                    branch_ids: this.form_data.branch_ids,
                    type: this.form_data.report_type,
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
                name: "Platinum Gym - Item Invoice Re{{ $t('button.print_report') }}",
                specs: [],
                styles: [],
            };
            this.$htmlToPaper("reportData", options);
        },
        currentPackages(dateData) {
            if (this.form_data.report_type == 'membership_type') return dateData.packages
            if (this.form_data.report_type == 'service_type') return dateData.services
            if (this.form_data.report_type == 'locker_type') return dateData.lockers
            if (this.form_data.report_type == 'lesson_type') return dateData.lessons
        },
        setPackages() {
            this.response.subscriptions.forEach(sub => {
                sub.uniquePackages = []
                sub.date_datas.forEach(dateData => {
                    this.currentPackages(dateData)?.forEach(pkg => {
                        const itemExists = sub.uniquePackages.find(el => el.package_id === pkg.package_id)
                        if (!sub.uniquePackages.includes(itemExists)) {
                            sub.uniquePackages.push(pkg)
                        }
                    })
                })
            });
            console.log(this.response.subscriptions)
        },
        getTodayPackageById(dateData, id) {
            if (this.form_data.report_type == 'membership_type') return dateData?.packages?.find(el => el.package_id === id)
            if (this.form_data.report_type == 'service_type') return dateData?.services?.find(el => el.package_id === id)
            if (this.form_data.report_type == 'locker_type') return dateData?.lockers?.find(el => el.package_id === id)
            if (this.form_data.report_type == 'lesson_type') return dateData?.lessons?.find(el => el.package_id === id)
        }
    },
    watch: {
        moduleWiseFormData(data) {
            if (data != null) this.branches = data
        },
        moduleWiseData(data) {
            if (data != null) {
                this.response = data
                this.setPackages()
            }
        },
    },
    mounted() {
        this.checkPermissions()
        this.getModuleWiseFormData()
    },
}
</script>