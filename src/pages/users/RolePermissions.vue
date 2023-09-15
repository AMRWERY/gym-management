<template>
    <div class="rounded-md shadow p-5 bg-white">
        <h1 class="font-bold text-xl pb-3">{{ $t('users.permissions') }}</h1>
        <hr/>
        <template v-if="has_update_permission && user_role_id != 1" >
            <div class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md mb-5 mt-4" role="alert">
                <div class="flex">
                    <div class="py-1 hidden"><svg class="fill-current h-6 w-6 text-teal-500 me-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
                    <div>
                        <p class="font-semibold">{{$t('users.note')}}: {{ $t('users.Items_marked_with_asterik_should_to_be_enabled_to_access_their_other_permissions') }}</p>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-4 md:grid-cols-3 gap-4 my-2.5">
                <div v-for="group_right in group_rights" :key="group_right.id">
                    <span class="font-semibold text-lg">{{ group_right.title_en }}</span>
                    <div class="mt-2" v-for="permission in group_right.permissions" :key="permission.id">
                        <template v-if="permission.is_parent" >
                            <input type="checkbox"
                                class="accent-color-primary scale-125" 
                                @click='onPermissionChanged($event, permission)'
                                :id="permission.id" :name="permission.id"
                                :value="permission.id"
                                v-model="permission.is_selected">
                            <label :for="permission.id" class="ms-2 text-gray-800 text-sm">{{ permission.description_en }} <b class="text-red-800">*</b></label>

                            <div v-for="g_permission in group_right.permissions" :key="g_permission.id" >
                                <template v-if="!g_permission.is_parent && g_permission.parent_id == permission.id">
                                    <input type="checkbox"
                                        class="accent-color-primary scale-125" 
                                        @click='onPermissionChanged($event, g_permission)'
                                        :id="g_permission.id" :name="g_permission.id"
                                        :value="g_permission.id"
                                        v-model="g_permission.is_selected" :disabled="!permission.is_selected">   
                                    <label :for="g_permission.id" class="ms-2 text-gray-800 text-sm">{{ g_permission.description_en }} </label>
                                </template>
                            </div>
                        </template>
                        
                    </div>
                </div>
            </div>
        </template>
        <template v-else >
            <span class="text-danger" >{{$t('users.you_are_not_authorized_to_access_this_feature')}}</span>
        </template>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    data() {
        return {
            user_role_id: this.$route.params.id,
            group_rights: [],
            has_update_permission: false
        }
    },
    computed: {
        ...mapGetters(["groupRights", "updateGroupRightsResponse"]),
    },
    methods: {
        ...mapActions(["getGroupRights", "updateGroupRights"]),

        onPermissionChanged(event, data) {
            let type = event.target.checked ? "ADD" : "REMOVE";
            this.updateGroupRights({
                id: this.user_role_id,
                type: type,
                permission_id: data.id
            })
        },

        formateData() {
            this.group_rights = [];
            this.groupRights.response.admin_groups.forEach(group_right => {
                if(group_right.sub_menus.length > 0) {
                    group_right.sub_menus.forEach(obj => {
                        this.group_rights.push(obj)
                    });
                } else {
                    this.group_rights.push(group_right)
                }
            });
        },
        checkPermissions() {
            let page_permissions = this.$root.getScreenPermissions("Roles")
            this.has_update_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "update_group_permission")
        }
    },
    watch: {
        groupRights(data) {
            if(data.status) {
                this.$toast.success(data.message)
            } else {
                this.$toast.error(data.message)
            }
            this.formateData()
        },
        updateGroupRightsResponse(data){
            if(data.status) {
                this.$router.go(0)
                this.$toast.success(data.message)
            } else {
                this.$toast.error(data.message)
            }
            this.formateData()
        }
    },
    mounted() {
        this.checkPermissions()
        this.getGroupRights(this.user_role_id)
    },
}
</script>

<style scoped>
input[type=checkbox] {
    transform: scale(1.2);
}
</style>