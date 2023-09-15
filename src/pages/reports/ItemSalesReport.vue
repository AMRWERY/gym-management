<template>
    <div>
        <p class="text-3xl">{{$t('datatable.item_sales_report')}}</p>
        <hr class="" />
        
        <div class="grid grid-cols-3 gap-3 bg-white px-3 py-5">
            <div>
                <label class="block text-gray-700 text-sm font-bold" for="branch_ids">
                    {{ $t('reports.select_branches') }} *
                </label>
                <Multiselect
                    mode="tags"
                    :searchable="true"
                    :createTag="true"
                    v-model="form_data.branch_ids"
                    :multiple="true"
                    label="name_en"
                    valueProp='id'
                    :placeholder="$t('reports.select_branches')"
                    class="shadow border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    :options="branches"/>
                <span class="text-sm text-red-400" v-if="v$.form_data.branch_ids.$error"> {{ v$.form_data.branch_ids.$errors[0].$message }}</span>
            </div>

            <div>
                <label class="block text-gray-700 text-sm font-bold" for="item_ids">
                    {{ $t('reports.select_items') }}
                </label>
                <Multiselect
                    mode="tags"
                    :searchable="true"
                    :createTag="true"
                    v-model="form_data.item_ids"
                    :multiple="true"
                    label="name_en"
                    valueProp='id'
                    :placeholder="$t('reports.select_items')"
                    class="shadow border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    :options="items"/>
            </div>

            <div>
                <label class="block text-gray-700 text-sm font-bold" >
                    {{ $t('reports.members_hint') }}
                </label>
                <Multiselect
                    :searchable="true"
                    v-model="form_data.member_id"
                    :multiple="false"
                    label="name_en"
                    valueProp='id'
                    :placeholder="$t('reports.members_hint')"
                    class="shadow border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    :options="members"/>
            </div>

            <div>
                <label for="start_date" class="font-bold">{{ $t('reports.start_date') }}</label>
                <input type="date" :min="todaysDate" v-model="form_data.start_date" format="dd/MM/yyyy" placeholder="$t('reports.start_date')" class="shadow appearance-none border rounded w-full p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
            </div>

            <div>
                <label for="end_date" class="font-bold">{{ $t('reports.end_date') }}</label>
                <input type="date" :min="form_data.start_date" v-model="form_data.end_date" format="dd/MM/yyyy" :placeholder="$t('reports.end_date')" class="shadow p-2 appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
            </div>

            <div class="col-span-3 mt-3 gap-4 text-center">
                <button type="button" @click="getReports('details')"
                    class="border-2 border-color-primary shadow-sm px-5 py-2 font-semibold text-base btn-outline-primary mx-2">
                    Detail Report
                </button>

                <button type="button" @click="getReports('summary')"
                    class="border-2 border-color-primary shadow-sm px-5 py-2 font-semibold text-base btn-outline-primary mx-2">
                    Summary Report
                </button>
            </div>

        </div>

        <div v-if="reports.branch_sales?.length" class="mt-4 bg-white" id="bookingInfo">

            <div class="grid grid-cols-3 gap-x-6 p-4 bg-white">

                <div class="col-span-2">
                    <p class="font-medium text-3xl pt-2 color-primary">{{ $t('reports.item_sales_details_caps') }}</p>

                    <div class="text-base font-medium text-gray-800">
                        <span v-if="form_data.start_date">From {{ form_data?.start_date }} </span>
                        <span v-if="form_data.end_date">Upto {{ form_data?.end_date }} </span>
                        <span>&nbsp;{{ $t('reports.for_branch') }}: {{ branchesNames }} </span>
                    </div>
                </div>

                <div class="print:hidden text-right">
                    <button type="button" @click="printBookingDetails"
                        class="h-10 px-4 font-semibold text-base btn-primary mx-2">
                        {{ $t('button.print_report') }}
                    </button>

                </div>
            </div>

            <div class="p-4">
                <div v-for="(branchSales, index) in reports?.branch_sales" :key="index">
                    <div class="bg-gray-200 p-1 font-bold" >{{ branchSales.branch_name_en }}</div>
                    <div class="mt-1.5 border p-3" v-for="(report, index) in reports?.branch_sales[0].item_sales" :key="index" >
                        <div class="grid grid-cols-3 gap-x-3" >
                            <p><b class="text-base" >{{ $t('reports.invoice') }} #: {{ report.invoice_no }}</b></p>
                            <p>{{ $t('reports.branch') }}: {{ report.branch?.name_en }}</p>
                            <p>{{ $t('reports.created_by') }}: {{ report.created_by }}</p>

                            <p>{{ $t('reports.member') }}: {{ report.member_name_en }}</p>
                            <p>{{ $t('reports.sales_date') }}: {{ report.created_at }}</p>
                            <p>{{ $t('reports.created_on') }}: {{ report.created_at_time }}</p>
                            <p class="col-span-3">{{ $t('reports.remarks') }}: {{ report.remarks }}</p>
                        </div>
                        <table class="min-w-full border mt-1.5">
                            <thead class="border-b" >
                                <tr>
                                    <th scope="col" class="text-sm text-left font-bold text-gray-900 px-3 py-1">{{ $t('reports.item_name') }}</th>
                                    <th scope="col" class="text-sm text-center font-bold text-gray-900 px-3 py-1">{{ $t('reports.item_price') }}</th>
                                    <th scope="col" class="text-sm text-center font-bold text-gray-900 px-3 py-1">{{ $t('reports.qty') }}</th>
                                    <th scope="col" class="text-sm text-right font-bold text-gray-900 px-3 py-1">{{ $t('reports.total_price') }}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, i) in report?.cart_items" :key="i" >
                                    <td class="whitespace-nowrap text-left text-sm font-medium text-gray-900 px-3 py-1">{{ item.item_name_en }}</td>
                                    <td class="whitespace-nowrap text-center text-sm font-medium text-gray-900 px-3 py-1">{{ parseFloat(item.item_amount).toFixed(3) }}</td>
                                    <td class="whitespace-nowrap text-center text-sm font-medium text-gray-900 px-3 py-1">{{ item.quantity }}</td>
                                    <td class="whitespace-nowrap text-right text-sm font-medium text-gray-900 px-3 py-1">{{ parseFloat(item.total_amount).toFixed(3) }}</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr class="border-t" >
                                    <td class="whitespace-nowrap text-sm font-bold text-gray-900"></td>
                                    <td class="whitespace-nowrap text-sm font-bold text-gray-900"></td>
                                    <td class="whitespace-nowrap text-sm font-bold text-gray-900 px-3 py-1 text-center">{{ $t('reports.gross_amount') }}</td>
                                    <td class="whitespace-nowrap text-sm font-bold text-gray-900 px-3 py-1 text-right">{{reports?.sub_total_amount?.toFixed(3)}}</td>
                                </tr>
                                <tr class="" >
                                    <td class="whitespace-nowrap text-sm font-bold text-gray-900"></td>
                                    <td class="whitespace-nowrap text-sm font-bold text-gray-900"></td>
                                    <td class="whitespace-nowrap text-sm font-bold text-gray-900 px-3 py-1 text-center">{{ $t('reports.discount_amount') }}</td>
                                    <td class="whitespace-nowrap text-sm font-bold text-gray-900 px-3 py-1 text-right">{{reports?.discount_total_amount?.toFixed(3)}}</td>
                                </tr>
                                <tr class="" >
                                    <td class="whitespace-nowrap text-sm font-bold text-gray-900"></td>
                                    <td class="whitespace-nowrap text-sm font-bold text-gray-900"></td>
                                    <td class="whitespace-nowrap text-sm font-bold text-gray-900 px-3 py-1 text-center">{{ $t('reports.net_amount') }}</td>
                                    <td class="whitespace-nowrap text-sm font-bold text-gray-900 px-3 py-1 text-right">{{reports?.total_item_sales_amount?.toFixed(3)}}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="reports != ''" class="bg-white py-4 px-3 border border-gray-200 mb-1 gap-2 grid grid-cols-2">
            <button v-if="has_permission" type="button" 
                @click="printBookingDetails"
                class="w-full justify-center border-1 border-color-primary 
                    shadow-sm px-4 py-1 font-semibold text-base btn-primary 
                    focus:outline-none sm:w-auto sm:text-sm">
                {{ $t('button.print_report') }}
            </button>
        </div>
            
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import useValidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";

