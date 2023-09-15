<template>
    <div>
        <p class="text-3xl">{{ $t('reports.trainer_commission_report') }}</p>
        <hr class="mb-5" />
        
        <div class="mt-8 grid grid-cols-4 gap-3 bg-white px-3 py-5">
            <div class="mb-1.5">
                <label class="block text-gray-700 text-sm font-bold" for="branch_ids">
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

            <div class="mb-1.5">
                    <label class="block text-gray-700 text-sm font-bold" >
                        {{ $t('reports.members_hint') }}
                    </label>
                    <Multiselect
                        :searchable="true"
                        v-model="form_data.member_id"
                        :multiple="false"
                        label="name_en"
                        valueProp='id'
                        :placeholder="$t('reports.members_hint')"
                        class="shadow border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        :options="members"/>
            </div>

            <div class="mb-1.5">
                <label class="block text-gray-700 text-sm font-bold" for="trainer_id">
                    {{ $t('reports.trainer') }}
                </label>
                <select name="trainer_id" id="trainer_id" v-model="form_data.trainer_id"
                    class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    <option value="">{{ $t('reports.trainer_hint') }}</option>
                    <option v-for="(trainer, index) in trainers" :key="index" :value="trainer.id">{{trainer.name}}</option>
                </select>
            </div>

            <div class="mb-1.5">
                <label class="block text-gray-700 text-sm font-bold" for="lesson_id">
                    {{ $t('reports.lesson') }}
                </label>
                <select name="lesson_id" id="lesson_id" v-model="form_data.lesson_id"
                    class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    <option value="">{{ $t('reports.lesson') }}</option>
                    <option v-for="(lesson, index) in lessons" :key="index" :value="lesson.id">{{lesson.name_en}}</option>
                </select>
            </div>

            <div class="mb-1.5">
                <label for="start_date" class="font-bold">{{ $t('reports.start_date') }}</label>
                <input type="date" :min="todaysDate" v-model="form_data.start_date" format="dd/MM/yyyy" :placeholder="$t('reports.start_date')" class="shadow appearance-none border rounded w-full p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
            </div>

            <div class="mb-1.5">
                <label for="end_date" class="font-bold">{{ $t('reports.end_date') }}</label>
                <input type="date" :min="form_data.start_date" v-model="form_data.end_date" format="dd/MM/yyyy" :placeholder="$t('reports.end_date')" class="shadow p-2 appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
            </div>

            <div class="col-span-4 mt-3 gap-4 text-center">
                <button type="button" @click="getReports('details')"
                    class="border-2 border-color-primary shadow-sm px-5 py-2 font-semibold text-base btn-outline-primary mx-2">
                    Detail Report
                </button>

                <button type="button" @click="getReports('summary')"
                    class="border-2 border-color-primary shadow-sm px-5 py-2 font-semibold text-base btn-outline-primary mx-2">
                    Summary Report
                </button>
            </div>
        </div>

        <div v-if="reports != ''" class="mt-4 bg-white py-5" id="bookingInfo" >

            <div class="grid grid-cols-3 gap-x-6 p-4 bg-white">

                <div class="col-span-2">
                    <p class="font-medium text-3xl pt-2 color-primary">{{ $t('reports.lesson_commission_report_caps') }}</p>

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

            <div class="mt-1.5" >
                <!-- <div class="bg-gray-200 p-1 font-bold text-center" >{{ $t('reports.lesson_commission_report_caps') }}</div> -->
                <table class="min-w-full border" >
                    <thead class="border-b bg-gray-200" >
                        <tr v-if="report_type == 'details'">
                            <th scope="col" class="text-sm font-bold text-gray-900 text-left px-4" >{{ $t('reports.attended_date') }}</th>
                            <th scope="col" class="text-sm text-center font-bold text-gray-900 px-6 py-1 text-left">{{ $t('reports.package_name') }}</th>
                            <th scope="col" class="text-sm text-center font-bold text-gray-900 px-6 py-1 text-left">{{ $t('reports.member_name') }}</th>
                            <th scope="col" class="text-sm text-center font-bold text-gray-900 px-6 py-1 text-left">{{ $t('reports.branch_name') }}</th>
                            <th scope="col" class="text-sm text-center font-bold text-gray-900 px-6 py-1 text-left">{{ $t('reports.commision_amount') }}</th>
                            <th scope="col" class="text-sm text-center font-bold text-gray-900 text-right px-4">{{ $t('reports.duty_type') }}</th>
                        </tr>

                        <tr v-if="report_type == 'summary'">
                            <th scope="col" class="text-sm font-bold text-gray-900 text-left px-4" >{{ $t('reports.trainer') }}</th>
                            <th scope="col" class="text-sm text-center font-bold text-gray-900 text-right px-4">{{ $t('reports.amount') }}</th>
                        </tr>
                    </thead>
                    <tbody>

                        <template v-for="(trainer, index) in reports?.trainer_comissions" :key="index">
                            <tr class="w-full border-t border-b" :class="report_type == 'details' ? 'bg-gray-100' : ''">
                                <td :colspan="report_type == 'details' ? 5 : 1" class="whitespace-nowrap text-sm font-bold text-gray-900 px-4 pt-2">{{ trainer.trainer_name }}</td>
                                <td class="whitespace-nowrap text-sm font-bold text-gray-900 px-4 pt-2 text-right">{{ 0.000 }}</td>

                            </tr>
                            <tr v-show="report_type == 'details'" v-for="(report, index) in trainer?.commissions" :key="index">
                                <td class="whitespace-nowrap text-sm font-medium text-gray-900 px-4 py-1">{{ report.attended_date }}</td>
                                <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-center py-1">{{ report.package_name }}</td>
                                <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-center py-1">{{ report.member_name }}</td>
                                <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-center py-1">{{ report.branch_name }}</td>
                                <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-center py-1">{{ report.commission_amount }}</td>
                                <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-right px-4 py-1">{{ report.duty_type }}</td>
                            </tr>
                        </template>
                        
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
                trainer_id: '',
                lesson_id: '',
                member_id: '',
                start_date: '',
                end_date: ''
            },
            report_type: 'details',
            branches: [],
            trainers: [],
            lessons: [],
            reports: [],
            members: []
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
        ...mapGetters(["trainerCommissionReport", "trainerCommissionReportForm"]),
        branchesNames() {
            const selectedBranches = this.branches?.filter(branch => this.form_data.branch_ids.indexOf(branch.id) !== -1);
            return selectedBranches?.map(branch => ' ' + branch.name_en).toString();
        },
    },
    methods: {
        ...mapActions(["getTrainerCommissionReport", "getTrainerCommissionReportForm"]),

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
            if(!this.v$.$error) {
                this.report_type = type
                this.getTrainerCommissionReport({
                    branch_ids: this.form_data.branch_ids,
                    trainer_id: this.form_data.trainer_id,
                    lesson_id: this.form_data.lesson_id,
                    start_date: this.$root.formatDateAPI(this.form_data.start_date),
                    end_date: this.$root.formatDateAPI(this.form_data.end_date),
                    member_id: this.form_data.member_id
                })
            }
        },

        checkPermissions() {
            let page_permissions = this.$root.getScreenPermissions("View Trainer Commission Report")
            this.has_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "locker_refund_report")
        }
    },
    watch: {
        trainerCommissionReport(data) {
            if(data != null) {
                this.reports = data
            }
        },
        trainerCommissionReportForm(data) {
            if(data != null) {
                this.branches = data.branches
                this.trainers = data.trainers
                this.lessons = data.lessons
                this.members = data.members
            }
        }
    },
    mounted() {
        this.checkPermissions()
        this.getTrainerCommissionReportForm()
    },
}
</script>