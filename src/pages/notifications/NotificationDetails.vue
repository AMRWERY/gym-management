<template>
    <div id="notification-details-modal" class="mt-7 fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0" >
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div class="inline-block align-bottom bg-white text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full ms-64">
                <form class="rounded px-4 pt-6 mb-4">
                    <tw-icon @click="$emit('close-modal')" name="heroicons-outline:x" class="w-6 h-6 text-gray-400 ms-auto cursor-pointer"/>
                    <div class="bg-white px-4 pt-5 pb-2 sm:p-0">
                        <div class="mt-3 text-center sm:mt-0 sm:ms-4 sm:text-left">
                            <h2 class="text-2xl text-center leading-6 font-medium text-gray-900" id="modal-title">
                                {{ $t('notification.details') }}
                            </h2>
                            <div class="grid grid-cols-2 gap-3 mt-4" id="modal-form-data">
                                <div>
                                    <dt class="font-bold text-md">{{ $t('notification.title_en') }}</dt>
                                    <dd>{{ notification?.title_en ?? '—' }}</dd>
                                </div>
                                <div>
                                    <dt class="font-bold text-md">{{ $t('notification.title_ar') }}</dt>
                                    <dd>{{ notification?.title_ar ?? '—' }}</dd>
                                </div>
                                <div>
                                    <dt class="font-bold text-md">{{ $t('notification.description_en') }}</dt>
                                    <dd>{{ notification?.description_en ?? '—' }}</dd>
                                </div>
                                <div>
                                    <dt class="font-bold text-md">{{ $t('notification.description_ar') }}</dt>
                                    <dd>{{ notification?.description_ar ?? '—' }}</dd>
                                </div>
                                <div>
                                    <dt class="font-bold text-md">{{ $t('notification.branch') }}</dt>
                                    <dd>{{ notification?.gyms ?? '—' }}</dd>
                                </div>
                                <div>
                                    <dt class="font-bold text-md">{{ $t('notification.membership') }}</dt>
                                    <dd>{{ notification?.membership_types ?? '—' }}</dd>
                                </div>
                                <div>
                                    <dt class="font-bold text-md">{{ $t('notification.date_time') }}</dt>
                                    <dd>{{ notification?.created_at ?? '—' }}</dd>
                                </div>
                                <div>
                                    <dt class="font-bold text-md">{{ $t('notification.schedule_at') }}</dt>
                                    <dd>{{ notification?.schedule_date ?? '—' }}</dd>
                                </div>
                                <div>
                                    <dt class="font-bold text-md">{{ $t('notification.link') }}</dt>
                                    <dd><a :href="notification?.link" target="_blank">{{ notification?.link ?? '—' }}</a></dd>
                                </div>
                                <div>
                                    <dt class="font-bold text-md">{{ $t('notification.status') }}</dt>
                                    <dd class="w-min" :class="notification?.status_style">{{ notification?.status ?? '—' }}</dd>
                                </div>
                                <div>
                                    <dt class="font-bold text-md">{{ $t('notification.image') }}</dt>
                                    <dd>
                                        <img v-if="notification?.image != null" :src="notification?.image" class="w-40 rounded-md"/>
                                        <span v-else>—</span>
                                    </dd>
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
    props: ["notification"]
}
</script>