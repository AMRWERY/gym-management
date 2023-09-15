<template>
    <div>
        <p class="text-3xl">{{$t('reports.membership_summary')}}</p>
        <hr/>
        
        <div class="mt-5 grid grid-cols-4 gap-3 bg-white px-3 py-5">
            <div>
                    <label class="block text-gray-700 text-sm font-bold mt-1" for="branch_ids">
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
            <div>
                    <label class="block text-gray-700 text-sm font-bold mt-1" for="payment_ids">
                        {{ $t('reports.members') }}
                    </label>
                    <select name="trainer_id" id="trainer_id" v-model="form_data.member_id" aria-placeholder="select member"
                        class="h-10 shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <option value="">{{ $t('reports.members_hint') }}</option>
                        <option v-for="(member, index) in members" :key="index" :value="member.id">{{member.name_en}}</option>
                    </select>
            </div>
            <div>
                <label for="start_date" class="font-bold">{{ $t('reports.start_date') }}</label>
                <input type="date" :min="todaysDate" v-model="form_data.start_date" format="dd/MM/yyyy" :placeholder="$t('reports.start_date')" class="shadow appearance-none border rounded w-full p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
            </div>

            <div>
                <label for="end_date" class="font-bold">{{ $t('reports.end_date') }}</label>
                <input type="date" :min="form_data.start_date" v-model="form_data.end_date" format="dd/MM/yyyy" :placeholder="$t('reports.end_date')" class="shadow p-2 appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
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

        <div v-if="response" class="mt-4 bg-white" id="bookingInfo">


            <div class="grid grid-cols-3 gap-x-6 p-4 bg-white">

                <div class="col-span-2">
                    <p class="font-medium text-3xl pt-2 color-primary">MEMBERSHIP SUMMARY REPORT</p>

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



            <div v-for="(sub, index) in response?.subscriptions" :key="index" class="bg-white px-4">

                <div class="grid grid-cols-1 py-2 bg-gray-200">
                    <div>
                        <p class="font-bold ps-2">{{ sub.branch_name_en }}</p>
                    </div>
                </div>

                <div v-for="(branch_sub, index) in sub?.branch_subscriptions" :key="index" >

                    <div class="grid grid-cols-5 gap-x-4 pt-4">
                        <div class="col-span-2">
                            <p class="font-bold">{{ branch_sub.member_name_ar }} / {{ branch_sub.member_name_en }}</p>
                        </div>
                        <div>
                            <p class="font-medium"><span class="font-normal text-sm">{{ $t('reports.member_code') }}:</span> {{ branch_sub.member_code }}</p>
                        </div>
                        <div>
                            <p class="font-medium"><span class="font-normal text-sm">{{ $t('reports.civil_id') }}:</span> {{ branch_sub.civil_id }}</p>
                        </div>
                        <div>
                            <p class="font-medium"><span class="font-normal text-sm">{{ $t('reports.mobile') }}:</span> {{ branch_sub.mobile }}</p>
                        </div>
                    </div>


                    <table class="min-w-full border mb-6" v-if="report_type == 'details'">
                        <thead class="border-b">
                            <tr>
                                <th scope="col" class="text-sm ps-2 py-1 font-bold text-gray-900 text-left" >{{ $t('reports.invoice') }} #</th>
                                <th scope="col" class="text-sm font-bold text-gray-900 text-left" >{{ $t('reports.name_en') }}</th>
                                <th scope="col" class="text-sm font-bold text-gray-900 text-left">{{ $t('reports.name_ar') }}</th>                    
                                <th scope="col" class="text-sm font-bold text-gray-900 text-center">{{ $t('reports.start_date') }}</th>
                                <th scope="col" class="text-sm font-bold text-gray-900 text-center">{{ $t('reports.end_date') }}</th>
                                <th scope="col" class="text-sm pe-2 font-bold text-gray-900 text-right">{{ $t('reports.amount') }}</th>
                            </tr>
                        </thead>
                        <tbody >

                            <tr>
                                <td colspan="6" class="bg-gray-100 p-1 ps-2 font-bold text-sm">{{ $t('reports.package') }}</td>
                            </tr>
                            <tr >
                                <td class="whitespace-nowrap ps-2 pt-1 text-sm font-medium text-gray-900">{{ branch_sub.invoice_no }}</td>
                                <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-left">{{ branch_sub.membership_package.name_en }}</td>
                                <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-left">{{ branch_sub.membership_package.name_ar }}</td>
                                <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-center">{{ branch_sub.start_date }}</td>
                                <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-center">{{ branch_sub.end_date }}</td>
                                <td class="whitespace-nowrap pe-2 text-sm font-medium text-gray-900 text-right">{{ branch_sub.membership_package_amount?.toFixed(3) }}</td>
                            </tr>


                            <template v-if="branch_sub?.subscription_lesson.length">

                                <tr>
                                    <td colspan="6" class="bg-gray-100 p-1 ps-2 font-bold text-sm">{{ $t('reports.lessons') }}</td>
                                </tr>
                                <tr v-for="(lesson, index) in branch_sub?.subscription_lesson" :key="index" >
                                    <td class="whitespace-nowrap ps-2 pt-1 text-sm font-medium text-gray-900">{{ lesson.id }}</td>
                                    <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-left">{{ lesson.lesson_package.name_en }}</td>
                                    <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-left">{{ lesson.lesson_package.name_ar }}</td>
                                    <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-center">{{ lesson.start_date }}</td>
                                    <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-center">{{ lesson.end_date }}</td>
                                    <td class="whitespace-nowrap pe-2 text-sm font-medium text-gray-900 text-right">{{ lesson.amount?.toFixed(3) }}</td>
                                </tr>

                            </template>

                            <template v-if="branch_sub?.subscription_locker.length">

                                <tr>
                                    <td colspan="6" class="bg-gray-100 p-1 ps-2 font-bold text-sm">{{ $t('reports.lockers') }}</td>
                                </tr>
                                <tr v-for="(locker, index) in branch_sub?.subscription_locker" :key="index" >
                                    <td class="whitespace-nowrap ps-2 pt-1 text-sm font-medium text-gray-900">{{ locker.id }}</td>
                                    <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-left">{{ locker.locker_package.name_en }}</td>
                                    <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-left">{{ locker.locker_package.name_ar }}</td>
                                    <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-center">{{ locker.start_date }}</td>
                                    <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-center">{{ locker.end_date }}</td>
                                    <td class="whitespace-nowrap pe-2 text-sm font-medium text-gray-900 text-right">{{ locker.amount?.toFixed(3) }}</td>
                                </tr>

                            </template>


                            <template v-if="branch_sub?.subscription_service.length">

                                <tr>
                                    <td colspan="6" class="bg-gray-100 p-1 ps-2 font-bold text-sm">{{ $t('reports.services') }}</td>
                                </tr>
                                <tr v-for="(service, index) in branch_sub?.subscription_service" :key="index" >
                                    <td class="whitespace-nowrap ps-2 pt-1 text-sm font-medium text-gray-900">{{ service.id }}</td>
                                    <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-left">{{ service.service_package.name_en }}</td>
                                    <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-left">{{ service.service_package.name_ar }}</td>
                                    <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-center">{{ service.start_date }}</td>
                                    <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-center">{{ service.end_date }}</td>
                                    <td class="whitespace-nowrap pe-2 text-sm font-medium text-gray-900 text-right">{{ service.amount?.toFixed(3) }}</td>
                                </tr>

                            </template>

                        </tbody>
                        <tfoot>
                            <tr class="border-t bg-gray-100" >
                                <td colspan="5" class="whitespace-nowrap text-sm font-bold text-gray-900 text-right">{{ $t('reports.package_amount') }}</td>
                                <td class="whitespace-nowrap text-sm font-bold text-gray-900 text-right">{{ branch_sub?.membership_package_amount?.toFixed(3) }}</td>
                            </tr>

                            <tr v-if="branch_sub?.subscription_lesson.length" class="border-t bg-gray-100" >
                                <td colspan="5" class="whitespace-nowrap text-sm font-bold text-gray-900 text-right">{{ $t('reports.lesson_total_amount') }}</td>
                                <td class="whitespace-nowrap text-sm font-bold text-gray-900 text-right">{{ branch_sub?.lesson_total_amount?.toFixed(3) }}</td>
                            </tr>

                            <tr v-if="branch_sub?.subscription_locker.length" class="border-t bg-gray-100" >
                                <td colspan="5" class="whitespace-nowrap text-sm font-bold text-gray-900 text-right">{{ $t('reports.locker_amount') }}</td>
                                <td class="whitespace-nowrap text-sm font-bold text-gray-900 text-right">{{ branch_sub?.locker_total_amount?.toFixed(3) }}</td>
                            </tr>

                            <tr v-if="branch_sub?.subscription_service.length" class="border-t bg-gray-100" >
                                <td colspan="5" class="whitespace-nowrap text-sm font-bold text-gray-900 text-right">{{ $t('reports.service_amount') }}</td>
                                <td class="whitespace-nowrap text-sm font-bold text-gray-900 text-right">{{ branch_sub?.service_total_amount?.toFixed(3) }}</td>
                            </tr>

                            <tr v-if="branch_sub?.discount_total_amount > 0" class="border-t bg-gray-100" >
                                <td colspan="5" class="whitespace-nowrap text-sm font-bold text-gray-900 text-right">{{ $t('reports.discount_amount') }}</td>
                                <td class="whitespace-nowrap text-sm font-bold text-gray-900 text-right">{{ branch_sub?.discount_total_amount?.toFixed(3) }}</td>
                            </tr>

                            <tr class="border-t bg-gray-100" >
                                <td colspan="5" class="whitespace-nowrap text-sm font-bold text-gray-900 text-right">{{ $t('reports.total_amount') }}</td>
                                <td class="whitespace-nowrap text-sm font-bold text-gray-900 text-right">{{ branch_sub?.total_amount?.toFixed(3) }}</td>
                            </tr>
                        </tfoot>
                    </table>

                        

                    <div class="" v-if="report_type == 'summary'">

                        <div class="grid grid-cols-2 border-b border-t" >
                            <p class="whitespace-nowrap text-sm font-medium text-gray-900">{{ $t('reports.package_amount') }}</p>
                            <p class="whitespace-nowrap text-sm font-bold text-gray-900 text-right">{{ branch_sub?.membership_package_amount?.toFixed(3) }}</p>
                        </div>

                        <div v-if="branch_sub?.subscription_lesson.length" class="grid grid-cols-2 border-b" >
                            <p class="whitespace-nowrap text-sm font-medium text-gray-900">{{ $t('reports.lesson_total_amount') }}</p>
                            <p class="whitespace-nowrap text-sm font-bold text-gray-900 text-right">{{ branch_sub?.lesson_total_amount?.toFixed(3) }}</p>
                        </div>

                        <div v-if="branch_sub?.subscription_locker.length" class="grid grid-cols-2 border-b" >
                            <p class="whitespace-nowrap text-sm font-medium text-gray-900">{{ $t('reports.locker_amount') }}</p>
                            <p class="whitespace-nowrap text-sm font-bold text-gray-900 text-right">{{ branch_sub?.locker_total_amount?.toFixed(3) }}</p>
                        </div>

                        <div v-if="branch_sub?.subscription_service.length" class="grid grid-cols-2 border-b" >
                            <p class="whitespace-nowrap text-sm font-medium text-gray-900">{{ $t('reports.service_amount') }}</p>
                            <p class="whitespace-nowrap text-sm font-bold text-gray-900 text-right">{{ branch_sub?.service_total_amount?.toFixed(3) }}</p>
                        </div>

                        <div v-if="branch_sub?.discount_total_amount > 0" class="grid grid-cols-2 border-b" >
                            <p class="whitespace-nowrap text-sm font-medium text-gray-900">{{ $t('reports.discount_amount') }}</p>
                            <p class="whitespace-nowrap text-sm font-bold text-gray-900 text-right">{{ branch_sub?.discount_total_amount?.toFixed(3) }}</p>
                        </div>

                        <div class="grid grid-cols-2 border-b" >
                            <p class="whitespace-nowrap text-sm font-medium text-gray-900">{{ $t('reports.total_amount') }}</p>
                            <p class="whitespace-nowrap text-sm font-bold text-gray-900 text-right">{{ branch_sub?.total_amount?.toFixed(3) }}</p>
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

