<template>
    <form class="rounded px-8 pt-6 pb-6 mb-2 bg-white">
        <div class="px-4 pt-4 pb-2 sm:p-0">
            <div class="mt-3 text-center sm:mt-0 sm:ms-4 sm:text-left">
                <h2 class="text-2xl text-center leading-6 font-medium text-gray-900" id="modal-title">
                    {{ modal_title }}
                </h2>
                <input type="hidden" :value="discount.id" id="discount_id" />
                <div class="mt-3" id="modal-form-data">
                    <div class="grid grid-cols-2 gap-4 mb-2">

                        <div class="col-span-2">
                            <label class="block text-gray-700 text-sm font-bold" for="code">
                                {{ $t('master.discount_code') }} *
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="code" type="text" v-model="discount.code" placeholder="Discount Code" />
                            <span class="text-sm text-red-400" v-if="v$.discount.code.$error">{{
                                v$.discount.code.$errors[0].$message
                            }}</span>
                        </div>

                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-1" for="name_en">
                                {{ $t('master.name_en') }} *
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name_en" type="text" v-model="discount.name_en" :placeholder="$t('master.name_en')" />
                            <span class="text-sm text-red-400" v-if="v$.discount.name_en.$error"> {{
                                v$.discount.name_en.$errors[0].$message }}</span>
                        </div>
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-1" for="name_ar">
                                {{ $t('master.name_ar') }} *
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name_ar" type="text" v-model="discount.name_ar" :placeholder="$t('master.name_ar')" />
                            <span class="text-sm text-red-400" v-if="v$.discount.name_ar.$error"> {{
                                v$.discount.name_ar.$errors[0].$message }}</span>
                        </div>
                    </div>
                    <div class="mb-1.5">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="discount_type">
                            {{ $t('master.discount_type') }} *
                        </label>
                        <select name="discount_type" id="discount_type" v-model="discount.discount_type"
                            class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <option value="">{{ $t('master.discount_type_hint') }}</option>
                            <option value="flat">{{ $t('master.flat') }}</option>
                            <option value="percentage">{{ $t('master.percentage') }}</option>
                        </select>
                        <span class="text-sm text-red-400" v-if="v$.discount.discount_type.$error"> {{
                            v$.discount.discount_type.$errors[0].$message }}</span>

                    </div>
                    <div class="mb-1.5">
                        <label class="block text-gray-700 text-sm font-bold mb-1" for="discount_value">
                            {{ $t('master.discount_value') }} *
                        </label>
                        <input
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="discount_value" type="number" v-model="discount.discount_value"
                            :placeholder="$t('master.discount_value')" />
                        <span class="text-sm text-red-400" v-if="v$.discount.discount_value.$error"> {{
                            v$.discount.discount_value.$errors[0].$message }}</span>

                    </div>

                    <div class="grid grid-cols-2 gap-4 mb-2">
                        <div class="mb-1.5">
                            <label for="start_date" class="font-medium">{{ $t('master.start_date') }} *</label>
                            <input type="date" :min="todaysDate" v-model="discount.start_date" format="dd/MM/yyyy"
                                :placeholder="$t('master.start_date')"
                                class="shadow appearance-none border rounded w-full p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            <span class="text-sm text-red-400" v-if="v$.discount.start_date.$error"> {{
                                v$.discount.start_date.$errors[0].$message }}</span>
                        </div>

                        <div class="mb-1.5">
                            <label for="end_date" class="font-medium">{{ $t('master.expiry_date') }} *</label>
                            <input type="date" :min="discount.start_date" v-model="discount.end_date" format="dd/MM/yyyy"
                                :placeholder="$t('master.expiry_date')"
                                class="shadow p-2 appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            <span class="text-sm text-red-400" v-if="v$.discount.end_date.$error"> {{
                                v$.discount.end_date.$errors[0].$message }}</span>
                        </div>
                    </div>

                    <div class="mb-1.5">
                        <label class="block text-gray-700 text-sm font-bold mb-1" for="remark">
                            {{ $t('master.remark') }}
                        </label>
                        <textarea
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="remark" rows="2" v-model="discount.remark" :placeholder="$t('master.remark')" />
                    </div>
                    <div class="mb-1.5">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="is_active">
                            {{ $t('master.is_active') }}
                        </label>
                        <label class="switch">
                            <input type="checkbox" id="is_active" v-model="discount.is_active"
                                :checked="discount.is_active">
                            <span class="slider round"></span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <!-- Buttons -->
        <div class="sm:flex sm:flex-row-reverse">
            <button v-if="!is_edit_discount" type="button" @click="addNewDiscount()" class="w-full inline-flex justify-center border-2 border-color-primary 
                                        shadow-sm px-4 py-2 font-semibold text-base btn-outline-primary 
                                        focus:outline-none sm:ms-3 sm:w-auto sm:text-sm">
                {{ $t('button.create') }}
            </button>
            <button v-if="is_edit_discount" type="button" @click="updateSelectedDiscount" class="w-full inline-flex justify-center border-2 border-color-primary 
                                        shadow-sm px-4 py-2 font-semibold text-base btn-outline-primary 
                                        focus:outline-none sm:ms-3 sm:w-auto sm:text-sm">
                {{ $t('button.update') }}
            </button>
            <button v-if="!is_edit_discount" type="button" @click="addNewDiscount(true)" class="w-full inline-flex justify-center border-2 border-color-primary 
                                        shadow-sm px-4 py-2 font-semibold text-base btn-outline-primary 
                                        focus:outline-none sm:ms-3 sm:w-auto sm:text-sm">
                {{ $t('button.create_and_add') }}
            </button>
        </div>
    </form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import useValidate from "@vuelidate/core";
