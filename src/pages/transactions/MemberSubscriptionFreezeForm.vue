<template>
    <div id="subscription-freeze-form-modal" class="mt-7 fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
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
                                <div class="mb-1.5">
                                    <label class="block text-gray-700 text-sm font-bold mb-1" >
                                        {{$t('transactions.member_name')}}
                                    </label>
                                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        type="text" disabled
                                        v-model="freeze_subscription.member_name" />
                                </div>
                                <div class="mb-1.5">
                                    <label class="block text-gray-700 text-sm font-bold mb-1" >
                                        {{$t('transactions.package_name')}}
                                    </label>
                                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        type="text" disabled
                                        v-model="freeze_subscription.package_name"/>
                                </div>
                                <div class="grid grid-cols-2 gap-2 mb-1.5">
                                    <div>
                                        <label class="block text-gray-700 text-sm font-bold mb-1" >
                                            {{$t('transactions.start_date')}} *
                                        </label>
                                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            type="date"
                                            format="dd/MM/yyyy"
                                            disabled
                                            v-model="freeze_subscription.start_date" />
                                    </div>
                                    <div>
                                        <label class="block text-gray-700 text-sm font-bold mb-1" >
                                            {{$t('transactions.end_date')}} *
                                        </label>
                                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            type="date"
                                            disabled
                                            format="dd/MM/yyyy"
                                            v-model="freeze_subscription.end_date" />
                                    </div>
                                </div>
                                <div class="grid grid-cols-2 gap-2 mb-1.5">
                                    <div>
                                        <label class="block text-gray-700 text-sm font-bold mb-1" >
                                            {{$t('transactions.freeze_start_date')}} *
                                        </label>
                                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            type="date"
                                            @change="setFreezeEndDate()"
                                            format="dd/MM/yyyy"
                                            v-model="freeze_subscription.freeze_start_date" />
                                        <span class="text-sm text-red-400" v-if="v$.freeze_subscription.freeze_start_date.$error"> {{ v$.freeze_subscription.freeze_start_date.$errors[0].$message }}</span>
                                    </div>
                                    <div>
                                        <label class="block text-gray-700 text-sm font-bold mb-1" >
                                            {{$t('transactions.freeze_end_date')}} *
                                        </label>
                                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            type="date"
                                            format="dd/MM/yyyy"
                                            v-model="freeze_subscription.freeze_end_date" />
                                        <span class="text-sm text-red-400" v-if="v$.freeze_subscription.freeze_end_date.$error"> {{ v$.freeze_subscription.freeze_end_date.$errors[0].$message }}</span>
                                    </div>
                                </div>
                                <div class="mb-1.5">
                                    <label class="block text-gray-700 text-sm font-bold mb-1" >
                                        {{$t('transactions.remark')}} *
                                    </label>
                                    <textarea class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        rows="2"
                                        v-model="freeze_subscription.remark"
                                        :placeholder="$t('transactions.remark')" />
                                    <span class="text-sm text-red-400" v-if="v$.freeze_subscription.remark.$error"> {{ v$.freeze_subscription.remark.$errors[0].$message }}</span>

                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Buttons -->
                    <div class="sm:flex sm:flex-row-reverse">
                        <button type="button" @click="createSubscriptionFreeze" 
                            class="w-full inline-flex justify-center border-2 border-color-primary 
                                shadow-sm px-4 py-2 font-semibold text-base btn-outline-primary 
                                focus:outline-none sm:ms-3 sm:w-auto sm:text-sm">
                            {{this.$t('button.freeze_subscription')}}
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
            modal_title: this.$t('transactions.freeze_subscription'),
            freeze_subscription: {
                member_name: '',
                package_name: '',
                start_date: '',
                end_date: '',
                original_end_date: '',
                freeze_start_date: '',
                freeze_end_date: '',
                remark: '',
            }
        }
    },
    validations() {
        return {
            freeze_subscription: {
                freeze_start_date: { required: helpers.withMessage(this.$root.getErrorMessage('required', 'Freeze Start Date'), required) },
                freeze_end_date: { required: helpers.withMessage(this.$root.getErrorMessage('required', 'Freeze End Date'), required) },
                remark: { required: helpers.withMessage(this.$root.getErrorMessage('required', 'Remark'), required) }
            }
        };
    },
    computed: {
        ...mapGetters(["freezeSubscriptionResponse"]),
    },
    methods: {
        ...mapActions(["freezeSubscription"]),

        closePopup() {
            this.$emit('close-modal');
        },
        createSubscriptionFreeze() {
            this.v$.$validate()
            if(!this.v$.$error) {
                let freeze_start_date = this.$root.formatDateAPI(this.freeze_subscription.freeze_start_date)
                let freeze_end_date = this.$root.formatDateAPI(this.freeze_subscription.freeze_end_date)
                this.freezeSubscription({
                    id: this.freeze_subscription.id,
                    start_date: freeze_start_date,
                    end_date: freeze_end_date,
                    subscription_end_date: this.freeze_subscription.end_date,
                    remark: this.freeze_subscription.remark
                })
            }
        },
        setSelectedSubscription(){
            if(this.selected_subscription) {
                this.freeze_subscription.id = this.selected_subscription.id
                this.freeze_subscription.member_name = this.selected_subscription?.member_name_en
                this.freeze_subscription.package_name = this.selected_subscription?.membership_package?.name_en
                this.freeze_subscription.start_date = this.$root.formatDateUI(this.selected_subscription?.start_date)
                this.freeze_subscription.end_date = this.$root.formatDateUI(this.selected_subscription?.end_date)
                this.freeze_subscription.original_end_date = this.$root.formatDateUI(this.selected_subscription?.end_date)
            }
        },
        setFreezeEndDate(){
            this.freeze_subscription.freeze_end_date = this.$root.addDays(this.freeze_subscription.freeze_start_date, 7)
        }
    },
    watch: {
        freezeSubscriptionResponse(data) {
            if(data.status) {
                this.$toast.success(data.message);
                this.closePopup();
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