export default {
    data() {
        return {
            v$: useValidate(),
            has_permission: false,
            form_data: {
                branch_ids: [],
                member_id: null,
                start_date: '',
                end_date: ''
            },
            report_type: '',
            branches: [],
            members: [],
            response: null
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
        ...mapGetters(["membershipSummaryFormData", "membershipSummaryData"]),
        branchesNames() {
            return this.response.branches.map(branch => branch.name_en).toString();
        },
    },
    methods: {
        ...mapActions(["getMembershipSummaryFormData", "getMembershipSummaryData"]),

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

        getReports(type) {
            this.v$.$validate()
            this.report_type = type
            if(!this.v$.$error) {
                this.getMembershipSummaryData({
                    branch_ids: this.form_data.branch_ids,
                    member_id: this.form_data.member_id,
                    start_date: this.$root.formatDateAPI(this.form_data.start_date),
                    end_date: this.$root.formatDateAPI(this.form_data.end_date)
                })
            }
        },
        checkPermissions() {
            let page_permissions = this.$root.getScreenPermissions("Payment Summary")
            this.has_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "payment_summary")
        }
    },
    watch: {
        membershipSummaryFormData(data) {
            if(data != null) {
                this.branches = data.branches
                this.members = data.members
            }
        },
        membershipSummaryData(data) {
            if(data != null) {
                this.response = data
            }
        }
    },
    mounted() {
        this.checkPermissions()
        this.getMembershipSummaryFormData()
    },
}
</script>