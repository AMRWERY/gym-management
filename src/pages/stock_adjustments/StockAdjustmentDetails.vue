<template>
    <div>
        <div v-if="has_invoice_permission" id="bookingInfo">
            <div class="mb-1" >
                <div class="mt-1 bg-white px-5 py-1 grid grid-cols-3">
                    <div>
                        <p class=""><span class="me-4" >{{ $t('stock_adjustment.branch') }}</span>{{branch.name_en}}</p>
                        <p class="">{{branch.address_en}}</p>
                        <p class=""><span class="me-4" >{{ $t('stock_adjustment.contact_person') }}</span>{{branch.branch_manager_name}}</p>
                    </div>
                    <div class="flex justify-center" >
                        <img :src="branch.logo_url" width="80" />
                    </div>
                    <div>
                        <p class="text-right">{{branch.name_ar}}</p>
                        <p class="text-right">{{branch.address_ar}}</p>
                        <p class="text-right">{{branch.contact_no}}</p>
                    </div>
                </div>

            </div>

            <div v-if="stock_details.stock_history != ''" class="accordion" id="accordion-member-subscription">
                <div class="bg-white border border-gray-200 mb-1">
                    <h2 class="font-bold w-full py-1 px-5 text-base color-primary text-center bg-white border-b" >
                        {{ $t('stock_adjustment.physical_stock_report') }}
                    </h2>
                    <div class="py-1 px-5 flex justify-between">
                        <div>
                            <p><span class="me-5" >{{ $t('stock_adjustment.stock_adjust_by') }}:</span><span>{{stock_details?.stock_history.adjusted_by}}</span></p>
                            <p><span class="me-5" >{{ $t('stock_adjustment.remark') }}: </span><span>{{stock_details?.stock_history.remark}}</span></p>
                        </div>

                        <div>
                            <p><span class="me-5" >{{ $t('stock_adjustment.adjust_on') }}: </span><span>{{stock_details?.stock_history.created_at}}</span></p>
                        </div>
                    </div>
                </div>

                <div class="bg-white border border-gray-200 mb-1">
                    <div class="flex flex-col">
                        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                                <div class="overflow-hidden">
                                    <table class="min-w-full">
                                        <thead class="border-b">
                                            <tr>
                                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                    #
                                                </th>
                                                <th scope="col" class="text-sm text-center font-medium text-gray-900 px-6 py-4 text-left">
                                                    {{ $t('stock_adjustment.item_name') }}
                                                </th>
                                                <th scope="col" class="text-center text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                    {{ $t('stock_adjustment.stock') }}
                                                </th>
                                                <th scope="col" class="text-center text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                    {{ $t('stock_adjustment.cost_price') }}
                                                </th>
                                                <th scope="col" class="text-center text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                    {{ $t('stock_adjustment.sales_price') }}
                                                </th>
                                                <th scope="col" class="text-center text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                    {{ $t('stock_adjustment.total_cost') }}
                                                </th>
                                                <th scope="col" class="text-center text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                    {{ $t('stock_adjustment.total_price') }}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item, index) in stock_details?.stock_history?.items" :key="index" class="border-b">
                                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{index+1}}</td>
                                                <td class="text-sm text-center text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {{item.name_en}}
                                                </td>
                                                <td class="text-sm text-center text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {{item.stock}}
                                                </td>
                                                <td class="text-sm text-center text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {{item.amount}}
                                                </td>
                                                <td class="text-sm text-center text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {{item.sales_amount}}
                                                </td>
                                                <td class="text-sm text-center text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {{item.total_cost_amount}}
                                                </td>
                                                <td class="text-sm text-center text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {{item.total_sales_amount}}
                                                </td>
                                            </tr>
                                        </tbody>
                                        <tfoot>
                                            <tr class="border-b">
                                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ $t('stock_adjustment.total') }}</td>
                                                <td class="text-sm text-center text-gray-900 font-medium px-6 py-4 whitespace-nowrap"></td>
                                                <td class="text-sm text-center text-gray-900 font-medium px-6 py-4 whitespace-nowrap"></td>
                                                <td class="text-sm text-center text-gray-900 font-medium px-6 py-4 whitespace-nowrap">{{ stock_details.cost_amount.toFixed(3) }}</td>
                                                <td class="text-sm text-center text-gray-900 font-medium px-6 py-4 whitespace-nowrap">{{ stock_details.sales_amount.toFixed(3) }}</td>
                                                <td class="text-sm text-center text-gray-900 font-medium px-6 py-4 whitespace-nowrap">{{ stock_details.total_cost_amount.toFixed(3) }}</td>
                                                <td class="text-sm text-center text-gray-900 font-medium px-6 py-4 whitespace-nowrap">{{ stock_details.total_sales_amount.toFixed(3) }}</td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div class="bg-white py-4 px-3 border border-gray-200 mb-1 gap-2 grid grid-cols-2">
            <button v-if="has_invoice_permission" type="button" 
                @click="printBookingDetails"
                class="w-full justify-center border-1 border-color-primary 
                    shadow-sm px-4 py-1 font-semibold text-base btn-primary 
                    focus:outline-none sm:w-auto sm:text-sm">
                {{ $t('button.print') }}
            </button>
        </div>
    </div>
  </template>
  
  <script>
  import { mapActions, mapGetters } from "vuex";
import useValidate from "@vuelidate/core";
  
  export default {
      data() {
          return {
              v$: useValidate(),
              stock_adjust_id: this.$route.params.id,
              stock_details: [],
              branch: [],
              printing: false,
              has_invoice_permission: false
          }
      },
      computed:{
          ...mapGetters(["stockDetails"]),
      },
      methods: {
          ...mapActions(["getStockDetails"]),

          printBookingDetails() {
              const options = {
                  name: "Platinum Gym",
                  specs: [],
                  styles: [
                      "https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
                  ],
              };
              this.$htmlToPaper("bookingInfo", options);
          },

          checkPermissions() {
              let page_permissions = this.$root.getScreenPermissions("Stock Adjustments")
              this.has_invoice_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "view_stock_details")
          },

      },
      watch: {
        stockDetails(data) {
            if(data != null) {
                this.stock_details = data
                this.branch = data?.stock_history?.branch
            }
        }
      },
      mounted() {
          this.checkPermissions()
          this.getStockDetails(this.stock_adjust_id)
      },
  }
  </script>