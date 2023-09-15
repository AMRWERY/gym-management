<template>
  <div id="locker-dashboard-details-modal" class="mt-7 fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0" >
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

      <span class="sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

      <div class="inline-block align-bottom bg-white text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <form class="rounded px-4 pt-2 pb-6 mb-4">
          <tw-icon @click="$emit('close-modal')" name="heroicons-outline:x" class="w-6 h-6 text-gray-400 ms-auto cursor-pointer mt-2"/>
          <div class="bg-white px-4 pb-0">
            <div class="text-center sm:mt-0 sm:ms-4 sm:text-left">
              <p class="text-center mt-1.5 font-semibold text-xl">{{ $t('home.locker_details') }}</p>
              <div class="my-2 mt-4">
                <div class="sm:grid sm:grid-cols-2 sm:gap-8 my-2 block p-1.5 shadow">
                  <dt class="text-md font-semibold text-gray-700">{{ $t('home.locker_name') }}</dt>
                  <dd class="mt-1 text-md text-gray-900 sm:mt-0 break-words">{{ locker_dashboard?.name_en }}</dd>
                </div>
                <div class="sm:grid sm:grid-cols-2 sm:gap-8 my-2 block p-1.5 shadow">
                  <dt class="text-md font-semibold text-gray-700">{{ $t('home.locker_type') }}</dt>
                  <dd class="mt-1 text-md text-gray-900 sm:mt-0 break-words">{{ locker_dashboard?.locker_type.name_en }}</dd>
                </div>
                <div class="sm:grid sm:grid-cols-2 sm:gap-8 my-2 block p-1.5 shadow">
                  <dt class="text-md font-semibold text-gray-700">{{ $t('home.status') }}</dt>
                  <dd class="mt-1 text-md text-gray-900 sm:mt-0">{{ locker_dashboard?.general.name_en ?? '-' }}</dd>
                </div>
              </div>

              <p class="text-center mt-5 font-semibold text-xl">{{(locker_dashboard?.general.id == locker_status_available) ? 'Last' : 'Current'}} {{ $t('home.member_details') }}</p>
              <div class="my-2 mt-2">
                <div class="sm:grid sm:grid-cols-2 sm:gap-8 my-2 block p-1.5 shadow">
                  <dt class="text-md font-semibold text-gray-700">{{ $t('home.member_name') }}</dt>
                  <dd class="mt-1 text-md text-gray-900 sm:mt-0">{{ locker_dashboard?.subscription_locker?.subscription.member_name_en ?? '-' }}</dd>
                </div>
                <div class="sm:grid sm:grid-cols-2 sm:gap-8 my-2 block p-1.5 shadow">
                  <dt class="text-md font-semibold text-gray-700">{{ $t('home.member_code') }}</dt>
                  <dd class="mt-1 text-md text-gray-900 sm:mt-0">{{ locker_dashboard?.subscription_locker?.subscription.member_code   ?? '-' }}</dd>
                </div>
                <div class="sm:grid sm:grid-cols-2 sm:gap-8 my-2 block p-1.5 shadow">
                  <dt class="text-md font-semibold text-gray-700">{{ $t('home.mobile_no') }}</dt>
                  <dd class="mt-1 text-md text-gray-900 sm:mt-0">{{ locker_dashboard?.subscription_locker?.subscription.mobile   ?? '-' }}</dd>
                </div>
                <div class="sm:grid sm:grid-cols-2 sm:gap-8 my-2 block p-1.5 shadow">
                  <dt class="text-md font-semibold text-gray-700">{{ $t('home.civil_id') }}</dt>
                  <dd class="mt-1 text-md text-gray-900 sm:mt-0">{{ locker_dashboard?.subscription_locker?.subscription.civil_id   ?? '-' }}</dd>
                </div>
                <div class="sm:grid sm:grid-cols-2 sm:gap-8 my-2 block p-1.5 shadow">
                  <dt class="text-md font-semibold text-gray-700">{{ $t('home.start_date') }}</dt>
                  <dd class="mt-1 text-md text-gray-900 sm:mt-0">{{ locker_dashboard?.subscription_locker?.start_date   ?? '-' }}</dd>
                </div>
                <div class="sm:grid sm:grid-cols-2 sm:gap-8 my-2 block p-1.5 shadow">
                  <dt class="text-md font-semibold text-gray-700">{{ $t('home.end_date') }}</dt>
                  <dd class="mt-1 text-md text-gray-900 sm:mt-0">{{ locker_dashboard?.subscription_locker?.end_date   ?? '-' }}</dd>
                </div>
                <div class="sm:grid sm:grid-cols-2 sm:gap-8 my-2 block p-1.5 shadow">
                  <dt class="text-md font-semibold text-gray-700">{{ $t('home.amount') }}</dt>
                  <dd class="mt-1 text-md text-gray-900 sm:mt-0">{{ locker_dashboard?.subscription_locker?.amount   ?? '-' }}</dd>
                </div>
                <div class="sm:grid sm:grid-cols-2 sm:gap-8 my-2 block p-1.5 shadow">
                  <dt class="text-md font-semibold text-gray-700">{{ $t('home.insurance_amount') }}</dt>
                  <dd class="mt-1 text-md text-gray-900 sm:mt-0">{{ locker_dashboard?.subscription_locker?.insurance_amount }}</dd>
                </div>
                <div class="sm:grid sm:grid-cols-2 sm:gap-8 my-2 block p-1.5 shadow">
                  <dt class="text-md font-semibold text-gray-700">{{ $t('home.remark') }}</dt>
                  <dd class="mt-1 text-md text-gray-900 sm:mt-0">{{ locker_dashboard?.remark }}</dd>
                </div>
              </div>  
            </div>
          </div>

          <div class="mt-8 px-8" v-if="show_refund_form" >
            <h1 class="font-bold mb-2" ><u>{{ $t('home.return_insurance_amount') }}</u></h1>
            <div class="grid grid-cols-2 gap-2 mb-1.5" >
              <div>
                  <label class="block text-gray-700 text-sm font-bold mb-1" >
                      {{ $t('home.insurance_amount') }}
                  </label>
                  <input disabled v-model="refund_locker.insurance_amount" type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  />
              </div>
              <div>
                  <label class="block text-gray-700 text-sm font-bold mb-1" >
                      {{ $t('home.refund_amount') }}
                  </label>
                  <input disabled v-model="refund_locker.refund_amount" type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  />
              </div>
            </div>
            <div class="mb-1.5">
                <label class="block text-gray-700 text-sm font-bold mb-1" >
                    {{ $t('home.refund_remark') }}
                </label>
                <textarea 
                v-model="refund_locker.remark"
                rows="2"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  />
            </div>
          </div>
          
          <!-- Buttons -->
          <div v-if="locker_dashboard?.general.id != locker_status_available" class="flex mt-8 justify-between px-8">
                <button v-if="has_refund_locker_insurance_amount_permission && locker_dashboard?.general.id != locker_status_expired" type="button" @click="returnInsuranceAmount()" 
                    class="w-full inline-flex justify-center border-2 border-color-primary 
                        shadow-sm px-4 py-2 font-semibold text-base btn-outline-primary 
                        focus:outline-none sm:ms-3 sm:w-auto sm:text-sm">
                    {{ $t('button.return_insurance_amount') }}
                </button>
                <button v-if="has_release_locker_permission" type="button" @click="lockerRelease()" 
                    class="w-full inline-flex justify-center border-2 border-color-primary 
                        shadow-sm px-4 py-2 font-semibold text-base btn-outline-primary 
                        focus:outline-none sm:ms-3 sm:w-auto sm:text-sm">
                    {{ $t('button.release_locker') }}
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
  props: ["locker_dashboard", "has_refund_locker_insurance_amount_permission", "has_release_locker_permission"],

  data() {
      return {
        show_refund_form: false,
        locker_status_expired: import.meta.env.VITE_APP_LOCKER_STATUS_EXPIRED,
        locker_status_available: import.meta.env.VITE_APP_LOCKER_STATUS_AVAILABLE,
        refund_locker:{
          subscription_locker_id: '',
          insurance_amount: '',
          refund_amount: '',
          remark: ''
        }
      }
  },
  computed:{
      ...mapGetters(["releaseLockerToast", "releaseLockerResponse"]),
  },
  watch: {
    releaseLockerToast(data) {
        if(data.status) {
            this.$toast.success(data.message)
        } else {
            this.$toast.error(data.message)
        }
    },
    releaseLockerResponse(data){
      if(data.id){
        this.$router.push('/refund-invoices/'+data.id)
      }else{
        location.reload();
      }
    }
  },
  methods:{
    ...mapActions(["releaseLocker"]),

    lockerRelease(){
      this.refund_locker.subscription_locker_id = this.locker_dashboard?.subscription_locker?.id
      this.releaseLocker(this.refund_locker)
    },

    returnInsuranceAmount(){
      if(!this.show_refund_form){
        this.show_refund_form = true
        this.refund_locker.subscription_locker_id = this.locker_dashboard?.subscription_locker?.id
        this.refund_locker.insurance_amount = this.locker_dashboard?.subscription_locker?.insurance_amount
        this.refund_locker.refund_amount = this.locker_dashboard?.subscription_locker?.insurance_amount
        this.refund_locker.remark = ''
      }else{
        this.releaseLocker(this.refund_locker)
      }
    }
  }
};
</script>