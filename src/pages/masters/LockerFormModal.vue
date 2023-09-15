<template>
    <div id="locker-form-modal" class="mt-7 fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0" >
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

            <div class="inline-block align-bottom bg-white text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <form class="rounded px-8 pt-6 pb-6 mb-2">
                    <tw-icon @click="closePopup" name="heroicons-outline:x" class="w-6 h-6 text-gray-400 ms-auto cursor-pointer"/>
                    <div class="bg-white px-4 pt-4 pb-2 sm:p-0">
                        <div class="mt-3 text-center sm:mt-0 sm:ms-4 sm:text-left">
                            <h2 class="text-2xl text-center leading-6 font-medium text-gray-900" id="modal-title">
                                {{ modal_title }}
                            </h2>
                            <input type="hidden" :value="locker.id" id="locker_id"/>
                            <div class="mt-3" id="modal-form-data">
                                <div class="mb-1.5">
                                    <label class="block text-gray-700 text-sm font-bold mb-2" for="locker_type_id">
                                        {{ $t('master.locker_type') }} *
                                    </label>
                                    <select name="locker_type_id" id="locker_type_id" v-model="locker.locker_type_id"
                                        class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                        <option value="">{{ $t('master.locker_type_hint') }}</option>
                                        <option v-for="(locker_type, index) in locker_types" :key="index" :value="locker_type.id">{{locker_type.name_en}}</option>
                                    </select>
                                    <span class="text-sm text-red-400" v-if="v$.locker.locker_type_id.$error"> {{ v$.locker.locker_type_id.$errors[0].$message }}</span>
                                </div>
                                <div class="mb-1.5">
                                    <label class="block text-gray-700 text-sm font-bold mb-2" for="branch_id">
                                        {{ $t('master.branch') }} *
                                    </label>
                                    <select name="branch_id" id="branch_id" v-model="locker.branch_id"
                                        class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                        <option value="">{{ $t('master.branch_hint') }}</option>
                                        <option v-for="(branch, index) in branches" :key="index" :value="branch.id">{{branch.name_en}}</option>
                                    </select>
                                    <span class="text-sm text-red-400" v-if="v$.locker.branch_id.$error"> {{ v$.locker.branch_id.$errors[0].$message }}</span>
                                </div>
                                <div class="grid grid-cols-2 gap-2 mb-1.5">
                                    <div>
                                        <label class="block text-gray-700 text-sm font-bold mb-1" for="name_en">
                                            {{ $t('master.name_en') }} *
                                        </label>
                                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="name_en"
                                            type="text"
                                            v-model="locker.name_en"
                                            :placeholder="$t('master.name_en')" />
                                        <span class="text-sm text-red-400" v-if="v$.locker.name_en.$error"> {{ v$.locker.name_en.$errors[0].$message }}</span>
                                    </div>
                                    <div>
                                        <label class="block text-gray-700 text-sm font-bold mb-1" for="name_ar">
                                            {{ $t('master.name_ar') }} *
                                        </label>
                                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="name_ar"
                                            type="text"
                                            v-model="locker.name_ar"
                                            :placeholder="$t('master.name_ar')" />
                                        <span class="text-sm text-red-400" v-if="v$.locker.name_ar.$error"> {{ v$.locker.name_ar.$errors[0].$message }}</span>
                                    </div>
                                </div>
                                <div class="mb-1.5">
                                    <label class="block text-gray-700 text-sm font-bold mb-2" for="general_id">
                                        {{ $t('master.locker_status') }} *
                                    </label>
                                    <select name="general_id" id="general_id" v-model="locker.general_id"
                                        class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                        <option value="">{{ $t('master.locker_status_hint') }}</option>
                                        <option v-for="(general, index) in generals" :key="index" :value="general.id">{{general.name_en}}</option>
                                    </select>
                                    <span class="text-sm text-red-400" v-if="v$.locker.general_id.$error"> {{ v$.locker.general_id.$errors[0].$message }}</span>
                                </div>
                                <div class="mb-1.5">
                                    <label class="block text-gray-700 text-sm font-bold mb-1" for="display_order">
                                        {{ $t('master.display_order') }}
                                    </label>
                                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="display_order"
                                        type="number"
                                        v-model="locker.display_order"
                                        placeholder="Display Order" />
                                </div>
                                <div class="mb-1.5">
                                    <label class="block text-gray-700 text-sm font-bold mb-1" for="remark">
                                        {{ $t('master.remark') }} 
                                    </label>
                                    <textarea class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="remark"
                                        rows="2"
                                        v-model="locker.remark"
                                        :placeholder="$t('master.remark')" />
                                </div>
                                <div class="mb-1.5">
                                    <label class="block text-gray-700 text-sm font-bold mb-2" for="is_active">
                                        {{ $t('master.is_active') }}
                                    </label>
                                    <label class="switch">
                                        <input type="checkbox" id="is_active" v-model="locker.is_active" :checked="locker.is_active">
                                        <span class="slider round"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Buttons -->
                    <div class="sm:flex sm:flex-row-reverse">
                        <button v-if="!is_edit_locker" type="button" @click="addNewLocker()" 
                            class="w-full inline-flex justify-center border-2 border-color-primary 
                                shadow-sm px-4 py-2 font-semibold text-base btn-outline-primary 
                                focus:outline-none sm:ms-3 sm:w-auto sm:text-sm">
                            {{ $t('button.create') }}
                        </button>     
                        <button v-if="is_edit_locker" type="button" @click="updateSelectedLocker" 
                            class="w-full inline-flex justify-center border-2 border-color-primary 
                                shadow-sm px-4 py-2 font-semibold text-base btn-outline-primary 
                                focus:outline-none sm:ms-3 sm:w-auto sm:text-sm">
                            {{ $t('button.update') }}
                        </button>
                        <button v-if="!is_edit_locker" type="button" @click="addNewLocker(true)" 
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
    props: ["selected_locker", "branches", "generals", "locker_types"],
    data() {
        return {
            v$: useValidate(),
            create_another: false,
            locker: {
                id: '',
                locker_type_id: '',
                branch_id: '',
                name_en: '',
                name_ar: '',
                general_id: '',
                display_order: '',
                remark: '',
                is_active: false
            },
            modal_title: this.$t('master.add_new_locker'),
            is_edit_locker: false
        }
    },
    validations() {
        return {
            locker: {
                locker_type_id: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('master.locker_type')), required) },
                branch_id: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('master.branch')), required) },
                name_en: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('master.name_en')), required) },
                name_ar: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('master.name_ar')), required) },
                general_id: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('packages.status')), required) },
            }
        };
    },
    computed: {
        ...mapGetters(["lockersToast", "addLockerResponse", "updateLockerResponse"]),
    },
    methods: {
        ...mapActions(["addLocker", "updateLocker"]),

        closePopup() {
            this.$emit('close-modal');
        },
        addNewLocker(is_create_another = false) {
            this.v$.$validate()
            if(!this.v$.$error) {
                this.addLocker({
                    locker_type_id: this.locker.locker_type_id,
                    branch_id: this.locker.branch_id,
                    name_en: this.locker.name_en,
                    name_ar: this.locker.name_ar,
                    general_id: this.locker.general_id,
                    display_order: this.locker.display_order,
                    remark: this.locker.remark,
                    is_active: this.locker.is_active
                })
                this.create_another = is_create_another;
            }
        },
        updateSelectedLocker() {
            this.v$.$validate()
            if(!this.v$.$error) {
                this.updateLocker({
                    id: this.locker.id,
                    locker_type_id: this.locker.locker_type_id,
                    branch_id: this.locker.branch_id,
                    name_en: this.locker.name_en,
                    name_ar: this.locker.name_ar,
                    general_id: this.locker.general_id,
                    display_order: this.locker.display_order,
                    remark: this.locker.remark,
                    is_active: this.locker.is_active
                })
            }
        },
        setSelectedLocker(){
            if(this.selected_locker) {
                this.modal_title = this.$t('master.update_locker');
                this.is_edit_locker = true;
                this.locker.id = this.selected_locker.id
                this.locker.locker_type_id = this.selected_locker.locker_type_id
                this.locker.branch_id = this.selected_locker.branch_id
                this.locker.name_en = this.selected_locker?.name_en
                this.locker.name_ar = this.selected_locker?.name_ar
                this.locker.general_id = this.selected_locker?.general_id
                this.locker.display_order = this.selected_locker?.display_order
                this.locker.remark = this.selected_locker?.remark
                this.locker.is_active = this.selected_locker?.is_active
            } else {
                this.modal_title = this.$t('master.add_new_locker');
                this.is_edit_locker = false;
            }
        }
    },
    watch: {
        lockersToast(data) {
            if(data.status) {
                this.$toast.success(data.message);
            } else {
                this.$toast.error(data.message);
            }
        },
        addLockerResponse(data) {
            if(data.status) {
                this.$toast.success(data.message);
                if(!this.create_another) {
                    this.closePopup();
                } else {
                    this.locker.locker_type_id = "";
                    this.locker.branch_id = "";
                    this.locker.name_en = "";
                    this.locker.name_ar = "";
                    this.locker.general_id = "";
                    this.locker.display_order = "";
                    this.locker.remark = "";
                    this.locker.is_active = false;
                    this.v$.$reset();
                }
            } else {
                this.$toast.error(data.message);
            }
        },
        updateLockerResponse(data) {
            if(data.status) {
                this.closePopup();
            } else {
                this.$toast.error(data.message);
            }
        }
    },
    mounted() {
        this.setSelectedLocker()
    },
}
</script>