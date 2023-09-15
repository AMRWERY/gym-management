<template>
    <div id="lesson-configuration-details-modal" class="mt-7 fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0" >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
  
        <span class="sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
  
        <div class="inline-block align-bottom bg-white text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-md">
          <form class="rounded px-4 pt-2 pb-6 mb-4">
            <tw-icon @click="$emit('close-modal')" name="heroicons-outline:x" class="w-6 h-6 text-gray-400 ms-auto cursor-pointer mt-2"/>
            <div class="bg-white px-4 pb-0">
              <div class="text-center sm:mt-0 sm:ms-4 sm:text-left">
                <p class="text-center mt-1.5 font-semibold text-xl">{{ $t('users.lesson_confirguration_details') }}</p>
  
                <div class="my-2 mt-4">
                  <div class="sm:grid sm:grid-cols-2 sm:gap-8 my-2 block p-1.5 shadow">
                    <dt class="text-md font-semibold text-gray-700">{{ $t('users.lesson_type') }}</dt>
                    <dd class="mt-1 text-md text-gray-900 sm:mt-0 break-words">{{ lesson_configuration?.lesson_type?.name_en }}</dd>
                  </div>
                  <div class="sm:grid sm:grid-cols-2 sm:gap-8 my-2 block p-1.5 shadow">
                    <dt class="text-md font-semibold text-gray-700">{{ $t('users.lesson') }}</dt>
                    <dd class="mt-1 text-md text-gray-900 sm:mt-0">{{ lesson_configuration?.lesson_package?.name_en ?? '-' }}</dd>
                  </div>
                  <div class="sm:grid sm:grid-cols-2 sm:gap-8 my-2 block p-1.5 shadow">
                    <dt class="text-md font-semibold text-gray-700">{{ $t('users.data_type') }}</dt>
                    <dd class="mt-1 text-md text-gray-900 sm:mt-0">{{ lesson_configuration?.general?.name_en ?? '-' }}</dd>
                  </div>
                  <div class="sm:grid sm:grid-cols-2 sm:gap-8 my-2 block p-1.5 shadow">
                    <dt class="text-md font-semibold text-gray-700">{{ $t('users.commission_type') }}</dt>
                    <dd class="mt-1 text-md text-gray-900 sm:mt-0">{{ lesson_configuration?.commission_type   ?? '-' }}</dd>
                  </div>
                  <div class="sm:grid sm:grid-cols-2 sm:gap-8 my-2 block p-1.5 shadow">
                    <dt class="text-md font-semibold text-gray-700">{{ $t('users.commission_value') }}</dt>
                    <dd class="mt-1 text-md text-gray-900 sm:mt-0">{{ lesson_configuration?.commission_value   ?? '-' }}</dd>
                  </div>
                  <div class="sm:grid sm:grid-cols-2 sm:gap-8 my-2 block p-1.5 shadow">
                    <dt class="text-md font-semibold text-gray-700">{{ $t('users.start_time') }}</dt>
                    <dd class="mt-1 text-md text-gray-900 sm:mt-0">{{ lesson_configuration?.start_time   ?? '-' }}</dd>
                  </div>
                  <div class="sm:grid sm:grid-cols-2 sm:gap-8 my-2 block p-1.5 shadow">
                    <dt class="text-md font-semibold text-gray-700">{{ $t('users.end_time') }}</dt>
                    <dd class="mt-1 text-md text-gray-900 sm:mt-0">{{ lesson_configuration?.end_time   ?? '-' }}</dd>
                  </div>
                  <div class="sm:grid sm:grid-cols-2 sm:gap-8 my-2 block p-1.5 shadow">
                    <dt class="text-md font-semibold text-gray-700">{{ $t('users.days') }}</dt>
                    <dd class="mt-1 text-md text-gray-900 sm:mt-0">{{ lesson_configuration?.days_text   ?? '-' }}</dd>
                  </div>
                  <div class="sm:grid sm:grid-cols-2 sm:gap-8 my-2 block p-1.5 shadow">
                    <dt class="text-md font-semibold text-gray-700">{{ $t('users.remark') }}</dt>
                    <dd class="mt-1 text-md text-gray-900 sm:mt-0">{{ lesson_configuration?.remark ?? '-' }}</dd>
                  </div>
                  <div class="sm:grid sm:grid-cols-2 sm:gap-8 my-2 block p-1.5 shadow">
                    <dt class="text-md font-semibold text-gray-700">{{ $t('users.status') }}</dt>
                    <dd class="mt-1 text-md text-gray-900 sm:mt-0">{{ lesson_configuration?.is_active ? $t('datatable.active') : $t('datatable.inactive') }}</dd>
                  </div>
                </div>
  
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ["lesson_configuration"],

    data() {
        return {
        }
    },
  };
  </script>