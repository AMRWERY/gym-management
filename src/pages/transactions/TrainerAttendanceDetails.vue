<template>
    <div>

        <div class="mb-8">
                <p class="text-3xl">{{ $t('transactions.member_info') }}</p>

                <div class="mt-2 bg-white p-3 grid grid-cols-4 gap-3">
                    <div class="col-span-4">
                        <img width="100" :src="member_details?.image" />
                    </div>

                    <div>

                        <div class="pb-3">
                            <p class="text-sm font-bold">{{ $t('transactions.name') }}</p>
                            <p>{{ member_details?.name_en ?? '-' }}</p>
                        </div>

                        <div class="pb-3">
                            <p class="text-sm font-bold">{{ $t('transactions.birthdate') }}</p>
                            <p>{{ member_details?.birth_date ?? '-' }} <span class="font-medium color-primary">({{ member_details?.age ?? '-' }}y)</span></p>
                        </div>

                        <div class="pb-3">
                            <p class="text-sm font-bold">{{ $t('transactions.gender') }}</p>
                            <p>{{ member_details?.gender ?? '-' }}</p>
                        </div>
                        
                    </div>

                    <div>

                        <div class="pb-3">
                            <p class="text-sm font-bold">{{ $t('transactions.civil_id') }}</p>
                            <p>{{ member_details?.civil_id ?? '-' }}</p>
                        </div>

                        <div class="pb-3">
                            <p class="text-sm font-bold">{{ $t('transactions.civil_id_expiry') }}</p>
                            <p>{{ member_details?.civil_id_expiry ?? '-' }}</p>
                        </div>

                        <div class="pb-3">
                            <p class="text-sm font-bold">{{ $t('transactions.passport') }}</p>
                            <p>{{ member_details?.passport ?? '-' }}</p>
                        </div>
                    </div>

                    <div>
                        <div class="pb-3">
                            <p class="text-sm font-bold">{{ $t('transactions.member_code') }}</p>
                            <p>{{ member_details?.code ?? '-' }}</p>
                        </div>

                        <div class="pb-3">
                            <p class="text-sm font-bold">{{ $t('transactions.email') }}</p>
                            <p>{{ member_details?.email ?? '-' }}</p>
                        </div>

                        <div class="pb-3">
                            <p class="text-sm font-bold">{{ $t('transactions.mobile') }}</p>
                            <p>{{ member_details?.mobile ?? '-' }}</p>
                        </div>
                    </div>

                    <div>
                        <div class="pb-3">
                            <p class="text-sm font-bold">{{ $t('transactions.status') }}</p>
                            <p><span class="text-xs rounded-md text-white px-3 py-1"
                                    :class="member_details?.is_active ? 'text-bg-green' : 'text-bg-red'">{{ member_details?.is_active ? $t('datatable.active') : $t('datatable.inactive') }}</span></p>
                        </div>
                        <div class="pb-3">
                            <p class="text-sm font-bold">{{ $t('transactions.blacklisted') }}</p>
                            <p v-if="member_details?.black_listed"><span class="text-xs rounded-md text-white px-3 py-1 text-bg-red">{{ $t('transactions.blacklisted_till') }} {{ member_details?.black_listed_till ?? '-' }}</span></p>
                            <p v-else>{{ $t('transactions.no') }}</p>
                        </div>

                        <div class="pb-3">
                            <p class="text-sm font-bold">{{ $t('transactions.remark') }}</p>
                            <p>{{ member_details?.remark ?? '-' }}</p>
                        </div>
                    </div>

                </div>
            </div>

        <p class="text-3xl">{{ $t('transactions.trainer_attendance') }}</p>
        <hr class="mb-5" />
        
        <div class="mt-8">
            <custom-data-table
                :enableHeader="true"
                :searchBox="true"
                :searchFields="search_fields"
                :isAddNew="has_add_permission"
                :addBtnText="$t('datatable.add_new')"
                :onAddBtnClicked="onAddNewTrainerAttendance"
                :columns="columns" 
                :view="false" 
                :edit="false" 
                :del="has_delete_permission" 
                :onView="viewTrainerAttendanceInfo"
                :onEdit="editTrainerAttendance" 
                :onDelete="deleteTrainerAttendance" 
                :quickAction="false" 
                :onQuickActionPerformed="onCheck" 
                :hasCustomAction="has_edit_permission"
                :onCustomActionClicked="showTrainerAttendence"
                :customActionBtnText="$t('transactions.update_attendance')"
                :rows="trainer_attendance_list">
            </custom-data-table>
        </div>

        <TrainerAttendanceFormModal v-if="show_trainer_attendance_form" :trainers="trainers" :selected_trainer_attendance="selected_trainer_attendance_info" @close-modal="show_trainer_attendance_form = false"/>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TrainerAttendanceFormModal from './TrainerAttendanceFormModal.vue';

export default {
    components: { TrainerAttendanceFormModal },
    data() {
        return {
            member_id: this.$route.params.id,
            show_trainer_attendance_form: false,
            show_details_form: false,
            search_fields: ["name_en", "civil_id", "remark"],
            columns: [
                { name: "#", attribute: "#", sortable: false },
                { name: this.$t('datatable.subscription_id'), attribute: "subscription_code", sortable: false },
                { name: this.$t('datatable.invoice_no'), attribute: "subscription_code", sortable: false },
                { name: this.$t('datatable.lesson'), attribute: "lesson_package", sortable: false },
                { name: this.$t('datatable.remaining_classes'), attribute: "remaining_class", sortable: false },
                { name: this.$t('datatable.total_classes'), attribute: "total_class", sortable: false },
                { name: this.$t('datatable.start_date'), attribute: "start_date", sortable: false },
                { name: this.$t('datatable.end_date'), attribute: "end_date", sortable: false },
                { name: this.$t('datatable.last_present'), attribute: "last_present", sortable: false },
                { name: this.$t('datatable.action'), attribute: "action", sortable: false  }
            ],
            trainer_attendance_list: [],
            trainers: [],
            member_details: {},
            has_add_permission: false,
            has_edit_permission: false,
            has_delete_permission: false
        }
    },
    computed:{
        ...mapGetters(["trainerAttendance", "trainerAttendanceToast"]),
    },
    methods: {
        ...mapActions(["getTrainerAttendanceDetails"]),

        showTrainerAttendence(id, data){
            this.selected_trainer_attendance_info = data
            this.show_trainer_attendance_form = true
        },

        checkPermissions() {
            let page_permissions = this.$root.getScreenPermissions("Trainer Attendance")
            this.has_edit_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "update_trainer_attendance")
        }
    },
    watch: {
        trainerAttendance(data) {
            if(data != null) {
                this.trainer_attendance_list = data.lesson_subscriptions
                this.trainers = data.trainers
                this.member_details = data.member_details
                console.log(data)
            }
        },
        trainerAttendanceToast(data) {
            if(data.status) {
                this.$toast.success(data.message)
            } else {
                this.$toast.error(data.message)
            }
        }
    },
    mounted() {
        this.checkPermissions()
        this.getTrainerAttendanceDetails(this.member_id)
    },
}
</script>