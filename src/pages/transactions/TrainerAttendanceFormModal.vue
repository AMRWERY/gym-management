<template>
    <div id="trainer-attendance-form-modal" class="mt-7 fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0" >
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

            <div class="inline-block align-bottom bg-white text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <form class="rounded px-8 pt-6 pb-6 mb-2">
                    <tw-icon @click="closePopup" name="heroicons-outline:x" class="w-6 h-6 text-gray-400 ms-auto cursor-pointer"/>
                    <div class="bg-white px-4 pt-4 pb-2 sm:p-0">
                        <div class="mt-3 text-center sm:mt-0 sm:ms-4 sm:text-left">
                            <h2 class="text-2xl text-center leading-6 font-medium text-gray-900" id="modal-title">
                                {{ modal_title }}
                            </h2>
                            <div class="mt-3" id="modal-form-data">
                                <div class="mb-1.5">
                                    <label class="block text-gray-700 text-sm font-bold mb-2" for="trainer">
                                        {{$t('transactions.select_trainer')}} *
                                    </label>
                                    <select name="trainer" id="trainer" v-model="trainer_attendance.user_id"
                                        class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                        <option value="">{{$t('transactions.select_trainer')}}</option>
                                        <option v-for="(trainer, index) in trainers" :key="index" :value="trainer.id">{{trainer.name}}</option>
                                    </select>
                                    <span class="text-sm text-red-400" v-if="v$.trainer_attendance.user_id.$error"> {{ v$.trainer_attendance.user_id.$errors[0].$message }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Buttons -->
                    <div class="sm:flex sm:flex-row-reverse">
                        <button type="button" @click="addNewTrainerAttendance()" 
                            class="w-full inline-flex justify-center border-2 border-color-primary 
                                shadow-sm px-4 py-2 font-semibold text-base btn-outline-primary 
                                focus:outline-none sm:ms-3 sm:w-auto sm:text-sm">
                            {{ $t('button.update') }}
                        </button> 
                    </div>
                </form>
            </div>
        </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import useValidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";

export default {
    props: ["selected_trainer_attendance", "trainers"],
    data() {
        return {
            v$: useValidate(),
            trainer_attendance: {
                subscription_id: '',
                subscription_lesson_id: '',
                user_id: '',
                member_id: ''
            },
            modal_title: this.$t('transactions.trainer_attendance')
        }
    },
    validations() {
        return {
            trainer_attendance: {
                user_id: { required: helpers.withMessage(this.$root.getErrorMessage('required', 'Trainer'), required) }
            }
        };
    },
    computed: {
        ...mapGetters(["addTrainerAttendanceResponse"]),
    },
    methods: {
        ...mapActions(["addTrainerAttendance"]),

        closePopup() {
            this.$emit('close-modal');
        },
        addNewTrainerAttendance() {
            this.v$.$validate()
            if(!this.v$.$error) {
                this.addTrainerAttendance({
                    subscription_id: this.trainer_attendance.subscription_id,
                    subscription_lesson_id: this.trainer_attendance.subscription_lesson_id,
                    user_id: this.trainer_attendance.user_id,
                    member_id: this.trainer_attendance.member_id
                })
            }
        },
        setSelectedTrainerAttendance(){
            this.trainer_attendance.subscription_id = this.selected_trainer_attendance.subscription_id
            this.trainer_attendance.subscription_lesson_id = this.selected_trainer_attendance.subscription_lesson_id
            this.trainer_attendance.member_id = this.selected_trainer_attendance.member_id
        }
    },
    watch: {
        addTrainerAttendanceResponse(data) {
            if(data.status) {
                this.$toast.success(data.message);
                this.closePopup();
            } else {
                this.$toast.error(data.message);
            }
        }
    },
    mounted() {
        this.setSelectedTrainerAttendance()
    },
}
</script>