<template>
    <div>
        <div v-if="member.id" class="mb-8">
            <p class="text-3xl">{{ $t('transactions.member_info') }}</p>

            <div class="mt-2 bg-white p-3 grid grid-cols-4 gap-3">
                <div class="col-span-4">
                    <img width="100" :src="member?.image" />
                </div>

                <div>

                    <div class="pb-3">
                        <p class="text-sm font-bold">{{ $t('transactions.name') }}</p>
                        <p>{{ member?.name_en ?? '-' }}</p>
                    </div>

                    <div class="pb-3">
                        <p class="text-sm font-bold">{{ $t('transactions.birthdate') }}</p>
                        <p>{{ member?.birth_date ?? '-' }} <span class="font-medium color-primary">({{ member?.age ?? '-'
                        }}y)</span></p>
                    </div>

                    <div class="pb-3">
                        <p class="text-sm font-bold">{{ $t('transactions.gender') }}</p>
                        <p>{{ member?.gender ?? '-' }}</p>
                    </div>

                    <div class="pb-3">
                        <p class="text-sm font-bold">{{ $t('transactions.address') }}</p>
                        <p>{{ member?.address ?? '-' }}</p>
                    </div>
                </div>

                <div>

                    <div class="pb-3">
                        <p class="text-sm font-bold">{{ $t('transactions.civil_id') }}</p>
                        <p>{{ member?.civil_id ?? '-' }}</p>
                    </div>

                    <div class="pb-3">
                        <p class="text-sm font-bold">{{ $t('transactions.civil_id_expiry') }}</p>
                        <p>{{ member?.civil_id_expiry ?? '-' }}</p>
                    </div>

                    <div class="pb-3">
                        <p class="text-sm font-bold">{{ $t('transactions.passport') }}</p>
                        <p>{{ member?.passport ?? '-' }}</p>
                    </div>

                    <div class="pb-3">
                        <p class="text-sm font-bold">{{ $t('transactions.company_name') }}</p>
                        <p>{{ member?.company_name ?? '-' }}</p>
                    </div>
                    <div class="pb-3">
                        <p class="text-sm font-bold">{{ $t('transactions.company_type') }}</p>
                        <p>{{ member?.company_type ?? '-' }}</p>
                    </div>

                </div>

                <div>
                    <div class="pb-3">
                        <p class="text-sm font-bold">{{ $t('transactions.member_code') }}</p>
                        <p>{{ member?.code ?? '-' }}</p>
                    </div>

                    <div class="pb-3">
                        <p class="text-sm font-bold">{{ $t('transactions.email') }}</p>
                        <p>{{ member?.email ?? '-' }}</p>
                    </div>

                    <div class="pb-3">
                        <p class="text-sm font-bold">{{ $t('transactions.mobile') }}</p>
                        <p>{{ member?.mobile ?? '-' }}</p>
                    </div>

                    <div class="pb-3">
                        <p class="text-sm font-bold">{{ $t('transactions.alt_mobile') }}</p>
                        <p>{{ member?.alt_mobile ?? '-' }}</p>
                    </div>

                    <div class="pb-3">
                        <p class="text-sm font-bold">{{ $t('transactions.remark') }}</p>
                        <p>{{ member?.remark ?? '-' }}</p>
                    </div>

                </div>

                <div>
                    <div class="pb-3">
                        <p class="text-sm font-bold">{{ $t('datatable.branch') }}</p>
                        <p>{{ member?.branch?.name_en ?? '-' }}</p>
                        <!-- <li v-for="branch in member?.branches" :key="branch.id">{{ branch.name_en }}</li> -->
                    </div>

                    <div class="pb-3">
                        <p class="text-sm font-bold">{{ $t('transactions.last_package_date') }}</p>
                        <p>{{ member?.last_package_date ?? '-' }}</p>
                    </div>

                    <div class="pb-3">
                        <p class="text-sm font-bold">{{ $t('transactions.blacklisted') }}</p>
                        <p v-if="member?.black_listed"><span
                                class="text-xs rounded-md text-white px-3 py-1 text-bg-red">{{ $t('transactions.blacklisted_till') }}
                                {{ member?.black_listed_till ?? '-' }}</span></p>
                        <p v-else>{{ $t('transactions.no') }}</p>
                    </div>

                    <!-- <div>
                        <p class="text-sm font-bold">{{$t('transactions.health_details')}}</p>
                        <li v-for="health in member?.member_health" :key="health.id">
                            <b class="text-sm">{{ health.general.name_en }}</b> ({{$t('transactions.as_on')}} {{ health.as_on_date }})
                        </li>
                    </div> -->
                </div>

            </div>
        </div>
        <div>
            <p class="text-3xl">{{ $t('transactions.subscriptions') }}</p>
            <hr class="mb-5" />

            <div class="mt-8">
                <custom-data-table :enableHeader="true" :searchBox="true" :searchFields="search_fields"
                    :searchInNestedObject="true" :nestedObjNames="nested_obj_names" :isAddNew="has_add_permission"
                    :addBtnText="$t('datatable.add_new')" :onAddBtnClicked="onAddNewSubscription" :columns="columns"
                    :view="false" :edit="false" :del="false" :quickAction="false" :dropdownAction="true"
                    :dropdownMenus="dropdown_menus" :rows="subscriptions_list">
                </custom-data-table>
            </div>

            <MemberSubscriptionFreezeForm v-if="show_subscription_freeze_form"
                :selected_subscription="selected_subscription_info" @close-modal="show_subscription_freeze_form = false" />
            <MemberSubscriptionEditForm v-if="show_subscription_edit_form"
                :selected_subscription="selected_subscription_info" @close-modal="show_subscription_edit_form = false" />
            <MemberSubscriptionChangeLockerForm v-if="show_subscription_change_locker_form"
                :selected_subscription="selected_subscription_info" :lockers="lockers"
                @close-modal="show_subscription_change_locker_form = false" />
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MemberSubscriptionFreezeForm from './MemberSubscriptionFreezeForm.vue';
import MemberSubscriptionEditForm from './MemberSubscriptionEditForm.vue';
import MemberSubscriptionChangeLockerForm from './MemberSubscriptionChangeLockerForm.vue';

