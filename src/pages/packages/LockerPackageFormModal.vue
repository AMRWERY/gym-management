<template>
    <form class="rounded px-8 pt-6 pb-6 mb-2 bg-white">
        <div class="px-4 pt-4 pb-2 sm:p-0">
            <div class="mt-3 text-center sm:mt-0 sm:ms-4 sm:text-left">
                <h2 class="text-2xl text-center leading-6 font-medium text-gray-900" id="modal-title">
                    {{ modal_title }}
                </h2>
                <input type="hidden" :value="locker_package.id" id="locker_package_id" />
                <div class="mt-3" id="modal-form-data">

                    <div class="grid grid-cols-2 gap-2 mb-1.5">
                        <div class="mb-1.5">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="package_type_id">
                                {{ $t('packages.locker_type_hint') }} *
                            </label>
                            <select name="package_type_id" id="package_type_id" v-model="locker_package.locker_type_id"
                                class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                <option value="">{{ $t('packages.locker_type_hint') }}</option>
                                <option v-for="(locker_type, index) in locker_type_list" :key="index" :value="locker_type.id">
                                    {{ locker_type.name_en }}</option>
                            </select>
                            <span class="text-sm text-red-400" v-if="v$.locker_package.locker_type_id.$error"> {{
                                v$.locker_package.locker_type_id.$errors[0].$message }}</span>
                        </div>
                        <div class="mb-1.5">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="branch_ids">
                                {{ $t('packages.branches_hint') }} *
                            </label>
                            <Multiselect mode="tags" :searchable="true" :createTag="true"
                                v-model="locker_package.branch_ids" :multiple="true" label="name_en" valueProp='id'
                                :placeholder="$t('packages.branches_hint')"
                                class="shadow border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                :options="branches_list" />
                            <span class="text-sm text-red-400" v-if="v$.locker_package.branch_ids.$error"> {{
                                v$.locker_package.branch_ids.$errors[0].$message }}</span>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-2 mb-1.5">
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-1" for="name_en">
                                {{ $t('packages.name_en') }} *
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name_en" type="text" v-model="locker_package.name_en"
                                :placeholder="$t('packages.name_en')" />
                            <span class="text-sm text-red-400" v-if="v$.locker_package.name_en.$error"> {{
                                v$.locker_package.name_en.$errors[0].$message }}</span>
                        </div>
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-1" for="name_ar">
                                {{ $t('packages.name_ar') }} *
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name_ar" type="text" v-model="locker_package.name_ar"
                                :placeholder="$t('packages.name_ar')" />
                            <span class="text-sm text-red-400" v-if="v$.locker_package.name_ar.$error"> {{
                                v$.locker_package.name_ar.$errors[0].$message }}</span>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-2 mb-1.5">
                        <div class="mb-1.5">
                            <label class="block text-gray-700 text-sm font-bold mb-1" for="amount">
                                {{ $t('packages.amount') }} *
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="amount" type="number" v-model="locker_package.amount"
                                :placeholder="$t('packages.amount')" min="0" />
                            <span class="text-sm text-red-400" v-if="v$.locker_package.amount.$error"> {{
                                v$.locker_package.amount.$errors[0].$message }}</span>
                        </div>
                        <div class="mb-1.5">
                            <label class="block text-gray-700 text-sm font-bold mb-1" for="duration">
                                {{ $t('packages.duration') }} *
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="duration" type="number" v-model="locker_package.duration"
                                :placeholder="$t('packages.duration')" min="0" />
                            <span class="text-sm text-red-400" v-if="v$.locker_package.duration.$error"> {{
                                v$.locker_package.duration.$errors[0].$message }}</span>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-2 mb-1.5">
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-1" for="freeze_quantity">
                                {{ $t('packages.freeze_quantity') }}
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="min_age" type="number" v-model="locker_package.freeze_quantity"
                                :placeholder="$t('packages.freeze_qty')" min="0" />
                        </div>
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-1" for="total_freeze_days">
                                {{ $t('packages.total_freeze_days') }}
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="total_freeze_days" type="number" v-model="locker_package.total_freeze_days"
                                :placeholder="$t('packages.total_freeze_days')" min="0" />
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-2 mb-1.5">
                        <div class="mb-1.5">
                            <label class="block text-gray-700 text-sm font-bold mb-1" for="insurance_amount">
                                {{ $t('packages.insurance_amount') }} *
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="insurance_amount" type="number" v-model="locker_package.insurance_amount"
                                :placeholder="$t('packages.insurance_amount')" min="0" />
                            <span class="text-sm text-red-400" v-if="v$.locker_package.insurance_amount.$error"> {{
                                v$.locker_package.insurance_amount.$errors[0].$message }}</span>

                        </div>
                        <div class="mb-1.5">
                            <label class="block text-gray-700 text-sm font-bold mb-1" for="insurance_refund_days">
                                {{ $t('packages.insurance_refund_days') }} *
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="insurance_refund_days" type="number" v-model="locker_package.insurance_refund_days"
                                placeholder="Refund Till Days" min="0" />
                            <span class="text-sm text-red-400" v-if="v$.locker_package.insurance_refund_days.$error"> {{
                                v$.locker_package.insurance_refund_days.$errors[0].$message }}</span>

                        </div>
                    </div>
                    <div class="mb-1.5">
                        <label class="block text-gray-700 text-sm font-bold mb-1" for="remark">
                            {{ $t('packages.remark') }}
                        </label>
                        <textarea
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="remark" rows="2" v-model="locker_package.remark" :placeholder="$t('packages.remark')" />
                    </div>
                    <div class="mb-1.5">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="is_active">
                            {{ $t('packages.is_active') }}
                        </label>
                        <label class="switch">
                            <input type="checkbox" id="is_active" v-model="locker_package.is_active"
                                :checked="locker_package.is_active">
                            <span class="slider round"></span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <!-- Buttons -->
        <div class="sm:flex sm:flex-row-reverse">
            <button v-if="!is_edit_locker_package" type="button" @click="addNewLockerPackage()" class="w-full inline-flex justify-center border-2 border-color-primary 
                                        shadow-sm px-4 py-2 font-semibold text-base btn-outline-primary 
                                        focus:outline-none sm:ms-3 sm:w-auto sm:text-sm">
                {{ $t('button.create') }}
            </button>
            <button v-if="is_edit_locker_package" type="button" @click="updateSelectedLockerPackage" class="w-full inline-flex justify-center border-2 border-color-primary 
                                        shadow-sm px-4 py-2 font-semibold text-base btn-outline-primary 
                                        focus:outline-none sm:ms-3 sm:w-auto sm:text-sm">
                {{ $t('button.update') }}
            </button>
            <button v-if="!is_edit_locker_package" type="button" @click="addNewLockerPackage(true)" class="w-full inline-flex justify-center border-2 border-color-primary 
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
import { required, helpers, minValue } from "@vuelidate/validators";

