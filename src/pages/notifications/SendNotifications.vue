<template>
    <div class="pb-8 ">
        <div class="rounded-md shadow-lg bg-white mx-auto p-4 w-9/12">
            <span class="text-2xl p-4 font-medium">{{ $t('notification.send_notification') }}</span>
            <form>
                <div class="grid grid-cols-2 gap-3 p-4 mb-0">
                    <div class="my-1 px-1 w-full overflow-hidden">
                        <label for="title_en" class="text-md font-medium">{{ $t('notification.title_en') }} *</label>
                        <input class="w-10/12 text-md mt-1.5 rounded-md border-2 text-gray-700 h-10 px-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="title_en"
                            type="text"
                            v-model="notification.title_en"
                            :placeholder="$t('notification.title_en')" />
                        <br/><span class="text-sm text-red-400" v-if="v$.notification.title_en.$error"> {{ v$.notification.title_en.$errors[0].$message }}</span>
                    </div>

                    <div class="my-1 px-1 w-full overflow-hidden">
                        <label for="title_ar" class="text-md font-medium">{{ $t('notification.title_ar') }} *</label>
                        <input class="w-10/12 text-md mt-1.5 rounded-md border-2 text-gray-700 h-10 px-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="title_ar"
                            type="text"
                            v-model="notification.title_ar"
                            :placeholder="$t('notification.title_ar')" />
                        <br/><span class="text-sm text-red-400" v-if="v$.notification.title_ar.$error"> {{ v$.notification.title_ar.$errors[0].$message }}</span>
                    </div>

                    <div class="my-1 px-1 w-full overflow-hidden">
                        <label for="description_en" class="text-md font-medium">{{ $t('notification.description_en') }}</label>
                        <textarea class="w-10/12 text-md mt-1.5 rounded-md border-2 text-gray-700 px-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="description_en"
                            rows="3"
                            v-model="notification.description_en"
                            :placeholder="$t('notification.description_en')" />
                    </div>

                    <div class="my-1 px-1 w-full overflow-hidden">
                        <label for="description_ar" class="text-md font-medium">{{ $t('notification.description_ar') }}</label>
                        <textarea class="w-10/12 text-md mt-1.5 rounded-md border-2 text-gray-700 px-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="description_ar"
                            rows="3"
                            v-model="notification.description_ar"
                            :placeholder="$t('notification.description_ar')" />
                    </div>

                    <div class="my-1 px-1 w-full">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="branch_ids">
                            {{ $t('notification.branch_hint') }} *
                        </label>
                        <Multiselect
                            mode="tags"
                            :searchable="true"
                            :createTag="true"
                            v-model="notification.branch_ids"
                            :multiple="true"
                            label="name_en"
                            valueProp='id'
                            :placeholder="$t('notification.branch_hint')"
                            class="shadow border rounded w-full text-gray-700"
                            :options="branches"/>
                        <span class="text-sm text-red-400" v-if="v$.notification.branch_ids.$error"> {{ v$.notification.branch_ids.$errors[0].$message }}</span>
                    </div>

                    <div class="my-1 px-1 w-full">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="branch_ids">
                            {{ $t('notification.select_memberships') }} *
                        </label>
                        <Multiselect
                            mode="tags"
                            :searchable="true"
                            :createTag="true"
                            v-model="notification.membership_types"
                            :multiple="true"
                            label="name_en"
                            valueProp='id'
                            :placeholder="$t('notification.select_membership_types')"
                            class="shadow border rounded w-full text-gray-700"
                            :options="memberships"/>
                        <span class="text-sm text-red-400" v-if="v$.notification.membership_types.$error"> {{ v$.notification.membership_types.$errors[0].$message }}</span>
                    </div>

                    <div class="my-1 px-1 w-full overflow-hidden">
                        <label for="schedule_date" class="font-medium">{{ $t('notification.schedule_notification') }}</label>
                        <date-picker id="schedule_date" v-model="notification.schedule_date" :monthChangeOnScroll="false" 
                            :minDate="new Date()" :format="'dd/MM/yyyy HH:mm'"
                            :placeholder="$t('notification.schedule_date')" class="px-1 w-10/12 mt-1.5 border-2 rounded-md text-gray-700"/>
                        <span class="text-sm text-red-400" v-if="v$.notification.schedule_date.$error"> {{ v$.notification.schedule_date.$errors[0].$message }}</span>
                    </div>

                    <div class="my-1 px-1 w-full overflow-hidden">
                        <label for="link" class="text-md font-medium">{{ $t('notification.link_opt') }}</label>
                        <input class="w-10/12 text-md mt-1.5 rounded-md border-2 text-gray-700 h-10 px-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="link"
                            type="url"
                            v-model="notification.link"
                            :placeholder="$t('notification.link_hint')" />
                        <br/><span class="text-sm text-red-400" v-if="v$.notification.link.$error"> {{ v$.notification.link.$errors[0].$message }}</span>
                    </div>

                    <div class="my-1 px-1 w-full overflow-hidden">
                        <label for="image" class="text-md font-medium">{{ $t('notification.image_hint') }}</label>
                        <input class="text-80" type="file" @change="handleImageSelection($event)" accept="image/*">
                    </div>

                </div>

                <div class="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button @click="sendNotification" type="button" class="w-full justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:ms-3 sm:w-auto sm:text-sm">
                        {{ $t('button.send') }}
                    </button>
                
                    <button @click.prevent="$router.back()" type="button" class="mt-3 w-full justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ms-3 sm:w-auto sm:text-sm">
                        {{ $t('button.cancel') }}
                    </button>
                </div>

            </form>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import useValidate from "@vuelidate/core"