export default {
    data() {
        return {
            v$: useValidate(),
            has_permission: false,
            form_data: {
                branch_ids: [],
                item_ids: [],
                member_id: '',
                start_date: '',
                end_date: ''
            },
            branches: [],
            items: [],
            reports: [],
            members: []
        }
    },
    validations() {
        return {
            form_data: {
                branch_ids: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('master.branch')), required) },
            }
        };
    },
    computed:{
        ...mapGetters(["itemSalesReport", "itemSalesReportForm"]),
        branchesNames() {
            const selectedBranches = this.branches?.filter(branch => this.form_data.branch_ids.indexOf(branch.id) !== -1);
            return selectedBranches?.map(branch => ' ' + branch.name_en).toString();
        },
    },
    methods: {
        ...mapActions(["getItemSalesReportForm", "getItemSalesReport"]),

        printBookingDetails() {
            const options = {
                name: "Platinum Gym",
                specs: [],
                styles: [],
            };
            this.$htmlToPaper("bookingInfo", options);
        },

        getReports() {
            this.v$.$validate()
            if(!this.v$.$error) {
                this.getItemSalesReport({
                    branch_ids: this.form_data.branch_ids,
                    item_ids: this.form_data.item_ids,
                    member_id: this.form_data.member_id,
                    start_date: this.$root.formatDateAPI(this.form_data.start_date),
                    end_date: this.$root.formatDateAPI(this.form_data.end_date),
                })
            }
        },

        checkPermissions() {
            let page_permissions = this.$root.getScreenPermissions("Item Sales Report")
            this.has_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "item_sales_report")
        }
    },
    watch: {
        itemSalesReport(data) {
            console.log(data)
            if(data != null) {
                this.reports = data
            }
        },
        itemSalesReportForm(data) {
            if(data != null) {
                this.branches = data.branches
                this.items = data.items
                this.members = data.members
            }
        }
    },
    mounted() {
        this.checkPermissions()
        this.getItemSalesReportForm()
    },
}
</script>