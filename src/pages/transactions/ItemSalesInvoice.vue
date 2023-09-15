<template>
    <div>
        <div v-if="has_invoice_permission && invoice_details" class="bg-white" id="bookingInfo">

            <div class="grid grid-cols-3 border py-4 px-8">
                <div class="my-auto">
                    <p class="font-bold">{{ invoice_details?.branch?.name_en }} branch</p>
                    <p class="">{{ invoice_details?.branch?.address_en }}</p>
                    <p class="font-medium">{{ invoice_details?.branch?.branch_manager_name }}</p>
                </div>
                <div class="m-auto">
                    <img class="h-24" :src="invoice_details?.branch.logo_url" />
                </div>
                <div class="my-auto">
                    <p class="font-bold text-right">{{ invoice_details?.branch?.name_ar }} {{ $t('transactions.branch') }}</p>
                    <p class="text-right">{{ invoice_details?.branch?.address_ar }}</p>
                    <p class="font-medium text-right">{{ $t('transactions.contact') }}: {{ invoice_details?.branch?.contact_no }}</p>
                </div>
            </div>

            <div class="grid grid-cols-1 py-4 px-8">
                <h5 class="font-bold text-md text-center mb-3">SALES INVOICE</h5>
                <h5 class="font-bold text-md text-center mb-3">{{ $t('transactions.invoice_no') }} #{{
                    invoice_details?.invoice_no
                }}</h5>
                <div class="grid grid-cols-2 justify-content-between">
                    <p class="font-medium">{{ $t('transactions.name') }}</p>
                    <p class="font-bold text-right">{{ invoice_details?.member_name_en ?? '-'}} / {{
                    invoice_details?.member_name_ar ?? '-' }}</p>
                </div>
                <div class="grid grid-cols-2 justify-content-between">
                    <p class="font-medium">{{ $t('transactions.member_id') }}</p>
                    <p class="font-medium text-right">{{ invoice_details?.member_code ?? '-' }}</p>
                </div>
                <div class="grid grid-cols-2 justify-content-between">
                    <p class="font-medium">{{ $t('transactions.date') }}</p>
                    <p class="font-medium text-right">{{ invoice_details?.created_at ?? '-'}}</p>
                </div>
            </div>

            <div class="grid grid-cols-1 px-8 pb-4" v-if="invoice_details?.cart_items?.length">
                <h2 class="text-sm font-bold border-b-2 color-primary">{{ $t('dashboard.item_sales') }}</h2>
                <div
                    class="grid grid-cols-4 justify-content-between py-1 px-2">
                    <p class="text-sm font-medium col-span-2 font-bold">Name</p>
                    <p class="text-sm font-medium text-center font-bold">Qty.</p>
                    <p class="text-sm font-medium text-right font-bold">Price</p>
                </div> 

                <div v-for="(cart_item, index) in invoice_details.cart_items" :key="index"
                    class="grid grid-cols-4 justify-content-between py-1 px-2">
                    <p class="text-sm font-medium col-span-2">{{ cart_item?.item_name_en }}</p>
                    <p class="text-sm font-medium text-center">{{ cart_item?.quantity ?? '-'}}</p>
                    <p class="text-sm font-medium text-right">{{ $t('app.currency') }} {{ cart_item?.total_amount?.toFixed(3) ??
                    '0.000'}}</p>
                </div> 
            </div>

            <div class="grid grid-cols-1 px-8">

                <div class="grid grid-cols-2 border-t-2 justify-content-between py-1 pt-3">
                    <p class="text-sm font-bold">{{ $t('transactions.sub_total_amount') }}</p>
                    <p class="text-sm font-bold text-right">{{ $t('app.currency') }}
                        {{ invoice_details.sub_total_amount?.toFixed(3) ?? '0.000' }}</p>
                </div>

                <div class="grid grid-cols-2 justify-content-between py-1">
                    <p class="text-sm font-bold">{{ $t('transactions.discount_amount') }}</p>
                    <p class="text-sm font-bold text-right">{{ $t('app.currency') }}
                        {{ invoice_details.discount_total_amount?.toFixed(3) ?? '0.000' }}</p>
                </div>

                <div class="grid grid-cols-2 justify-content-between py-1">
                    <p class="text-sm font-bold">{{ $t('transactions.total_amount') }}</p>
                    <p class="text-sm font-bold text-right">{{ $t('app.currency') }}
                        {{ invoice_details.total_amount?.toFixed(3) ?? '0.000' }}</p>
                </div>

                <div class="grid grid-cols-2 justify-content-between py-1">
                    <p class="text-sm font-bold">{{ $t('transactions.total_amount_paid') }}</p>
                    <p class="text-sm font-bold text-right">{{ $t('app.currency') }}
                        {{ invoice_details.total_amount_paid?.toFixed(3) ?? '0.000' }}</p>
                </div>

                <div class="grid grid-cols-2 border-b-2 justify-content-between py-1 pb-3">
                    <p class="text-sm font-bold">{{ $t('transactions.amount_remaining') }}</p>
                    <p class="text-sm font-bold text-right">{{ $t('app.currency') }}
                        {{ invoice_details.total_amount_remaining?.toFixed(3) ?? '0.000' }}</p>
                </div>
            </div>

            <div class="grid grid-cols-1 py-4 px-8" v-if="invoice_details?.payments?.length">
                <h2 class="text-sm font-bold pb-1 border-b-2 color-primary">{{ $t('transactions.payment_details') }}
                </h2>

                <div v-for="(payment, index) in invoice_details.payments" :key="index"
                    class="grid grid-cols-3 justify-content-between py-1 px-2">
                    <p class="text-sm font-medium">{{ payment?.payment?.name_en }}</p>
                    <p class="text-sm font-medium">{{ payment?.remark ?? ''}}</p>
                    <p class="text-sm font-medium text-right">{{ $t('app.currency') }} {{
                        payment.amount?.toFixed(3) ??
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
                    <p class="text-sm font-medium"> {{ ptinted_by }}</p>
                </div>
            </div>
        </div>

        <div class="bg-white py-4 px-3 border border-gray-200 mb-1 gap-2 grid grid-cols-1">
            <button v-if="has_invoice_permission" type="button" @click="printBookingDetails" class="w-full justify-center border-1 border-color-primary 
                  shadow-sm px-4 py-1 font-semibold text-base btn-primary 
                  focus:outline-none sm:w-auto sm:text-sm">
                {{ $t('button.print_invoice') }}
            </button>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import useValidate from "@vuelidate/core";
import moment from 'moment';

export default {
    data() {
        return {
            v$: useValidate(),
            invoice_id: this.$route.params.id,
            invoice_details: [],
            printing: false,
            has_invoice_permission: false,
            printed_on: moment().format('DD-MM-YYYY hh:mm a'),
            ptinted_by: JSON.parse(localStorage.getItem("userInfo"))?.user.name
        }
    },
    computed: {
        ...mapGetters(["itemInvoiceDetails"]),
    },
    methods: {
        ...mapActions(["getItemInvoiceDetails"]),
        printBookingDetails() {
            const options = {
                name: "Platinum Gym",
                specs: [],
                styles: [],
            };
            this.$htmlToPaper("bookingInfo", options);
        },

        checkPermissions() {
            let page_permissions = this.$root.getScreenPermissions("Item Sales")
            this.has_invoice_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "manage_item_sales")
        },

    },
    watch: {
        itemInvoiceDetails(data) {
            if (data != null) {
                this.invoice_details = data
            }
        }
    },
    mounted() {
        this.checkPermissions()
        this.getItemInvoiceDetails(this.invoice_id)
    },
}
</script>