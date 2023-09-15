<template>
    <div class="grid grid-cols-3 gap-4 pb-5">
        <div class="bg-white shadow rounded">
            <div class="py-3 px-3 border-b border-gray-300 bg-gray-500 text-white">
                <b>{{ $t('transactions.member') }}</b>
            </div>
            <div>
                <input v-on:input="memberSearch" v-model="member_search_keyword"
                    class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text" name="search_member" placeholder="Search Member" />
            </div>
            <div class="px-3 overflow-auto h-52">
                <div v-if="selected_member != ''" class="grid grid-cols-8 border-b py-2 cursor-pointer text-success">
                    <div class="col-span-7">
                        <p><b>{{ selected_member.name_en }}</b></p>
                        <p><b>Phone: {{ selected_member.mobile }}</b></p>
                        <p><b>Code: {{ selected_member.code }}</b></p>
                    </div>
                    <div class="mt-4 color-primary">
                        <svg @click="removeMember" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </div>
                </div>
                <div v-for="(member, index) in members_list" :key="index" class="border-b py-2 cursor-pointer"
                    @click="setMember(member)">
                    <p>{{ member.name_en }}</p>
                    <p>Phone: {{ member.mobile }}</p>
                    <p>Code: {{ member.code }}</p>
                </div>
            </div>
        </div>

        <div class="bg-white shadow rounded col-span-2">
            <div class="py-3 px-3 border-b border-gray-300 bg-gray-500 text-white">
                <b>{{ $t('transactions.cart') }}</b>
            </div>
            <div class="p-3 overflow-auto h-52">
                <div class="grid grid-cols-4 gap-1 border-b">
                    <div class="col-span-2"><b>{{ $t('datatable.item') }}</b></div>
                    <div class="text-center"><b>{{ $t('datatable.quantity') }}</b></div>
                    <div class="text-right"><b>{{ $t('datatable.price') }}</b></div>
                </div>
                <div v-for="(cart, i) in cart_items" :key="i" class="grid grid-cols-4 gap-1 border-b">
                    <div class="col-span-2 py-4">{{ cart.name }}</div>

                    <div class="py-1 text-center">
                        <div class="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                            <button @click="decrement(cart, i)"
                                class="focus:outline-none focus:shadow-outline flex text-center bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
                                <span v-if="cart.qty > 1" class="m-auto text-2xl font-thin">−</span>
                                <span v-else class="m-auto text-2xl font-thin">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </span>
                            </button>
                            <span
                                class="text-center px-4 bg-gray-300 font-semibold text-md flex items-center text-gray-700">{{ cart.qty }}</span>
                            <button @click="increment(cart)"
                                class="focus:outline-none focus:shadow-outline bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
                                <span class="m-auto text-2xl font-thin">+</span>
                            </button>
                        </div>
                    </div>

                    <div class="py-4 text-right">{{ cart.price * cart.qty }}</div>
                </div>
            </div>
            <div class="grid grid-cols-2 p-3">
                <div><b>{{ $t('transactions.total_amount') }}</b></div>
                <div class="text-right"><b>{{ $t('app.currency') }} {{ total_cart_amount?.toFixed(3) ?? '0.000' }}</b></div>
            </div>
            <div v-if="cart_items.length > 0" class="p-3 grid grid-cols-2 gap-1">
                <button type="button" @click="payCart" class="w-full inline-flex justify-center border-none rounded bg-green-500 
                        py-3 font-semibold text-white
                        focus:outline-none sm:text-sm">
                    {{ $t('button.pay') }}
                </button>
                <button type="button" @click="clearCart" class="w-full inline-flex justify-center border-none rounded bg-red-500 
                        py-3 font-semibold text-white
                        focus:outline-none sm:text-sm">
                    {{ $t('button.clear_cart') }}
                </button>
            </div>
        </div>

        <div class="bg-white shadow rounded">
            <div class="py-3 px-3 border-b border-gray-300 bg-gray-500 text-white">
                <b>{{ $t('transactions.item_groups') }}</b>
            </div>
            <div class="grid grid-cols-3 gap-4 p-3 overflow-auto h-80">
                <div v-for="(item_group, index) in item_groups" :key="index" @click="getItems(item_group.items)"
                    class="cursor-pointer bg-gray-200 rounded h-16 text-center px-2 py-5">
                    {{ item_group.name_en }}
                </div>
            </div>
        </div>

        <div class="col-span-2 bg-white shadow rounded">
            <div class="py-3 px-3 border-b border-gray-300 bg-gray-500 text-white">
                <b>{{ $t('transactions.items') }}</b>
            </div>
            <div class="grid grid-cols-4 gap-4 p-3">
                <div v-for="(item, index) in items" :key="index" @click="addToCart(item)"
                    class="cursor-pointer bg-gray-200 rounded text-center px-2 py-2 overflow-x-auto">
                    <p>{{ item.name_en }}</p>
                    <p class="w-min whitespace-nowrap rounded bg-gray-500 mx-auto px-1 pt-1 text-sm text-white">{{
                        $t('app.currency') }} {{ item.sales_amount.toFixed(3) }}</p>
                </div>
            </div>
        </div>

        <ItemSaleFormModal v-if="show_sale_item_form" :item_sale="item_sale" :total_cart_amount="total_cart_amount"
            :discounts="discounts" :payment_types="payment_types" :cart_items="cart_items"
            @close-modal="show_sale_item_form = false" />
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ItemSaleFormModal from './ItemSaleFormModal.vue';