export default {
    data() {
        return {
            v$: useValidate(),
            create_another: false,
            locker_type_list: [],
            branches_list: [],
            locker_package: {
                id: this.$route.params.id,
                locker_type_id: '',
                branch_ids: null,
                name_en: '',
                name_ar: '',
                amount: '',
                duration: '',
                freeze_quantity: '',
                total_freeze_days: '',
                insurance_amount: '',
                insurance_refund_days: '',
                remark: '',
                is_active: false
            },
            modal_title: this.$t('packages.add_new_locker'),
            is_edit_locker_package: false
        }
    },
    validations() {
        return {
            locker_package: {
                locker_type_id: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('master.locker_type')), required) },
                branch_ids: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('master.branch')), required) },
                name_en: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('master.name_en')), required) },
                name_ar: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('master.name_ar')), required) },
                amount: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('master.amount')), required) },
                duration: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('packages.duration')), required) },
                insurance_amount: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('packages.insurance_amount')), required), minValueValue: minValue(0) },
                insurance_refund_days: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('packages.insurance_refund_days')), required) }
            }
        };
    },
    computed: {
        ...mapGetters(["lockerPackages", "lockerPackagesToast", "addLockerPackageResponse", "updateLockerPackageResponse", 'lockerById']),
    },
    methods: {
        ...mapActions(["addLockerPackage", "updateLockerPackage", "getLockerPackages", "getLockerById"]),

        addNewLockerPackage(is_create_another = false) {
            this.v$.$validate()
            if (!this.v$.$error) {
                this.addLockerPackage({
                    locker_type_id: this.locker_package.locker_type_id,
                    branch_ids: this.locker_package.branch_ids,
                    name_en: this.locker_package.name_en,
                    name_ar: this.locker_package.name_ar,
                    amount: this.locker_package.amount,
                    duration: this.locker_package.duration,
                    freeze_quantity: this.locker_package.freeze_quantity,
                    total_freeze_days: this.locker_package.total_freeze_days,
                    insurance_amount: this.locker_package.insurance_amount,
                    insurance_refund_days: this.locker_package.insurance_refund_days,
                    remark: this.locker_package.remark,
                    is_active: this.locker_package.is_active
                })
                this.create_another = is_create_another;
            }
        },
        updateSelectedLockerPackage() {
            this.v$.$validate()
            if (!this.v$.$error) {
                this.updateLockerPackage({
                    id: this.locker_package.id,
                    locker_type_id: this.locker_package.locker_type_id,
                    branch_ids: this.locker_package.branch_ids,
                    name_en: this.locker_package.name_en,
                    name_ar: this.locker_package.name_ar,
                    amount: this.locker_package.amount,
                    duration: this.locker_package.duration,
                    freeze_quantity: this.locker_package.freeze_quantity,
                    total_freeze_days: this.locker_package.total_freeze_days,
                    insurance_amount: this.locker_package.insurance_amount,
                    insurance_refund_days: this.locker_package.insurance_refund_days,
                    remark: this.locker_package.remark,
                    is_active: this.locker_package.is_active
                })
            }
        },
        setSelectedLockerPackage() {
            if (this.selected_locker_package) {
                let selected_branch_ids = [];
                for (let i = 0; i < this.selected_locker_package.branches.length; i++) {
                    selected_branch_ids.push(this.selected_locker_package.branches[i].id);
                }

                this.modal_title = this.$t('packages.update_locker');
                this.is_edit_locker_package = true;
                this.locker_package.id = this.selected_locker_package.id
                this.locker_package.locker_type_id = this.selected_locker_package.locker_type_id
                this.locker_package.branch_ids = selected_branch_ids
                this.locker_package.name_en = this.selected_locker_package?.name_en
                this.locker_package.name_ar = this.selected_locker_package?.name_ar
                this.locker_package.amount = this.selected_locker_package?.amount
                this.locker_package.duration = this.selected_locker_package?.duration
                this.locker_package.freeze_quantity = this.selected_locker_package?.freeze_quantity
                this.locker_package.total_freeze_days = this.selected_locker_package?.total_freeze_days
                this.locker_package.insurance_amount = this.selected_locker_package?.insurance_amount
                this.locker_package.insurance_refund_days = this.selected_locker_package?.insurance_refund_days
                this.locker_package.remark = this.selected_locker_package?.remark
                this.locker_package.is_active = this.selected_locker_package?.is_active
            } else {
                this.modal_title = this.$t('packages.add_new_locker');
                this.is_edit_locker_package = false;
            }
        }
    },
    watch: {
        lockerPackages(data) {
            if(data != null) {
                this.branches_list = data.branches
                this.locker_type_list = data.locker_types
            }
        },
        lockerPackagesToast(data) {
            if (data.status) {
                this.$toast.success(data.message);
            } else {
                this.$toast.error(data.message);
            }
        },
        addLockerPackageResponse(data) {
            if (data.status) {
                this.$toast.success(data.message);

                if (!this.create_another) {
                    this.$router.push('/package-lockers')
                } else {
                    this.locker_package.locker_type_id = "";
                    this.locker_package.branch_ids = null;
                    this.locker_package.name_en = "";
                    this.locker_package.name_ar = "";
                    this.locker_package.amount = "";
                    this.locker_package.duration = "";
                    this.locker_package.freeze_quantity = "";
                    this.locker_package.total_freeze_days = "";
                    this.locker_package.insurance_amount = "";
                    this.locker_package.insurance_refund_days = "";
                    this.locker_package.remark = "";
                    this.locker_package.is_active = false;
                    this.v$.$reset();
                }
            } else {
                this.$toast.error(data.message);
            }
        },
        updateLockerPackageResponse(data) {
            if (data.status) {
                this.$router.push('/package-lockers')
            } else {
                this.$toast.error(data.message);
            }
        },
        lockerById(data) {
            if (data) {
                this.selected_locker_package = data.locker_package_details
                this.branches_list = data.branches
                this.locker_type_list = data.locker_types
                this.setSelectedLockerPackage();
            }
        },
    },
    mounted() {
        if(this.locker_package.id && this.locker_package.id != 'add') {
            this.getLockerById(this.locker_package.id)
        }else{
            this.getLockerPackages()
        }
    },
}
</script>