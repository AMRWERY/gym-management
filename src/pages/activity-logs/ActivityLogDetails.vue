<template>
    <div class="container mx-auto pb-10">
        <h1 class="text-xl text-black mb-6">{{ $t('activity_log.details') }}</h1>
        
        <div class="columns-1 bg-white p-4 mt-8 py-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-20">
                <div class="">
                    <p class="text-md font-medium pb-2">{{ $t('activity_log.user_info') }}</p>
                    <div class="border border-solid border-gray px-4 py-2">
                        <div class="sm:grid sm:grid-cols-3 sm:gap-3 mt-2">
                            <dt class="text-sm font-medium text-gray-500">{{ $t('activity_log.name') }}</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ activityLogDetails?.response?.user.name ?? '-' }}</dd>
                        </div>
                        <div class="sm:grid sm:grid-cols-3 sm:gap-3 mt-2">
                            <dt class="text-sm font-medium text-gray-500">{{ $t('activity_log.email_id') }}</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ activityLogDetails?.response?.user.email ?? '-' }}</dd>
                        </div>
                        <div class="sm:grid sm:grid-cols-3 sm:gap-3 mt-2">
                            <dt class="text-sm font-medium text-gray-500">{{ $t('activity_log.mobile_no') }}</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ activityLogDetails?.response?.user?.mobile ?? '-' }}</dd>
                        </div>
                        <div class="sm:grid sm:grid-cols-3 sm:gap-3 mt-2">
                            <dt class="text-sm font-medium text-gray-500">{{ $t('activity_log.role') }}</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ activityLogDetails?.response?.admin_group?.title_en ?? '-' }}</dd>
                        </div>
                        <div class="sm:grid sm:grid-cols-3 sm:gap-3 my-2">
                            <dt class="text-sm font-medium text-gray-500">{{ $t('activity_log.date_n_time') }}</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ activityLogDetails?.response?.created_at ?? '-' }}</dd>
                        </div>
                    </div>
                </div>
                <div class="">
                    <p class="text-md font-medium pb-2">{{ $t('activity_log.activity_details') }}</p>
                    <div class="border border-solid border-gray px-4 py-2">
                        <div class="sm:grid sm:grid-cols-3 sm:gap-3 mt-2">
                            <dt class="text-sm font-medium text-gray-500">{{ $t('activity_log.action') }}</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ activityLogDetails?.response?.action ?? '-' }}</dd>
                        </div>
                        <div class="sm:grid sm:grid-cols-3 sm:gap-3 mt-2">
                            <dt class="text-sm font-medium text-gray-500">{{ $t('activity_log.section') }}</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ activityLogDetails?.response?.admin_menu?.title_en ?? '-' }}</dd>
                        </div>
                        <div class="sm:grid sm:grid-cols-3 sm:gap-3 mt-2">
                            <dt class="text-sm font-medium text-gray-500">{{ $t('activity_log.sub_section') }}</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ activityLogDetails?.response?.admin_sub_menu?.title_en ?? '-' }}</dd>
                        </div>
                        <div class="sm:grid sm:grid-cols-3 sm:gap-3 mt-2">
                            <dt class="text-sm font-medium text-gray-500">{{ $t('activity_log.ip_address') }}</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ activityLogDetails?.response?.ip_address ?? '-' }}</dd>
                        </div>
                        <div class="sm:grid sm:grid-cols-3 sm:gap-3 my-2">
                            <dt class="text-sm font-medium text-gray-500">{{ $t('activity_log.user_agent') }}</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ activityLogDetails?.response?.user_agent ?? '-' }}</dd>
                        </div>
                    </div>
                </div>
            </div>

            <div class="my-6">
                <p class="text-md font-medium">{{ $t('activity_log.description') }}</p> 
                <div class="columns-1 bg-orange-50 p-4 mt-1.5">
                    <p class="color-primary text-md">
                        {{ log_description ?? '-' }}
                    </p>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    data() {
        return {
            activity_log_id: this.$route.params.id,
            log_description: ''
        }
    },
    computed: {
        ...mapGetters(["activityLogDetails"]),
    },
    methods: {
        ...mapActions(["getActivityLogDetails"]),
    },
    watch: {
        activityLogDetails(data) {
            if(!data.status) {
                this.$toast.error(data.message);
            } else {
                if(this.activityLogDetails?.response?.details){
                    this.log_description = JSON.parse(this.activityLogDetails?.response?.details)?.description
                }
            }
        }
    },
    mounted() {
        this.getActivityLogDetails(this.activity_log_id)
    },
}
</script>