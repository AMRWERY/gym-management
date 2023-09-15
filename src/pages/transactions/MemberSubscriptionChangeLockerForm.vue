<template>
    <div id="subscription-edit-form-modal" class="mt-7 fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0" >
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

            <div class="inline-block align-bottom bg-white text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <form class="rounded px-2 pt-6 pb-6 mb-2">
                    <tw-icon @click="closePopup" name="heroicons-outline:x" class="w-6 h-6 text-gray-400 ms-auto cursor-pointer"/>
                    <div class="bg-white px-2 pt-4 pb-2 sm:p-0">
                        <div class="mt-3 text-center sm:mt-0 sm:ms-4 sm:text-left">
                            <h2 class="text-2xl text-center leading-6 font-medium text-gray-900" id="modal-title">
                                {{ modal_title }}
                            </h2>
                            <div v-if="subscription_locker_id != ''" class="grid grid-cols-2 gap-4 mb-5 mt-5">
                                <div>
                                    <label class="block text-gray-700 text-sm font-bold mb-1" >
                                        {{$t('transactions.select_new_locker')}}
                                    </label>
                                    <select name="locker_id" id="locker_id" v-model="locker_id"
                                        class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                        <option value="">{{$t('transactions.select_locker')}}</option>
                                        <option v-for="(locker_p, index) in lockers" :key="index" :value="locker_p.id">{{lang == 'ar' ? locker_p.name_ar : locker_p.name_en}}</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-gray-700 text-sm font-bold mb-1" >
                                        {{$t('home.change')}}
                                    </label>
                                    <button type="button" @click="subscriptionEdit()" 
                                        class="w-full inline-flex justify-center border-2 border-color-primary 
                                            shadow-sm px-2 py-2 font-semibold text-base btn-outline-primary 
                                            focus:outline-none ms-0 sm:text-sm">
                                            {{ $t('home.change') }}
                                    </button>
                                </div>
                            </div>
                            <div v-for="locker in selected_subscription?.subscription_locker" :key="locker.id" class="mt-3">
                                <div class="grid grid-cols-4 border-t-2 pt-2 gap-1 mb-1.5">
                                    <div>
                                        <label class="block text-gray-700 text-sm font-bold mb-1" >
                                            {{$t('home.locker_category')}}
                                        </label>
                                        <p>{{ locker?.locker_type?.name_en }}</p>
                                    </div>
                                    <div>
                                        <label class="block text-gray-700 text-sm font-bold mb-1" >
                                            {{$t('home.locker_package')}}
                                        </label>
                                        <p>{{ locker?.locker_package?.name_en }}</p>
                                    </div>
                                    <div>
                                        <label class="block text-gray-700 text-sm font-bold mb-1" >
                                            {{$t('home.locker_number')}}
                                        </label>
                                        <p>{{ locker?.locker?.name_en }}</p>
                                    </div>
                                    <div>
                                        <label class="block text-gray-700 text-sm font-bold mb-1" >
                                            {{$t('home.change')}}
                                        </label>
                                        <button type="button" @click="setChangeLockerDetails(locker.id)" 
                                            class="w-full inline-flex justify-center border-2 border-color-primary 
                                                shadow-sm px-2 py-2 font-semibold text-base btn-outline-primary 
                                                focus:outline-none ms-0 sm:w-auto sm:text-sm">
                                                {{ $t('home.change') }}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Buttons -->
                    <div class="sm:flex sm:flex-row-reverse">
                        <!-- <button type="button" @click="cancelNewInvoice()" 
                            class="w-full inline-flex justify-center border-2 border-color-primary 
                                shadow-sm px-4 py-2 font-semibold text-base btn-outline-primary 
                                focus:outline-none sm:ms-3 sm:w-auto sm:text-sm">
                                {{ $t('button.cancel_invoice') }}
                        </button> -->
                    </div>
                </form>
            </div>
        </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    props: ["selected_subscription", "lockers"],
    data() {
        return {
            create_another: false,
            modal_title: this.$t('datatable.change_locker'),
            locker_id: '',
            subscription_locker_id: '',
            subscription_id: ''
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
            this.updateSubscription({
                id: this.subscription_id,
                locker_id: this.locker_id,
                subscription_locker_id: this.subscription_locker_id,
            })
        },
        setChangeLockerDetails(id){
            this.subscription_locker_id = id
        },
        setSelectedSubscription(){
            if(this.selected_subscription) {
                this.subscription_id = this.selected_subscription.id
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