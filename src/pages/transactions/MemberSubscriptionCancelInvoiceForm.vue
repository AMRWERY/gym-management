<template>
    <div id="invoice-form-modal" class="mt-7 fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" invoice="dialog" aria-modal="true">
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
                                        {{$t('transactions.refund_amount')}} *
                                    </label>
                                    <input disabled class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        type="number"
                                        v-model="invoice.refund_amount" />
                                </div>
                                <div class="mb-1.5">
                                    <label class="block text-gray-700 text-sm font-bold mb-1" for="remark">
                                        {{$t('transactions.remark')}} *
                                    </label>
                                    <textarea class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="remark"
                                        rows="2"
                                        v-model="invoice.remark"
                                        :placeholder="$t('transactions.remark')" />
                                    <span class="text-sm text-red-400" v-if="v$.invoice.remark.$error"> {{ v$.invoice.remark.$errors[0].$message }}</span>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Buttons -->
                    <div class="sm:flex sm:flex-row-reverse">
                        <button type="button" @click="cancelNewInvoice()" 
                            class="w-full inline-flex justify-center border-2 border-color-primary 
                                shadow-sm px-4 py-2 font-semibold text-base btn-outline-primary 
                                focus:outline-none sm:ms-3 sm:w-auto sm:text-sm">
                                {{ $t('button.cancel_invoice') }}
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
    props: ["subscription_details"],
    data() {
        return {
            v$: useValidate(),
            create_another: false,
            invoice: {
                subscription_id: '',
                refund_amount: '',
                remark: ''
            },
            modal_title: this.$t('transactions.cancel_invoice'),
            is_edit_invoice: false
        }
    },
    validations() {
        return {
            invoice: {
                remark: { required: helpers.withMessage(this.$root.getErrorMessage('required', 'Remark'), required) }
            }
        };
    },
    computed: {
        ...mapGetters(["refundSubscriptionResponse"]),
    },
    methods: {
        ...mapActions(["refundSubscription"]),

        closePopup() {
            this.$emit('close-modal');
        },
        cancelNewInvoice() {
            this.v$.$validate()
            if(!this.v$.$error) {
                this.refundSubscription({
                    id: this.invoice.subscription_id,
                    refund_amount: this.invoice.refund_amount,
                    remark: this.invoice.remark
                })
            }
        },
        setSelectedInvoice(){
            if(this.subscription_details) {
                this.invoice.subscription_id = this.subscription_details.id
                this.invoice.refund_amount = this.subscription_details.total_amount_paid
            } 
        }
    },
    watch: {
        refundSubscriptionResponse(data) {
            this.closePopup();
            if(data.status) {
                this.$toast.success(data.message);
                
            } else {
                this.$toast.error(data.message);
            }
        }
    },
    mounted() {
        this.setSelectedInvoice()
    },
}
</script>