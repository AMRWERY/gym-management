<template>
    <div>
        <p class="text-3xl">{{$t('reports.age_wise_report')}}</p>
        <hr />

        <div class="mt-5 grid grid-cols-4 gap-3 bg-white px-3 py-5">

            <div>
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="branch_ids">
                        {{$t('reports.select_branches')}} *
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

            <div>
                <label class="block text-gray-700 text-sm font-bold mb-2" for="age_id">
                    {{$t('reports.select_aging_range')}} *
                </label>
                <select name="age_id" id="age_id" v-model="form_data.age_id" aria-placeholder="Select branch"
                    class="h-10 shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    <option v-for="(age, index) in ageRanges" :key="index" :value="age.id">{{ age.name_en }}
                    </option>
                </select>
            </div>

            <div>
                <label for="start_date" class="font-bold">{{$t('reports.start_date')}}</label>
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

        <div v-if="response" class="mt-4 bg-white" id="reportData">


            <div class="grid grid-cols-3 gap-x-6 p-4 mb-4">

                <div class="col-span-2">
                    <p class="font-medium text-3xl pt-2 color-primary">AGE WISE REPORT</p>

                    <div class="text-base font-medium text-gray-800">
                        <span v-if="form_data.start_date">From {{ form_data?.start_date }} </span>
                        <span v-if="form_data.end_date">Upto {{ form_data?.end_date }} </span>
                        <span>&nbsp;{{ $t('reports.for_branch') }}: {{ branchesNames }} </span>
                    </div>
                </div>

                <div class="print:hidden text-right">
                    <button v-if="has_permission" type="button" @click="printReport" class="h-10 px-4 font-semibold text-base btn-primary mx-2">
                        {{ $t('button.print_report') }}
                    </button>

                </div>
            </div>

            <div class="px-4" v-if="report_type == 'details'">
                <table class="min-w-full border" >
                    <thead class="border-b py-1 bg-gray-100">
                        <tr>
                            <th scope="col" class="text-sm font-bold text-gray-900 text-left ps-2 py-2" >{{ $t('datatable.member_code') }}</th>
                            <th scope="col" class="text-sm font-bold text-gray-900 text-left">{{ $t('datatable.member_name') }}</th>
                            <th scope="col" class="text-sm font-bold text-gray-900 text-left">{{ $t('datatable.mobile') }}</th>
                            <th scope="col" class="text-sm font-bold text-gray-900 text-left">{{ $t('datatable.birth_date') }}</th>
                            <th scope="col" class="text-sm font-bold text-gray-900 text-center">{{ $t('datatable.age') }}</th>
                            <th scope="col" class="text-sm font-bold text-gray-900 text-left">{{ $t('datatable.branch') }}</th>
                            <th scope="col" class="text-sm font-bold text-gray-900 text-left">{{ $t('datatable.created_on') }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(row, index) in response?.age_wise_members" :key="index" class="border border-bottom" >
                            <td class="whitespace-nowrap ps-2 pb-1 pt-2 text-sm font-medium text-gray-900">{{row.member_code}}</td>
                            <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-left">{{row.member_name_en}}</td>
                            <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-left">{{row.mobile}}</td>
                            <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-left">{{row.birth_date}}</td>
                            <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-center">{{row.age}}</td>
                            <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-left">{{row.branch}}</td>
                            <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-left">{{row.create_at}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="px-4" v-if="report_type == 'summary'">
                <table class="min-w-full border" >
                    <thead class="border-b py-1 bg-gray-100">
                        <tr>
                            <th scope="col" class="text-sm font-bold text-gray-900 text-left ps-2 py-2" >{{ $t('datatable.age_description') }}</th>
                            <th scope="col" class="text-sm font-bold text-gray-900 text-left">{{ $t('datatable.member_count') }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="border border-bottom" >
                            <td class="whitespace-nowrap ps-2 pb-1 pt-2 text-sm font-medium text-gray-900">Below 16 Years</td>
                            <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-left">{{ response?.age_wise_members?.below_sixteen ?? '0' }}</td>
                        </tr>

                        <tr class="border border-bottom" >
                            <td class="whitespace-nowrap ps-2 pb-1 pt-2 text-sm font-medium text-gray-900">16 Years - 22 Years</td>
                            <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-left">{{ response?.age_wise_members?.sixteen_to_twenty_two ?? '0' }}</td>
                        </tr>

                        <tr class="border border-bottom" >
                            <td class="whitespace-nowrap ps-2 pb-1 pt-2 text-sm font-medium text-gray-900">23 Years - 29 Years</td>
                            <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-left">{{ response?.age_wise_members?.twenty_three_to_twent_nine ?? '0' }}</td>
                        </tr>

                        <tr class="border border-bottom" >
                            <td class="whitespace-nowrap ps-2 pb-1 pt-2 text-sm font-medium text-gray-900">30 Years - 39 Years</td>
                            <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-left">{{ response?.age_wise_members?.thirty_to_thirty_nine ?? '0' }}</td>
                        </tr>

                        <tr class="border border-bottom" >
                            <td class="whitespace-nowrap ps-2 pb-1 pt-2 text-sm font-medium text-gray-900">40 Years - 49 Years</td>
                            <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-left">{{ response?.age_wise_members?.fourty_to_fourty_nine ?? '0' }}</td>
                        </tr>

                        <tr class="border border-bottom" >
                            <td class="whitespace-nowrap ps-2 pb-1 pt-2 text-sm font-medium text-gray-900">Above 50 Years</td>
                            <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-left">{{ response?.age_wise_members?.above_fifty ?? '0' }}</td>
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

export default {
    data() {
        return {
            v$: useValidate(),
            has_permission: false,
            form_data: {
                branch_ids: [],
                age_id: '',
                start_date: '',
                end_date: ''
            },
            report_type: '',
            branches: [],
            response: null,
            todaysDate: new Date().toISOString().split('T')[0]
        }
    },
    validations() {
        return {
            form_data: {
                branch_ids: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('master.branch')), required) },
            }
        };
    },
    computed: {
        ...mapGetters(["ageWiseFormData", "ageWiseData"]),
        branchesNames() {
            const selectedBranches = this.branches?.filter(branch => this.form_data.branch_ids.indexOf(branch.id) !== -1);
            return selectedBranches?.map(branch => ' ' + branch.name_en).toString();
        },
        ageRanges() {
            return [
                {
                    id: '16_22',
                    name_en: '16-22',
                },
                {
                    id: '23_29',
                    name_en: '23-29'
                },
                {
                    id: '30_39',
                    name_en: '30-39'
                },
                {
                    id: '40_49',
                    name_en: '40-49'
                },
                {
                    id: '50',
                    name_en: '50'
                }
            ]
        },
    },
    methods: {
        ...mapActions(["getAgeWiseFormData", "getAgeWiseData"]),
        getReports(type) {
            this.v$.$validate()
            if (!this.v$.$error) {
                this.report_type = type
                this.getAgeWiseData({
                    branch_ids: this.form_data.branch_ids,
                    age_range: this.form_data.age_id,
                    start_date: this.$root.formatDateAPI(this.form_data.start_date),
                    end_date: this.$root.formatDateAPI(this.form_data.end_date),
                    report_type: type
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
        ageWiseFormData(data) {
            if (data != null) this.branches = data
        },
        ageWiseData(data) {
            if (data != null) this.response = data
        }
    },
    mounted() {
        this.checkPermissions()
        this.getAgeWiseFormData()
    },
}
</script>