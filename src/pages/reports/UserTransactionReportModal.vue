<template>
    <div id="service-package-details-modal" class="mt-7 fixed z-10 inset-0 overflow-y-auto"
        aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-right sm:block sm:p-0">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span class="sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div class="inline-block align-bottom bg-white text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-4/5 me-3 p-5">

                <div class="flex">

                    <div v-if="reports != ''" class="bg-white py-4 px-3">
                        <button type="button" 
                            @click="printBookingDetails"
                            class="w-full justify-center
                                shadow-sm px-4 py-1 font-semibold text-base btn-primary 
                                focus:outline-none sm:w-auto sm:text-sm">
                            {{ $t('button.print_report') }}
                        </button>
                    </div>
        
                    <tw-icon @click="$emit('close-modal')" name="heroicons-outline:x" class="w-6 h-6 text-gray-400 ms-auto cursor-pointer mt-2"/>

                </div>

                <div id="bookingInfo">
                    <h4 class="bg-gray-200 p-1 pt-2 font-bold text-left">{{ transaction_report.name?.toUpperCase() }} TRANSACTION REPORT <span class="float-right">Amount: {{ transaction_report.total_amount?.toFixed(3) }}</span></h4>
                    <table class="min-w-full border ">
                        <thead class="border-b py-1">
                            <tr>
                                <th scope="col" class="text-sm ps-2 py-2 font-bold text-gray-900 text-left">Date</th>
                                <th scope="col" class="text-sm font-bold text-gray-900 text-center">
                                    <p>Item Sales</p>
                                    <div class="grid grid-cols-2 justify-content-between">
                                        <p class="font-normal">Qty</p>
                                        <p class="font-normal">Amt</p>
                                    </div>
                                </th>
                                <th scope="col" class="text-sm font-bold text-gray-900 text-center">
                                    <p>Package</p>
                                    <div class="grid grid-cols-2 justify-content-between">
                                        <p class="font-normal">Qty</p>
                                        <p class="font-normal">Amt</p>
                                    </div>
                                </th>
                                <th scope="col" class="text-sm font-bold text-gray-900 text-center">
                                    <p>Small Locker</p>
                                    <div class="grid grid-cols-2 justify-content-between">
                                        <p class="font-normal">Qty</p>
                                        <p class="font-normal">Amt</p>
                                    </div>
                                </th>
                                <th scope="col" class="text-sm font-bold text-gray-900 text-center">
                                    <p>Medium Locker</p>
                                    <div class="grid grid-cols-2 justify-content-between">
                                        <p class="font-normal">Qty</p>
                                        <p class="font-normal">Amt</p>
                                    </div>
                                </th>
                                <th scope="col" class="text-sm font-bold text-gray-900 text-center">
                                    <p>Large Locker</p>
                                    <div class="grid grid-cols-2 justify-content-between">
                                        <p class="font-normal">Qty</p>
                                        <p class="font-normal">Amt</p>
                                    </div>
                                </th>
                                <th scope="col" class="text-sm font-bold text-gray-900 text-center">
                                    <p>Lesson</p>
                                    <div class="grid grid-cols-2 justify-content-between">
                                        <p class="font-normal">Qty</p>
                                        <p class="font-normal">Amt</p>
                                    </div>
                                </th>
                                <th scope="col" class="text-sm font-bold text-gray-900 text-center">
                                    <p>Service</p>
                                    <div class="grid grid-cols-2 justify-content-between">
                                        <p class="font-normal">Qty</p>
                                        <p class="font-normal">Amt</p>
                                    </div>
                                </th>
                                <th scope="col" class="text-sm font-bold text-gray-900 text-center">
                                    <p>Total</p>
                                    <div class="grid grid-cols-2 justify-content-between">
                                        <p class="font-normal">Qty</p>
                                        <p class="font-normal">Amt</p>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(row, index) in transaction_report?.date_datas" :key="index">
                                <td class="whitespace-nowrap ps-2 pb-1 pt-2 text-sm font-medium text-gray-900">
                                    {{ row.date }}</td>
                                <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-center border">
                                    <div class="grid grid-cols-2 justify-content-between">
                                        <p>{{ row.item_sales.quantity }}</p>
                                        <p>{{ row.item_sales.amount?.toFixed(2) }}</p>
                                    </div>
                                </td>
                                <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-center border">
                                    <div class="grid grid-cols-2 justify-content-between">
                                        <p>{{ row.packages.quantity }}</p>
                                        <p>{{ row.packages.amount?.toFixed(2) }}</p>
                                    </div>
                                </td>
                                <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-center border">
                                    <div class="grid grid-cols-2 justify-content-between">
                                        <p>{{ row.locker_types?.find(locker => locker.locker_type == "Small Locker")?.quantity ?? '0' }}</p>
                                        <p>{{ row.locker_types?.find(locker => locker.locker_type == "Small Locker")?.amount?.toFixed(2) ?? '0.00' }}</p>
                                    </div>
                                </td>
                                <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-center border">
                                    <div class="grid grid-cols-2 justify-content-between">
                                        <p>{{ row.locker_types?.find(locker => locker.locker_type == "Medium Locker")?.quantity ?? '0' }}</p>
                                        <p>{{ row.locker_types?.find(locker => locker.locker_type === "Medium Locker")?.amount?.toFixed(2) ?? '0.00' }}</p>
                                    </div>
                                </td>
                                <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-center border">
                                    <div class="grid grid-cols-2 justify-content-between">
                                        <p>{{ row.locker_types?.find(locker => locker.locker_type == "Large Locker")?.quantity ?? '0' }}</p>
                                        <p>{{ row.locker_types?.find(locker => locker.locker_type == "Large Locker")?.amount?.toFixed(2) ?? '0.00' }}</p>
                                    </div>
                                </td>
                                <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-center border">
                                    <div class="grid grid-cols-2 justify-content-between">
                                        <p>{{ row.lesson.quantity }}</p>
                                        <p>{{ row.lesson.amount?.toFixed(2) }}</p>
                                    </div>
                                </td>
                                <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-center border">
                                    <div class="grid grid-cols-2 justify-content-between">
                                        <p>{{ row.service.quantity }}</p>
                                        <p>{{ row.service.amount?.toFixed(2) }}</p>
                                    </div>
                                </td>
                                <td class="whitespace-nowrap text-sm font-medium text-gray-900 text-center border">
                                    <div class="grid grid-cols-2 justify-content-between">
                                        <p>{{ row.total.quantity }}</p>
                                        <p>{{ row.total.amount?.toFixed(2) }}</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                        <!-- <tfoot>
                            <tr class="border-t bg-gray-100" >
                                <td class="whitespace-nowrap text-sm font-bold text-gray-900"></td>
                                <td class="whitespace-nowrap text-sm font-bold text-gray-900"></td>
                                <td class="whitespace-nowrap text-sm font-bold text-gray-900"></td>
                                <td class="whitespace-nowrap text-sm font-bold text-gray-900"></td>
                                <td class="whitespace-nowrap text-sm font-bold text-gray-900 text-center">Lesson Total Amount</td>
                                <td class="whitespace-nowrap text-sm font-bold text-gray-900 text-right">{{row?.locker_total_amount?.toFixed(2)}}</td>
                            </tr>
                        </tfoot> -->
                    </table>
                </div>


            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["transaction_report"],
    methods: {
        printBookingDetails() {
            const options = {
                name: "Platinum Gym",
                specs: [],
                styles: [],
            };
            this.$htmlToPaper("bookingInfo", options);
        },
    }
};
</script>