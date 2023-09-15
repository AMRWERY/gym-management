<template>
    <form class="rounded px-8 pt-6 pb-6 mb-2 bg-white">
        <div class="px-4 pt-4 pb-2 sm:p-0">
            <div class="mt-3 text-start sm:mt-0 sm:ms-4 sm:text-left">
                <h2 class="text-2xl text-center leading-6 font-medium text-gray-900" id="modal-title">
                    {{ modal_title }}
                </h2>
                <input type="hidden" :value="branch.id" id="branch_id" />
                <div class="mt-3" id="modal-form-data">
                    <div class="mb-1.5">
                        <label class="block text-gray-700 text-sm font-bold mb-1">
                            {{ $t('master.image') }} *
                        </label>

                        <div
                            class="my-1 px-1 w-full overflow-hidden sm:my-1 sm:px-1 sm:w-2/3 md:my-1 md:px-1 md:w-2/3 lg:my-1 lg:px-1 lg:w-2/3 xl:my-1 xl:px-1 xl:w-2/3">
                            <input class="text-80" type="file" @change="handleFileUpload($event)" accept="image/*">
                            <br /><small class="italic text-gray-500">{{ $t('master.image_validation') }}</small>
                        </div>

                        <div class="flex flex-col">
                            <span class="text-sm text-red-400" v-if="v$.branch.logo_url.$error"> {{
                                v$.branch.logo_url.$errors[0].$message }}</span>
                            <span class="text-sm text-red-400" v-if="image_size_error"> {{ image_size_error
                            }}</span>
                        </div>
                    </div>

                    <div class="mb-1.5">
                        <label class="block text-gray-700 text-sm font-bold mb-1" for="name_en">
                            {{ $t('master.suprema_group_id') }} *
                        </label>
                        <input
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name_en" type="text" v-model="branch.suprema_group_id"
                            :placeholder="$t('master.suprema_group_id')" />
                        <span class="text-sm text-red-400" v-if="v$.branch.suprema_group_id.$error"> {{
                            v$.branch.suprema_group_id.$errors[0].$message }}</span>
                    </div>

                    <div class="grid grid-cols-2 gap-2 mb-1.5">
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-1" for="name_en">
                                {{ $t('master.name_en') }} *
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name_en" type="text" v-model="branch.name_en" :placeholder="$t('master.name_en')" />
                            <span class="text-sm text-red-400" v-if="v$.branch.name_en.$error"> {{
                                v$.branch.name_en.$errors[0].$message }}</span>
                        </div>
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-1" for="name_ar">
                                {{ $t('master.name_ar') }} *
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name_ar" type="text" v-model="branch.name_ar" :placeholder="$t('master.name_ar')" />
                            <span class="text-sm text-red-400" v-if="v$.branch.name_ar.$error"> {{
                                v$.branch.name_ar.$errors[0].$message }}</span>
                        </div>
                    </div>
                    <div class="mb-1.5">
                        <label class="block text-gray-700 text-sm font-bold mb-1" for="address_en">
                            {{ $t('master.address_en') }} *
                        </label>
                        <textarea
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="address_en" rows="2" v-model="branch.address_en" :placeholder="$t('master.address_en')"
                            maxlength="100" />
                        <span class="text-sm text-red-400" v-if="v$.branch.address_en.$error"> {{
                            v$.branch.address_en.$errors[0].$message }}</span>
                    </div>
                    <div class="mb-1.5">
                        <label class="block text-gray-700 text-sm font-bold mb-1" for="address_ar">
                            {{ $t('master.address_ar') }} *
                        </label>
                        <textarea
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="address_ar" rows="2" v-model="branch.address_ar" :placeholder="$t('master.address_ar')" />
                        <span class="text-sm text-red-400" v-if="v$.branch.address_ar.$error"> {{
                            v$.branch.address_ar.$errors[0].$message }}</span>
                    </div>
                    <div class="mb-1.5">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="invoice_type">
                            {{ $t('master.invoice_type') }}
                        </label>
                        <select name="invoice_type" id="invoice_type" v-model="branch.invoice_type"
                            class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <option value="">{{ $t('master.select_invoice_type') }}</option>
                            <option value="a4">{{ $t('master.a4') }}</option>
                            <option value="receipt">{{ $t('master.receipt') }}</option>
                            <option value="a5">{{ $t('master.a5') }}</option>
                            <option value="email">{{ $t('master.email') }}</option>
                        </select>
                    </div>
                    <div class="mb-1.5">
                        <label class="block text-gray-700 text-sm font-bold mb-1" for="invoice_prefix">
                            {{ $t('master.invoice_prefix') }}
                        </label>
                        <input
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="invoice_prefix" type="text" v-model="branch.invoice_prefix"
                            :placeholder="$t('master.invoice_prefix')" />
                    </div>
                    <div class="grid grid-cols-2 gap-2 mb-1.5">
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-1" for="branch_manager_name">
                                {{ $t('master.branch_manager') }} *
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="branch_manager_name" type="text" v-model="branch.branch_manager_name"
                                :placeholder="$t('master.branch_manager')" />
                            <span class="text-sm text-red-400" v-if="v$.branch.branch_manager_name.$error"> {{
                                v$.branch.branch_manager_name.$errors[0].$message }}</span>
                        </div>
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-1" for="contact_no">
                                {{ $t('master.branch_contact_no') }} *
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="contact_no" type="text" v-model="branch.contact_no"
                                :placeholder="$t('master.branch_contact_no')" />
                            <span class="text-sm text-red-400" v-if="v$.branch.contact_no.$error"> {{
                                v$.branch.contact_no.$errors[0].$message }}</span>
                        </div>
                    </div>
                    <div class="mb-1.5">
                        <label class="block text-gray-700 text-sm font-bold mb-1" for="terms_condition_en">
                            {{ $t('master.t_and_c_en') }} *
                        </label>
                        <textarea
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="terms_condition_en" rows="2" v-model="branch.terms_condition_en"
                            :placeholder="$t('master.t_and_c_en')" />
                        <span class="text-sm text-red-400" v-if="v$.branch.terms_condition_en.$error"> {{
                            v$.branch.terms_condition_en.$errors[0].$message }}</span>
                    </div>
                    <div class="mb-1.5">
                        <label class="block text-gray-700 text-sm font-bold mb-1" for="terms_condition_ar">
                            {{ $t('master.t_and_c_ar') }} *
                        </label>
                        <textarea
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="terms_condition_ar" rows="2" v-model="branch.terms_condition_ar"
                            :placeholder="$t('master.t_and_c_ar')" />
                        <span class="text-sm text-red-400" v-if="v$.branch.terms_condition_ar.$error"> {{
                            v$.branch.terms_condition_ar.$errors[0].$message }}</span>
                    </div>
                    <div class="mb-1.5">
                        <label class="block text-gray-700 text-sm font-bold mb-1" for="remark">
                            {{ $t('master.remark') }}
                        </label>
                        <textarea
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="remark" rows="2" v-model="branch.remark" :placeholder="$t('master.remark')" />
                    </div>
                    <div class="mb-1.5">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="is_active">
                            {{ $t('master.is_active') }}
                        </label>
                        <label class="switch">
                            <input type="checkbox" id="is_active" v-model="branch.is_active" :checked="branch.is_active">
                            <span class="slider round"></span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <!-- Buttons -->
        <div class="sm:flex sm:flex-row-reverse">
            <button v-if="!is_edit_branch" type="button" @click="addNewBranch()" class="w-full inline-flex justify-center border-2 border-color-primary 
                                            shadow-sm px-4 py-2 font-semibold text-base btn-outline-primary 
                                            focus:outline-none sm:ms-3 sm:w-auto sm:text-sm">
                {{ $t('button.create') }}
            </button>
            <button v-if="is_edit_branch" type="button" @click="updateSelectedBranch" class="w-full inline-flex justify-center border-2 border-color-primary 
                                            shadow-sm px-4 py-2 font-semibold text-base btn-outline-primary 
                                            focus:outline-none sm:ms-3 sm:w-auto sm:text-sm">
                {{ $t('button.update') }}
            </button>
            <button v-if="!is_edit_branch" type="button" @click="addNewBranch(true)" class="w-full inline-flex justify-center border-2 border-color-primary 
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
import { required, helpers, requiredIf } from "@vuelidate/validators";

