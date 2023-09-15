<template>
  <div class="pb-12">

    <div>
      <p class="font-bold text-lg">{{ $t("dashboard.date_range") }}</p>
      <div class="grid grid-cols-4 gap-4">
        <input type="date" v-model="start_date" format="dd/MM/yyyy" class="shadow p-2 appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
        <input type="date" v-model="end_date" :min="start_date" format="dd/MM/yyyy" class="shadow p-2 appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
        <button class="px-6 py-2 me-auto btn-primary text-base flex items-center" @click="fetchData"><tw-icon name="heroicons-outline:search" class="w-5 h-5 color-white me-3"/> {{ $t("dashboard.search") }}</button>
        <div>
          <select name="branch" id="branch" v-model="branch" @change="fetchData"
              class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option value="0">{{ $t('dashboard.all_branches') }}</option>
              <option v-for="(branch, index) in branches" :key="index" :value="branch.id">{{lang == 'ar' ? branch.name_ar : branch.name_en}}</option>
          </select>
        </div>
      </div>
    </div>

    <div id="transaction-summary" class="grid grid-cols-4 gap-4 mt-6">

      <div class="block bg-white overflow-hidden border-1 h-full rounded-md shadow">
        <div class="p-4">
          <div class="cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-graph-up-arrow w-6 h-6 text-green-600" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M0 0h1v15h15v1H0V0Zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5Z"/>
            </svg>
          </div>
          <p class="text-md text-justify text-xl pt-2">{{ stats?.all_active_members ?? '0' }}</p>
          <p class="cursor-pointer">{{ $t('dashboard.all_active_members') }}</p>
        </div>
      </div>

      <div class="block bg-white overflow-hidden border-1 h-full rounded-md shadow">
        <div class="p-4">
          <div class="cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-graph-up-arrow w-6 h-6 text-green-600" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M0 0h1v15h15v1H0V0Zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5Z"/>
            </svg>
          </div>
          <p class="text-md text-justify text-xl pt-2">{{ stats?.active_members ?? '0' }}</p>
          <p class="cursor-pointer">{{ $t('dashboard.active_members') }}</p>
        </div>
      </div>

      <div class="block bg-white overflow-hidden border-1 h-full rounded-md shadow">
        <div class="p-4">
          <div class="cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-graph-up-arrow w-6 h-6 text-green-600" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M0 0h1v15h15v1H0V0Zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5Z"/>
            </svg>
          </div>
          <p class="text-md text-justify text-xl pt-2">{{ stats?.freeze_members ?? '0' }}</p>
          <p class="cursor-pointer">{{ $t('dashboard.freeze_members') }}</p>
        </div>
      </div>

      <div class="block bg-white overflow-hidden border-1 h-full rounded-md shadow">
        <div class="p-4">
          <div class="cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-graph-up-arrow w-6 h-6 text-green-600" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M0 0h1v15h15v1H0V0Zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5Z"/>
            </svg>
          </div>
          <p class="text-md text-justify text-xl pt-2">{{ stats?.future_members ?? '0' }}</p>
          <p class="cursor-pointer">{{ $t('dashboard.future_members') }}</p>
        </div>
      </div>
      
      <div class="block bg-white overflow-hidden border-1 h-full rounded-md shadow">
        <div class="p-4">
          <div class="cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-graph-up-arrow w-6 h-6 text-green-600" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M0 0h1v15h15v1H0V0Zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5Z"/>
            </svg>
          </div>
          <p class="text-md text-justify text-xl pt-2">{{ stats?.converted_members ?? '0' }}</p>
          <p class="cursor-pointer">{{ $t('dashboard.converted_members') }}</p>
        </div>
      </div>

      <div class="block bg-white overflow-hidden border-1 h-full rounded-md shadow">
        <div class="p-4">
          <div class="cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-graph-up-arrow w-6 h-6 text-green-600" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M0 0h1v15h15v1H0V0Zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5Z"/>
            </svg>
          </div>
          <p class="text-md text-justify text-xl pt-2">{{ stats?.active_memberships ?? '0' }}</p>
          <p class="cursor-pointer">{{ $t('dashboard.active_memberships') }}</p>
        </div>
      </div>

      <div class="block bg-white overflow-hidden border-1 h-full rounded-md shadow">
        <div class="p-4">
          <div class="cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-graph-up-arrow w-6 h-6 text-green-600" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M0 0h1v15h15v1H0V0Zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5Z"/>
            </svg>
          </div>
          <p class="text-md text-justify text-xl pt-2">{{ stats?.freeze_memberships ?? '0' }}</p>
          <p class="cursor-pointer">{{ $t('dashboard.freeze_memberships') }}</p>
        </div>
      </div>

      <div class="block bg-white overflow-hidden border-1 h-full rounded-md shadow">
        <div class="p-4">
          <div class="cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-graph-up-arrow w-6 h-6 text-green-600" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M0 0h1v15h15v1H0V0Zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5Z"/>
            </svg>
          </div>
          <p class="text-md text-justify text-xl pt-2">{{ stats?.future_memberships ?? '0' }}</p>
          <p class="cursor-pointer">{{ $t('dashboard.future_memberships') }}</p>
        </div>
      </div>

      <div class="block bg-white overflow-hidden border-1 h-full rounded-md shadow">
        <div class="p-4">
          <div class="cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-graph-up-arrow w-6 h-6 text-green-600" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M0 0h1v15h15v1H0V0Zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5Z"/>
            </svg>
          </div>
          <p class="text-md text-justify text-xl pt-2">KWD {{ stats?.item_sales ?? '0.000' }}</p>
          <p class="cursor-pointer">{{ $t('dashboard.item_sales') }}</p>
        </div>
      </div>

      <div class="block bg-white overflow-hidden border-1 h-full rounded-md shadow">
        <div class="p-4">
          <div class="cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-graph-up-arrow w-6 h-6 text-green-600" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M0 0h1v15h15v1H0V0Zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5Z"/>
            </svg>
          </div>
          <p class="text-md text-justify text-xl pt-2">KWD {{ stats?.services_packages_sales ?? '0.000' }}</p>
          <p class="cursor-pointer">{{ $t('dashboard.service_packages') }}</p>
        </div>
      </div>

      <div class="block bg-white overflow-hidden border-1 h-full rounded-md shadow">
        <div class="p-4">
          <div class="cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-graph-up-arrow w-6 h-6 text-green-600" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M0 0h1v15h15v1H0V0Zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5Z"/>
            </svg>
          </div>
          <p class="text-md text-justify text-xl pt-2">KWD {{ stats?.locker_package_sales ?? '0.000' }}</p>
          <p class="cursor-pointer">{{ $t('dashboard.locker_packages') }}</p>
        </div>
      </div>

      <div class="block bg-white overflow-hidden border-1 h-full rounded-md shadow">
        <div class="p-4">
          <div class="cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-graph-up-arrow w-6 h-6 text-green-600" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M0 0h1v15h15v1H0V0Zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5Z"/>
            </svg>
          </div>
          <p class="text-md text-justify text-xl pt-2">KWD {{ stats?.main_package_sales ?? '0.000' }}</p>
          <p class="cursor-pointer">{{ $t('dashboard.main_packages') }}</p>
        </div>
      </div>

    </div>

    <div class="grid grid-cols-2 gap-4 m-1 my-6">

      <div id="payment-summary" class="p-2 bg-white shadow-md">
        <p class="font-semibold text-2xl">{{ $t('dashboard.payment_summery') }}</p>
        <div v-for="(summary, index) in stats?.payment_summary" :key="index" id="total-payment" class="my-2.5 rounded py-3 shadow flex px-3">
          <div class="flex items-center w-full font-medium">
            <p class="text-xl">{{ lang == 'ar' ? summary?.payment_name_ar : summary?.payment_name_en }}</p>
            <p class="text-blue-700 ms-auto text-lg">{{ $t('app.currency') }} {{ summary?.amount ?? '0.000' }}</p>
          </div>
        </div>
      </div>

      <div id="members-summary">
        <div class="p-2 bg-white shadow-md">
          <p class="font-semibold text-2xl">{{ $t('dashboard.members_summary') }}</p>
          <div id="total-payment" class="my-2.5 rounded py-3 shadow flex px-3">  
            <div class="flex items-center w-full font-medium">
              <p class="text-xl">{{ $t('dashboard.active_members') }}</p>
              <p class="text-blue-700 ms-auto text-lg">{{ stats?.members_summary?.active_members ?? '-' }}</p>
            </div>
          </div>
          <div id="cash" class="my-2.5 rounded py-3 shadow flex px-3">  
            <div class="flex items-center w-full font-medium">
              <p class="text-xl">{{ $t('dashboard.expired_members') }}</p>
              <p class="text-blue-700 ms-auto text-lg">{{ stats?.members_summary?.expired_members ?? '-' }}</p>
            </div>
          </div>
          <div id="knet" class="my-2.5 rounded py-3 shadow flex px-3">  
            <div class="flex items-center w-full font-medium">
              <p class="text-xl">{{ $t('dashboard.new_members') }}</p>
              <p class="text-blue-700 ms-auto text-lg">{{ stats?.members_summary?.new_members ?? '-' }}</p>
            </div>
          </div>
          <div id="master-card" class="my-2.5 rounded py-3 shadow flex px-3">  
            <div class="flex items-center w-full font-medium">
              <p class="text-xl">{{ $t('dashboard.cancelled_members') }}</p>
              <p class="text-blue-700 ms-auto text-lg">{{ stats?.members_summary?.cancelled_members ?? '-' }}</p>
            </div>
          </div>
        </div>
    </div>

    </div>

    <div class="p-2 bg-white shadow-md mb-6">
      <p class="font-semibold text-2xl">{{ $t('dashboard.quick_view') }}</p>
      <div class="grid grid-cols-5 gap-4 px-2">

        <div class="flex mt-3 mb-2" id="total-orders">
          <div class="rounded-full bg-pink-300 p-2 my-auto">
            <tw-icon name="heroicons-outline:user" class="w-10 h-10 text-white"/>
          </div>
          <div class="ms-3 my-auto">
            <p class="font-bold text-xl">{{ stats?.quick_view?.new_member ?? '0' }}</p>
            <p class="font-medium text-lg">{{ $t('dashboard.new_member') }}</p>
          </div>
        </div>

        <div class="flex mt-3 mb-2" id="total-orders">
          <div class="rounded-full bg-red-300 p-2 my-auto">
            <tw-icon name="heroicons-outline:ticket" class="w-10 h-10 text-white"/>
          </div>
          <div class="ms-3 my-auto">
            <p class="font-bold text-xl">{{ stats?.quick_view?.package_sold ?? '0' }}</p>
            <p class="font-medium text-lg">{{ $t('dashboard.package_sold') }}</p>
          </div>
        </div>

        <div class="flex mt-3 mb-2" id="total-orders">
          <div class="rounded-full bg-green-300 p-2 my-auto">
            <tw-icon name="heroicons-outline:lock-closed" class="w-10 h-10 text-white"/>
          </div>
          <div class="ms-3 my-auto">
            <p class="font-bold text-xl">{{ stats?.quick_view?.lockers_sold ?? '0' }}</p>
            <p class="font-medium text-lg">{{ $t('dashboard.lockers_sold') }}</p>
          </div>
        </div>

        <div class="flex mt-3 mb-2" id="total-orders">
          <div class="rounded-full bg-yellow-400 p-2 my-auto">
            <tw-icon name="heroicons-outline:tag" class="w-10 h-10 text-white"/>
          </div>
          <div class="ms-3 my-auto">
            <p class="font-bold text-xl">{{ stats?.quick_view?.services_sold ?? '0' }}</p>
            <p class="font-medium text-lg">{{ $t('dashboard.services_sold') }}</p>
          </div>
        </div>

        <div class="flex mt-3 mb-2" id="total-orders">
          <div class="rounded-full bg-orange-500 p-2 my-auto">
            <tw-icon name="heroicons-outline:table" class="w-10 h-10 text-white"/>
          </div>
          <div class="ms-3 my-auto">
            <p class="font-bold text-xl">{{ stats?.quick_view?.lesson_sold ?? '0' }}</p>
            <p class="font-medium text-lg">{{ $t('dashboard.lesson_sold') }}</p>
          </div>
        </div>

        <div class="flex mb-2" id="total-orders">
          <div class="rounded-full bg-blue-400 p-2 my-auto">
            <tw-icon name="heroicons-outline:shopping-cart" class="w-10 h-10 text-white"/>
          </div>
          <div class="ms-3 my-auto">
            <p class="font-bold text-xl">{{ stats?.quick_view?.items_invoiced ?? '0' }}</p>
            <p class="font-medium text-lg">{{ $t('dashboard.items_invoiced') }}</p>
          </div>
        </div>

        <div class="flex mb-2" id="total-orders">
          <div class="rounded-full bg-gray-400 p-2 my-auto">
            <tw-icon name="heroicons-outline:bookmark" class="w-10 h-10 text-white"/>
          </div>
          <div class="ms-3 my-auto">
            <p class="font-bold text-xl">{{ stats?.quick_view?.invoice_refunded ?? '0' }}</p>
            <p class="font-medium text-lg">{{ $t('dashboard.invoice_refunded') }}</p>
          </div>
        </div>

        <div class="flex mb-2" id="total-orders">
          <div class="rounded-full bg-yellow-600 p-2 my-auto">
            <tw-icon name="heroicons-outline:ban" class="w-10 h-10 text-white"/>
          </div>
          <div class="ms-3 my-auto">
            <p class="font-bold text-xl">{{ stats?.quick_view?.back_listed_members ?? '0' }}</p>
            <p class="font-medium text-lg">{{ $t('dashboard.blacklisted_members') }}</p>
          </div>
        </div>

        <div class="flex mb-2" id="total-orders">
          <div class="rounded-full bg-blue-600 p-2 my-auto">
            <tw-icon name="heroicons-outline:pause" class="w-10 h-10 text-white"/>
          </div>
          <div class="ms-3 my-auto">
            <p class="font-bold text-xl">{{ stats?.quick_view?.freezed_membership ?? '0' }}</p>
            <p class="font-medium text-lg">{{ $t('dashboard.freezed_membership') }}</p>
          </div>
        </div>

        <div class="flex mb-2" id="total-orders">
          <div class="rounded-full bg-blue-300 p-2 my-auto">
            <tw-icon name="heroicons-outline:clock" class="w-10 h-10 text-white"/>
          </div>
          <div class="ms-3 my-auto">
            <p class="font-bold text-xl">{{ stats?.quick_view?.expiring_members ?? '0' }}</p>
            <p class="font-medium text-lg">{{ $t('dashboard.expiring_members') }}</p>
          </div>
        </div>

        <div class="flex mb-2" id="total-orders">
          <div class="rounded-full bg-gray-600 p-2 my-auto">
            <tw-icon name="heroicons-outline:user-remove" class="w-10 h-10 text-white"/>
          </div>
          <div class="ms-3 my-auto">
            <p class="font-bold text-xl">{{ stats?.quick_view?.expired_members ?? '0' }}</p>
            <p class="font-medium text-lg">{{ $t('dashboard.expired_member') }}</p>
          </div>
        </div>

        <div class="flex mb-2" id="total-orders">
          <div class="rounded-full bg-green-300  p-2 my-auto">
            <tw-icon name="heroicons-outline:lock-closed" class="w-10 h-10 text-white"/>
          </div>
          <div class="ms-3 my-auto">
            <p class="font-bold text-xl">{{ stats?.quick_view?.locker_expiring ?? '0' }}</p>
            <p class="font-medium text-lg">{{ $t('dashboard.locker_expiring') }}</p>
          </div>
        </div>

        <div class="flex mb-2" id="total-orders">
          <div class="rounded-full bg-green-300  p-2 my-auto">
            <tw-icon name="heroicons-outline:lock-closed" class="w-10 h-10 text-white"/>
          </div>
          <div class="ms-3 my-auto">
            <p class="font-bold text-xl">{{ stats?.quick_view?.locker_reservation ?? '0' }}</p>
            <p class="font-medium text-lg">{{ $t('dashboard.locker_reservation') }}</p>
          </div>
        </div>

        <div class="flex mb-2" id="total-orders">
          <div class="rounded-full bg-green-300  p-2 my-auto">
            <tw-icon name="heroicons-outline:lock-closed" class="w-10 h-10 text-white"/>
          </div>
          <div class="ms-3 my-auto">
            <p class="font-bold text-xl">{{ stats?.quick_view?.locker_expired ?? '0' }}</p>
            <p class="font-medium text-lg">{{ $t('dashboard.locker_expired') }}</p>
          </div>
        </div>
        
      </div>
    </div>

    <div class="w-full">
      <p class="font-bold text-2xl pb-2">{{ $t('dashboard.summary_data') }}</p>
      <div class="shadow overflow-hidden rounded border-b border-gray-200">
        <table class="min-w-full bg-white">
          <thead class="font-bold">
            <tr class="border">
              <th class="text-left py-3 px-4 font-semibold text-lg"></th>
              <th class="text-left py-3 px-4 font-semibold text-lg">{{ $t('dashboard.invoice_count') }}</th>
              <th class="text-left py-3 px-4 font-semibold text-lg">{{ $t('dashboard.invoice_value') }}</th>
              <th class="text-left py-3 px-4 font-semibold text-lg">{{ $t('dashboard.invoice_return_count') }}</th>
              <th class="text-left py-3 px-4 font-semibold text-lg">{{ $t('dashboard.invoice_return_value') }}</th>
            </tr>
          </thead>
        <tbody class="text-gray-700">
          <tr class="border">
            <td class="text-left py-3 px-4">{{ $t('dashboard.membership') }}</td>
            <td class="text-left py-3 px-4">{{ stats?.membership_summary?.invoice_count ?? '0' }}</td>
            <td class="text-left py-3 px-4">{{ stats?.membership_summary?.invoice_value ?? '0' }}</td>
            <td class="text-left py-3 px-4">{{ stats?.membership_summary?.invoice_return_count ?? '0' }}</td>
            <td class="text-left py-3 px-4">{{ stats?.membership_summary?.invoice_return_value ?? '0' }}</td>
          </tr>
          <tr class="bg-gray-100 border">
            <td class="text-left py-3 px-4">{{ $t('dashboard.locker') }}</td>
            <td class="text-left py-3 px-4">{{ stats?.locker_summary?.invoice_count ?? '0' }}</td>
            <td class="text-left py-3 px-4">{{ stats?.locker_summary?.invoice_count ?? '0' }}</td>
            <td class="text-left py-3 px-4">{{ stats?.locker_summary?.invoice_count ?? '0' }}</td>
            <td class="text-left py-3 px-4">{{ stats?.locker_summary?.invoice_count ?? '0' }}</td>
          </tr>
          <tr class="border">
            <td class="text-left py-3 px-4">{{ $t('dashboard.item_sales') }}</td>
            <td class="text-left py-3 px-4">{{ stats?.item_sales_summary?.invoice_count ?? '0' }}</td>
            <td class="text-left py-3 px-4">{{ stats?.item_sales_summary?.invoice_count ?? '0' }}</td>
            <td class="text-left py-3 px-4">{{ stats?.item_sales_summary?.invoice_count ?? '0' }}</td>
            <td class="text-left py-3 px-4">{{ stats?.item_sales_summary?.invoice_count ?? '0' }}</td>
          </tr>
        </tbody>
        </table>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4 m-1 my-6">

      <div id="age-wise-data">
        <div class="p-2 bg-white shadow-md">
          <p class="font-semibold text-2xl">{{ $t('dashboard.age_wise_members_data') }}</p>
          <div id="total-payment" class="my-2.5 rounded py-3 shadow flex px-3">  
            <div class="flex items-center w-full font-medium">
              <p class="text-xl">{{ $t('dashboard.below_16_years') }}</p>
              <p class="text-blue-700 ms-auto text-lg">{{ stats?.below_sixteen ?? '0' }}</p>
            </div>
          </div>
          <div id="cash" class="my-2.5 rounded py-3 shadow flex px-3">  
            <div class="flex items-center w-full font-medium">
              <p class="text-xl">{{ $t('dashboard.16_to_22_years') }}</p>
              <p class="text-blue-700 ms-auto text-lg">{{ stats?.sixteen_to_twenty_two ?? '0' }}</p>
            </div>
          </div>
          <div id="knet" class="my-2.5 rounded py-3 shadow flex px-3">  
            <div class="flex items-center w-full font-medium">
              <p class="text-xl">{{ $t('dashboard.23_to_29_years') }}</p>
              <p class="text-blue-700 ms-auto text-lg">{{ stats?.twent_three_to_twenty_nine ?? '0' }}</p>
            </div>
          </div>
          <div id="master-card" class="my-2.5 rounded py-3 shadow flex px-3">  
            <div class="flex items-center w-full font-medium">
              <p class="text-xl">{{ $t('dashboard.30_to_39_years') }}</p>
              <p class="text-blue-700 ms-auto text-lg">{{ stats?.thirty_to_thirty_nine ?? '0' }}</p>
            </div>
          </div>
          <div id="knet" class="my-2.5 rounded py-3 shadow flex px-3">  
            <div class="flex items-center w-full font-medium">
              <p class="text-xl">{{ $t('dashboard.40_to_49_years') }}</p>
              <p class="text-blue-700 ms-auto text-lg">{{ stats?.fourty_to_fourty_nine ?? '0' }}</p>
            </div>
          </div>
          <div id="knet" class="my-2.5 rounded py-3 shadow flex px-3">  
            <div class="flex items-center w-full font-medium">
              <p class="text-xl">{{ $t('dashboard.above_50_years') }}</p>
              <p class="text-blue-700 ms-auto text-lg">{{ stats?.above_fifty ?? '0' }}</p>
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
import moment from 'moment'

export default {
  data() {
    return {
      start_date: new Date().toISOString().split('T')[0],
      end_date: new Date().toISOString().split('T')[0],
      branch: '0',
      lang: localStorage.getItem("currentLang") ?? "en",
      branches: JSON.parse(localStorage.getItem("userInfo"))?.user?.branches,
      stats: null
    }
  },

  computed:{
    ...mapGetters(["dashboardStats"]),
  },

  methods: {
    ...mapActions(["getDashboardStats"]),

    fetchData() {
      this.getDashboardStats({
        branch_id: this.branch,
        start_date: moment(String(this.start_date)).format('DD-MM-YYYY'),
        end_date: moment(String(this.end_date)).format('DD-MM-YYYY')
      })
    }
  },

  watch: {
    dashboardStats(data) {
      if(data != null) {
          this.stats = data
      }
  }
  },

  mounted() {
    this.fetchData()
  }
}
</script>