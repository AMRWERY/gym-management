<template>
    <div id="area-form-modal" class="mt-7 fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0" >
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

            <div class="inline-block align-bottom bg-white text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <form class="rounded px-8 pt-6 pb-6 mb-2">
                    <tw-icon @click="closePopup" name="heroicons-outline:x" class="w-6 h-6 text-gray-400 ms-auto cursor-pointer"/>
                    <div class="bg-white px-4 pt-4 pb-2 sm:p-0">
                        <div class="mt-3 text-start sm:mt-0 sm:ms-4 sm:text-left">
                            <h2 class="text-2xl text-center leading-6 font-medium text-gray-900" id="modal-title">
                                {{ $t('datatable.add_area') }}
                            </h2>
                            <!-- <input type="hidden" :value="branch.id" id="branch_id"/> -->
                            <div class="mt-3" id="modal-form-data">

                                <div class="mb-1.5">
                                    <label class="block text-gray-700 text-sm font-bold mb-2" for="branch_id">
                                        {{ $t('transactions.select_country') }} *
                                    </label>
                                    <select name="branch_id" id="branch_id" v-model="form_data.country_id" aria-placeholder="Select branch"
                                        class="h-10 shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                        <option v-for="(country, index) in countries" :key="index" :value="country.id">{{ country.name_en }}
                                        </option>
                                    </select>
                                    <span class="text-sm text-red-400" v-if="v$.form_data.country_id.$error"> {{ v$.form_data.country_id.$errors[0].$message}}</span>
                                </div>

                                <div class="grid grid-cols-2 gap-2 mb-1.5">
                                    <div>
                                        <label class="block text-gray-700 text-sm font-bold mb-1" for="name_en">
                                            {{ $t('master.name_en') }} *
                                        </label>
                                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="name_en"
                                            type="text"
                                            v-model="form_data.name_en"
                                            placeholder="Name (English)" />
                                        <span class="text-sm text-red-400" v-if="v$.form_data.name_en.$error"> {{ v$.form_data.name_en.$errors[0].$message }}</span>
                                    </div>
                                    <div>
                                        <label class="block text-gray-700 text-sm font-bold mb-1" for="name_ar">
                                            {{ $t('master.name_ar') }} *
                                        </label>
                                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="name_ar"
                                            type="text"
                                            v-model="form_data.name_ar"
                                            placeholder="Name (Arabic)" />
                                        <span class="text-sm text-red-400" v-if="v$.form_data.name_ar.$error"> {{ v$.form_data.name_ar.$errors[0].$message }}</span>
                                    </div>
                                </div>
                                <div class="mb-1.5">
                                    <label class="block text-gray-700 text-sm font-bold mb-1" for="remark">
                                        {{ $t('datatable.remark') }} 
                                    </label>
                                    <textarea class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="remark"
                                        rows="2"
                                        v-model="form_data.remark"
                                        :placeholder="$t('transactions.remark')" />
                                </div>
                                <div class="mb-1.5">
                                    <label class="block text-gray-700 text-sm font-bold mb-2" for="is_active">
                                        {{ $t('datatable.is_active') }}
                                    </label>
                                    <label class="switch">
                                        <input type="checkbox" id="is_active" v-model="form_data.is_active" :checked="form_data.is_active">
                                        <span class="slider round"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Buttons -->
                    <div class="sm:flex sm:flex-row-reverse">
                        <button v-if="!selected_area" type="button" @click.once="addNewArea" 
                            class="w-full inline-flex justify-center border-2 border-color-primary 
                                shadow-sm px-4 py-2 font-semibold text-base btn-outline-primary 
                                focus:outline-none sm:ms-3 sm:w-auto sm:text-sm">
                            {{ $t('button.create') }}
                        </button>     
                        <button v-if="selected_area" type="button" @click.once="updateExistingArea" 
                            class="w-full inline-flex justify-center border-2 border-color-primary 
                                shadow-sm px-4 py-2 font-semibold text-base btn-outline-primary 
                                focus:outline-none sm:ms-3 sm:w-auto sm:text-sm">
                                {{ $t('button.update') }}
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
    props: ["countries", "modal_title", "selected_area"],
    data() {
        return {
            v$: useValidate(),
            form_data: {
                country_id: '',
                name_en: '',
                name_ar: '',
                remark: '',
                is_active: true
            }
        }
    },
    validations() {
        return {
            form_data: {
                country_id: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('datatable.country')), required) },
                name_en: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('master.name_en')), required) },
                name_ar: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('master.name_ar')), required) },
            }
        };
    },
    methods: {
        ...mapActions(["addArea", "updateArea"]),

        closePopup() {
            this.$emit('close-modal');
        },

        addNewArea() {
            this.v$.$validate()
            if(!this.v$.$error) {
                this.addArea(this.form_data)
            }
        },
        updateExistingArea() {
            this.v$.$validate()
            if(!this.v$.$error) {
                this.updateArea({
                    id: this.selected_area.id, 
                    form_data: this.form_data
                })
            }
        },
        setSelectedArea(){
            this.form_data.country_id = this.selected_area?.country_id ?? ''
            this.form_data.name_en = this.selected_area?.name_en ?? '',
            this.form_data.name_ar = this.selected_area?.name_ar ?? ''
            this.form_data.remark = this.selected_area?.remark ?? ''
            this.form_data.is_active = this.selected_area?.is_active ? true : false
        }
    },
    mounted() {
        this.setSelectedArea()
    },
}
</script>