export default {
    data() {
        return {
            v$: useValidate(),
            create_another: false,
            selected_branch: [],
            branch: {
                id: this.$route.params.id,
                suprema_group_id: '',
                logo_url: '',
                name_en: '',
                name_ar: '',
                address_en: '',
                address_ar: '',
                invoice_type: '',
                invoice_prefix: '',
                branch_manager_name: '',
                contact_no: '',
                terms_condition_en: '',
                terms_condition_ar: '',
                remark: '',
                is_active: false
            },
            image_size_error: "",
            modal_title: this.$t('master.add_new_branch'),
            is_edit_branch: false
        }
    },
    validations() {
        return {
            branch: {
                suprema_group_id: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('master.suprema_group_id')), required)},
                logo_url: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('master.image')), requiredIf(() => { return !this.is_edit_branch })) },
                name_en: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('master.name_en')), required) },
                name_ar: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('master.name_ar')), required) },
                address_en: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('master.address_en')), required) },
                address_ar: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('master.address_ar')), required) },
                branch_manager_name: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('master.manager_name')), required) },
                contact_no: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('master.contact_no')), required) },
                terms_condition_en: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('master.t_and_c_en')), required) },
                terms_condition_ar: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('master.t_and_c_ar')), required) },
            }
        };
    },
    computed: {
        ...mapGetters(["branchesToast", "addBranchResponse", "updateBranchResponse", 'branchById']),
    },
    methods: {
        ...mapActions(["addBranch", "updateBranch", 'getBranchById']),

        handleFileUpload(event) {
            this.branch.logo_url = event.target.files[0];
            const file = event.target.files[0];
            if (file && file.size > 512000) {
                this.image_size_error = "Image size must be less than 500kb";
                this.branch.logo_url = '';
                return
            } else {
                this.image_size_error = "";
                this.branch.logo_url = file;
            }
        },

        addNewBranch() {
            this.v$.$validate()
            if (!this.v$.$error) {
                this.addBranch({
                    suprema_group_id: this.branch.suprema_group_id,
                    logo_url: this.branch.logo_url,
                    name_en: this.branch.name_en,
                    name_ar: this.branch.name_ar,
                    address_en: this.branch.address_en,
                    address_ar: this.branch.address_ar,
                    invoice_type: this.branch.invoice_type,
                    invoice_prefix: this.branch.invoice_prefix,
                    branch_manager_name: this.branch.branch_manager_name,
                    contact_no: this.branch.contact_no,
                    terms_condition_en: this.branch.terms_condition_en,
                    terms_condition_ar: this.branch.terms_condition_ar,
                    remark: this.branch.remark,
                    is_active: this.branch.is_active
                })
            }
        },
        updateSelectedBranch() {
            this.v$.$validate()
            if (!this.v$.$error) {
                this.updateBranch({
                    id: this.branch.id,
                    suprema_group_id: this.branch.suprema_group_id,
                    logo_url: this.branch.logo_url,
                    name_en: this.branch.name_en,
                    name_ar: this.branch.name_ar,
                    address_en: this.branch.address_en,
                    address_ar: this.branch.address_ar,
                    invoice_type: this.branch.invoice_type,
                    invoice_prefix: this.branch.invoice_prefix,
                    branch_manager_name: this.branch.branch_manager_name,
                    contact_no: this.branch.contact_no,
                    terms_condition_en: this.branch.terms_condition_en,
                    terms_condition_ar: this.branch.terms_condition_ar,
                    remark: this.branch.remark,
                    is_active: this.branch.is_active
                })
            }
        },
        setSelectedBranch() {
            if (this.selected_branch) {
                this.modal_title = this.$t('master.update_branch');
                this.is_edit_branch = true;
                this.branch.id = this.selected_branch.id
                this.branch.suprema_group_id = this.selected_branch?.suprema_group_id
                this.branch.name_en = this.selected_branch?.name_en
                this.branch.name_ar = this.selected_branch?.name_ar
                this.branch.address_en = this.selected_branch?.address_en
                this.branch.address_ar = this.selected_branch?.address_ar
                this.branch.invoice_type = this.selected_branch?.invoice_type
                this.branch.invoice_prefix = this.selected_branch?.invoice_prefix
                this.branch.branch_manager_name = this.selected_branch?.branch_manager_name
                this.branch.contact_no = this.selected_branch?.contact_no
                this.branch.terms_condition_en = this.selected_branch?.terms_condition_en
                this.branch.terms_condition_ar = this.selected_branch?.terms_condition_ar
                this.branch.remark = this.selected_branch?.remark
                this.branch.is_active = this.selected_branch?.is_active
            } else {
                this.modal_title = this.$t('master.add_new_branch');
                this.is_edit_branch = false;
            }
        }
    },
    watch: {
        branchesToast(data) {
            if (data.status) {
                this.$toast.success(data.message);
            } else {
                this.$toast.error(data.message);
            }
        },
        addBranchResponse(data) {
            if (data.status) {
                this.$toast.success(data.message);
                if (!this.create_another) {
                    this.$router.push('/branches')
                } else {
                    this.branch.suprema_group_id = "";
                    this.branch.logo_url = "";
                    this.branch.name_en = "";
                    this.branch.name_ar = "";
                    this.branch.address_en = "";
                    this.branch.address_ar = "";
                    this.branch.invoice_type = "";
                    this.branch.invoice_prefix = "";
                    this.branch.branch_manager_name = "";
                    this.branch.contact_no = "";
                    this.branch.terms_condition_en = "";
                    this.branch.terms_condition_ar = "";
                    this.branch.remark = "";
                    this.branch.is_active = false;
                    this.v$.$reset();
                }
            } else {
                this.$toast.error(data.message);
            }
        },
        updateBranchResponse(data) {
            if (data.status) {
                this.$router.push('/branches')
            } else {
                this.$toast.error(data.message);
            }
        },
        branchById(data) {
            if (data) {
                this.selected_branch = data
                this.setSelectedBranch();
            }
        },
    },
    mounted() {
        if (this.branch.id && this.branch.id != 'add') {
            this.getBranchById(this.branch.id)
        }
    },
}
</script>