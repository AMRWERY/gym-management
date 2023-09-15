<template>
    <div id="service-package-details-modal" class="mt-7 fixed z-10 inset-0 overflow-y-auto"
        aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-right sm:block sm:p-0">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span class="sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div
                class="inline-block align-bottom bg-white text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-4/5 me-3 p-2">

                <div class="flex">

                    <div v-if="reports != ''" class="bg-white py-4 px-3">
                        <button type="button" @click="printBookingDetails" class="w-full justify-center
                                shadow-sm px-4 py-1 font-semibold text-base btn-primary 
                                focus:outline-none sm:w-auto sm:text-sm">
                            {{ $t('button.print_report') }}
                        </button>
                    </div>

                    <tw-icon @click="$emit('close-modal')" name="heroicons-outline:x"
                        class="w-6 h-6 text-gray-400 ms-auto cursor-pointer mt-2" />

                </div>

                <div id="printInvoice">

                    <div class="mb-1">
                        <div class="grid grid-cols-3 border p-4">
                            <div class="my-auto">
                                <p class="font-bold">{{invoice_details.branch.name_en}} Branch</p>
                                <p class="">{{invoice_details.branch.address_en}}</p>
                                <p class="font-medium">{{invoice_details.branch.branch_manager_name}}</p>
                            </div>
                            <div class="m-auto">
                                <img class="h-24" :src="invoice_details.branch.logo_url" />
                            </div>
                            <div class="my-auto">
                                <p class="font-bold text-right">{{invoice_details.branch.name_ar}}</p>
                                <p class="text-right">{{invoice_details.branch.address_ar}}</p>
                                <p class="font-medium text-right">{{invoice_details.branch.contact_no}}</p>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 p-4">
                            <h5 class="font-bold text-md text-center mb-3">Duplicate Bill ({{ new Date().toLocaleDateString() }})</h5>
                            <div class="grid grid-cols-2 justify-content-between">
                                <p class="text-sm font-medium">Member Name</p>
                                <p class="text-sm font-bold text-right">{{ invoice_details?.member_name_en ?? '-'}} / {{ invoice_details?.member_name_ar ?? '-' }}</p>
                            </div>
                            <div class="grid grid-cols-2 justify-content-between">
                                <p class="text-sm font-medium">Member Code</p>
                                <p class="text-sm font-medium text-right">{{ invoice_details?.member_code ?? '-' }}</p>
                            </div>
                            <div class="grid grid-cols-2 justify-content-between">
                                <p class="text-sm font-medium">Sales Date</p>
                                <p class="text-sm font-medium text-right">{{ invoice_details?.created_at ?? '-'}}</p>
                            </div>
                            <div class="grid grid-cols-2 justify-content-between">
                                <p class="text-sm font-medium">Invoice #</p>
                                <p class="text-sm font-medium text-right">{{ invoice_details?.invoice_no ?? '-'}}</p>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 px-4 pb-4" v-if="invoice_details.cart_items.length">
                            <h2 class="text-sm font-bold border-b-2">Cart Items</h2>

                            <div v-for="(cart_item, index) in invoice_details.cart_items" :key="index" class="grid grid-cols-4 justify-content-between py-1">
                                <p class="text-sm font-medium">{{ cart_item?.item_name_en }}</p>
                                <p class="text-sm font-medium text-right">KD {{ cart_item?.item_amount?.toFixed(3) ?? '-'}}</p>
                                <p class="text-sm font-medium text-right">{{ cart_item?.quantity ?? '-'}}</p>
                                <p class="text-sm font-medium text-right">KD {{ cart_item?.total_amount?.toFixed(3) ?? '-'}}</p>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 px-4" v-if="invoice_details.cart_items.length">
                            <h2 class="text-sm font-bold border-b-2">Payment Details</h2>

                            <div class="grid grid-cols-2 justify-content-between py-1">
                                <p class="text-sm font-medium">Gross Amount</p>
                                <p class="text-sm font-bold text-right">KD {{invoice_details.sub_total_amount?.toFixed(3)}}</p>
                            </div>

                            <div class="grid grid-cols-2 justify-content-between py-1">
                                <p class="text-sm font-medium">Discount Amount</p>
                                <p class="text-sm font-medium text-right">KD {{invoice_details.discount_total_amount?.toFixed(3)}}</p>
                            </div>

                            <div class="grid grid-cols-2 justify-content-between py-1">
                                <p class="text-sm font-medium">Net Amount</p>
                                <p class="text-sm font-bold text-right">KD {{invoice_details.total_amount?.toFixed(3)}}</p>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: ["invoice_details"],
    methods: {
        printBookingDetails() {
            const options = {
                name: "Platinum Gym",
                specs: [],
                styles: [],
            };
            this.$htmlToPaper("printInvoice", options);
        },
    }
};
</script>