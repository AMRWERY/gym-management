<template>
    <div id="role-form-modal" class="mt-7 fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0" >
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

            <div class="inline-block align-bottom bg-white text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <form class="rounded px-8 pt-6 pb-6 mb-2">
                    <tw-icon @click="closePopup" name="heroicons-outline:x" class="w-6 h-6 text-gray-400 ms-auto cursor-pointer"/>
                    <div class="bg-white px-4 pt-4 pb-2 sm:p-0">
                        <div class="mt-3 text-center sm:mt-0 sm:ms-4 sm:text-left">
                            <h2 class="text-2xl text-center leading-6 font-medium text-gray-900" id="modal-title">
                                {{ $t('master.add_new_role') }}
                            </h2>
                            <input type="hidden" :value="role.id" id="role_id"/>
                            <div class="mt-3" id="modal-form-data">
                                <div class="grid grid-cols-2 gap-2 mb-1.5">
                                    <div>
                                        <label class="block text-gray-700 text-sm font-bold mb-1" for="title_en">
                                            {{ $t('notification.title_en') }} *
                                        </label>
                                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="title_en"
                                            type="text"
                                            v-model="role.title_en"
                                            placeholder="Title (English)" />
                                        <span class="text-sm text-red-400" v-if="v$.role.title_en.$error"> {{ v$.role.title_en.$errors[0].$message }}</span>
                                    </div>
                                    <div>
                                        <label class="block text-gray-700 text-sm font-bold mb-1" for="title_ar">
                                            {{ $t('notification.title_ar') }} *
                                        </label>
                                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="title_ar"
                                            type="text"
                                            v-model="role.title_ar"
                                            placeholder="Title (Arabic)" />
                                        <span class="text-sm text-red-400" v-if="v$.role.title_ar.$error"> {{ v$.role.title_ar.$errors[0].$message }}</span>
                                    </div>
                                </div>
                                <div class="mb-1.5">
                                    <label class="block text-gray-700 text-sm font-bold mb-2" for="is_active">
                                        {{ $t('master.is_active') }}
                                    </label>
                                    <label class="switch">
                                        <input type="checkbox" id="is_active" v-model="role.is_active" :checked="role.is_active">
                                        <span class="slider round"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Buttons -->
                    <div class="sm:flex sm:flex-row-reverse">
                        <button v-if="!is_edit_role" type="button" @click="addNewRole()" 
                            class="w-full inline-flex justify-center border-2 border-color-primary 
                                shadow-sm px-4 py-2 font-semibold text-base btn-outline-primary 
                                focus:outline-none sm:ms-3 sm:w-auto sm:text-sm">
                            {{ $t('button.create') }}
                        </button>     
                        <button v-if="is_edit_role" type="button" @click="updateSelectedRole" 
                            class="w-full inline-flex justify-center border-2 border-color-primary 
                                shadow-sm px-4 py-2 font-semibold text-base btn-outline-primary 
                                focus:outline-none sm:ms-3 sm:w-auto sm:text-sm">
                            {{ $t('button.update') }}
                        </button>
                        <button v-if="!is_edit_role" type="button" @click="addNewRole(true)" 
                            class="w-full inline-flex justify-center border-2 border-color-primary 
                                shadow-sm px-4 py-2 font-semibold text-base btn-outline-primary 
                                focus:outline-none sm:ms-3 sm:w-auto sm:text-sm">
                            {{ $t('button.create_and_add') }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import useValidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";

export default {
    props: ["selected_role"],
    data() {
        return {
            v$: useValidate(),
            create_another: false,
            role: {
                id: '',
                title_en: '',
                title_ar: '',
                is_active: false
            },
            modal_title: "Add New Role",
            is_edit_role: false
        }
    },
    validations() {
        return {
            role: {
                title_en: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('datatable.title_en')), required) },
                title_ar: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('datatable.title_ar')), required) },
            }
        };
    },
    computed: {
        ...mapGetters(["rolesToast", "addRoleResponse", "updateRoleResponse"]),
    },
    methods: {
        ...mapActions(["addRole", "updateRole"]),

        closePopup() {
            this.$emit('close-modal');
        },
        addNewRole(is_create_another = false) {
            this.v$.$validate()
            if(!this.v$.$error) {
                this.addRole({
                    title_en: this.role.title_en,
                    title_ar: this.role.title_ar,
                    is_active: this.role.is_active
                })
                this.create_another = is_create_another;
            }
        },
        updateSelectedRole() {
            this.v$.$validate()
            if(!this.v$.$error) {
                this.updateRole({
                    id: this.role.id,
                    title_en: this.role.title_en,
                    title_ar: this.role.title_ar,
                    is_active: this.role.is_active
                })
            }
        },
        setSelectedRole(){
            if(this.selected_role) {
                this.modal_title = "Update Role";
                this.is_edit_role = true;
                this.role.id = this.selected_role.id
                this.role.title_en = this.selected_role?.title_en
                this.role.title_ar = this.selected_role?.title_ar
                this.role.is_active = this.selected_role?.is_active
            } else {
                this.modal_title = "Add New Role";
                this.is_edit_role = false;
            }
        }
    },
    watch: {
        rolesToast(data) {
            if(data.status) {
                this.$toast.success(data.message);
            } else {
                this.$toast.error(data.message);
            }
        },
        addRoleResponse(data) {
            if(data.status) {
                this.$toast.success(data.message);
                if(!this.create_another) {
                    this.closePopup();
                } else {
                    this.role.title_en = "";
                    this.role.title_ar = "";
                    this.role.is_active = false;
                    this.v$.$reset();
                }
            } else {
                this.$toast.error(data.message);
            }
        },
        updateRoleResponse(data) {
            if(data.status) {
                this.closePopup();
            } else {
                this.$toast.error(data.message);
            }
        }
    },
    mounted() {
        this.setSelectedRole()
    },
}
</script>