<template>
    <div>
        <p class="text-3xl">{{$t('reports.member_lesson_report')}}</p>
        <hr />

        <div class="mt-5 grid grid-cols-8 gap-3 bg-white px-3 py-5">
            <div class="col-span-2">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="branch_ids">
                    {{$t('reports.select_branches')}} *
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
                    <option v-for="(member, index) in members" :key="index" :value="member.id">{{member.name_en}}</option>
                </select>
            </div>

            <div class="col-span-2 mb-1.5">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="payment_ids">
                    {{ $t('reports.trainer_hint') }}
                </label>
                <select name="trainer_id" id="trainer_id" v-model="form_data.trainer_id" aria-placeholder="select trainer"
                    class="h-10 shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    <option v-for="(trainer, index) in trainers" :key="index" :value="trainer.id">{{trainer.name_en}}</option>
                </select>
            </div>

            <div class="col-span-2 mb-1.5">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="payment_ids">
                        {{ $t('reports.lesson_hint') }}
                    </label>
                    <select name="lesson_id" id="lesson_id" v-model="form_data.lesson_id" aria-placeholder="select lesson"
                        class="h-10 shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <option v-for="(lesson, index) in lessons" :key="index" :value="lesson.id">{{lesson.name_en}}</option>
                    </select>
            </div>


            <div class="col-span-2 mb-1.5">
                <label for="start_date" class="font-bold">{{$t('reports.start_date')}}</label>
                <input type="date" :min="todaysDate" v-model="form_data.start_date" format="dd/MM/yyyy"
                    :placeholder="$t('transactions.start_date')"
                    class="shadow appearance-none border rounded w-full mt-1 p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>

            <div class="col-span-2 mb-1.5">
                <label for="end_date" class="font-bold">{{$t('reports.end_date')}}</label>
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

        <div v-if="report?.member_lessons?.length" class="mt-4 bg-white" id="reportData">

            <div class="grid grid-cols-3 gap-x-6 p-4 mb-4">

                <div class="col-span-2">
                    <p class="font-medium text-3xl pt-2 color-primary">MEMBER LESSON TRANSACTION REPORT</p>

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

            <div class="px-4">

                <table class="min-w-full border ">
                    <thead class="border-b py-1 bg-gray-200">
                        <tr>
                            <th scope="col" class="text-sm ps-2 py-2 font-bold text-gray-900 text-left">Sales Date</th>
                            <th scope="col" class="text-sm ps-2 py-2 font-bold text-gray-900 text-left">Invoice #</th>
                            <th scope="col" class="text-sm ps-2 py-2 font-bold text-gray-900 text-left">Member Name</th>
                            <th scope="col" class="text-sm ps-2 py-2 font-bold text-gray-900 text-left">Price</th>
                            <th scope="col" class="text-sm ps-2 py-2 font-bold text-gray-900 text-left">From Date</th>
                            <th scope="col" class="text-sm ps-2 py-2 font-bold text-gray-900 text-left">To Date</th>
                            <th scope="col" class="text-sm ps-2 py-2 font-bold text-gray-900 text-center">Class</th>
                            <th scope="col" class="text-sm ps-2 py-2 font-bold text-gray-900 text-center">Attended</th>
                        </tr>
                    </thead>
                    <tbody>

                        <template v-for="(row, index) in report?.member_lessons" :key="index" >

                            <tr class="border border-bottom">
                                <td colspan="8" class="whitespace-nowrap ps-2 py-2 text-sm font-bold text-gray-900 bg-gray-100">{{ row.name_en }}</td>
                            </tr>

                            <tr v-for="(lesson, index) in row?.branch_member_lessons" :key="index" class="border border-bottom">
                                <td class="whitespace-nowrap ps-2 py-2 text-sm font-medium text-gray-900">{{ lesson.sales_date }}</td>
                                <td class="whitespace-nowrap ps-2 text-sm font-medium text-gray-900">{{ lesson.invoice_no }}</td>
                                <td class="whitespace-nowrap ps-2 text-sm font-medium text-gray-900">{{ lesson.member_name_en }}</td>
                                <td class="whitespace-nowrap ps-2 text-sm font-medium text-gray-900">{{ lesson.price?.toFixed(3) }}</td>
                                <td class="whitespace-nowrap ps-2 text-sm font-medium text-gray-900">{{ lesson.start_date }}</td>
                                <td class="whitespace-nowrap ps-2 text-sm font-medium text-gray-900">{{ lesson.end_date }}</td>
                                <td class="whitespace-nowrap ps-2 text-sm font-medium text-gray-900 text-center">{{ lesson.total_classes }}</td>
                                <td class="whitespace-nowrap ps-2 text-sm font-medium text-gray-900 text-center">{{ lesson.attended_classes }}</td>

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
                member_id: null,
                trainer_id: null,
                lesson_id: null,
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
        ...mapGetters(["memberLessonFormData", "memberLessonData"]),
        branchesNames() {
            const selectedBranches = this.branches?.filter(branch => this.form_data.branch_ids.indexOf(branch.id) !== -1);
            return selectedBranches?.map(branch => ' ' + branch.name_en).toString();
        },
    },
    methods: {
        ...mapActions(["getMemberLessonFormData", "getMemberLessonData"]),
        getReports() {
            this.v$.$validate()
            if (!this.v$.$error) {
                this.getMemberLessonData({
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
                name: "Platinum Gym - Member Lesson Report",
                specs: [],
                styles: [],
            };
            this.$htmlToPaper("reportData", options);
        },
    },
    watch: {
        memberLessonFormData(data) {
            console.log(data)
            if (data != null) {
                this.branches = data.branches
                this.members = data.members
                this.lessons = data.lessons
                this.trainers = data.trainers
            }
        },
        memberLessonData(data) {
            if (data != null) this.report = data
        }
    },
    mounted() {
        this.checkPermissions()
        this.getMemberLessonFormData()
    },
}
</script>