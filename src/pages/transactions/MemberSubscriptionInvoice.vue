<template>
    <div v-if="branch.name_en" >

        <div class="bg-white" id="bookingInfo">

            <div class="grid grid-cols-3 border p-8">
                <div class="my-auto">
                    <p class="font-bold">{{ branch?.name_en }} branch</p>
                    <p class="">{{ branch?.address_en }}</p>
                    <p class="font-medium">{{ branch?.branch_manager_name }}</p>
                </div>
                <div class="m-auto">
                    <img class="h-24" :src="branch.logo_url" />
                </div>
                <div class="my-auto">
                    <p class="font-bold text-right">{{ branch?.name_ar }} {{ $t('transactions.branch') }}</p>
                    <p class="text-right">{{ branch?.address_ar }}</p>
                    <p class="font-medium text-right">{{ $t('transactions.contact') }}: {{ branch?.contact_no }}</p>
                </div>
            </div>

            <div class="grid grid-cols-1 px-8 py-4">
                <h5 class="font-bold text-md text-center mb-3">{{ $t('transactions.invoice_no') }} #{{
                    subscription_details?.invoice_no
                }}</h5>
                <div class="grid grid-cols-2 justify-content-between">
                    <p class="font-medium">{{ $t('transactions.name') }}</p>
                    <p class="font-bold text-right">{{ subscription_details?.member_name_en ?? '-'}} / {{
                    subscription_details?.member_name_ar ?? '-' }}</p>
                </div>
                <div class="grid grid-cols-2 justify-content-between">
                    <p class="font-medium">{{ $t('transactions.member_id') }}</p>
                    <p class="font-medium text-right">{{ subscription_details?.member?.code ?? '-' }}</p>
                </div>
                <div class="grid grid-cols-2 justify-content-between">
                    <p class="font-medium">{{ $t('transactions.subscription_id') }}</p>
                    <p class="font-medium text-right">{{ subscription_details?.code ?? '-'}}</p>
                </div>
                <div class="grid grid-cols-2 justify-content-between">
                    <p class="font-medium">{{ $t('transactions.date') }}</p>
                    <p class="font-medium text-right">{{ subscription_details?.created_at ?? '-'}}</p>
                </div>
            </div>

            <div class="grid grid-cols-1 px-8 pb-4">
                <h2 class="text-sm font-bold border-b-2 color-primary">{{ $t('transactions.package') }}</h2>

                <div class="grid grid-cols-5 justify-content-between py-1 px-2">
                    <p class="text-sm font-medium col-span-2 font-bold">{{ subscription_details?.membership_package?.name_en }}</p>
                    <p class="text-sm font-medium text-center">{{ $t('transactions.from') }} {{ subscription_details?.start_date ??
                    '-'}}</p>
                    <p class="text-sm font-medium text-center">{{ $t('transactions.to') }} {{ subscription_details?.end_date ??
                    '-'}}</p>
                    <p class="text-sm font-medium text-right">{{ $t('app.currency') }}
                        {{ subscription_details?.membership_package_amount?.toFixed(3) ?? '0.000'}}</p>
                </div>
            </div>

            <div class="grid grid-cols-1 px-8 pb-4" v-if="subscription_details?.subscription_service?.length">
                <h2 class="text-sm font-bold border-b-2 color-primary">{{ $t('transactions.service_details') }}</h2>

                <div v-for="(service, index) in subscription_details.subscription_service" :key="index"
                    class="grid grid-cols-5 justify-content-between py-1 px-2">
                    <p class="text-sm font-medium col-span-2">{{ service?.service_package?.name_en }}</p>
                    <p class="text-sm font-medium text-center">{{ $t('transactions.from') }} {{ service?.start_date ?? '-'}}</p>
                    <p class="text-sm font-medium text-center">{{ $t('transactions.to') }} {{ service?.end_date ?? '-'}}</p>
                    <p class="text-sm font-medium text-right">{{ $t('app.currency') }} {{ service?.amount?.toFixed(3) ??
                    '0.000'}}</p>
                </div>
            </div>

            <div class="grid grid-cols-1 px-8 pb-4" v-if="subscription_details?.subscription_locker?.length">
                <h2 class="text-sm font-bold border-b-2 color-primary">{{ $t('transactions.locker_details') }}</h2>

                <div v-for="(locker, index) in subscription_details.subscription_locker" :key="index"
                    class="grid grid-cols-5 justify-content-between py-1 px-2">
                    <p class="text-sm font-medium col-span-2">{{ locker?.locker_package?.name_en }} ({{ locker?.locker?.name_en }}) <br><span>{{
                        $t('transactions.insurance_amount')
                    }}: {{ $t('app.currency') }}
                            {{ locker.insurance_amount?.toFixed(3) }}</span></p>
                    <p class="text-sm font-medium text-center">{{ $t('transactions.from') }} {{ locker?.start_date ?? '-'}}</p>
                    <p class="text-sm font-medium text-center">{{ $t('transactions.to') }} {{ locker?.end_date ?? '-'}}</p>
                    <p class="text-sm font-medium text-right">{{ $t('app.currency') }} {{ locker?.amount?.toFixed(3) ??
                    '0.000'}}</p>
                </div>
            </div>

            <div class="grid grid-cols-1 px-8 " v-if="subscription_details?.subscription_lesson?.length">
                <h2 class="text-sm font-bold border-b-2 color-primary">{{ $t('transactions.lesson_details') }}</h2>

                <div v-for="(lesson, index) in subscription_details.subscription_lesson" :key="index"
                    class="grid grid-cols-5 justify-content-between py-1 px-2">
                    <p class="text-sm font-medium col-span-2">{{ lesson?.lesson_package?.name_en }}<br><span>{{
                            $t('transactions.classes')
                        }}: {{ lesson?.lesson_package?.no_of_classes }}</span>
                    <br>
                    Coach: {{ lesson?.trainer?.name }}        
                    </p>
                    <p class="text-sm font-medium text-center">{{ $t('transactions.from') }} {{ lesson?.start_date ?? '-'}}</p>
                    <p class="text-sm font-medium text-center">{{ $t('transactions.to') }} {{ lesson?.end_date ?? '-'}}</p>
                    <p class="text-sm font-medium text-right">{{ $t('app.currency') }} {{ lesson?.amount?.toFixed(3) ??
                    '0.000'}}</p>
                </div>
            </div>

            <div class="grid grid-cols-1 px-8">

                <div class="grid grid-cols-2 border-t-2 justify-content-between py-1 pt-3">
                    <p class="text-sm font-bold">{{ $t('transactions.sub_total_amount') }}</p>
                    <p class="text-sm font-bold text-right">{{ $t('app.currency') }}
                        {{ subscription_details.sub_total_amount?.toFixed(3) ?? '0.000' }}</p>
                </div>

                <div class="grid grid-cols-2 justify-content-between py-1">
                    <p class="text-sm font-bold">{{ $t('transactions.discount_amount') }}</p>
                    <p class="text-sm font-bold text-right">{{ $t('app.currency') }}
                        {{ subscription_details.discount_total_amount?.toFixed(3) ?? '0.000' }}</p>
                </div>

                <div class="grid grid-cols-2 justify-content-between py-1">
                    <p class="text-sm font-bold">{{ $t('transactions.total_amount') }}</p>
                    <p class="text-sm font-bold text-right">{{ $t('app.currency') }}
                        {{ subscription_details.total_amount?.toFixed(3) ?? '0.000' }}</p>
                </div>

                <div class="grid grid-cols-2 justify-content-between py-1">
                    <p class="text-sm font-bold">{{ $t('transactions.total_amount_paid') }}</p>
                    <p class="text-sm font-bold text-right">{{ $t('app.currency') }}
                        {{ subscription_details.total_amount_paid?.toFixed(3) ?? '0.000' }}</p>
                </div>

                <div class="grid grid-cols-2 border-b-2 justify-content-between py-1 pb-3">
                    <p class="text-sm font-bold">{{ $t('transactions.amount_remaining') }}</p>
                    <p class="text-sm font-bold text-right">{{ $t('app.currency') }}
                        {{ subscription_details.total_amount_remaining?.toFixed(3) ?? '0.000' }}</p>
                </div>
            </div>

            <div class="grid grid-cols-1 p-8" v-if="subscription_details?.subscription_payment?.length">
                <h2 class="text-sm font-bold pb-1 border-b-2 color-primary">{{ $t('transactions.payment_details') }}
                </h2>

                <div v-for="(payment, index) in subscription_details.subscription_payment" :key="index"
                    class="grid grid-cols-3 justify-content-between py-1 px-2">
                    <p class="text-sm font-medium">{{ payment?.payment?.name_en }}</p>
                    <p class="text-sm font-medium">{{ payment?.remark ?? '-'}}</p>
                    <p class="text-sm font-medium text-right">{{ $t('app.currency') }} {{
                        parseInt(payment?.amount).toFixed(3) ??
                            '0.000'
                    }}</p>
                </div>
            </div>

            <div class="grid grid-cols-1 px-8 py-4 hidden print:grid">
                <div class="flex">
                    <p class="text-sm font-medium">{{ $t('transactions.printed_on') }}:&nbsp;</p>
                    <p class="text-sm font-medium">{{ printed_on }}</p>
                </div>

                <div class="flex">
                    <p class="text-sm font-medium">{{ $t('transactions.printed_by') }}:&nbsp;</p>
                    <p class="text-sm font-medium"> {{ ptinted_by  }}</p>
                </div>
            </div>

        </div>

        <div class="bg-white py-4 px-3 border-gray-200 mb-1 gap-2 grid grid-cols-2">
            <button v-if="has_invoice_permission" type="button" @click="printBookingDetails" class="w-full justify-center border-color-primary 
                  shadow-sm px-4 py-1 font-semibold text-base btn-primary 
                  focus:outline-none sm:w-auto sm:text-sm">
                {{ $t('button.print_invoice') }}
            </button>
            <button type="button" v-if="!subscription_details?.is_cancelled" @click="cancelInvoice" class="w-full justify-center border-1 border-color-primary 
                  shadow-sm px-4 py-1 font-semibold text-base btn-danger 
                  focus:outline-none sm:w-auto sm:text-sm">
                {{ $t('button.cancel_invoice') }}
            </button>
        </div>

        <MemberSubscriptionCancelInvoiceForm v-if="show_cancel_invoice_modal"
            :subscription_details="subscription_details" @close-modal="show_cancel_invoice_modal = false" />

    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import useValidate from "@vuelidate/core";
