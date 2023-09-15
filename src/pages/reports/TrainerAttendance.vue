<template>
    <div>
        <p class="text-3xl">{{$t("reports.trainer_attendance_report")}}</p>
        <hr />

        <div class="mt-5 grid grid-cols-8 gap-3 bg-white px-3 py-5">
            <div class="col-span-2">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="branch_ids">
                    {{ $t('transactions.select_branches') }} *
                </label>
                <Multiselect mode="tags" :searchable="true" :createTag="true" v-model="form_data.branch_ids"
                    :multiple="true" label="name_en" valueProp='id' placeholder="Select Branches"
                    class="shadow border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    :options="branches" />
                <span class="text-sm text-red-400" v-if="v$.form_data.branch_ids.$error"> {{ v$.form_data.branch_ids.$errors[0].$message }}</span>
            </div>

            <div class="col-span-2 mb-1.5">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="payment_ids">
                    {{ $t('reports.members_hint') }}
                </label>
                <select name="member_id" id="member_id" v-model="form_data.member_id" aria-placeholder="select member"
                    class="h-10 shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    <option value="">{{ $t('reports.members_hint') }}</option>
                    <option v-for="(member, index) in members" :key="index" :value="member.id">{{member.name_en}}</option>
                </select>
            </div>

            <div class="col-span-2 mb-1.5">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="payment_ids">
                    {{ $t('reports.trainer_hint') }}
                </label>
                <select name="trainer_id" id="trainer_id" v-model="form_data.trainer_id" aria-placeholder="select trainer"
                    class="h-10 shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    <option value="">{{ $t('reports.trainer_hint') }}</option>
                    <option v-for="(trainer, index) in trainers" :key="index" :value="trainer.id">{{trainer.name}}</option>
                </select>
            </div>

            <div class="col-span-2 mb-1.5">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="payment_ids">
                        {{ $t('reports.lesson_hint') }}
                    </label>
                    <select name="lesson_id" id="lesson_id" v-model="form_data.lesson_id" aria-placeholder="select lesson"
                        class="h-10 shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <option value="">{{ $t('reports.lesson_hint') }}</option>
                        <option v-for="(lesson, index) in lessons" :key="index" :value="lesson.id">{{lesson.name_en}}</option>
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

        <div v-if="report?.trainer_attendances?.length" class="mt-4 bg-white">

            <div class="grid grid-cols-3 justify-content-between">
                <div class="col-span-2 font-bold px-2 pt-5">
                    <h4 v-if="report?.start_date && report?.end_date">Trainer Attendance Report From {{ report?.start_date }} to {{ report?.end_date }} for Branch: {{ branchesNames }}</h4>
                    <h4 v-else-if="report?.start_date">Trainer Attendance Report From {{ report?.start_date }} for Branch: {{ branchesNames }}</h4>
                    <h4 v-else-if="report?.end_date">Trainer Attendance Report till {{ report?.end_date }} for Branch: {{ branchesNames }}</h4>
                    <h4 v-else>Trainer Attendance Report for Branch: {{ branchesNames }}</h4>
                </div>

                <div v-if="report?.trainer_attendances?.length" class="bg-white text-right py-2 px-3">
                        <button type="button" 
                            @click="printReport"
                            class="w-full shadow-sm px-4 py-2 font-semibold text-base btn-primary 
                                focus:outline-none sm:w-auto sm:text-sm">
                            {{ $t('button.print_report') }}
                        </button>
                    </div>
            </div>


            <div class="mt-1" id="reportData">

                <h4 class="bg-gray-200 col-span-2 p-1 pt-2 font-bold text-center">TRAINER ATTENDANCE TRANSACTION REPORT</h4>

                <table class="min-w-full border ">
                    <thead class="border-b py-1 bg-gray-100">
                        <tr>
                            <th scope="col" class="text-sm py-2 font-bold text-gray-900 text-left ps-2">Invoice #</th>
                            <th scope="col" class="text-sm py-2 font-bold text-gray-900 text-left">Trainer</th>
                            <th scope="col" class="text-sm py-2 font-bold text-gray-900 text-left">Lesson</th>
                            <th scope="col" class="text-sm py-2 font-bold text-gray-900 text-left">Start Date</th>
                            <th scope="col" class="text-sm py-2 font-bold text-gray-900 text-left">End Date</th>
                            <th scope="col" class="text-sm py-2 font-bold text-gray-900 text-left">Attendance</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(row, index) in report?.trainer_attendances" :key="index" class="align-top border border-bottom">
                            <td class="whitespace-nowrap py-2 text-sm font-medium text-gray-900 ps-2">{{ row.inovoice_no }}</td>
                            <td class="whitespace-nowrap py-2 text-sm font-medium text-gray-900">{{ row.trainer_name }}</td>
                            <td class="whitespace-nowrap py-2 text-sm font-medium text-gray-900">{{ row.lesson_en }}<br>({{ row.classes }} Classes)</td>
                            <td class="whitespace-nowrap py-2 text-sm font-medium text-gray-900">{{ row.start_date }}</td>
                            <td class="whitespace-nowrap py-2 text-sm font-medium text-gray-900">{{ row.end_date }}</td>
                            <td class="whitespace-nowrap py-2 text-sm font-medium text-gray-900">
                                <p v-for="(attendance, index) in row?.attendances" :key="index">{{ attendance.member_code }} - {{ attendance.member_name_en }} - {{ attendance.date }}</p>
                            </td>
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
                member_id: '',
                trainer_id: '',
                lesson_id: '',
                start_date: '',
                end_date: ''
            },
            branches: [],
            trainers: [],
            lessons: [],
            members: [],
            report: {}
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
        ...mapGetters(["trainerAttendanceFormData", "trainerAttendanceData"]),
        branchesNames() {
            return this.branches.map(branch => branch.name_en).toString();
        },
    },
    methods: {
        ...mapActions(["getTrainerAttendanceFormData", "getTrainerAttendanceData"]),
        getReports() {
            this.v$.$validate()
            if (!this.v$.$error) {
                this.getTrainerAttendanceData({
                    branch_ids: this.form_data.branch_ids,
                    member_id: this.form_data.member_id,
                    trainer_id: this.form_data.trainer_id,
                    lesson_id: this.form_data.lesson_id,
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
                name: "Platinum Gym - Trainer Attendance Report",
                specs: [],
                styles: [],
            };
            this.$htmlToPaper("reportData", options);
        },
    },
    watch: {
        trainerAttendanceFormData(data) {
            if (data != null) {
                this.branches = data.branches
                this.members = data.members
                this.lessons = data.lessons
                this.trainers = data.trainers
            }
        },
        trainerAttendanceData(data) {
            console.log(data)
            if (data != null) this.report = data
        }
    },
    mounted() {
        this.checkPermissions()
        this.getTrainerAttendanceFormData()
    },
}
</script>