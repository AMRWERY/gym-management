<template>
    <div>
        <p class="text-3xl">{{ $t('reports.freeze_membership_report') }}</p>
        <hr/>
        
        <div class="mt-5 grid grid-cols-9 gap-3 bg-white px-3 py-5">
            <div class="col-span-2">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="branch_ids">
                        {{ $t('reports.select_branches') }} *
                    </label>
                    <Multiselect
                        mode="tags"
                        :searchable="true"
                        :createTag="true"
                        v-model="form_data.branch_ids"
                        :multiple="true"
                        label="name_en"
                        valueProp='id'
                        :placeholder="$t('reports.select_branches')"
                        class="shadow border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        :options="branches"/>
                    <span class="text-sm text-red-400" v-if="v$.form_data.branch_ids.$error"> {{ v$.form_data.branch_ids.$errors[0].$message }}</span>
            </div>
            <div class="col-span-2 mb-1.5">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="payment_ids">
                        {{ $t('reports.members') }}
                    </label>
                    <select name="trainer_id" id="trainer_id" v-model="form_data.member_id" aria-placeholder="select member"
                        class="h-10 shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <option value="">{{ $t('reports.members_hint') }}</option>
                        <option v-for="(member, index) in members" :key="index" :value="member.id">{{member.name_en}}</option>
                    </select>
            </div>
            <div class="col-span-2 mb-1.5">
                <label for="start_date" class="font-bold">{{ $t('reports.start_date') }}</label>
                <input type="date" :min="todaysDate" v-model="form_data.start_date" format="dd/MM/yyyy" :placeholder="$t('reports.start_date')" class="shadow appearance-none border rounded w-full mt-1 p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
            </div>

            <div class="col-span-2 mb-1.5">
                <label for="end_date" class="font-bold">{{ $t('reports.end_date') }}</label>
                <input type="date" :min="form_data.start_date" v-model="form_data.end_date" format="dd/MM/yyyy" :placeholder="$t('reports.end_date')" class="shadow p-2 appearance-none border mt-1 rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
            </div>

            <div class="col-span-1 mt-3">
                <button type="button" @click="getReports" class="w-full mt-4 inline-flex justify-center border-2 border-color-primary shadow-sm px-5 py-2 font-semibold text-base btn-outline-primary focus:outline-none sm:text-sm">
                    {{ $t('button.search') }}
                </button>
            </div>

        </div>        

        <div v-if="reports != ''" class="mt-4 bg-white" id="bookingInfo">
            
            <h4 v-if="reports?.start_date && reports?.end_date">{{ $t('reports.freeze_reports_members_from') }} {{ reports?.start_date }} to {{ reports?.end_date }} {{ $t('reports.for_branch') }}: 
                <span v-for="(branch, index) in reports?.branches" :key="index" >
                    {{ branch.name_en }}, 
                </span>
            </h4>

            <h4 v-else-if="reports?.start_date">{{ $t('reports.freeze_reports_members_from') }} {{ reports?.start_date }} {{ $t('reports.for_branch') }}: 
                <span v-for="(branch, index) in reports?.branches" :key="index" >
                    {{ branch.name_en }}, 
                </span>
            </h4>

            <h4 v-else-if="reports?.end_date">{{ $t('reports.freeze_reports_members_till') }} {{ reports?.end_date }} {{ $t('reports.for_branch') }}: 
                <span v-for="(branch, index) in reports?.branches" :key="index" >
                    {{ branch.name_en }}, 
                </span>
            </h4>

            <h4 class="font-bold px-2 pt-2" v-else>{{ $t('reports.freeze_report_members_for_branch') }}: 
                <span v-for="(branch, index) in reports?.branches" :key="index" >
                    {{ branch.name_en }}, 
                </span>
            </h4>

            <div class="">
                <div class="mt-1">
                    <h4 class="bg-gray-200 p-1 pt-2 font-bold text-center" >{{ $t('reports.freeze_membership_report_caps') }}</h4>
                    <table class="min-w-full border" >
                        <thead class="border-b py-1" >
                            <tr>
                                <th scope="col" class="text-sm ps-2 py-2 font-bold text-gray-900 text-left" >{{ $t('reports.invoice') }} #</th>
                                <th scope="col" class="text-sm font-bold text-gray-900 text-center" >{{ $t('reports.member_code') }}</th>
                                <th scope="col" class="text-sm font-bold text-gray-900 text-left">{{ $t('reports.member_name') }}</th>
                                <th scope="col" class="text-sm font-bold text-gray-900 text-center">{{ $t('reports.subscription_id') }}</th>
                                <th scope="col" class="text-sm font-bold text-gray-900 text-left">{{ $t('reports.package') }}</th>
                                <th scope="col" class="text-sm font-bold text-gray-900 text-left">{{ $t('reports.remarks') }}</th>
                                <th scope="col" class="text-sm font-bold text-gray-900 text-center">{{ $t('reports.start_date') }}</th>
                                <th scope="col" class="text-sm font-bold text-gray-900 text-center">{{ $t('reports.end_date') }}</th>
                                <th scope="col" class="text-sm font-bold text-gray-900 text-center">{{ $t('reports.duration') }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(row, index) in reports?.freezed_reports" :key="index" >
                                <td class="whitespace-nowrap ps-2 pb-1 pt-2 text-sm font-medium text-gray-900">{{row.invoice_no}}</td>
                                <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-center">{{row.member_code}}</td>
                                <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-left">{{row.member_name}}</td>
                                <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-center">{{row.subscription_id}}</td>
                                <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-left">{{row.package}}</td>
                                <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-left">{{row.remarks ?? '-'}}</td>
                                <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-center">{{row.freeze_start_date}}</td>
                                <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-center">{{row.freeze_end_date}}</td>
                                <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-center">{{row.freeze_duration}} {{ $t('reports.days') }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div v-if="reports != ''" class="bg-white py-4 px-3 border border-gray-200 mb-1 gap-2 grid grid-cols-4">
            <button v-if="has_permission" type="button" 
                @click="printBookingDetails"
                class="w-full justify-center border-1 border-color-primary 
                    shadow-sm px-4 py-1 font-semibold text-base btn-primary 
                    focus:outline-none sm:w-auto sm:text-sm">
                {{ $t('button.print_report') }}
            </button>
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
                member_id: 0,
                start_date: '',
                end_date: ''
            },
            branches: [],
            members: [],
            reports: []
        }
    },
    validations() {
        return {
            form_data: {
                branch_ids: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('master.branch')), required) },
            }
        };
    },
    computed:{
        ...mapGetters(["freezeReportData", "freezeReportFormData"]),
    },
    methods: {
        ...mapActions(["getFreezeReportFormData", "getFreezeReportData"]),

        printBookingDetails() {
              const options = {
                  name: "Platinum Gym",
                  specs: [],
                  styles: [
                      "https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
                  ],
              };
              this.$htmlToPaper("bookingInfo", options);
          },

        getReports() {
            this.v$.$validate()
            if(!this.v$.$error) {
                this.getFreezeReportData({
                    branch_ids: this.form_data.branch_ids,
                    member_id: this.form_data.member_id,
                    start_date: this.$root.formatDateAPI(this.form_data.start_date),
                    end_date: this.$root.formatDateAPI(this.form_data.end_date)
                })
            }
        },
        checkPermissions() {
            let page_permissions = this.$root.getScreenPermissions("Freeze Report")
            this.has_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "freeze_report")
        }
    },
    watch: {
        freezeReportData(data) {
            console.log(data)
            if(data != null) {
                this.reports = data
            }
        },
        freezeReportFormData(data) {
            if(data != null) {
                this.branches = data.branches
                this.members = data.members
            }
        }
    },
    mounted() {
        this.checkPermissions()
        this.getFreezeReportFormData()
    },
}
</script>