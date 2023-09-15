<template>
    <div>
        <div class="flex justify-between" >
            <p class="text-3xl">{{$t('dashboard.search')}}</p>
            <div class="grid grid-cols-4 gap-3">
                <span><span class="rounded-full bg-success px-2 text-white" >{{available_lockers}}</span> {{ $t('home.available') }}</span>
                <span><span class="rounded-full bg-error px-2 text-white" >{{expired_lockers}}</span> {{ $t('home.expired') }}</span>
                <span><span class="rounded-full bg-warning px-2 text-white" >{{rented_lockers}}</span> {{ $t('home.rented') }}</span>
                <span><span class="rounded-full bg-info px-2 text-white" >{{reserved_lockers}}</span> {{ $t('home.reserved') }}</span>
            </div>
        </div>
        <hr class="mb-5" />
        <div class="w-3/4" >
            <form @submit.prevent="searchLocker" class="shadow flex md:me-44" >
              <input
                v-model="search_keyword"
                class="w-full rounded p-2 focus:outline-none"
                type="text"
                placeholder="Search Locker using Mobile, Civil ID, Member Code"
              />
              <button type="submit" class="bg-white w-auto px-2 flex justify-end items-center">
                <img class="search-icon" src="@/assets/search_primary.svg" />
              </button>
            </form>
        </div>

        <div class="grid grid-cols-4 mt-1 bg-white shadow p-4" >
            <div>
                <h4 class="font-bold border-b pb-1" >{{ $t('home.locker_category') }}</h4>
                <p class="pt-2" >{{member_locker?.locker_type?.name_en}}</p>
            </div>
            <div>
                <h4 class="font-bold border-b pb-1" >{{ $t('home.locker_package') }}</h4>
                <p class="pt-2" >{{member_locker?.subscription_locker?.locker_package?.name_en}}</p>
            </div>
            <div>
                <h4 class="font-bold border-b pb-1" >{{ $t('home.locker_number') }}</h4>
                <p class="pt-2" >{{member_locker?.name_en}}</p>
            </div>
            <div>
                <h4 class="font-bold border-b pb-1 mb-2" >{{ $t('home.view_details') }}</h4>
                <a v-if="member_locker?.locker_type" class="cursor-pointer" @click="showLockerInfo(member_locker)" >
                    <tw-icon name="heroicons-outline:eye" class="w-6 h-6 color-primary"/>    
                </a>
            </div>
        </div>

        <p class="text-3xl mt-8">{{$t('dashboard.locker_dashboard')}}</p>
        <div v-for="(locker_type, index) in locker_types_list" :key="index" class="accordion-item bg-white border border-gray-200 mt-1 mb-4">
            <h2 class="accordion-header mb-0" :id="('heading-'+index)">
                <button class="accordion-button relative font-bold flex items-center w-full py-4 px-5 text-base color-primary text-left bg-white border-0 rounded-none transition focus:outline-none" type="button" data-bs-toggle="collapse" :data-bs-target="('#collapse-'+index)" aria-expanded="true"
                    :aria-controls="('collapse-'+index)">
                    {{locker_type.name_en}}
                </button>
            </h2>
            <div :id="('collapse-'+index)" class="accordion-collapse collapse show" :aria-labelledby="('heading-'+index)">
                <div class="accordion-body py-4 px-5">
                    <div class="grid grid-cols-10 gap-2">
                        <div v-for="(locker_dashboard, index) in locker_type.lockers" :key="index" @click="showLockerInfo(locker_dashboard)" :class="{'bg-success': locker_dashboard.general.id == locker_status_available, 'bg-error': locker_dashboard.general.id == locker_status_expired, 'bg-warning': locker_dashboard.general.id == locker_status_rented, 'bg-info': locker_dashboard.general.id == locker_status_reserved}" class="rounded py-3 text-white cursor-pointer font-bold text-center"  >
                            {{locker_dashboard.name_en}}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <LockerDashboardDetailsModal :has_release_locker_permission="has_release_locker_permission" :has_refund_locker_insurance_amount_permission="has_refund_locker_insurance_amount_permission" v-if="show_details_form" :locker_dashboard="locker_dashboard_info" @close-modal="show_details_form = false"/>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import LockerDashboardDetailsModal from './LockerDetailsModal.vue';