export default {
    components: { MemberSubscriptionFreezeForm, MemberSubscriptionEditForm, MemberSubscriptionChangeLockerForm },
    data() {
        return {
            member_id: this.$route.params.id,
            show_subscription_freeze_form: false,
            show_subscription_edit_form: false,
            show_subscription_change_locker_form: false,
            show_upgrade_membership_form: false,
            nested_obj_names: ["membership_type", "membership_package"],
            search_fields: ["code", "total_amount", "membership_type_name_en", "membership_package_name_en", "start_date", "end_date"],
            columns: [
                { name: "#", attribute: "#", sortable: false },
                { name: this.$t('datatable.subscription_id'), attribute: "code", sortable: false },
                { name: this.$t('datatable.package_type'), attribute: "name_en", nestedObject: 'membership_type', sortable: false },
                { name: this.$t('datatable.package'), attribute: "name_en", nestedObject: 'membership_package', sortable: false },
                { name: this.$t('datatable.amount'), attribute: "total_amount", sortable: false },
                { name: this.$t('datatable.start_date'), attribute: "start_date", sortable: false },
                { name: this.$t('datatable.end_date'), attribute: "end_date", sortable: false },
                { name: this.$t('datatable.action'), attribute: "action", sortable: false }
            ],
            dropdown_menus: [
                { name: this.$t('datatable.invoice'), function: this.subscriptionInvoice },
                { name: this.$t('datatable.renew'), function: this.renewSubscription },
                { name: this.$t('datatable.freeze'), function: this.freezeSubscription },
                { name: this.$t('datatable.edit'), function: this.editSubscription },
                { name: this.$t('datatable.change_locker'), function: this.changeLocker },
                { name: this.$t('datatable.upgrade'), function: this.upgradeMembership },
            ],
            selected_subscription_info: [],
            subscriptions_list: [],
            membership_types: [],
            membership_packages: [],
            discounts: [],
            locker_types: [],
            lockers: [],
            member: [],
            has_add_permission: false,
            has_renew_permission: false,
            has_invoice_permission: false,
            has_freeze_permission: false,
            has_edit_permission: false
        }
    },
    computed: {
        ...mapGetters(["subscriptions", "subscriptionsToast", "updateSubscriptionResponse"]),
    },
    methods: {
        ...mapActions(["getSubscriptions", "updateSubscription", "deleteSubscription"]),

        editSubscription(data) {
            if (this.has_edit_permission) {
                this.selected_subscription_info = data;
                this.show_subscription_edit_form = true;
            } else {
                this.$toast.error('You do not have access to use this feature.')
            }
        },
        changeLocker(data) {
            if (this.has_edit_permission) {
                this.selected_subscription_info = data;
                this.show_subscription_change_locker_form = true;
            } else {
                this.$toast.error('You do not have access to use this feature.')
            }
        },
        upgradeMembership(data) {
            if (this.has_edit_permission) {
                this.selected_subscription_info = data;
                this.show_upgrade_membership_form = true;
            } else {
                this.$toast.error('You do not have access to use this feature.')
            }
        },
        freezeSubscription(data) {
            if (this.has_freeze_permission) {
                this.selected_subscription_info = data;
                this.show_subscription_freeze_form = true;
            } else {
                this.$toast.error('You do not have access to use this feature.')
            }
        },
        renewSubscription(data) {
            if (this.has_renew_permission) {
                this.$router.push('/create-member-subscription/' + data.id + '/renew')
            } else {
                this.$toast.error('You do not have access to use this feature.')
            }
        },
        subscriptionInvoice(data) {
            if (this.has_invoice_permission) {
                this.$router.push('/member-subscription-invoice/' + data.id)
            } else {
                this.$toast.error('You do not have access to use this feature.')
            }
        },
        subscriptionDetails(data) {
            if (this.has_view_permission) {
                this.$router.push('/member-subscription-invoice/' + data.id)
            } else {
                this.$toast.error('You do not have access to use this feature.')
            }
        },
        onAddNewSubscription() {
            this.$router.push('/create-member-subscription/' + this.member_id + '/add')
        },
        closePopup() {
            this.show_subscription_freeze_form = false;
        },
        checkPermissions() {
            let page_permissions = this.$root.getScreenPermissions("Members")
            this.has_add_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "add_member_subscription")
            this.has_view_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "view_member_subscription")
            this.has_renew_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "renew_membership")
            this.has_invoice_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "issue_invoice")
            this.has_freeze_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "freeze_membership")
            this.has_edit_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "edit_subscription")
            this.has_edit_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "upgrade_membership")
        }
    },
    watch: {
        subscriptions(data) {
            if (data != null) {
                this.subscriptions_list = data.subscriptions
                this.member = data.member
                this.membership_types = data.membership_types
                this.membership_packages = data.membership_packages
                this.discounts = data.discounts
                this.locker_types = data.locker_types
                this.lockers = data.lockers
            }
        },
        subscriptionsToast(data) {
            if (data.status) {
                this.$toast.success(data.message)
            } else {
                this.$toast.error(data.message)
            }
        },
        updateSubscriptionResponse(data) {
            if (data.status) {
                this.$toast.success(data.message)
            } else {
                this.$toast.error(data.message)
            }
        }
    },
    mounted() {
        this.checkPermissions()
        this.getSubscriptions(this.member_id)
    },
}
</script>