<template>
    <form class="rounded px-8 pt-6 pb-6 mb-2 bg-white">
        <div class="px-4 pt-4 pb-2 sm:p-0">
            <div class="mt-3 text-center sm:mt-0 sm:ms-4 sm:text-left">
                <h2 class="text-2xl text-center leading-6 font-medium text-gray-900" id="modal-title">
                    {{ modal_title }}
                </h2>
                <input type="hidden" :value="service_package.id" id="service_package_id" />
                <div class="mt-3" id="modal-form-data">

                    <div class="grid grid-cols-2 gap-2 mb-1.5">
                        <div class="mb-1.5">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="package_type_id">
                                {{ $t('packages.service_type_hint') }} *
                            </label>
                            <select name="package_type_id" id="package_type_id" v-model="service_package.service_type_id"
                                class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                <option value="">{{ $t('packages.service_type_hint') }}</option>
                                <option v-for="(service_type, index) in service_types_list" :key="index"
                                    :value="service_type.id">{{ service_type.name_en }}</option>
                            </select>
                            <span class="text-sm text-red-400" v-if="v$.service_package.service_type_id.$error"> {{
                                v$.service_package.service_type_id.$errors[0].$message }}</span>
                        </div>
                        <div class="mb-1.5">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="branch_ids">
                                {{ $t('packages.branches_hint') }} *
                            </label>
                            <Multiselect mode="tags" :searchable="true" :createTag="true"
                                v-model="service_package.branch_ids" :multiple="true" label="name_en" valueProp='id'
                                :placeholder="$t('packages.branches_hint')"
                                class="shadow border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                :options="branches_list" />
                            <span class="text-sm text-red-400" v-if="v$.service_package.branch_ids.$error"> {{
                                v$.service_package.branch_ids.$errors[0].$message }}</span>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-2 mb-1.5">
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-1" for="name_en">
                                {{ $t('packages.name_en') }} *
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name_en" type="text" v-model="service_package.name_en"
                                :placeholder="$t('packages.name_en')" />
                            <span class="text-sm text-red-400" v-if="v$.service_package.name_en.$error"> {{
                                v$.service_package.name_en.$errors[0].$message }}</span>
                        </div>
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-1" for="name_ar">
                                {{ $t('packages.name_ar') }} *
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name_ar" type="text" v-model="service_package.name_ar"
                                :placeholder="$t('packages.name_ar')" />
                            <span class="text-sm text-red-400" v-if="v$.service_package.name_ar.$error"> {{
                                v$.service_package.name_ar.$errors[0].$message }}</span>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-2 mb-1.5">
                        <div class="mb-1.5">
                            <label class="block text-gray-700 text-sm font-bold mb-1" for="amount">
                                {{ $t('packages.amount') }} *
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="amount" type="number" v-model="service_package.amount"
                                :placeholder="$t('packages.amount')" min="0" />
                            <span class="text-sm text-red-400" v-if="v$.service_package.amount.$error"> {{
                                v$.service_package.amount.$errors[0].$message }}</span>
                        </div>
                        <div class="mb-1.5">
                            <label class="block text-gray-700 text-sm font-bold mb-1" for="duration">
                                {{ $t('packages.duration') }} *
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="duration" type="number" v-model="service_package.duration"
                                :placeholder="$t('packages.duration')" min="0" />
                            <span class="text-sm text-red-400" v-if="v$.service_package.duration.$error"> {{
                                v$.service_package.duration.$errors[0].$message }}</span>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-2 mb-1.5">
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-1" for="freeze_quantity">
                                {{ $t('packages.freeze_quantity') }}
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="min_age" type="number" v-model="service_package.freeze_quantity"
                                :placeholder="$t('packages.freeze_qty')" min="0" />
                        </div>
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-1" for="total_freeze_days">
                                {{ $t('packages.total_freeze_days') }}
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="total_freeze_days" type="number" v-model="service_package.total_freeze_days"
                                :placeholder="$t('packages.total_freeze_days')" min="0" />
                        </div>
                    </div>
                    <div class="mb-1.5">
                        <label class="block text-gray-700 text-sm font-bold mb-1" for="remark">
                            {{ $t('packages.remark') }}
                        </label>
                        <textarea
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="remark" rows="2" v-model="service_package.remark" :placeholder="$t('packages.remark')" />
                    </div>
                    <div class="mb-1.5">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="is_active">
                            {{ $t('packages.is_active') }}
                        </label>
                        <label class="switch">
                            <input type="checkbox" id="is_active" v-model="service_package.is_active"
                                :checked="service_package.is_active">
                            <span class="slider round"></span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <!-- Buttons -->
        <div class="sm:flex sm:flex-row-reverse">
            <button v-if="!is_edit_service_package" type="button" @click="addNewServicePackage()" class="w-full inline-flex justify-center border-2 border-color-primary 
                                    shadow-sm px-4 py-2 font-semibold text-base btn-outline-primary 
                                    focus:outline-none sm:ms-3 sm:w-auto sm:text-sm">
                {{ $t('button.create') }}
            </button>
            <button v-if="is_edit_service_package" type="button" @click="updateSelectedServicePackage" class="w-full inline-flex justify-center border-2 border-color-primary 
                                    shadow-sm px-4 py-2 font-semibold text-base btn-outline-primary 
                                    focus:outline-none sm:ms-3 sm:w-auto sm:text-sm">
                {{ $t('button.update') }}
            </button>
            <button v-if="!is_edit_service_package" type="button" @click="addNewServicePackage(true)" class="w-full inline-flex justify-center border-2 border-color-primary 
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
import { required, helpers } from "@vuelidate/validators";