export default {
    components: { LockerDashboardDetailsModal },
    data() {
        return {
            show_locker_dashboard_form: false,
            show_details_form: false,
            locker_types_list: [],
            member_locker: [],
            available_lockers: 0,
            expired_lockers: 0,
            rented_lockers: 0,
            reserved_lockers: 0,
            has_refund_locker_insurance_amount_permission: false,
            has_release_locker_permission: false,
            search_keyword: '',
            locker_status_expired: import.meta.env.VITE_APP_LOCKER_STATUS_EXPIRED,
            locker_status_available: import.meta.env.VITE_APP_LOCKER_STATUS_AVAILABLE,
            locker_status_rented: import.meta.env.VITE_APP_LOCKER_STATUS_RENTED,
            locker_status_reserved: import.meta.env.VITE_APP_LOCKER_STATUS_RESERVED
        }
    },
    computed:{
        ...mapGetters(["lockerDashboard", "memberLockerDashboard", "lockerDashboardToast", "updateLockerDashboardResponse"]),
    },
    methods: {
        ...mapActions(["getLockerDashboard", "searchLockerDashboard", "updateLockerDashboard", "deleteLockerDashboard"]),

        searchLocker(){
            this.searchLockerDashboard(this.search_keyword)
        },
        showLockerInfo(data) {
            this.locker_dashboard_info = data
            this.show_details_form = true
        },
        onAddNewLockerDashboard() {
            this.showPopup('add')
        },
        showPopup(type, data) {
            if(type == "add"){
                this.selected_locker_dashboard_info = "";
                this.show_locker_dashboard_form = true;
            } else if(type == "edit"){
                this.selected_locker_dashboard_info = data;
                this.show_locker_dashboard_form = true;
            }
        },
        closePopup() {
            this.show_locker_dashboard_form = false;
        },
        editLockerDashboard(id, data) {
            this.showPopup('edit', data);
        },
        deleteLockerDashboard(id){
            if (confirm(this.$t('datatable.are_you_sure'))) {
                this.deleteLockerDashboard(id);
            }
        },
        onCheck(event, id, data){
            this.updateLockerDashboard({
                id: id,
                name_en: data.name_en,
                name_ar: data.name_ar,
                address_en: data.address_en,
                address_ar: data.address_ar,
                invoice_type: data.invoice_type,
                invoice_prefix: data.invoice_prefix,
                remark: data.remark,
                is_active: event.target.checked
            })
        },

        checkPermissions() {
            let page_permissions = this.$root.getScreenPermissions("Locker Dashboard")
            this.has_refund_locker_insurance_amount_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "refund_locker_insurance_amount")
            this.has_release_locker_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "release_locker")
        }
    },
    watch: {
        lockerDashboard(data) {
            if(data != null) {
                this.locker_types_list = data.locker_types
                this.available_lockers = data.available_lockers
                this.expired_lockers = data.expired_lockers
                this.rented_lockers = data.rented_lockers
                this.reserved_lockers = data.reserved_lockers
            }
        },
        memberLockerDashboard(data){
            this.member_locker = data
        },
        lockerDashboardToast(data) {
            if(data.status) {
                this.$toast.success(data.message)
            } else {
                this.$toast.error(data.message)
            }
        },
        updateLockerDashboardResponse(data) {
            if(data.status) {
                this.$toast.success(data.message)
                this.$router.go(0)
            } else {
                this.$toast.error(data.message)
            }
        }
    },
    mounted() {
        this.checkPermissions()
        this.getLockerDashboard()
    },
}
</script>