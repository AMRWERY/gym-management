<template>
    <div id="general-form-modal" class="mt-7 fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
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
                            <input type="hidden" :value="general.id" id="general_id"/>
                            <div class="mt-3" id="modal-form-data">
                                <div class="mb-1.5">
                                    <label class="block text-gray-700 text-sm font-bold mb-2" for="general_type">
                                        {{ $t('master.general_type_hint') }} *
                                    </label>
                                    <select name="general_type" id="general_type" v-model="general.general_type_id"
                                        class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                        <option value="">{{ $t('master.general_type_hint') }}</option>
                                        <option v-for="(general_type, index) in general_types" :key="index" :value="general_type.id">{{general_type.name_en}}</option>
                                    </select>
                                    <span class="text-sm text-red-400" v-if="v$.general.general_type_id.$error"> {{ v$.general.general_type_id.$errors[0].$message }}</span>
                                </div>
                                <div class="grid grid-cols-2 gap-2 mb-1.5">
                                    <div>
                                        <label class="block text-gray-700 text-sm font-bold mb-1" for="name_en">
                                            {{ $t('master.name_en') }} *
                                        </label>
                                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="name_en"
                                            type="text"
                                            v-model="general.name_en"
                                            :placeholder="$t('master.name_en')" />
                                        <span class="text-sm text-red-400" v-if="v$.general.name_en.$error"> {{ v$.general.name_en.$errors[0].$message }}</span>
                                    </div>
                                    <div>
                                        <label class="block text-gray-700 text-sm font-bold mb-1" for="name_ar">
                                            {{ $t('master.name_ar') }} *
                                        </label>
                                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="name_ar"
                                            type="text"
                                            v-model="general.name_ar"
                                            :placeholder="$t('master.name_ar')" />
                                        <span class="text-sm text-red-400" v-if="v$.general.name_ar.$error"> {{ v$.general.name_ar.$errors[0].$message }}</span>
                                    </div>
                                </div>
                                <div class="mb-1.5">
                                    <label class="block text-gray-700 text-sm font-bold mb-1" for="remark">
                                        {{ $t('master.remark') }} 
                                    </label>
                                    <textarea class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="remark"
                                        rows="2"
                                        v-model="general.remark"
                                        :placeholder="$t('master.remark')" />
                                </div>
                                <div class="mb-1.5">
                                    <label class="block text-gray-700 text-sm font-bold mb-2" for="is_active">
                                        {{ $t('master.is_active') }}
                                    </label>
                                    <label class="switch">
                                        <input type="checkbox" id="is_active" v-model="general.is_active" :checked="general.is_active">
                                        <span class="slider round"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Buttons -->
                    <div class="sm:flex sm:flex-row-reverse">
                        <button v-if="!is_edit_general" type="button" @click="addNewGeneral()" 
                            class="w-full inline-flex justify-center border-2 border-color-primary 
                                shadow-sm px-4 py-2 font-semibold text-base btn-outline-primary 
                                focus:outline-none sm:ms-3 sm:w-auto sm:text-sm">
                            {{ $t('button.create') }}
                        </button>     
                        <button v-if="is_edit_general" type="button" @click="updateSelectedGeneral" 
                            class="w-full inline-flex justify-center border-2 border-color-primary 
                                shadow-sm px-4 py-2 font-semibold text-base btn-outline-primary 
                                focus:outline-none sm:ms-3 sm:w-auto sm:text-sm">
                            {{ $t('button.update') }}
                        </button>
                        <button v-if="!is_edit_general" type="button" @click="addNewGeneral(true)" 
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
    props: ["selected_general", "general_types"],
    data() {
        return {
            v$: useValidate(),
            create_another: false,
            general: {
                id: '',
                general_type_id: '',
                name_en: '',
                name_ar: '',
                remark: '',
                is_active: false
            },
            modal_title: this.$t('master.add_new_general'),
            is_edit_general: false
        }
    },
    validations() {
        return {
            general: {
                general_type_id: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('master.general_type')), required) },
                name_en: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('master.name_en')), required) },
                name_ar: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('master.name_ar')), required) },
            }
        };
    },
    computed: {
        ...mapGetters(["generalsToast", "addGeneralResponse", "updateGeneralResponse"]),
    },
    methods: {
        ...mapActions(["addGeneral", "updateGeneral"]),

        closePopup() {
            this.$emit('close-modal');
        },
        addNewGeneral(is_create_another = false) {
            this.v$.$validate()
            if(!this.v$.$error) {
                this.addGeneral({
                    general_type_id: this.general.general_type_id,
                    name_en: this.general.name_en,
                    name_ar: this.general.name_ar,
                    remark: this.general.remark,
                    is_active: this.general.is_active
                })
                this.create_another = is_create_another;
            }
        },
        updateSelectedGeneral() {
            this.v$.$validate()
            if(!this.v$.$error) {
                this.updateGeneral({
                    id: this.general.id,
                    general_type_id: this.general.general_type_id,
                    name_en: this.general.name_en,
                    name_ar: this.general.name_ar,
                    remark: this.general.remark,
                    is_active: this.general.is_active
                })
            }
        },
        setSelectedGeneral(){
            if(this.selected_general) {
                this.modal_title = this.$t('master.update_general');
                this.is_edit_general = true;
                this.general.id = this.selected_general.id
                this.general.general_type_id = this.selected_general?.general_type_id
                this.general.name_en = this.selected_general?.name_en
                this.general.name_ar = this.selected_general?.name_ar
                this.general.remark = this.selected_general?.remark
                this.general.is_active = this.selected_general?.is_active
            } else {
                this.modal_title = this.$t('master.add_new_general');
                this.is_edit_general = false;
            }
        }
    },
    watch: {
        generalsToast(data) {
            if(data.status) {
                this.$toast.success(data.message);
            } else {
                this.$toast.error(data.message);
            }
        },
        addGeneralResponse(data) {
            if(data.status) {
                this.$toast.success(data.message);
                if(!this.create_another) {
                    this.closePopup();
                } else {
                    this.general.general_type_id = "";
                    this.general.name_en = "";
                    this.general.name_ar = "";
                    this.general.remark = "";
                    this.general.is_active = false;
                    this.v$.$reset();
                }
            } else {
                this.$toast.error(data.message);
            }
        },
        updateGeneralResponse(data) {
            if(data.status) {
                this.closePopup();
            } else {
                this.$toast.error(data.message);
            }
        }
    },
    mounted() {
        this.setSelectedGeneral()
    },
}
</script>