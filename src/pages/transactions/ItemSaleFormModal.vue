<template>
    <div id="item-sale-form-modal" class="mt-7 fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title"
        role="dialog" aria-modal="true">
        <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

            <div
                class="inline-block align-bottom bg-white text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <form class="rounded px-8 pt-6 pb-6 mb-2">
                    <tw-icon @click="closePopup" name="heroicons-outline:x"
                        class="w-6 h-6 text-gray-400 ms-auto cursor-pointer" />
                    <div class="bg-white px-4 pt-4 pb-2 sm:p-0">
                        <div class="mt-3 text-center sm:mt-0 sm:ms-4 sm:text-left">
                            <h2 class="text-2xl text-center leading-6 font-medium text-gray-900" id="modal-title">
                                {{ modal_title }}
                            </h2>
                        </div>
                    </div>
                    <div class="bg-white border border-gray-200 mb-8">
                        <h2
                            class="font-bold flex items-center w-full py-4 px-5 text-base color-primary text-left bg-white border-b">
                            {{ $t('transactions.payment_details') }}
                        </h2>
                        <div class="py-4 px-5">
                            <div class="mb-2">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="payment_type_id">
                                    {{ $t('transactions.payment_type') }} *
                                </label>
                                <select v-model="payment_detail.payment_type_id"
                                    class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                    <option value="">{{ $t('transactions.select_payment_type') }}</option>
                                    <option v-for="(payment_type, index) in payment_types" :key="index"
                                        :value="payment_type.id">{{ payment_type.name_en }}</option>
                                </select>
                                <span class="text-sm text-red-400" v-if="v$.payment_detail.payment_type_id.$error"> {{
                                    v$.payment_detail.payment_type_id.$errors[0].$message }}</span>
                            </div>

                            <div class="mb-2">
                                <label class="block text-gray-700 text-sm font-bold mb-1">
                                    {{ $t('transactions.amount') }} *
                                </label>
                                <input
                                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="p_amount" type="text" :placeholder="$t('transactions.amount')"
                                    v-model="payment_detail.amount" />
                                <span class="text-sm text-red-400" v-if="v$.payment_detail.amount.$error"> {{
                                    v$.payment_detail.amount.$errors[0].$message }}</span>
                            </div>

                            <div class="mb-1.5">
                                <label class="block text-gray-700 text-sm font-bold mb-1">
                                    {{ $t('transactions.remark') }}
                                </label>
                                <textarea
                                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    rows="2" v-model="payment_detail.remark" :placeholder="$t('transactions.remark')" />
                            </div>

                            <button type="button" @click="addNewPaymentDetail" class="inline-flex justify-center border-2 border-color-primary 
                                    shadow-sm px-4 py-2 font-semibold text-base btn-primary 
                                    focus:outline-none mt-2">
                                {{ $t('button.save_details') }}
                            </button>
                            <button type="button" @click="clearPaymentDetail" class="inline-flex justify-center border-2 border-color-gray
                                    shadow-sm px-4 py-2 font-semibold text-base btn-outline-gray 
                                    focus:outline-none hover:outline-none mt-2 ms-2">
                                {{ $t('button.clear') }}
                            </button>

                            <div v-if="selected_payment_details.length > 0" class="flex flex-col">
                                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div class="py-4 inline-block min-w-full sm:px-6 lg:px-8">
                                        <div class="overflow-hidden">
                                            <table class="min-w-full text-center">
                                                <thead class="border-b bg-gray-800">
                                                    <tr>
                                                        <th scope="col" colspan="4"
                                                            class="text-sm font-medium text-white px-6 py-4">
                                                            {{ $t('transactions.list_of_payment_details') }}
                                                        </th>
                                                    </tr>
                                                </thead>

                                                <thead class="border-b bg-gray-200">
                                                    <tr>
                                                        <th scope="col" class="text-sm font-medium px-6 py-4">
                                                            {{ $t('transactions.payment_type') }}
                                                        </th>
                                                        <th scope="col" class="text-sm font-medium px-6 py-4">
                                                            {{ $t('transactions.amount') }}
                                                        </th>
                                                        <th scope="col" class="text-sm font-medium px-6 py-4">
                                                            {{ $t('transactions.remark') }}
                                                        </th>
                                                        <th scope="col" class="text-sm font-medium px-6 py-4">
                                                            {{ $t('transactions.action') }}
                                                        </th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    <tr v-for="(selected_payment_detail, index) in selected_payment_details"
                                                        :key="index" class="bg-white border-b">
                                                        <td
                                                            class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                            {{ selected_payment_detail.payment_type_name }}
                                                        </td>
                                                        <td
                                                            class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                            {{ selected_payment_detail.amount }}
                                                        </td>
                                                        <td
                                                            class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                            {{ selected_payment_detail.remark }}
                                                        </td>
                                                        <td align="center"
                                                            class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                            <a @click="removePaymentDetail(index)"
                                                                href="javascript:void(0)">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                    viewBox="0 0 24 24" stroke-width="1.5"
                                                                    stroke="currentColor" class="w-6 h-6">
                                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                                </svg>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white border border-gray-200">
                        <h2
                            class="font-bold flex items-center w-full py-4 px-5 text-base color-primary text-left bg-white border-b">
                            {{ $t('transactions.sales_summary') }}
                        </h2>
                        <div class="py-4 px-5">
                            <div class="mb-4">
                                <div>
                                    <select @change="updateDiscount($event)" v-model="item_sale.discount_id"
                                        class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                        <option value="">{{ $t('transactions.select_discount') }}</option>
                                        <option v-for="(discount, index) in discounts" :key="index" :value="discount.id">
                                            {{ discount.name_en }}</option>
                                    </select>

                                    <span v-if="item_sale.discount_id != ''" @click="clearDiscount"
                                        class="px-2 text-danger cursor-pointer">
                                        <u>{{ $t('button.remove') }}</u>
                                    </span>
                                </div>
                            </div>

                            <div class="grid grid-cols-2 gap-2 mb-2">
                                <div>
                                    <label class="block text-gray-700 text-sm font-bold mb-2">
                                        {{ $t('transactions.sub_total_amount') }}: {{ total_cart_amount.toFixed(3) }}
                                    </label>
                                </div>
                                <div>
                                    <label class="block text-gray-700 text-sm font-bold mb-2">
                                        {{ $t('transactions.discount_amount') }}: {{ item_sale.discount_amount.toFixed(3) }}
                                    </label>
                                </div>
                                <div>
                                    <label class="block text-gray-700 text-sm font-bold mb-2">
                                        {{ $t('transactions.total_amount') }}: {{ total_amount.toFixed(3) }}
                                    </label>
                                </div>
                                <div>
                                    <label class="block text-gray-700 text-sm font-bold mb-2 text-success">
                                        {{ $t('transactions.total_amount_paid') }}: {{ total_amount_paid.toFixed(3) }}
                                    </label>
                                </div>
                                <div>
                                    <label class="block text-gray-700 text-sm font-bold mb-2 text-danger">
                                        {{ $t('transactions.amount_remaining') }}: {{ total_remaining_amount.toFixed(3) }}
                                    </label>
                                </div>
                            </div>

                        </div>
                    </div>

                    <!-- Buttons -->
                    <div class="sm:flex sm:flex-row-reverse">
                        <button type="button" @click="addNewItemSale" class="w-full inline-flex justify-center border-2 border-color-primary 
                                shadow-sm px-4 py-2 font-semibold text-base btn-outline-primary 
                                focus:outline-none sm:ms-3 sm:w-auto sm:text-sm">
                            {{ $t('button.save') }}
                        </button>
                        <button type="button" @click="closePopup" class="w-full inline-flex justify-center border-2 border-color-primary 
                                shadow-sm px-4 py-2 font-semibold text-base btn-outline-primary 
                                focus:outline-none sm:ms-3 sm:w-auto sm:text-sm">
                            {{ $t('button.cancel') }}
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
    props: ["item_sale", "total_cart_amount", "discounts", "payment_types", "cart_items"],
    data() {
        return {
            v$: useValidate(),
            payment_detail: {
                payment_type_id: '',
                amount: '',
                remark: ''
            },
            total_amount: 0,
            total_amount_paid: 0,
            total_remaining_amount: 0,
            selected_payment_details: [],
            modal_title: "Total Cart Amount: " + this.total_cart_amount,
        }
    },
    validations() {
        return {
            payment_detail: {
                payment_type_id: { required: helpers.withMessage(this.$root.getErrorMessage('required', 'Payment Type'), required) },
                amount: { required: helpers.withMessage(this.$root.getErrorMessage('required', 'Amount'), required) }
            }
        };
    },
    computed: {
        ...mapGetters(["itemSalesToast", "addItemSaleResponse"]),
    },
    methods: {
        ...mapActions(["addItemSale"]),

        closePopup() {
            this.$emit('close-modal');
        },
        removePaymentDetail(index) {
            this.selected_payment_details.splice(index, 1)
            this.updateItemSalePaymentDetails()
        },
        clearPaymentDetail() {
            this.payment_detail.payment_type_id = ''
            this.payment_detail.amount = ''
            this.payment_detail.remark = ''
            this.v$.payment_detail.$reset();
        },
        addNewPaymentDetail() {
            this.v$.payment_detail.$validate();
            if (!this.v$.payment_detail.$error) {
                this.payment_types.forEach(payment_type => {
                    if (this.payment_detail.payment_type_id == payment_type.id) {
                        this.selected_payment_details.push(
                            {
                                payment_type_id: this.payment_detail.payment_type_id,
                                payment_type_name: payment_type.name_en,
                                amount: this.payment_detail.amount,
                                remark: this.payment_detail.remark
                            }
                        )
                    }
                });
                this.clearPaymentDetail()
                this.updateItemSalePaymentDetails()
            }
        },
        updateItemSalePaymentDetails() {
            this.item_sale.payment_ids = []
            this.item_sale.payment_amounts = []
            this.item_sale.remarks = []
            this.total_amount_paid = 0

            this.selected_payment_details.forEach(selected_payment_detail => {
                this.total_amount_paid += parseFloat(selected_payment_detail.amount)

                this.item_sale.payment_ids.push(selected_payment_detail.payment_type_id)
                this.item_sale.payment_amounts.push(selected_payment_detail.amount)
                this.item_sale.remarks.push(selected_payment_detail.remark)
            });
            this.updateTotals()
        },
        updateDiscount(e) {
            this.updateTotals()
        },
        clearDiscount() {
            this.item_sale.discount_id = ''
            this.updateTotals()
        },
        updateTotals() {
            let discount_id = this.item_sale.discount_id
            this.discounts.forEach(discount => {
                if (discount.id == discount_id) {
                    if (discount.discount_type == 'percentage') {
                        this.item_sale.discount_amount = this.total_cart_amount * (parseFloat(discount.discount_value) / 100)
                    } else {
                        this.item_sale.discount_amount = this.total_cart_amount - parseFloat(discount.discount_value)
                    }
                }
            });

            this.total_amount = this.total_cart_amount - this.item_sale.discount_amount
            this.total_remaining_amount = this.total_amount - this.total_amount_paid
            this.payment_detail.amount = this.total_remaining_amount
        },
        addNewItemSale() {
            if (this.total_remaining_amount == 0) {
                this.addItemSale({
                    member_id: this.item_sale.member_id,
                    discount_id: this.item_sale.discount_id,
                    item_ids: this.item_sale.item_ids,
                    item_qtys: this.item_sale.item_qtys,
                    payment_ids: this.item_sale.payment_ids,
                    payment_amounts: this.item_sale.payment_amounts,
                    remarks: this.item_sale.remarks,
                })
            } else if (this.total_remaining_amount < 0) {
                this.$toast.error(this.$t('error.please_check_your_payments'));
            } else {
                this.$toast.error(this.$t('error.please_complete_your_payment_in_full'));
            }
        }

    },
    watch: {
        itemSalesToast(data) {
            if (data.status) {
                this.$toast.success(data.message);
            } else {
                this.$toast.error(data.message);
            }
        },
        addItemSaleResponse(data) {
            console.log(data)
            if (data.status) {
                this.$toast.success(data.message);
                this.$router.push("/item-sales-invoice/" + data.response.id)
            } else {
                this.$toast.error(data.message);
            }
        }
    },
    mounted() {
        this.updateTotals()
    },
}
</script>