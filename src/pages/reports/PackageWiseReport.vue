<template>
    <div>
        <p class="text-3xl">{{$t('reports.package_wise_report')}}</p>
        <hr />

        <div class="mt-5 grid grid-cols-8 gap-3 bg-white px-3 py-5">

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
                <label class="block text-gray-700 text-sm font-bold mb-2" for="type_id">
                   {{ $t('reports.select_package_types') }} *
                </label>
                <select name="type_id" id="type_id" v-model="form_data.type_id" aria-placeholder="Select branch"
                    class="h-10 shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    <option v-for="(packageType, index) in packageTypes" :key="index" :value="packageType.id">{{ packageType.name_en }}
                    </option>
                </select>
            </div>

            <div class="col-span-2 mb-1.5">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="package_id">
                    {{ $t('reports.select_packages') }} *
                </label>
                <select name="package_id" id="package_id" v-model="form_data.package_id" aria-placeholder="Select branch"
                    class="h-10 shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    <option v-for="(pkg, index) in packages" :key="index" :value="pkg.id">{{ pkg.name_en }}
                    </option>
                </select>
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

                    <h4 v-if="reports?.start_date && reports?.end_date">Package Wise Report From {{ reports?.start_date }} to {{ reports?.end_date }} for Branch: {{ branchesNames }}</h4>
                    <h4 v-else-if="reports?.start_date">Package Wise Report From {{ reports?.start_date }} for Branch:  {{ branchesNames }}</h4>
                    <h4 v-else-if="reports?.end_date">Package Wise Report till {{ reports?.end_date }} for Branch: {{ branchesNames }}</h4>
                    <h4 v-else class="font-bold px-2 pt-2">Package Wise Report for Branch: {{ branchesNames }}</h4>
                </div>
            </div>


            <div class="mt-1 bg-white" id="reportData">
                <h4 class="bg-gray-200 p-1 pt-2 font-bold text-center" >PACKAGE WISE REPORT</h4>
                
                <div class="border mb-4" v-if="response?.packages?.length">
                    <h4 class="bg-gray-100 p-1 ps-2 font-bold text-left">Packages</h4>
                    <table class="min-w-full border">
                        <thead class="border-b">
                            <tr>
                                <th scope="col" class="text-sm font-bold text-gray-900 ps-2">Member Code</th>
                                <th scope="col" class="text-sm font-bold text-gray-900">Member Name</th>
                                <th scope="col" class="text-sm font-bold text-gray-900">Sales Date</th>
                                <th scope="col" class="text-sm font-bold text-gray-900">Package Name</th>
                                <th scope="col" class="text-sm font-bold text-gray-900">Start Date</th>
                                <th scope="col" class="text-sm font-bold text-gray-900">End Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(pkg, index) in response?.packages" :key="index">
                                <td class="whitespace-nowrap ps-2 pt-1 text-sm font-medium text-gray-900">
                                    {{ pkg.member_code }}</td>
                                <td class="whitespace-nowrap text-sm font-medium text-gray-900">
                                    {{ pkg.member_name_en }}</td>
                                <td class="whitespace-nowrap text-sm font-medium text-gray-900">
                                    {{ pkg.sales_date }}</td>
                                <td class="whitespace-nowrap text-sm font-medium text-gray-900">
                                    {{ pkg.package_name_en }}</td>
                                <td class="whitespace-nowrap text-sm font-medium text-gray-900">
                                    {{ pkg.start_date }}</td>
                                <td class="whitespace-nowrap text-sm font-medium text-gray-900 pe-2 ">
                                    {{ pkg.end_date }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="border mb-4" v-if="response?.lockers?.length">
                    <h4 class="bg-gray-100 p-1 ps-2 font-bold text-left">Lockers</h4>
                    <table class="min-w-full border">
                        <thead class="border-b">
                            <tr>
                                <th scope="col" class="text-sm font-bold text-gray-900 ps-2">Member Code</th>
                                <th scope="col" class="text-sm font-bold text-gray-900">Member Name</th>
                                <th scope="col" class="text-sm font-bold text-gray-900">Sales Date</th>
                                <th scope="col" class="text-sm font-bold text-gray-900">Package Name</th>
                                <th scope="col" class="text-sm font-bold text-gray-900">Start Date</th>
                                <th scope="col" class="text-sm font-bold text-gray-900">End Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(locker, index) in response.lockers" :key="index">
                                <td class="whitespace-nowrap ps-2 pt-1 text-sm font-medium text-gray-900">
                                    {{ locker.member_code }}</td>
                                <td class="whitespace-nowrap text-sm font-medium text-gray-900">
                                    {{ locker.member_name_en }}</td>
                                <td class="whitespace-nowrap text-sm font-medium text-gray-900">
                                    {{ locker.sales_date }}</td>
                                <td class="whitespace-nowrap text-sm font-medium text-gray-900">
                                    {{ locker.package_name_en }}</td>
                                <td class="whitespace-nowrap text-sm font-medium text-gray-900">
                                    {{ locker.start_date }}</td>
                                <td class="whitespace-nowrap text-sm font-medium text-gray-900 pe-2 ">
                                    {{ locker.end_date }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="border mb-4" v-if="response?.lessons?.length">
                    <h4 class="bg-gray-100 p-1 ps-2 font-bold text-left">Lessons</h4>
                    <table class="min-w-full border">
                        <thead class="border-b">
                            <tr>
                                <th scope="col" class="text-sm font-bold text-gray-900 ps-2">Member Code</th>
                                <th scope="col" class="text-sm font-bold text-gray-900">Member Name</th>
                                <th scope="col" class="text-sm font-bold text-gray-900">Sales Date</th>
                                <th scope="col" class="text-sm font-bold text-gray-900">Package Name</th>
                                <th scope="col" class="text-sm font-bold text-gray-900">Start Date</th>
                                <th scope="col" class="text-sm font-bold text-gray-900">End Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(lesson, index) in response.lessons" :key="index">
                                <td class="whitespace-nowrap ps-2 pt-1 text-sm font-medium text-gray-900">
                                    {{ lesson.member_code }}</td>
                                <td class="whitespace-nowrap text-sm font-medium text-gray-900">
                                    {{ lesson.member_name_en }}</td>
                                <td class="whitespace-nowrap text-sm font-medium text-gray-900">
                                    {{ lesson.sales_date }}</td>
                                <td class="whitespace-nowrap text-sm font-medium text-gray-900">
                                    {{ lesson.package_name_en }}</td>
                                <td class="whitespace-nowrap text-sm font-medium text-gray-900">
                                    {{ lesson.start_date }}</td>
                                <td class="whitespace-nowrap text-sm font-medium text-gray-900 pe-2 ">
                                    {{ lesson.end_date }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="border mb-4" v-if="response?.services?.length">
                    <h4 class="bg-gray-100 p-1 ps-2 font-bold text-left">Services</h4>
                    <table class="min-w-full border">
                        <thead class="border-b">
                            <tr>
                                <th scope="col" class="text-sm font-bold text-gray-900 ps-2">Member Code</th>
                                <th scope="col" class="text-sm font-bold text-gray-900">Member Name</th>
                                <th scope="col" class="text-sm font-bold text-gray-900">Sales Date</th>
                                <th scope="col" class="text-sm font-bold text-gray-900">Package Name</th>
                                <th scope="col" class="text-sm font-bold text-gray-900">Start Date</th>
                                <th scope="col" class="text-sm font-bold text-gray-900">End Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(service, index) in response?.services" :key="index">
                                <td class="whitespace-nowrap ps-2 pt-1 text-sm font-medium text-gray-900">
                                    {{ service.member_code }}</td>
                                <td class="whitespace-nowrap text-sm font-medium text-gray-900">
                                    {{ service.member_name_en }}</td>
                                <td class="whitespace-nowrap text-sm font-medium text-gray-900">
                                    {{ service.sales_date }}</td>
                                <td class="whitespace-nowrap text-sm font-medium text-gray-900">
                                    {{ service.package_name_en }}</td>
                                <td class="whitespace-nowrap text-sm font-medium text-gray-900">
                                    {{ service.start_date }}</td>
                                <td class="whitespace-nowrap text-sm font-medium text-gray-900 pe-2 ">
                                    {{ service.end_date }}</td>
                            </tr>
                        </tbody>
                    </table>
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
                type_id: '',
                package_id: '',
            },
            branches: [],
            membershipTypes: [],
            membershipPackages: [],
            lockerTypes: [],
            lockerPackages: [],
            lessonTypes: [],
            lessonPackages: [],
            serviceTypes: [],
            servicePackages: [],

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
        ...mapGetters(["packageWiseFormData", "packageWiseData"]),
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
        packageTypes() {
            if (this.form_data.report_type == 'summary') { 
                this.form_data.type_id == ''
            }
            if (this.form_data.report_type == 'membership_type') { return this.membershipTypes }
            if (this.form_data.report_type == 'service_type') { return this.serviceTypes }
            if (this.form_data.report_type == 'locker_type') { return this.lockerTypes }
            if (this.form_data.report_type == 'lesson_type') { return this.lessonTypes }
        },
        packages() {
            if (this.form_data.report_type == 'summary')  { 
                this.form_data.package_id == ''
            }
            if (this.form_data.report_type == 'membership_type') { 
                return this.membershipPackages.filter((pkg) => pkg.membership_type_id == this.form_data.type_id)
            }
            if (this.form_data.report_type == 'service_type') {
                return this.servicePackages.filter((pkg) => pkg.service_type_id == this.form_data.type_id)
            }
            if (this.form_data.report_type == 'locker_type') {
                return this.lockerPackages.filter((pkg) => pkg.locker_type_id == this.form_data.type_id)

            }
            if (this.form_data.report_type == 'lesson_type') {
                return this.lessonPackages.filter((pkg) => pkg.lesson_type_id == this.form_data.type_id)
            }
        }
    },
    methods: {
        ...mapActions(["getPackageWiseFormData", "getPackageWiseData"]),
        getReports() {
            this.v$.$validate()
            if (!this.v$.$error) {
                this.getPackageWiseData({
                    branch_ids: this.form_data.branch_ids,
                    type: this.form_data.report_type,
                    type_id: this.form_data.type_id,
                    package_id: this.form_data.package_id,
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
    },
    watch: {
        packageWiseFormData(data) {
            if (data != null) {
                this.branches = data.branches
                this.membershipTypes = data.membership_types
                this.membershipPackages = data.membership_packages
                this.lockerTypes = data.locker_types
                this.lockerPackages = data.locker_packages
                this.lessonTypes = data.lesson_types
                this.lessonPackages = data.lesson_packages
                this.serviceTypes = data.service_types
                this.servicePackages = data.service_packages
            }
            console.log(data)
        },
        packageWiseData(data) {
            console.log(data)
            if (data != null) this.response = data
        },
    },
    mounted() {
        this.checkPermissions()
        this.getPackageWiseFormData()
    },
}
</script>