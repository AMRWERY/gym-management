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
                                <div class="grid grid-cols-2 gap-2 mb-1.5">
                                    <div>
                                        <label class="block text-gray-700 text-sm font-bold mb-1" >
                                            {{$t('transactions.start_date')}}
                                        </label>
                                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            type="date"
                                            format="dd/MM/yyyy"
                                            @change="setMembershipPackageEndDate($event)"
                                            v-model="edit_subscription.start_date" />
                                    </div>
                                    <div>
                                        <label class="block text-gray-700 text-sm font-bold mb-1" >
                                            {{$t('transactions.end_date')}}
                                        </label>
                                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            type="date"
                                            format="dd/MM/yyyy"
                                            v-model="edit_subscription.end_date" />
                                    </div>
                                </div>
                                <div class="mb-1.5">
                                    <label class="block text-gray-700 text-sm font-bold mb-1" >
                                        {{$t('transactions.remark')}} 
                                    </label>
                                    <textarea class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        rows="2"
                                        v-model="edit_subscription.remark"
                                        :placeholder="$t('transactions.remark')" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Buttons -->
                    <div class="sm:flex sm:flex-row-reverse">
                        <button type="button" @click="subscriptionEdit" 
                            class="w-full inline-flex justify-center border-2 border-color-primary 
                                shadow-sm px-4 py-2 font-semibold text-base btn-outline-primary 
                                focus:outline-none sm:ms-3 sm:w-auto sm:text-sm">
                            {{ $t('button.edit_subscription') }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    props: ["selected_subscription"],
    data() {
        return {
            create_another: false,
            modal_title: this.$t('transactions.edit_subscription'),
            edit_subscription: {
                start_date: '',
                end_date: '',
                duration: '',
                remark: '',
            }
        }
    },
    computed: {
        ...mapGetters(["updateSubscriptionResponse"]),
    },
    methods: {
        ...mapActions(["updateSubscription"]),

        closePopup() {
            this.$emit('close-modal');
        },
        subscriptionEdit() {
            let start_date = this.$root.formatDateAPI(this.edit_subscription.start_date)
            let end_date = this.$root.formatDateAPI(this.edit_subscription.end_date)
            this.updateSubscription({
                id: this.edit_subscription.id,
                start_date: start_date,
                end_date: end_date,
                remark: this.edit_subscription.remark
            })
        },
        setMembershipPackageEndDate(){
            this.edit_subscription.end_date = this.$root.addDays(this.edit_subscription.start_date, this.edit_subscription.duration-1)
        },
        setSelectedSubscription(){
            if(this.selected_subscription) {
                this.edit_subscription.id = this.selected_subscription.id
                this.edit_subscription.start_date = this.$root.formatDateUI(this.selected_subscription?.start_date)
                this.edit_subscription.end_date = this.$root.formatDateUI(this.selected_subscription?.end_date)
                this.edit_subscription.duration = this.selected_subscription?.membership_package?.duration
            }
        }
    },
    watch: {
        updateSubscriptionResponse(data) {
            if(data.status) {
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