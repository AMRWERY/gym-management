<template>
    <div>
        <p class="text-3xl">{{$t('reports.member_expiry_report')}}</p>
        <hr />

        <div class="mt-5 grid grid-cols-8
         gap-3 bg-white px-3 py-5">
            <div class="col-span-2">
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

        <div v-if="report?.members?.length" class="mt-4 bg-white">

            <div class="grid grid-cols-3 justify-content-between">
                <div class="col-span-2 font-bold px-2 pt-5">
                    <h4 v-if="report?.start_date && report?.end_date">Member Expiry Report From {{ report?.start_date }} to {{ report?.end_date }} for Branch: {{ branchesNames }}</h4>
                    <h4 v-else-if="report?.start_date">Member Expiry Report From {{ report?.start_date }} for Branch: {{ branchesNames }}</h4>
                    <h4 v-else-if="report?.end_date">Member Expiry Report till {{ report?.end_date }} for Branch: {{ branchesNames }}</h4>
                    <h4 v-else>Member Expiry Report for Branch: {{ branchesNames }}</h4>
                </div>

                <div v-if="report?.members?.length" class="bg-white text-right py-2 px-3">
                        <button type="button" 
                            @click="printReport"
                            class="w-full shadow-sm px-4 py-2 font-semibold text-base btn-primary 
                                focus:outline-none sm:w-auto sm:text-sm">
                            {{ $t('button.print_report') }}
                        </button>
                    </div>
            </div>


            <div class="mt-1" id="reportData">

                <h4 class="bg-gray-200 col-span-2 p-1 pt-2 font-bold text-center">MEMBER EXPIRY TRANSACTION REPORT</h4>

                <table class="min-w-full border ">
                    <thead class="border-b py-1 bg-gray-100">
                        <tr>
                            <th scope="col" class="text-sm ps-2 py-2 font-bold text-gray-900 text-left">Code</th>
                            <th scope="col" class="text-sm ps-2 py-2 font-bold text-gray-900 text-left">Name</th>
                            <th scope="col" class="text-sm ps-2 py-2 font-bold text-gray-900 text-left">Mobile</th>
                            <th scope="col" class="text-sm ps-2 py-2 font-bold text-gray-900 text-left">Package</th>
                            <th scope="col" class="text-sm ps-2 py-2 font-bold text-gray-900 text-left">Valid From</th>
                            <th scope="col" class="text-sm ps-2 py-2 font-bold text-gray-900 text-left">Valid Till</th>
                            <th scope="col" class="text-sm ps-2 py-2 font-bold text-gray-900 text-left">Remarks</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(row, index) in report?.members" :key="index" class="border border-bottom">
                            <td class="whitespace-nowrap ps-2 py-2 text-sm font-medium text-gray-900">{{ row.member_code }}</td>
                            <td class="whitespace-nowrap ps-2 text-sm font-medium text-gray-900">{{ row.member_name_en }}</td>
                            <td class="whitespace-nowrap ps-2 text-sm font-medium text-gray-900">{{ row.mobile }}</td>
                            <td class="whitespace-nowrap ps-2 text-sm font-medium text-gray-900">{{ row.package_name_en }}</td>
                            <td class="whitespace-nowrap ps-2 text-sm font-medium text-gray-900">{{ row.valid_from }}</td>
                            <td class="whitespace-nowrap ps-2 text-sm font-medium text-gray-900">{{ row.valid_till }}</td>
                            <td class="whitespace-nowrap ps-2 text-sm font-medium text-gray-900">{{ row.remarks }}</td>
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
import UserTransactionReportModal from './UserTransactionReportModal.vue';

export default {
    data() {
        return {
            v$: useValidate(),
            has_permission: false,
            form_data: {
                branch_ids: [],
                start_date: '',
                end_date: ''
            },
            branches: [],
            report: {}
        }
    },
    components: { UserTransactionReportModal },
    validations() {
        return {
            form_data: {
                branch_ids: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('master.branch')), required) },
            }
        };
    },
    computed: {
        ...mapGetters(["memberExpiryFormData", "memberExpiryData"]),
        branchesNames() {
            return this.branches.map(branch => branch.name_en).toString();
        },
    },
    methods: {
        ...mapActions(["getMemberExpiryFormData", "getMemberExpiryData"]),
        getReports() {
            this.v$.$validate()
            if (!this.v$.$error) {
                this.getMemberExpiryData({
                    branch_ids: this.form_data.branch_ids,
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
                name: "Platinum Gym - Member Expiry Report",
                specs: [],
                styles: [],
            };
            this.$htmlToPaper("reportData", options);
        },
    },
    watch: {
        memberExpiryFormData(data) {
            if (data != null)this.branches = data
        },
        memberExpiryData(data) {
            if (data != null) this.report = data
        }
    },
    mounted() {
        this.checkPermissions()
        this.getMemberExpiryFormData()
    },
}
</script>