import { required, helpers, minLength, maxLength } from "@vuelidate/validators";

export default {
    data() {
        return {
            v$: useValidate(),
            create_another: false,
            todaysDate: new Date().toISOString().split('T')[0],
            discount: {
                id: this.$route.params.id,
                code: '',
                name_en: '',
                name_ar: '',
                discount_type: '',
                discount_value: '',
                start_date: '',
                end_date: '',
                remark: '',
                is_active: false
            },
            selected_discount: [],
            modal_title: this.$t('master.add_new_discount'),
            is_edit_discount: false
        }
    },
    validations() {
        return {
            discount: {
                code: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('master.discount_code')), required), minLength: helpers.withMessage(this.$root.getLengthErrorMessage('min', 'Discount Code', 6), minLength(6)), maxLength: helpers.withMessage(this.$root.getLengthErrorMessage('max', 'Discount Code', 6), maxLength(6)) },
                name_en: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('master.name_en')), required) },
                name_ar: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('master.name_ar')), required) },
                discount_type: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('master.discount_type')), required) },
                discount_value: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('master.discount_value')), required) },
                start_date: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('master.start_date')), required) },
                end_date: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('master.end_date')), required) }
            }
        };
    },
    computed: {
        ...mapGetters(["discountsToast", "addDiscountResponse", "updateDiscountResponse", 'discountById']),
    },
    methods: {
        ...mapActions(["addDiscount", "updateDiscount", 'getDiscountById']),

        addNewDiscount(is_create_another = false) {
            this.v$.$validate()
            if (!this.v$.$error) {
                let start_date = this.$root.formatDateAPI(this.discount.start_date)
                let end_date = this.$root.formatDateAPI(this.discount.end_date)
                this.addDiscount({
                    code: this.discount.code,
                    name_en: this.discount.name_en,
                    name_ar: this.discount.name_ar,
                    discount_type: this.discount.discount_type,
                    discount_value: this.discount.discount_value,
                    start_date: start_date,
                    end_date: end_date,
                    remark: this.discount.remark,
                    is_active: this.discount.is_active
                })
                this.create_another = is_create_another;
            }
        },
        updateSelectedDiscount() {
            this.v$.$validate()
            if (!this.v$.$error) {
                let start_date = this.$root.formatDateAPI(this.discount.start_date)
                let end_date = this.$root.formatDateAPI(this.discount.end_date)
                this.updateDiscount({
                    id: this.discount.id,
                    code: this.discount.code,
                    name_en: this.discount.name_en,
                    name_ar: this.discount.name_ar,
                    discount_type: this.discount.discount_type,
                    discount_value: this.discount.discount_value,
                    start_date: start_date,
                    end_date: end_date,
                    remark: this.discount.remark,
                    is_active: this.discount.is_active
                })
            }
        },
        setSelectedDiscount() {
            if (this.selected_discount) {
                this.modal_title = this.$t('master.update_discount');
                this.is_edit_discount = true;
                this.discount.id = this.selected_discount.id
                this.discount.code = this.selected_discount?.code
                this.discount.name_en = this.selected_discount?.name_en
                this.discount.name_ar = this.selected_discount?.name_ar
                this.discount.discount_type = this.selected_discount?.discount_type
                this.discount.discount_value = this.selected_discount?.discount_value
                this.discount.start_date = this.$root.formatDateUI(this.selected_discount.start_date)
                this.discount.end_date = this.$root.formatDateUI(this.selected_discount.end_date)
                this.discount.remark = this.selected_discount?.remark
                this.discount.is_active = this.selected_discount?.is_active
            } else {
                this.modal_title = this.$t('master.add_new_discount');
                this.is_edit_discount = false;
            }
        }
    },
    watch: {
        discountsToast(data) {
            if (data.status) {
                this.$toast.success(data.message);
            } else {
                this.$toast.error(data.message);
            }
        },
        addDiscountResponse(data) {
            if (data.status) {
                this.$toast.success(data.message);
                if (!this.create_another) {
                    this.$router.push('/discounts')
                } else {
                    this.discount.code = "";
                    this.discount.name_en = "";
                    this.discount.name_ar = "";
                    this.discount.discount_type = "";
                    this.discount.discount_value = "";
                    this.discount.start_date = "",
                    this.discount.end_date = "",
                    this.discount.remark = "";
                    this.discount.is_active = false;
                    this.v$.$reset();
                }
            } else {
                this.$toast.error(data.message);
            }
        },
        updateDiscountResponse(data) {
            if (data.status) {
                this.$router.push('/discounts')
            } else {
                this.$toast.error(data.message);
            }
        },
        discountById(data) {
            if (data) {
                this.selected_discount = data
                this.setSelectedDiscount();
            }
        },
    },
    mounted() {
        if (this.discount.id && this.discount.id != 'add') {
            this.getDiscountById(this.discount.id)
        }
    },
}
</script>