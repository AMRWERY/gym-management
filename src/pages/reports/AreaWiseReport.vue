<template>
    <div>
        <p class="text-3xl">{{$t('reports.area_wise_report')}}</p>
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
                <label class="block text-gray-700 text-sm font-bold mb-2" for="area_id">
                    {{ $t('transactions.select_area') }}
                </label>
                <select name="area_id" id="area_id" v-model="form_data.area_id" aria-placeholder="Select branch"
                    class="h-10 shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    <option v-for="(area, index) in areas" :key="index" :value="area.id">{{ area.name_en }}
                    </option>
                </select>
            </div>

            <div>
                <label for="start_date" class="font-bold">{{$t('reports.start_date')}}</label>
                <input type="date" :min="todaysDate" v-model="form_data.start_date" format="dd/MM/yyyy"
                    :placeholder="$t('transactions.start_date')"
                    class="shadow appearance-none border rounded w-full mt-1 p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>

            <div>
                <label for="end_date" class="font-bold">{{$t('reports.end_date')}}</label>
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

        <div v-if="response?.areas?.length" class="mt-4 bg-white" id="reportData">


            <div class="grid grid-cols-3 gap-x-6 p-4 mb-4">

                <div class="col-span-2">
                    <p class="font-medium text-3xl pt-2 color-primary">AREA WISE MEMBERS REGISTERED</p>

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

            <div class="mt-1 bg-white px-4" v-if="report_type == 'summary'">
                <table class="min-w-full border" >
                    <thead class="border-b py-1 bg-gray-100" >
                        <tr>
                            <th scope="col" class="text-sm ps-2 py-2 font-bold text-gray-900 text-left" >{{ $t('reports.area_name') }} #</th>
                            <th scope="col" class="text-sm font-bold text-gray-900 text-left" >{{ $t('reports.area_name_ar') }}</th>
                            <th scope="col" class="text-sm font-bold text-gray-900 text-center">{{ $t('reports.total_members') }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(row, index) in response?.areas" :key="index" class="px-2">
                            <td class="whitespace-nowrap ps-2 pb-1 pt-2 text-sm font-medium text-gray-900">{{ row.area_name_en }}</td>
                            <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-left">{{ row.area_name_ar }}</td>
                            <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-center">{{ row.total_members }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="mt-1 bg-white px-4" v-if="report_type == 'details'">
                <div class="grid grid-cols-5 py-2 bg-gray-200 mb-4">
                    <p class="text-sm font-bold text-gray-900 ps-2">Member Name</p>
                    <p class="text-sm font-bold text-gray-900">Mobile Number</p>
                    <p class="text-sm font-bold text-gray-900">Email</p>
                    <p class="text-sm font-bold text-gray-900 text-center">Blacklisted</p>
                    <p class="text-sm font-bold text-gray-900 text-center">Status</p>
                </div>

                <div class="border mb-4" v-for="(row, index) in response?.areas" :key="index">
                    <h4 class="bg-gray-100 py-1 px-2 font-bold text-left">{{ row.area_name_en }}</h4>
                    <div class="grid grid-cols-5 py-1 px-2" v-for="(member, index) in row?.members" :key="index">
                        <p class="whitespace-nowrap text-sm font-medium text-gray-900">{{ member.name_en }}</p>
                        <p class="whitespace-nowrap text-sm font-medium text-gray-900">{{ member.mobile }}</p>
                        <p class="whitespace-nowrap text-sm font-medium text-gray-900">{{ member.email }}</p>
                        <p class="whitespace-nowrap text-sm font-medium text-gray-900 text-center">{{ member.is_blacklisted == '1' ? 'Yes' : 'No' }}</p>
                        <p class="whitespace-nowrap text-sm font-medium text-gray-900 text-center">{{ member.active == '1' ? 'Active' : 'Inactive' }}</p>
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
                branch_ids: [],
                area_id: '',
                start_date: '',
                end_date: ''
            },
            report_type: 'details',
            branches: [],
            areas: [],
            response: null
        }
    },
    validations() {
        return {
            form_data: {
                branch_ids: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('master.branch')), required) }            }
        };
    },
    computed: {
        ...mapGetters(["areaWiseFormData", "areaWiseData"]),
        branchesNames() {
            const selectedBranches = this.branches?.filter(branch => this.form_data.branch_ids.indexOf(branch.id) !== -1);
            return selectedBranches?.map(branch => ' ' + branch.name_en).toString();
        },
    },
    methods: {
        ...mapActions(["getAreaWiseFormData", "getAreaWiseData"]),
        getReports(type) {
            this.v$.$validate()
            if (!this.v$.$error) {
                this.report_type = type
                this.getAreaWiseData({
                    branch_ids: this.form_data.branch_ids,
                    area_id: this.form_data.area_id,
                    start_date: this.$root.formatDateAPI(this.form_data.start_date),
                    end_date: this.$root.formatDateAPI(this.form_data.end_date),
                    report_type: this.report_type
                })
            }
        },
        checkPermissions() {
            let page_permissions = this.$root.getScreenPermissions("Freeze Report")
            this.has_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "freeze_report")
        },
        printReport() {
            const options = {
                name: "Platinum Gym - Area Wise Report",
                specs: [],
                styles: [],
            };
            this.$htmlToPaper("reportData", options);
        },
    },
    watch: {
        areaWiseFormData(data) {
            if (data != null) { 
                this.branches = data.branches
                this.areas = data.areas
            }
        },
        areaWiseData(data) {
            if (data != null) this.response = data
        }
    },
    mounted() {
        this.checkPermissions()
        this.getAreaWiseFormData()
    },
}
</script>