import { required, url, minValue, helpers } from "@vuelidate/validators"
import moment from 'moment'

export default {
    data() {
        return {
            v$: useValidate(),
            branches: this.$store.state.notifications?.notifications?.response?.branches,
            memberships: this.$store.state.notifications?.notifications?.response?.membership_types,
            notification: {
                title_en: "",
                title_ar: "",
                description_en: "",
                description_ar: "",
                branch_ids: [],
                membership_types: [],
                image: "",
                link: "",
                schedule_date: ""
            }
        }
    },

    validations() {
        return {
            notification: {
                title_en: { required: helpers.withMessage(this.$root.getErrorMessage('required', 'Title (English)'), required) },
                title_ar: { required: helpers.withMessage(this.$root.getErrorMessage('required', 'Title (Arabic)'), required) },
                branch_ids: { required: helpers.withMessage(this.$root.getErrorMessage('required', 'Branch'), required) },
                membership_types: { required: helpers.withMessage(this.$root.getErrorMessage('required', 'Membership Type'), required) },
                link: { url: helpers.withMessage("Invalid Link", url) },
                schedule_date: { minValue: helpers.withMessage("Must be greater than current date and time", minValue(new Date(new Date().getTime() + 60000))) }
            },
        };
    },

    computed: {
        ...mapGetters(["sendNotificationResponse"]),

        ...mapState({
            notifications: (state) => state.config.notifications,
        }),
    },

    methods: {
        ...mapActions(["sendNewNotification"]),

        handleImageSelection(event){
            this.notification.image = event.target.files[0];
        },

        sendNotification() {
            this.v$.$validate();
            if(!this.v$.$error) {
                let form = new FormData();
                form.append("title_en", this.notification.title_en);
                form.append("title_ar", this.notification.title_ar);
                form.append("description_en", this.notification.description_en);
                form.append("description_ar", this.notification.description_ar);
                this.notification.branch_ids.forEach(element => {
                    form.append("branch_ids[]", element);
                });
                this.notification.membership_types.forEach(element => {
                    form.append("membership_type_ids[]", element);
                });
                form.append("image", this.notification.image);
                form.append("link", this.notification.link);
                form.append("schedule_date", this.getFormattedDate());
                this.sendNewNotification(form)
            }
        },

        getFormattedDate() {
            if(this.notification.schedule_date) {
                return moment(String(this.notification.schedule_date)).format('YYYY-MM-DD HH:mm')
            } else {
                return ""
            }
        }
    },

    watch: {
        sendNotificationResponse(data) {
            if(data.status) {
                this.$toast.success(data.message);
                this.$router.back();
            } else {
                this.$toast.error(data.message);
            }
        }
    }
}
</script>