export default {
    components: { ItemSaleFormModal },
    data() {
        return {
            member_search_keyword: '',
            show_sale_item_form: false,
            discounts: [],
            payment_types: [],
            item_groups: [],
            items: [],
            item_sale: {
                member_id: '',
                discount_id: '',
                discount_amount: 0,
                item_ids: [],
                item_qtys: [],
                payment_ids: [],
                payment_amounts: [],
                remarks: [],
            },
            members: [],
            members_list: [],
            cart_items: [],
            total_cart_amount: 0,
            selected_member: []
        }
    },
    computed: {
        ...mapGetters(["itemSales", "itemSalesToast", "addItemSaleResponse"]),
    },
    methods: {
        ...mapActions(["getItemSales", "itemSalesToast", "addItemSale"]),
        setItemSale() {
            this.item_sale.item_ids = []
            this.item_sale.item_qtys = []
            this.cart_items.forEach(cart_item => {
                this.item_sale.item_ids.push(cart_item.id)
                this.item_sale.item_qtys.push(cart_item.qty)
            });
        },
        checkPermissions() {
            let page_permissions = this.$root.getScreenPermissions("Item Sales")
            this.has_add_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "manage_item_sales")
        },
        increment(cart) {
            cart.qty++
            this.updateTotal()
        },
        decrement(cart, index) {
            if (cart.qty > 1) {
                cart.qty--
            } else {
                this.cart_items.splice(index, 1)
            }
            this.updateTotal()
        },
        clearCart() {
            this.cart_items = []
            this.updateTotal()
        },
        payCart() {
            if (this.item_sale.member_id != '') {
                this.show_sale_item_form = true
            } else {
                this.$toast.error('Please choose member')
            }
        },
        memberSearch() {
            if (this.member_search_keyword) {
                this.members_list = []
                this.members.forEach(member => {
                    if (String(member.name_en).toLowerCase().includes(String(this.member_search_keyword).toLowerCase()) || String(member.mobile).toLowerCase().includes(String(this.member_search_keyword).toLowerCase()) || String(member.code).toLowerCase().includes(String(this.member_search_keyword).toLowerCase())) {
                        this.members_list.push(member);
                    }
                });
            } else {
                this.members_list = []
            }
        },
        getItems(items) {
            this.items = items
        },
        addToCart(item) {
            let new_item = true
            this.cart_items.forEach(cart_item => {
                if (cart_item.id == item.id) {
                    new_item = false
                    cart_item.qty++
                }
            });

            if (new_item) {
                let cart_item_object = []
                cart_item_object.id = item.id
                cart_item_object.name = item.name_en
                cart_item_object.qty = 1
                cart_item_object.price = item.sales_amount
                this.cart_items.push(cart_item_object)
            }
            this.updateTotal()
        },
        setMember(member) {
            this.item_sale.member_id = member.id
            this.selected_member = member
            this.members_list = []
            this.member_search_keyword = ''
        },
        removeMember() {
            this.item_sale.member_id = ''
            this.selected_member = []
            this.members_list = []
            this.member_search_keyword = ''
        },
        updateTotal() {
            this.total_cart_amount = 0
            this.cart_items.forEach(cart_item => {
                this.total_cart_amount += parseFloat(cart_item.price) * parseInt(cart_item.qty)
            });
            this.setItemSale()
        }
    },
    watch: {
        itemSales(data) {
            if (data != null) {
                this.discounts = data.discounts
                this.discounts_list = data.discounts
                this.item_groups = data.item_groups
                this.members = data.members
                this.payment_types = data.payment_types
            }
        },
        itemSalesToast(data) {
            if (data.status) {
                this.$toast.success(data.message)
            } else {
                this.$toast.error(data.message)
            }
        },
        addItemSalesResponse(data) {
            if (data.status) {
                this.$toast.success(data.message)
            } else {
                this.$toast.error(data.message)
            }
        }
    },
    mounted() {
        this.checkPermissions()
        this.getItemSales()
    },
}
</script>