export default {
    data() {
        return {
            v$: useValidate(),
            create_another: false,
            branches_list: [],
            service_types_list: [],
            selected_service_package: [],
            service_package: {
                id: this.$route.params.id,
                service_type_id: '',
                branch_ids: null,
                name_en: '',
                name_ar: '',
                amount: '',
                duration: '',
                freeze_quantity: '',
                total_freeze_days: '',
                remark: '',
                is_active: false
            },
            modal_title: this.$t('packages.add_new_service'),
            is_edit_service_package: false
        }
    },
    validations() {
        return {
            service_package: {
                service_type_id: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('packages.service_type')), required) },
                branch_ids: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('master.branch')), required) },
                name_en: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('master.name_en')), required) },
                name_ar: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('master.name_ar')), required) },
                amount: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('master.amount')), required) },
                duration: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('reports.duration')), required) },
            }
        };
    },
    computed: {
        ...mapGetters(["servicePackagesToast", "addServicePackageResponse", "updateServicePackageResponse", 'servicePackages', 'branches', 'servicePackageById', 'serviceTypes']),
    },
    methods: {
        ...mapActions(["addServicePackage", "updateServicePackage", 'getServicePackages', 'getBranches', 'getServicePackageById', 'getServiceTypes']),

        addNewServicePackage(is_create_another = false) {
            this.v$.$validate()
            if (!this.v$.$error) {
                this.addServicePackage({
                    service_type_id: this.service_package.service_type_id,
                    branch_ids: this.service_package.branch_ids,
                    name_en: this.service_package.name_en,
                    name_ar: this.service_package.name_ar,
                    amount: this.service_package.amount,
                    duration: this.service_package.duration,
                    freeze_quantity: this.service_package.freeze_quantity,
                    total_freeze_days: this.service_package.total_freeze_days,
                    remark: this.service_package.remark,
                    is_active: this.service_package.is_active
                })
                this.create_another = is_create_another;
            }
        },
        updateSelectedServicePackage() {
            this.v$.$validate()
            if (!this.v$.$error) {
                this.updateServicePackage({
                    id: this.service_package.id,
                    service_type_id: this.service_package.service_type_id,
                    branch_ids: this.service_package.branch_ids,
                    name_en: this.service_package.name_en,
                    name_ar: this.service_package.name_ar,
                    amount: this.service_package.amount,
                    duration: this.service_package.duration,
                    freeze_quantity: this.service_package.freeze_quantity,
                    total_freeze_days: this.service_package.total_freeze_days,
                    remark: this.service_package.remark,
                    is_active: this.service_package.is_active
                })
            }
        },
        setSelectedServicePackage() {
            if (this.selected_service_package) {
                let selected_branch_ids = [];
                for (let i = 0; i < this.selected_service_package.branches.length; i++) {
                    selected_branch_ids.push(this.selected_service_package.branches[i].id);
                }
            
                this.modal_title = this.$t('packages.update_service');
                this.is_edit_service_package = true;
                this.service_package.id = this.selected_service_package.id
                this.service_package.service_type_id = this.selected_service_package.service_type.id
                this.service_package.branch_ids = selected_branch_ids
                this.service_package.name_en = this.selected_service_package?.name_en
                this.service_package.name_ar = this.selected_service_package?.name_ar
                this.service_package.amount = this.selected_service_package?.amount
                this.service_package.duration = this.selected_service_package?.duration
                this.service_package.freeze_quantity = this.selected_service_package?.freeze_quantity
                this.service_package.total_freeze_days = this.selected_service_package?.total_freeze_days
                this.service_package.remark = this.selected_service_package?.remark
                this.service_package.is_active = this.selected_service_package?.is_active
            } else {
                this.modal_title = this.$t('packages.add_new_service');
                this.is_edit_service_package = false;
            }
        }
    },
    watch: {
        servicePackages(data) {
            if(data != null) {
                this.branches_list = data.branches
                this.service_types_list = data.service_types
            }
        },
        servicePackagesToast(data) {
            if (data.status) {
                this.$toast.success(data.message);
            } else {
                this.$toast.error(data.message);
            }
        },
        addServicePackageResponse(data) {
            if (data.status) {
                this.$toast.success(data.message);
                
                if (!this.create_another) {
                    this.$router.push('/services')
                    // this.closePopup();
                } else {
                    this.service_package.service_type_id = "";
                    this.service_package.branch_ids = null;
                    this.service_package.name_en = "";
                    this.service_package.name_ar = "";
                    this.service_package.amount = "";
                    this.service_package.duration = "";
                    this.service_package.freeze_quantity = "";
                    this.service_package.total_freeze_days = "";
                    this.service_package.remark = "";
                    this.service_package.is_active = false;
                    this.v$.$reset();
                }
            } else {
                this.$toast.error(data.message);
            }
        },
        updateServicePackageResponse(data) {
            if (data.status) {
                this.$router.push('/services')
            } else {
                this.$toast.error(data.message);
            }
        },
        servicePackageById(data) {
            if (data) {
                this.selected_service_package = data.service_package_details
                this.branches_list = data.branches
                this.service_types_list = data.service_types
                this.setSelectedServicePackage();
            }
        },
        serviceTypes(data) {
            if (data != null) {
                this.service_types_list = data
            }
        },
        branches(data) {
            if (data != null) {
                this.branches_list = data.branches
            }
        }
    },
    mounted() {
        if (this.service_package.id && this.service_package.id != 'add') {
            // console.log('passing this check')
            this.getServicePackageById(this.service_package.id)
        } else {
            this.getServicePackages()
        }
    },
}
</script>