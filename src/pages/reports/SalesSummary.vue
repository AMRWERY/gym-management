<template>
  <div>
    <p class="text-3xl">{{ $t("reports.sales_summary") }}</p>
    <hr class="mb-5" />

    <div class="mt-8 grid grid-cols-4 gap-3 bg-white px-3 py-5">
      <div>
        <label class="font-bold" for="branch_ids">
          {{ $t("reports.select_branches") }} *
        </label>
        <Multiselect
          mode="tags"
          :searchable="true"
          :createTag="true"
          v-model="form_data.branch_ids"
          :multiple="true"
          label="name_en"
          valueProp="id"
          :placeholder="$t('reports.select_branches')"
          class="shadow border rounded w-full text-gray-700 leading-tight mt-2"
          :options="branches"
        />
        <span
          class="text-sm text-red-400"
          v-if="v$.form_data.branch_ids.$error"
        >
          {{ v$.form_data.branch_ids.$errors[0].$message }}</span
        >
      </div>

      <div>
        <label for="start_date" class="font-bold">{{
          $t("reports.start_date")
        }}</label>
        <input
          type="date"
          :min="todaysDate"
          v-model="form_data.start_date"
          format="dd/MM/yyyy"
          :placeholder="$t('reports.start_date')"
          class="shadow appearance-none border rounded w-full p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div>
        <label for="end_date" class="font-bold">{{
          $t("reports.end_date")
        }}</label>
        <input
          type="date"
          :min="form_data.start_date"
          v-model="form_data.end_date"
          format="dd/MM/yyyy"
          :placeholder="$t('reports.end_date')"
          class="shadow p-2 appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div>
        <button
          type="button"
          @click="getReports"
          class="mt-7 inline-flex justify-center border-2 border-color-primary shadow-sm px-4 py-2 font-semibold text-base btn-outline-primary focus:outline-none sm:text-sm"
        >
          {{ $t("button.search") }}
        </button>
      </div>
    </div>

    <div v-if="reports != ''" class="mt-4 bg-white px-3 py-5" id="bookingInfo">
      <div class="grid grid-cols-2 gap-x-6 p-4 mb-4">
        <div>
          <p class="font-medium text-3xl pt-2 color-primary">
            {{ $t("reports.sales_summary_report") }}
          </p>
          <p
            v-if="reports?.start_date && reports?.end_date"
            class="text-base font-medium text-gray-800"
          >
            {{ reports?.start_date }} to {{ reports?.end_date }}
            {{ $t("reports.for_branch") }}: {{ branchesNames }}
          </p>
          <p
            v-else-if="reports?.start_date"
            class="text-base font-medium text-gray-800"
          >
            {{ reports?.start_date }} {{ $t("reports.for_branch") }}:
            {{ branchesNames }}
          </p>
          <p
            v-else-if="reports?.end_date"
            class="text-base font-medium text-gray-800"
          >
            {{ reports?.end_date }} {{ $t("reports.for_branch") }}:
            {{ branchesNames }}
          </p>
          <p v-else class="text-base font-medium text-gray-800">
            {{ $t("reports.for_branch") }}: {{ branchesNames }}
          </p>
        </div>

        <div v-if="reports" class="text-right print:hidden grid grid-cols-2">
          <export-excel
            v-show="false"
            :data="dataExcel"
            :fields="excelFields"
            :title="`Thông tin cá nhân`"
            :name="`Thong_tin_ca_nhan_pham_the_chiem.xls`"
          >
            <button
              v-if="has_permission"
              type="button"
              class="h-10 px-4 font-semibold text-base btn-success"
            >
              Download Excel
            </button>
          </export-excel>
          <button
            v-if="has_permission"
            type="button"
            @click="printBookingDetails"
            class="h-10 px-4 font-semibold text-base btn-primary mx-2"
          >
            {{ $t("button.print_report") }}
          </button>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4 px-4">
        <div>
          <div class="bg-gray-200 font-bold p-1">
            {{ $t("reports.sales_summary_caps") }}
          </div>
          <table class="min-w-full border">
            <thead class="border-b">
              <tr>
                <th
                  scope="col"
                  class="text-sm font-bold text-gray-900 text-left px-1"
                >
                  {{ $t("reports.description") }}
                </th>
                <th
                  scope="col"
                  class="text-sm text-center font-bold text-gray-900 py-1 text-left px-1"
                >
                  {{ $t("reports.qty") }}
                </th>
                <th
                  scope="col"
                  class="text-sm text-center font-bold text-gray-900 text-right px-1"
                >
                  {{ $t("reports.amount") }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  class="whitespace-nowrap text-sm font-medium text-gray-900 px-1 pt-1"
                >
                  {{ $t("reports.gross_amount_caps") }}
                </td>
                <td
                  class="whitespace-nowrap text-sm font-medium text-gray-900 text-center px-1 pt-1"
                >
                  {{ reports?.sales_summary?.gross_amount_qty }}
                </td>
                <td
                  class="whitespace-nowrap text-sm font-medium text-gray-900 text-right px-1 pt-1"
                >
                  {{ reports?.sales_summary?.gross_amount.toFixed(3) }}
                </td>
              </tr>
              <tr>
                <td
                  class="whitespace-nowrap text-sm font-medium text-gray-900 px-1 pt-1"
                >
                  {{ $t("reports.discount_amount_caps") }}
                </td>
                <td
                  class="whitespace-nowrap text-sm font-medium text-gray-900 text-center px-1 pt-1"
                >
                  {{ reports?.sales_summary?.discount_amount_qty }}
                </td>
                <td
                  class="whitespace-nowrap text-sm font-medium text-gray-900 text-right px-1 pt-1"
                >
                  {{ reports?.sales_summary?.discount_amount.toFixed(3) }}
                </td>
              </tr>
              <tr>
                <td
                  class="whitespace-nowrap text-sm font-medium text-gray-900 px-1 pt-1"
                >
                  {{ $t("reports.refund_caps") }}
                </td>
                <td
                  class="whitespace-nowrap text-sm font-medium text-gray-900 text-center px-1 pt-1"
                >
                  {{ reports?.sales_summary?.sales_summary_total_qty }}
                </td>
                <td
                  class="whitespace-nowrap text-sm font-medium text-gray-900 text-right px-1 pt-1"
                >
                  {{ reports?.sales_summary?.refund_amount.toFixed(3) }}
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="border-t">
                <td
                  class="whitespace-nowrap text-sm font-bold text-gray-900 px-1 pt-1"
                >
                  {{ $t("reports.total") }}
                </td>
                <td
                  class="whitespace-nowrap text-sm font-bold text-gray-900 text-center px-1 pt-1"
                >
                  {{ reports?.sales_summary_total_qty }}
                </td>
                <td
                  class="whitespace-nowrap text-sm font-bold text-gray-900 text-right px-1 pt-1"
                >
                  {{ reports?.sales_summary_total_amount?.toFixed(3) }}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div v-if="reports?.membership_type_sales?.length > 0">
          <div class="bg-gray-200 font-bold p-1">
            {{ $t("reports.package_type_wise_sales_caps") }}
          </div>
          <table class="min-w-full border">
            <thead class="border-b">
              <tr>
                <th
                  scope="col"
                  class="text-sm font-bold text-gray-900 text-left px-1"
                >
                  {{ $t("reports.description") }}
                </th>
                <th
                  scope="col"
                  class="text-sm text-center font-bold text-gray-900 py-1 text-left px-1"
                >
                  {{ $t("reports.qty") }}
                </th>
                <th
                  scope="col"
                  class="text-sm text-center font-bold text-gray-900 text-right px-1"
                >
                  {{ $t("reports.amount") }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(
                  membership_type, index
                ) in reports?.membership_type_sales"
                :key="index"
              >
                <td
                  class="whitespace-nowrap text-sm font-medium text-gray-900 px-1 pt-1"
                >
                  {{ membership_type.membership_type }}
                </td>
                <td
                  class="whitespace-nowrap text-sm font-medium text-gray-900 text-center px-1 pt-1"
                >
                  {{ membership_type.quantity }}
                </td>
                <td
                  class="whitespace-nowrap text-sm font-medium text-gray-900 text-right px-1 pt-1"
                >
                  {{ membership_type.amount.toFixed(3) }}
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="border-t">
                <td
                  class="whitespace-nowrap text-sm font-bold text-gray-900 px-1 pt-1"
                >
                  {{ $t("reports.total") }}
                </td>
                <td
                  class="whitespace-nowrap text-sm font-bold text-gray-900 text-center px-1 pt-1"
                >
                  {{ reports?.membership_type_qty_total }}
                </td>
                <td
                  class="whitespace-nowrap text-sm font-bold text-gray-900 text-right px-1 pt-1"
                >
                  {{ reports?.membership_type_sales_total?.toFixed(3) }}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div v-if="false" class="mt-1.5">
          <div class="bg-gray-200 font-bold p-1">
            {{ $t("reports.user_wise_subscription_caps") }}
          </div>
          <table class="min-w-full border">
            <thead class="border-b">
              <tr>
                <th
                  scope="col"
                  class="text-sm font-bold text-gray-900 text-left px-1"
                >
                  {{ $t("reports.description") }}
                </th>
                <th
                  scope="col"
                  class="text-sm text-center font-bold text-gray-900 py-1 text-left px-1"
                >
                  {{ $t("reports.qty") }}
                </th>
                <th
                  scope="col"
                  class="text-sm text-center font-bold text-gray-900 text-right px-1"
                >
                  {{ $t("reports.amount") }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(member_sale, index) in reports?.members_sales"
                :key="index"
              >
                <td
                  class="whitespace-nowrap text-sm font-medium text-gray-900 px-1 pt-1"
                >
                  {{ member_sale.members_name }}
                </td>
                <td
                  class="whitespace-nowrap text-sm font-medium text-gray-900 px-1 pt-1 text-center"
                >
                  {{ member_sale.quantity }}
                </td>
                <td
                  class="whitespace-nowrap text-sm font-medium text-gray-900 px-1 pt-1 text-right"
                >
                  {{ member_sale.amount.toFixed(3) }}
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="border-t">
                <td
                  class="whitespace-nowrap text-sm font-bold text-gray-900 px-1 pt-1"
                >
                  {{ $t("reports.total") }}
                </td>
                <td
                  class="whitespace-nowrap text-sm font-bold text-gray-900 px-1 pt-1 text-center"
                >
                  {{ reports?.members_qty_total }}
                </td>
                <td
                  class="whitespace-nowrap text-sm font-bold text-gray-900 px-1 pt-1 text-right"
                >
                  {{ reports?.members_sales_total?.toFixed(3) }}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div v-if="reports?.payments?.length > 0" class="mt-1.5">
          <div class="bg-gray-200 font-bold p-1">
            {{ $t("reports.payment_received_caps") }}
          </div>
          <table class="min-w-full border">
            <thead class="border-b">
              <tr>
                <th
                  scope="col"
                  class="text-sm font-bold text-gray-900 text-left px-1"
                >
                  {{ $t("reports.description") }}
                </th>
                <th
                  scope="col"
                  class="text-sm text-center font-bold text-gray-900 py-1 text-left px-1"
                >
                  {{ $t("reports.qty") }}
                </th>
                <th
                  scope="col"
                  class="text-sm text-center font-bold text-gray-900 text-right px-1"
                >
                  {{ $t("reports.amount") }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(payment, index) in reports?.payments" :key="index">
                <td
                  class="whitespace-nowrap text-sm font-medium text-gray-900 px-1 pt-1"
                >
                  {{ payment.payment_name }}
                </td>
                <td
                  class="whitespace-nowrap text-sm font-medium text-gray-900 px-1 pt-1 text-center"
                >
                  {{ payment.quantity }}
                </td>
                <td
                  class="whitespace-nowrap text-sm font-medium text-gray-900 px-1 pt-1 text-right"
                >
                  {{ payment.amount.toFixed(3) }}
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="border-t">
                <td
                  class="whitespace-nowrap text-sm font-bold text-gray-900 px-1 pt-1"
                >
                  {{ $t("reports.total") }}
                </td>
                <td
                  class="whitespace-nowrap text-sm font-bold text-gray-900 text-center px-1 pt-1"
                >
                  {{ reports?.payment_qty_total }}
                </td>
                <td
                  class="whitespace-nowrap text-sm font-bold text-gray-900 text-right px-1 pt-1"
                >
                  {{ reports?.payment_total?.toFixed(3) }}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div v-if="reports?.locker_sales?.length > 0" class="mt-1.5">
          <div class="bg-gray-200 font-bold p-1">
            {{ $t("reports.locker_caps") }}
          </div>
          <table class="min-w-full border">
            <thead class="border-b">
              <tr>
                <th
                  scope="col"
                  class="text-sm font-bold text-gray-900 text-left px-1"
                >
                  {{ $t("reports.description") }}
                </th>
                <th
                  scope="col"
                  class="text-sm text-center font-bold text-gray-900 py-1 text-left px-1"
                >
                  {{ $t("reports.qty") }}
                </th>
                <th
                  scope="col"
                  class="text-sm text-center font-bold text-gray-900 text-right px-1"
                >
                  {{ $t("reports.amount") }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(locker_sale, index) in reports?.locker_sales"
                :key="index"
              >
                <td
                  class="whitespace-nowrap text-sm font-medium text-gray-900 px-1 pt-1"
                >
                  {{ locker_sale.locker_type }}
                </td>
                <td
                  class="whitespace-nowrap text-sm font-medium text-gray-900 px-1 pt-1 text-center"
                >
                  {{ locker_sale.quantity }}
                </td>
                <td
                  class="whitespace-nowrap text-sm font-medium text-gray-900 px-1 pt-1 text-right"
                >
                  {{ locker_sale.amount.toFixed(3) }}
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="border-t">
                <td
                  class="whitespace-nowrap text-sm font-bold text-gray-900 px-1 pt-1"
                >
                  {{ $t("reports.total") }}
                </td>
                <td
                  class="whitespace-nowrap text-sm font-bold text-gray-900 px-1 pt-1 text-center"
                >
                  {{ reports?.locker_qty_total }}
                </td>
                <td
                  class="whitespace-nowrap text-sm font-bold text-gray-900 px-1 pt-1 text-right"
                >
                  {{ reports?.locker_sales_total?.toFixed(3) }}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div v-if="reports?.members_product_sales?.length > 0" class="mt-1.5">
          <div class="bg-gray-200 font-bold p-1">
            {{ $t("reports.user_wise_product_sales_caps") }}
          </div>
          <table class="min-w-full border">
            <thead class="border-b">
              <tr>
                <th
                  scope="col"
                  class="text-sm font-bold text-gray-900 text-left px-1"
                >
                  {{ $t("reports.description") }}
                </th>
                <th
                  scope="col"
                  class="text-sm text-center font-bold text-gray-900 py-1 text-left px-1"
                >
                  {{ $t("reports.qty") }}
                </th>
                <th
                  scope="col"
                  class="text-sm text-center font-bold text-gray-900 text-right px-1"
                >
                  {{ $t("reports.amount") }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(
                  members_product_sale, index
                ) in reports?.members_product_sales"
                :key="index"
              >
                <td
                  class="whitespace-nowrap text-sm font-medium text-gray-900 px-1 pt-1"
                >
                  {{ members_product_sale.member_name }}
                </td>
                <td
                  class="whitespace-nowrap text-sm font-medium text-gray-900 px-1 pt-1 text-center"
                >
                  {{ members_product_sale.quantity }}
                </td>
                <td
                  class="whitespace-nowrap text-sm font-medium text-gray-900 px-1 pt-1 text-right"
                >
                  {{ members_product_sale.amount.toFixed(3) }}
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="border-t">
                <td
                  class="whitespace-nowrap text-sm font-bold text-gray-900 px-1 pt-1"
                >
                  {{ $t("reports.total") }}
                </td>
                <td
                  class="whitespace-nowrap text-sm font-bold text-gray-900 text-center px-1 pt-1"
                >
                  {{ reports?.members_product_qty_total }}
                </td>
                <td
                  class="whitespace-nowrap text-sm font-bold text-gray-900 text-right px-1 pt-1"
                >
                  {{ reports?.members_product_sales_total?.toFixed(3) }}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <!-- <div class="mt-1.5" >
                  <div class="bg-gray-200 p-1 font-bold" >TRANSACTION TYPES</div>
                  <table class="min-w-full border" >
                      <thead class="border-b" >
                          <tr>
                              <th scope="col" class="text-sm font-bold text-gray-900 text-left" >{{ $t('reports.description') }}</th>
                              <th scope="col" class="text-sm text-center font-bold text-gray-900 px-6 py-1 text-left">{{ $t('reports.qty') }}</th>
                              <th scope="col" class="text-sm text-center font-bold text-gray-900 text-right">{{ $t('reports.amount') }}</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr>
                              <td class="whitespace-nowrap text-sm font-medium text-gray-900">{{ $t('reports.gross_amount_caps') }}</td>
                              <td class="whitespace-nowrap text-sm font-medium text-gray-900  px-1 pt-1 text-center">1</td>
                              <td class="whitespace-nowrap text-sm font-medium text-gray-900  px-1 pt-1 text-right">123.000</td>
                          </tr>
                          <tr>
                              <td class="whitespace-nowrap text-sm font-medium text-gray-900">{{ $t('reports.discount_amount_caps') }}</td>
                              <td class="whitespace-nowrap text-sm font-medium text-gray-900  px-1 pt-1 text-center">1</td>
                              <td class="whitespace-nowrap text-sm font-medium text-gray-900  px-1 pt-1 text-right">123.000</td>
                          </tr>
                          <tr>
                              <td class="whitespace-nowrap text-sm font-medium text-gray-900">{{ $t('reports.refund_caps') }}</td>
                              <td class="whitespace-nowrap text-sm font-medium text-gray-900  px-1 pt-1 text-center">1</td>
                              <td class="whitespace-nowrap text-sm font-medium text-gray-900  px-1 pt-1 text-right">123.000</td>
                          </tr>
                      </tbody>
                      <tfoot>
                          <tr class="border-t" >
                              <td class="whitespace-nowrap text-sm font-bold text-gray-900">{{ $t('reports.total') }}</td>
                              <td class="whitespace-nowrap text-sm font-bold text-gray-900 text-center">1</td>
                              <td class="whitespace-nowrap text-sm font-bold text-gray-900 text-right">123.000</td>
                          </tr>
                      </tfoot>
                  </table>   
              </div> -->
        <div v-if="reports?.product_sales?.length > 0" class="mt-1.5">
          <div class="bg-gray-200 font-bold p-1">
            {{ $t("reports.product_sales_caps") }}
          </div>
          <table class="min-w-full border">
            <thead class="border-b">
              <tr>
                <th
                  scope="col"
                  class="text-sm font-bold text-gray-900 text-left px-1"
                >
                  {{ $t("reports.description") }}
                </th>
                <th
                  scope="col"
                  class="text-sm text-center font-bold text-gray-900 py-1 text-left px-1"
                >
                  {{ $t("reports.qty") }}
                </th>
                <th
                  scope="col"
                  class="text-sm text-center font-bold text-gray-900 text-right px-1"
                >
                  {{ $t("reports.amount") }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(product_sale, index) in reports?.product_sales"
                :key="index"
              >
                <td
                  class="whitespace-nowrap text-sm font-medium text-gray-900 px-1 pt-1"
                >
                  {{ product_sale.product_name }}
                </td>
                <td
                  class="whitespace-nowrap text-sm font-medium text-gray-900 px-1 pt-1 text-center"
                >
                  {{ product_sale.quantity }}
                </td>
                <td
                  class="whitespace-nowrap text-sm font-medium text-gray-900 px-1 pt-1 text-right"
                >
                  {{ product_sale.amount.toFixed(3) }}
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="border-t">
                <td
                  class="whitespace-nowrap text-sm font-bold text-gray-900 px-1 pt-1"
                >
                  {{ $t("reports.total") }}
                </td>
                <td
                  class="whitespace-nowrap text-sm font-bold text-gray-900 text-center px-1 pt-1"
                >
                  {{ reports?.product_qty_total }}
                </td>
                <td
                  class="whitespace-nowrap text-sm font-bold text-gray-900 text-right px-1 pt-1"
                >
                  {{ reports?.product_sales_total?.toFixed(3) }}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div v-if="reports?.refund_invoice_sales?.length > 0" class="mt-1.5">
          <div class="bg-gray-200 font-bold p-1">
            {{ $t("reports.refund_caps") }}
          </div>
          <table class="min-w-full border">
            <thead class="border-b">
              <tr>
                <th
                  scope="col"
                  class="text-sm font-bold text-gray-900 text-left px-1"
                >
                  {{ $t("reports.description") }}
                </th>
                <th
                  scope="col"
                  class="text-sm text-center font-bold text-gray-900 py-1 text-left px-1"
                >
                  {{ $t("reports.qty") }}
                </th>
                <th
                  scope="col"
                  class="text-sm text-center font-bold text-gray-900 text-right px-1"
                >
                  {{ $t("reports.amount") }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(
                  refund_invoice_sale, index
                ) in reports?.refund_invoice_sales"
                :key="index"
              >
                <td
                  class="whitespace-nowrap text-sm font-medium text-gray-900 px-1 pt-1"
                >
                  {{ refund_invoice_sale.description }}
                </td>
                <td
                  class="whitespace-nowrap text-sm font-medium text-gray-900 px-1 pt-1 text-center"
                >
                  {{ refund_invoice_sale.quantity }}
                </td>
                <td
                  class="whitespace-nowrap text-sm font-medium text-gray-900 px-1 pt-1 text-right"
                >
                  {{ refund_invoice_sale.amount.toFixed(3) }}
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="border-t">
                <td
                  class="whitespace-nowrap text-sm font-bold text-gray-900 px-1 pt-1"
                >
                  {{ $t("reports.total") }}
                </td>
                <td
                  class="whitespace-nowrap text-sm font-bold text-gray-900 text-center px-1 pt-1"
                >
                  {{ reports?.refund_invoice_qty_total }}
                </td>
                <td
                  class="whitespace-nowrap text-sm font-bold text-gray-900 text-right px-1 pt-1"
                >
                  {{ reports?.refund_invoice_sales_total?.toFixed(3) }}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div v-if="reports?.package_sales?.length > 0" class="mt-1.5">
          <div class="bg-gray-200 font-bold p-1">
            {{ $t("reports.package_wise_sales_caps") }}
          </div>
          <table class="min-w-full border">
            <thead class="border-b">
              <tr>
                <th
                  scope="col"
                  class="text-sm font-bold text-gray-900 text-left px-1"
                >
                  {{ $t("reports.description") }}
                </th>
                <th
                  scope="col"
                  class="text-sm text-center font-bold text-gray-900 py-1 text-left px-1"
                >
                  {{ $t("reports.qty") }}
                </th>
                <th
                  scope="col"
                  class="text-sm text-center font-bold text-gray-900 text-right px-1"
                >
                  {{ $t("reports.amount") }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(package_sale, index) in reports?.package_sales"
                :key="index"
              >
                <td
                  class="whitespace-nowrap text-sm font-medium text-gray-900 px-1 pt-1"
                >
                  {{ package_sale.package_name }}
                </td>
                <td
                  class="whitespace-nowrap text-sm font-medium text-gray-900 px-1 pt-1 text-center"
                >
                  {{ package_sale.quantity }}
                </td>
                <td
                  class="whitespace-nowrap text-sm font-medium text-gray-900 px-1 pt-1 text-right"
                >
                  {{ package_sale.amount.toFixed(3) }}
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="border-t">
                <td
                  class="whitespace-nowrap text-sm font-bold text-gray-900 px-1 pt-1"
                >
                  {{ $t("reports.total") }}
                </td>
                <td
                  class="whitespace-nowrap text-sm font-bold text-gray-900 text-center px-1 pt-1"
                >
                  {{ reports?.package_qty_total }}
                </td>
                <td
                  class="whitespace-nowrap text-sm font-bold text-gray-900 text-right px-1 pt-1"
                >
                  {{ reports?.package_sales_total?.toFixed(3) }}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div v-if="reports?.lesson_sales?.length > 0" class="mt-1.5">
          <div class="bg-gray-200 font-bold p-1">
            {{ $t("reports.lesson_caps") }}
          </div>
          <table class="min-w-full border">
            <thead class="border-b">
              <tr>
                <th
                  scope="col"
                  class="text-sm font-bold text-gray-900 text-left px-1"
                >
                  {{ $t("reports.description") }}
                </th>
                <th
                  scope="col"
                  class="text-sm text-center font-bold text-gray-900 py-1 text-left px-1"
                >
                  {{ $t("reports.qty") }}
                </th>
                <th
                  scope="col"
                  class="text-sm text-center font-bold text-gray-900 text-right px-1"
                >
                  {{ $t("reports.amount") }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(lesson_sale, index) in reports?.lesson_sales"
                :key="index"
              >
                <td
                  class="whitespace-nowrap text-sm font-medium text-gray-900 px-1 pt-1"
                >
                  {{ lesson_sale.lesson_type }}
                </td>
                <td
                  class="whitespace-nowrap text-sm font-medium text-gray-900 px-1 pt-1 text-center"
                >
                  {{ lesson_sale.quantity }}
                </td>
                <td
                  class="whitespace-nowrap text-sm font-medium text-gray-900 px-1 pt-1 text-right"
                >
                  {{ lesson_sale.amount.toFixed(3) }}
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="border-t">
                <td
                  class="whitespace-nowrap text-sm font-bold text-gray-900 px-1 pt-1"
                >
                  {{ $t("reports.total") }}
                </td>
                <td
                  class="whitespace-nowrap text-sm font-bold text-gray-900 text-center px-1 pt-1"
                >
                  {{ reports?.lesson_qty_total }}
                </td>
                <td
                  class="whitespace-nowrap text-sm font-bold text-gray-900 text-right px-1 pt-1"
                >
                  {{ reports?.lesson_sales_total?.toFixed(3) }}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div v-if="reports?.service_sales?.length > 0" class="mt-1.5">
          <div class="bg-gray-200 font-bold p-1">
            {{ $t("reports.service_caps") }}
          </div>
          <table class="min-w-full border">
            <thead class="border-b">
              <tr>
                <th
                  scope="col"
                  class="text-sm font-bold text-gray-900 text-left px-1"
                >
                  {{ $t("reports.description") }}
                </th>
                <th
                  scope="col"
                  class="text-sm text-center font-bold text-gray-900 px-6 py-1 text-left"
                >
                  {{ $t("reports.qty") }}
                </th>
                <th
                  scope="col"
                  class="text-sm text-center font-bold text-gray-900 text-right"
                >
                  {{ $t("reports.amount") }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(service_sale, index) in reports?.service_sales"
                :key="index"
              >
                <td
                  class="whitespace-nowrap text-sm font-medium text-gray-900 px-1 pt-1"
                >
                  {{ service_sale.service_type }}
                </td>
                <td
                  class="whitespace-nowrap text-sm font-medium text-gray-900 px-1 pt-1 text-center"
                >
                  {{ service_sale.quantity }}
                </td>
                <td
                  class="whitespace-nowrap text-sm font-medium text-gray-900 px-1 pt-1 text-right"
                >
                  {{ service_sale.amount.toFixed(3) }}
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="border-t">
                <td
                  class="whitespace-nowrap text-sm font-bold text-gray-900 px-1 pt-1"
                >
                  {{ $t("reports.total") }}
                </td>
                <td
                  class="whitespace-nowrap text-sm font-bold text-gray-900 text-center px-1 pt-1"
                >
                  {{ reports?.service_qty_total }}
                </td>
                <td
                  class="whitespace-nowrap text-sm font-bold text-gray-900 text-right px-1 pt-1"
                >
                  {{ reports?.service_sales_total?.toFixed(3) }}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import useValidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import exportExcel from "vue-3-export-excel/ExportExcel.vue";

export default {
  data() {
    return {
      fileName: "Sales Summary Report" + new Date(),
      v$: useValidate(),
      has_permission: false,
      form_data: {
        branch_ids: [],
        start_date: "",
        end_date: "",
      },
      branches: [],
      reports: [],
      excelFields: {
        Branch: "branch",
        "Gross Amount": "gross_amount",
        "Discount Amount": "discount_amount",
        Refund: "refund",
        Total: "total",
      },
    };
  },
  components: { exportExcel },

  validations() {
    return {
      form_data: {
        branch_ids: {
          required: helpers.withMessage(
            this.$root.getErrorMessage("required", this.$t('master.branch')),
            required
          ),
        },
      },
    };
  },
  computed: {
    ...mapGetters(["salesSummary", "salesSummaryForm"]),
    branchesNames() {
      const selectedBranches = this.branches?.filter(
        (branch) => this.form_data.branch_ids.indexOf(branch.id) !== -1
      );
      return selectedBranches?.map((branch) => " " + branch.name_en).toString();
    },
    dataExcel() {
      const arrayObj = [
        {
          branch: this.branchesNames,
          gross_amount: "chiempt",
          discount_amount: "27/09/1999",
          refund: "0345361887",
          total: "Hoài Đức - Hà Nội",
        },
      ];

      arrayObj.forEach((obj) => {
        console.log(obj.branch);
        console.log(obj.gross_amount);
        console.log(obj.discount_amount);
        console.log(obj.refund);
        console.log(obj.total);
      });

      return arrayObj;
    },

    // dataExcel() {
    //   const arrayObj = [];

    //   this.reports.service_sales.forEach((report) => {
    //     arrayObj.push({
    //       branch: this.branchesNames,
    //       description: report.service_type,
    //       quantity: report.quantity,
    //       amount: report.amount,
    //     });
    //   });

    //   console.log(arrayObj);

    //   return arrayObj;
    // },
  },
  methods: {
    ...mapActions(["getSalesSummary", "getSalesSummaryForm"]),

    printBookingDetails() {
      const options = {
        name: "Platinum Gym - Sales Summary Report",
        specs: [],
        styles: [],
      };
      this.$htmlToPaper("bookingInfo", options);
    },
    getReports() {
      this.v$.$validate();
      if (!this.v$.$error) {
        this.getSalesSummary({
          branch_ids: this.form_data.branch_ids,
          start_date: this.$root.formatDateAPI(this.form_data.start_date),
          end_date: this.$root.formatDateAPI(this.form_data.end_date),
        });
      }
    },
    checkPermissions() {
      let page_permissions = this.$root.getScreenPermissions("Sales Summary");
      this.has_permission = this.$root.getPermissionStatus(
        page_permissions?.permissions,
        "sales_summary"
      );
    },
  },
  watch: {
    salesSummary(data) {
      if (data != null) {
        this.reports = data;
        console.log("this.reports", this.reports);
      }
    },
    salesSummaryForm(data) {
      if (data != null) {
        this.branches = data;
      }
    },
  },
  mounted() {
    this.checkPermissions();
    this.getSalesSummaryForm();
  },
};
</script>