<template>
    <div id="subscription-edit-form-modal" class="mt-7 fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
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
                            <div class="mt-3">
                                <div class="mb-4" >
                                    <div class="rounded p-2 bg-red-100 text-red-500" >
                                        <b class="text-sm" ><i>{{ diff_days }} days left for the freeze to end. Your freezing end date is {{ selected_subscription.subscription_freeze.end_date }}</i></b>
                                    </div>
                                </div>

                                <div class="grid grid-cols-2 gap-2 mb-1.5">
                                    <div class="mb-1.5">
                                        <label class="block text-gray-700 text-sm font-bold mb-1" >
                                            {{$t('transactions.member_name')}}
                                        </label>
                                        <span>{{ selected_subscription.member_name_en }}</span>
                                    </div>
                                    <div class="mb-1.5">
                                        <label class="block text-gray-700 text-sm font-bold mb-1" >
                                            {{$t('transactions.package_name')}}
                                        </label>
                                        <span>{{ selected_subscription.membership_package.name_en }}</span>
                                    </div>
                                </div>
                                <div class="grid grid-cols-2 gap-2 mb-1.5">
                                    <div>
                                        <label class="block text-gray-700 text-sm font-bold mb-1" >
                                            Membership Start Date
                                        </label>
                                        <span>{{ selected_subscription.start_date }}</span>
                                    </div>
                                    <div>
                                        <label class="block text-gray-700 text-sm font-bold mb-1" >
                                            Membership End Date
                                        </label>
                                        <span>{{ selected_subscription.end_date }}</span>

                                    </div>
                                </div>
                                <div class="grid grid-cols-2 gap-2 mb-1.5">
                                    <div>
                                        <label class="block text-gray-700 text-sm font-bold mb-1" >
                                            {{$t('transactions.freeze_start_date')}}
                                        </label>
                                        <span>{{ selected_subscription.subscription_freeze.start_date }}</span>
                                    </div>
                                    <div>
                                        <label class="block text-gray-700 text-sm font-bold mb-1" >
                                            {{$t('transactions.freeze_end_date')}}
                                        </label>
                                        <span>{{ selected_subscription.subscription_freeze.end_date }}</span>

                                    </div>
                                </div>
                                
                                <div class="mb-1.5">
                                    <label class="block text-gray-700 text-sm font-bold mb-1" >
                                        {{$t('packages.freeze_cancel_reason')}}  *
                                    </label>
                                    <textarea class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        rows="2"
                                        v-model="cancel_freeze.remark"
                                        :placeholder="$t('transactions.remark')" />
                                    <span class="text-sm text-red-400" v-if="v$.cancel_freeze.remark.$error"> {{ v$.cancel_freeze.remark.$errors[0].$message }}</span>

                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Buttons -->
                    <div class="sm:flex sm:flex-row-reverse">
                        <button type="button" @click="freezeCancel" 
                            class="w-full inline-flex justify-center border-2 border-color-primary 
                                shadow-sm px-4 py-2 font-semibold text-base btn-outline-primary 
                                focus:outline-none sm:ms-3 sm:w-auto sm:text-sm">
                            {{ $t('button.cancel_freeze') }}
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
    props: ["selected_subscription"],
    data() {
        return {
            v$: useValidate(),
            create_another: false,
            modal_title: this.$t('button.cancel_freeze'),
            diff_days: '',
            cancel_freeze: {
                id: '',
                end_date: new Date().toLocaleDateString('fr-CA'),
                remark: '',
            }
        }
    },
    validations() {
        return {
            cancel_freeze:{
                remark: { required: helpers.withMessage(this.$root.getErrorMessage('required', 'Reason'), required) }
            }
        }

    },
    computed: {
        ...mapGetters(["cancelFreezeResponse"]),
    },
    methods: {
        ...mapActions(["cancelFreeze"]),

        closePopup() {
            this.$emit('close-modal');
        },
        freezeCancel() {
            this.v$.cancel_freeze.$validate();
            if(!this.v$.cancel_freeze.$error) {
                let end_date = this.$root.formatDateAPI(this.cancel_freeze.end_date)
                this.cancelFreeze({
                    id: this.cancel_freeze.id,
                    end_date: end_date,
                    remark: this.cancel_freeze.remark
                })
            }
            
        },
        setSelectedSubscription(){
            if(this.selected_subscription) {
                this.cancel_freeze.id = this.selected_subscription?.subscription_freeze?.id
                this.diff_days = this.$root.diffDays(this.selected_subscription?.subscription_freeze?.end_date)
            }
        }
    },
    watch: {
        cancelFreezeResponse(data) {
            if(data.status) {
                this.$toast.success(data.message);
                this.v$.$reset();
                this.$router.push('/freezed-invoices')
            } else {
                this.$toast.error(data.message);
            }
        }
    },
    mounted() {
        this.setSelectedSubscription()
    },
}
</script>