import MemberSubscriptionCancelInvoiceForm from './MemberSubscriptionCancelInvoiceForm.vue';
import moment from 'moment';

export default {
    components: { MemberSubscriptionCancelInvoiceForm },
    data() {
        return {
            v$: useValidate(),
            subscription_id: this.$route.params.id,
            subscription_details: [],
            printing: false,
            branch: [],
            show_cancel_invoice_modal: false,
            view_member_subscription: false,
            has_invoice_permission: false,
            printed_on: moment().format('DD-MM-YYYY hh:mm a'),
            ptinted_by: JSON.parse(localStorage.getItem("userInfo"))?.user.name
        }
    },
    computed: {
        ...mapGetters(["subscriptions", "subscriptionsToast"]),
    },
    methods: {
        ...mapActions(["getSubscriptionInvoice"]),
        printBookingDetails() {
            let file_name = this.subscription_details.code+'-'+this.subscription_details?.member?.code
            const options = {
                name: file_name,
                specs: [],
                styles: [],
            };
            this.$htmlToPaper("bookingInfo", options);
        },

        cancelInvoice() {
            this.show_cancel_invoice_modal = true
        },

        checkPermissions() {
            let page_permissions = this.$root.getScreenPermissions("Members")
            this.view_member_subscription = this.$root.getPermissionStatus(page_permissions?.permissions, "view_member_subscription")
            this.has_invoice_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "issue_invoice")
        },

    },
    watch: {
        subscriptions(data) {
            if (data != null) {
                this.subscription_details = data
                this.branch = data.branch
            }
        },
        subscriptionsToast(data) {
            if (data.status) {
                this.$toast.success(data.message)
            } else {
                this.$toast.error(data.message)
            }
        },
    },
    mounted() {
        this.checkPermissions()
        this.getSubscriptionInvoice(this.subscription_id)
    },
}
</script>
