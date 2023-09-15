<template>
    <div>
        <p class="text-3xl">{{ $t('notification.title') }}</p>
        <hr class="mb-5" />

        <div class="mt-8">
            <custom-data-table
                :enableHeader="true"
                :searchBox="true"
                :searchFields="search_fields"
                :isAddNew="has_add_permission"
                :addBtnText="$t('datatable.send_notification')"
                :onAddBtnClicked="onSendNotification"
                :searchInNestedObject="false"
                :columns="columns" 
                :view="has_view_permission" 
                :edit="false" 
                :del="false" 
                :onView='viewDetails' 
                :quickAction="has_edit_permission" 
                :onQuickActionPerformed="onCheck" 
                :hasCustomAction="false"
                :rows="notifications_list">
            </custom-data-table>
        </div>

        <NotificationDetails 
            v-if="show_details_modal" 
            :notification="selected_notification"
            @close-modal="show_details_modal = false"/>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import NotificationDetails from './NotificationDetails.vue'

export default {
    components: {
        NotificationDetails
    },
    data() {
        return {
            notifications_list: [],
            membership_types: [],
            search_fields: ["title_en", "status", "gyms", "membership_types"],
            columns: [
                { name: "#", attribute: "#", sortable: false },
                { name: this.$t('datatable.title_en'), attribute: "title_en", sortable: true, dataType: "string" },
                { name: this.$t('datatable.branch'), attribute: "gyms", sortable: true, dataType: "string" },
                { name: this.$t('datatable.membership_types'), attribute: "membership_types", sortable: true, dataType: "string" },
                { name: this.$t('datatable.status'), attribute: "status", sortable: false, resource_style:"status_style" },
                { name: this.$t('datatable.action'), attribute:"is_active", sortable: false },
                { name: this.$t('datatable.view'), attribute: "action", sortable: false  },
            ],
            has_add_permission: false,
            has_view_permission: false,
            has_edit_permission: false,
            selected_notification: null,
            show_details_modal: false
        }
    },

    computed: {
        ...mapGetters(["notifications", "updateNotificationResponse"])
    },

    methods: {
        ...mapActions(["getNotifications", "updateNotification"]),

        onSendNotification() {
            this.$router.push('/send-notification')
        },

        viewDetails(id, data){
            this.selected_notification = data
            this.show_details_modal = true
        },

        onCheck(event, id, data){
            let status_flag = 0;
            if (event.target.checked) {
                status_flag = 1;
            } else {
                status_flag = 0;
            }
            this.updateNotification({
                id: id,
                status_flag:status_flag
            })
        },

        checkPermissions() {
            let page_permissions = this.$root.getScreenPermissions("Notifications")
            this.has_add_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "send_notification")
            this.has_view_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "view_notification_details")
            this.has_edit_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "update_notification")
        }
    },

    watch: {
        notifications(data) {
            if(data.status) {
                if(data.response.notifications) {
                    this.notifications_list = data.response.notifications
                    this.notifications_list.forEach(notification => {
                        notification.is_active = notification.is_active == 0 ? false : true,
                        notification["status_style"] = notification.status.toLowerCase() == "pending" ? "bg-info text-white py-1 px-1.5 rounded-md" : 
                            notification.status.toLowerCase() == "scheduled" ? "bg-orange-500 text-white py-1 px-1.5 rounded-md" : 
                            notification.status.toLowerCase() == "processed" ? "bg-success text-white py-1 px-1.5 rounded-md" :
                            "bg-red-500 text-white py-1 px-1.5 rounded-md"
                    });
                }
            } else {
                this.$toast.error(data.message)
            }
        },
        updateNotificationResponse(data) {
            if(data.status) {
                this.$toast.success(data.message);
            } else {
                this.$toast.error(data.message);
            }
        }
    },

    mounted() {
        this.checkPermissions()
        this.getNotifications()
    }
}
</script>