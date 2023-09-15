<template>
    <div>
      <div class="mb-6" >
        <p class="text-3xl">{{ $t('stock_adjustment.add_stock') }}</p>
      </div>
        <div>
            <form class="rounded px-5 pb-6 mb-2">
                <div class="bg-white py-5 px-5 ">
                    <div class="mt-3 text-center sm:mt-0 sm:text-left">
                        <div class="mt-3">
                            <div class="mb-1.5">
                                <textarea class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="remark"
                                    rows="2"
                                    v-model="item_stock.remark"
                                    :placeholder="$t('stock_adjustment.add_remark')" />
                            </div>
                            <div class="">
                                <div class="accordion" id="accordion-member-subscription">
                                    <div class="bg-white border border-gray-200 mb-8">
                                        <h2 class="font-bold flex items-center w-full py-4 px-5 text-base color-primary text-left bg-white border-b" >
                                            {{ $t('stock_adjustment.list_of_items') }}
                                        </h2>

                                        <div class="grid grid-cols-4 gap-2">
                                            <p class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                #
                                            </p>
                                            <p class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                {{ $t('stock_adjustment.item_name') }}
                                            </p>
                                            <p class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                {{ $t('stock_adjustment.select') }}
                                            </p>
                                            <p class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                {{ $t('stock_adjustment.physical_qty') }}
                                            </p>
                                        </div>

                                        <div v-for="(item, index) in item_list" :key="index" class="grid grid-cols-4 gap-2">
                                            <p class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{index+1}}</p>
                                            <p class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {{item.name_en}}
                                            </p>
                                            <div class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                <input :id="item.id" :value="item.id" name="product" type="checkbox" class="h-5 w-5" v-model="checkedItems"
                                                    @change="check($event)" />
                                                <!-- <input v-model="item.is_selected" class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain me-2 cursor-pointer" type="checkbox" > -->
                                            </div>
                                            <div class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                <input v-model="item.qty" :disabled="!item.is_selected"
                                                    :class="item.is_selected && item.is_error ? 'border-red-500' : 'border-gray-300'"
                                                    class="border appearance-none w-16 rounded py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    type="number" />
                                            </div>
                                        </div>

                                        

                                    </div>

                                    <div class="sm:flex sm:flex-row-reverse">
                                        <button v-if="has_add_permission" @click="addItemStock" type="button" class="w-full inline-flex justify-center border-2 border-color-primary 
                                                                                                        shadow-sm px-4 py-2 font-semibold text-base btn-outline-primary 
                                                                                                        focus:outline-none sm:ms-3 sm:w-auto sm:text-sm">
                                            {{ $t('button.create') }}
                                        </button>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Buttons -->
                
            </form>
        </div>
    </div>
</template>

<script>
import { th } from 'date-fns/locale';
import { mapActions, mapGetters } from "vuex";

export default {
    data() {
        return{
            item_stock: {
                item_ids: [],
                stocks: [],
                remark: ''
            },
            items: [],
            item_list: [],

            checkedItems: []
        }
    },
    computed:{
        ...mapGetters(["stockItemsForm", "addStockResponse"]),
    },
    methods: {
        ...mapActions(["getStockItemsForm", "addStock"]),

        checkPermissions() {
            let page_permissions = this.$root.getScreenPermissions("Stock Adjustments")
            this.has_add_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "add_stock")
        },
        addItemStock(){

            if (this.item_stock.remark == '') {
                
            }

            const selectedItems = this.item_list.filter(item => this.checkedItems.includes(item.id));
            this.item_stock.item_ids = []
            this.item_stock.stocks = []
            selectedItems.forEach(item => {
                const qty = parseInt(item.qty)
                if (qty != '', !isNaN(qty), qty > 0) {
                    this.item_stock.item_ids.push(item.id)
                    this.item_stock.stocks.push(item.qty)
                } else {
                    this.$toast.error(this.$t('error.error_parsing_quantity'))
                }
            })
            
            if (this.item_stock.stocks.length > 0 && this.item_stock.stocks.length == this.checkedItems.length) {
                this.addStock(this.item_stock)
            }
        },

        check(event) {
            this.item_list.find(item => item.id == event.target.value).is_selected = event.target.checked
            if (!event.target.checked) {
                this.item_list.find(item => item.id == event.target.value).qty = ''
            }
        }

    },
    watch: {
        stockItemsForm(data) {
            if(data != null) {
                this.data?.forEach(item => {
                    item.is_selected = false
                    item.qty = ''
                    item.is_error = false
                });
                this.item_list = data
            }
        },
        addStockResponse(data) {
            if(data.status) {
                this.$toast.success(data.message)
                this.$router.push('/stock-adjustments')
            } else {
                this.$toast.error(data.message)
            }
        }
    },
    mounted() {
        this.checkPermissions()
        this.getStockItemsForm()
    },
}
</script>