<template>
    <div id="membership-package-details-modal" class="mt-7 fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0" >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
  
        <span class="sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
  
        <div class="inline-block align-bottom bg-white text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-md">
          <form class="rounded px-4 pt-2 pb-6 mb-4">
            <tw-icon @click="$emit('close-modal')" name="heroicons-outline:x" class="w-6 h-6 text-gray-400 ms-auto cursor-pointer mt-2"/>
            <div class="bg-white px-4 pb-0">
              <div class="text-center sm:mt-0 sm:ms-4 sm:text-left">
                <p class="text-center mt-1.5 font-semibold text-xl">{{ $t('packages.membership_details') }}</p>
  
                <div class="my-2 mt-4">
                  <div class="sm:grid sm:grid-cols-2 sm:gap-8 my-2 block p-1.5 shadow">
                    <dt class="text-md font-semibold text-gray-700">{{ $t('packages.membership_type') }}</dt>
                    <dd class="mt-1 text-md text-gray-900 sm:mt-0 break-words">{{ membership_package?.membership_type?.name_en }}</dd>
                  </div>
                  <div class="sm:grid sm:grid-cols-2 sm:gap-8 my-2 block p-1.5 shadow">
                    <dt class="text-md font-semibold text-gray-700">{{ $t('packages.branches') }}</dt>
                    <dd class="mt-1 text-md text-gray-900 sm:mt-0 break-words">
                      <li v-for="branch in membership_package?.branches" :key="branch.id">{{ branch.name_en }}</li>
                    </dd>
                  </div>
                  <div class="sm:grid sm:grid-cols-2 sm:gap-8 my-2 block p-1.5 shadow">
                    <dt class="text-md font-semibold text-gray-700">{{ $t('packages.name_en') }}</dt>
                    <dd class="mt-1 text-md text-gray-900 sm:mt-0 break-words">{{ membership_package?.name_en }}</dd>
                  </div>
                  <div class="sm:grid sm:grid-cols-2 sm:gap-8 my-2 block p-1.5 shadow">
                    <dt class="text-md font-semibold text-gray-700">{{ $t('packages.name_ar') }}</dt>
                    <dd class="mt-1 text-md text-gray-900 sm:mt-0">{{ membership_package?.name_ar ?? '-' }}</dd>
                  </div>
                  <div class="sm:grid sm:grid-cols-2 sm:gap-8 my-2 block p-1.5 shadow">
                    <dt class="text-md font-semibold text-gray-700">{{ $t('packages.amount') }}</dt>
                    <dd class="mt-1 text-md text-gray-900 sm:mt-0">{{ membership_package?.amount ?? '-' }}</dd>
                  </div>
                  <div class="sm:grid sm:grid-cols-2 sm:gap-8 my-2 block p-1.5 shadow">
                    <dt class="text-md font-semibold text-gray-700">{{ $t('packages.duration') }}</dt>
                    <dd class="mt-1 text-md text-gray-900 sm:mt-0">{{ membership_package?.duration   ?? '-' }}</dd>
                  </div>
                  <div class="sm:grid sm:grid-cols-2 sm:gap-8 my-2 block p-1.5 shadow">
                    <dt class="text-md font-semibold text-gray-700">{{ $t('packages.start_date') }}</dt>
                    <dd class="mt-1 text-md text-gray-900 sm:mt-0">{{ membership_package?.start_date   ?? '-' }}</dd>
                  </div>
                  <div class="sm:grid sm:grid-cols-2 sm:gap-8 my-2 block p-1.5 shadow">
                    <dt class="text-md font-semibold text-gray-700">{{ $t('packages.end_date') }}</dt>
                    <dd class="mt-1 text-md text-gray-900 sm:mt-0">{{ membership_package?.end_date   ?? '-' }}</dd>
                  </div>
                  <div class="sm:grid sm:grid-cols-2 sm:gap-8 my-2 block p-1.5 shadow">
                    <dt class="text-md font-semibold text-gray-700">{{ $t('packages.min_age') }}</dt>
                    <dd class="mt-1 text-md text-gray-900 sm:mt-0">{{ membership_package?.min_age   ?? '-' }}</dd>
                  </div>
                  <div class="sm:grid sm:grid-cols-2 sm:gap-8 my-2 block p-1.5 shadow">
                    <dt class="text-md font-semibold text-gray-700">{{ $t('packages.freeze_quantity') }}</dt>
                    <dd class="mt-1 text-md text-gray-900 sm:mt-0">{{ membership_package?.freeze_quantity   ?? '-' }}</dd>
                  </div>
                  <div class="sm:grid sm:grid-cols-2 sm:gap-8 my-2 block p-1.5 shadow">
                    <dt class="text-md font-semibold text-gray-700">{{ $t('packages.total_freeze_days') }}</dt>
                    <dd class="mt-1 text-md text-gray-900 sm:mt-0">{{ membership_package?.total_freeze_days   ?? '-' }}</dd>
                  </div>

                  <div class="sm:grid sm:grid-cols-2 sm:gap-8 my-2 block p-1.5 shadow">
                    <dt class="text-md font-semibold text-gray-700">{{ $t('packages.free_locker') }}</dt>
                    <dd class="mt-1 text-md text-gray-900 sm:mt-0 break-words">
                      <li v-for="locker in membership_package?.locker_packages" :key="locker.id">{{ locker.name_en }}</li>
                    </dd>
                  </div>

                  <div class="sm:grid sm:grid-cols-2 sm:gap-8 my-2 block p-1.5 shadow">
                    <dt class="text-md font-semibold text-gray-700">{{ $t('packages.free_service') }}</dt>
                    <dd class="mt-1 text-md text-gray-900 sm:mt-0 break-words">
                      <li v-for="service in membership_package?.service_packages" :key="service.id">{{ service.name_en }}</li>
                    </dd>
                  </div>

                  <div class="sm:grid sm:grid-cols-2 sm:gap-8 my-2 block p-1.5 shadow">
                    <dt class="text-md font-semibold text-gray-700">{{ $t('packages.free_lesson') }}</dt>
                    <dd class="mt-1 text-md text-gray-900 sm:mt-0 break-words">
                      <li v-for="lesson in membership_package?.lesson_packages" :key="lesson.id">{{ lesson.name_en }}</li>
                    </dd>
                  </div>
                  
                  <div class="sm:grid sm:grid-cols-2 sm:gap-8 my-2 block p-1.5 shadow">
                    <dt class="text-md font-semibold text-gray-700">{{ $t('packages.remark') }}</dt>
                    <dd class="mt-1 text-md text-gray-900 sm:mt-0">{{ membership_package?.remark ?? '-' }}</dd>
                  </div>
                  <div class="sm:grid sm:grid-cols-2 sm:gap-8 my-2 block p-1.5 shadow">
                    <dt class="text-md font-semibold text-gray-700">{{ $t('packages.status') }}</dt>
                    <dd class="mt-1 text-md text-gray-900 sm:mt-0">{{ membership_package?.is_active ? $t('datatable.active') : $t('datatable.inactive') }}</dd>
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
    props: ["membership_package"],

    data() {
        return {
        }
    },
  };
  </script>