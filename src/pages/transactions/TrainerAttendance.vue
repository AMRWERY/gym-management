<template>
    <div>
        <p class="text-3xl">{{ $t('transactions.members') }}</p>
        <hr class="mb-5" />
        
        <div class="mt-8">
            <custom-data-table
                :enableHeader="true"
                :searchBox="true"
                :searchFields="search_fields"
                :isAddNew="has_add_permission"
                :addBtnText="$t('datatable.add_new')"
                :onAddBtnClicked="onAddNewMember"
                :columns="columns" 
                :view="false" 
                :edit="false" 
                :del="has_delete_permission" 
                :onView="viewMemberInfo"
                :onEdit="editMember" 
                :onDelete="deleteTrainerAttendance" 
                :quickAction="false" 
                :onQuickActionPerformed="onCheck" 
                :hasCustomAction="has_edit_permission"
                :onCustomActionClicked="showTrainerAttendence"
                :customActionBtnText="$t('transactions.trainer_attendance')"
                :rows="trainer_attendance_list">
            </custom-data-table>
        </div>


        <MemberFormModal v-if="show_member_form" :areas="areas" :countries="countries" :branches="branches" :selected_member="selected_member_info" @close-modal="show_member_form = false"/>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MemberFormModal from './MemberFormModal.vue';

export default {
    components: { MemberFormModal },
    data() {
        return {
            show_member_form: false,
            show_details_form: false,
            search_fields: ["name_en", "civil_id", "remark"],
            columns: [
                { name: "#", attribute: "#", sortable: false },
                { name: this.$t('datatable.name'), attribute: "name_en", sortable: false },
                { name: this.$t('datatable.civil_id'), attribute: "civil_id", sortable: false },
                { name: this.$t('datatable.remark'), attribute: "remark", sortable: false },
                { name: this.$t('datatable.is_active'), attribute: "is_active", sortable: false  },
                { name: this.$t('datatable.action'), attribute: "action", sortable: false  }
            ],
            trainer_attendance_list: [],
            branches: [],
            has_add_permission: false,
            has_edit_permission: false,
            has_delete_permission: false
        }
    },
    computed:{
        ...mapGetters(["trainerAttendance", "trainerAttendanceToast"]),
    },
    methods: {
        ...mapActions(["getTrainerAttendance"]),

        showTrainerAttendence(id, data){
            this.$router.push('/trainer-attendance/' + data.id)
        },

        checkPermissions() {
            let page_permissions = this.$root.getScreenPermissions("Trainer Attendance")
            this.has_edit_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "update_trainer_attendance")
        }
    },
    watch: {
        trainerAttendance(data) {
            if(data != null) {
                this.trainer_attendance_list = data

                this.trainer_attendance_list.forEach(member => {
                    member.is_active = member.is_active == 0 ? false : true
                });
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
        this.getTrainerAttendance()
    },
}
</script>