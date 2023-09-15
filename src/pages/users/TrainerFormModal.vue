<template>
    <form class="rounded px-8 pt-6 pb-6 mb-2">
        <div class="bg-white px-4 pt-4 pb-2 sm:p-0">
            <div class="mt-3 text-center sm:mt-0 sm:ms-4 sm:text-left">
                <h2 class="text-2xl text-center leading-6 font-medium text-gray-900" id="modal-title">
                    {{ $t('users.add_new_trainer') }}
                </h2>
                <input type="hidden" :value="trainer.id" id="trainer_id" />
                <div class="mt-3" id="modal-form-data">
                    <div class="col-span-3">
                        <label class="block text-gray-700 text-sm font-bold">
                            {{ $t('users.image') }} *
                        </label>

                        <div class="my-1 px-1 w-full overflow-hidden">
                            <input class="text-80" type="file" @change="handleFileUpload($event)" accept="image/*"><br />
                            <small class="italic text-gray-500">{{ $t('master.image_validation') }}</small>
                        </div>
                            <div class="flex flex-col">
                                <span class="text-sm text-red-400" v-if="v$.trainer.image.$error"> {{ v$.trainer.image.$errors[0].$message }}</span>
                                <span class="text-sm text-red-400" v-if="trainer.imageSizeError"> {{trainer.imageSizeError }}</span>
                              </div>
                    </div>
                    <div class="mb-1.5">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="branch_ids">
                            {{ $t('users.select_branches') }} *
                        </label>
                        <Multiselect mode="tags" :searchable="true" :createTag="true" v-model="trainer.branch_ids"
                            :multiple="true" label="name_en" valueProp='id' :placeholder="$t('users.select_branches')"
                            class="shadow border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            :options="branches" />
                        <span class="text-sm text-red-400" v-if="v$.trainer.branch_ids.$error"> {{
                            v$.trainer.branch_ids.$errors[0].$message }}</span>
                    </div>

                    <div class="grid grid-cols-2 gap-2 mb-1.5">
                        <div class="mb-1.5">
                            <label class="block text-gray-700 text-sm font-bold mb-1" for="name">
                                {{ $t('users.name') }} *
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name" type="text" v-model="trainer.name" placeholder="Name" />
                            <span class="text-sm text-red-400" v-if="v$.trainer.name.$error"> {{
                                v$.trainer.name.$errors[0].$message }}</span>
                        </div>
                        <div class="mb-1.5">
                            <label class="block text-gray-700 text-sm font-bold mb-1" for="email">
                                {{ $t('users.email') }} *
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email" type="email" v-model="trainer.email" :placeholder="$t('users.email')" />
                            <span class="text-sm text-red-400" v-if="v$.trainer.email.$error"> {{
                                v$.trainer.email.$errors[0].$message }}</span>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-2 mb-1.5">
                        <div v-if="!is_edit_trainer" class="mb-1.5">
                            <label class="block text-gray-700 text-sm font-bold mb-1" for="password">
                                {{ $t('users.password') }} *
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="password" type="password" v-model="trainer.password"
                                :placeholder="$t('users.password')" />
                            <span class="text-sm text-red-400" v-if="v$.trainer.password.$error"> {{
                                v$.trainer.password.$errors[0].$message }}</span>
                        </div>
                        <div v-if="!is_edit_trainer" class="mb-3">
                            <label class="block text-gray-700 text-sm font-bold mb-1" for="confirm_password">
                                {{ $t('users.confirm_password') }} *
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="confirm_password" v-model="trainer.confirm_password" type="password"
                                :placeholder="$t('users.confirm_password')" />
                            <span class="text-sm text-red-400" v-if="v$.trainer.confirm_password.$error"> {{
                                v$.trainer.confirm_password.$errors[0].$message }}</span>
                        </div>
                    </div>
                    <div class="mb-1.5">
                        <label class="block text-gray-700 text-sm font-bold mb-1" for="mobile">
                            {{ $t('users.mobile') }} *
                        </label>
                        <input
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="mobile" type="number" v-model="trainer.mobile" :placeholder="$t('users.mobile')" />
                        <span class="text-sm text-red-400" v-if="v$.trainer.mobile.$error"> {{
                            v$.trainer.mobile.$errors[0].$message }}</span>
                    </div>
                    <div class="mb-1.5">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="commission_type">
                            {{ $t('users.commission_type') }} *
                        </label>
                        <select name="commission_type" id="commission_type" v-model="trainer.commission_type"
                            class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <option value="">{{ $t('users.select_commission_type') }}</option>
                            <option value="flat">{{ $t('users.flat') }}</option>
                            <option value="percentage">{{ $t('users.percentage') }}</option>
                        </select>
                        <span class="text-sm text-red-400" v-if="v$.trainer.commission_type.$error"> {{
                            v$.trainer.commission_type.$errors[0].$message }}</span>
                    </div>
                    <div class="mb-1.5">
                        <label class="block text-gray-700 text-sm font-bold mb-1" for="commission_value">
                            {{ $t('users.commission_value') }} *
                        </label>
                        <input
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="commission_value" type="number" v-model="trainer.commission_value"
                            :placeholder="$t('users.commission_value')" />
                        <span class="text-sm text-red-400" v-if="v$.trainer.commission_value.$error"> {{
                            v$.trainer.commission_value.$errors[0].$message }}</span>
                    </div>
                    <div class="mb-1.5">
                        <label class="block text-gray-700 text-sm font-bold mb-1" for="remark">
                            {{ $t('users.remark') }}
                        </label>
                        <textarea
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="remark" rows="2" v-model="trainer.remark" :placeholder="$t('users.remark')" />
                    </div>
                    <div class="mb-1.5">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="is_active">
                            {{ $t('users.is_active') }}
                        </label>
                        <label class="switch">
                            <input type="checkbox" id="is_active" v-model="trainer.is_active" :checked="trainer.is_active">
                            <span class="slider round"></span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <!-- Buttons -->
        <div class="sm:flex sm:flex-row-reverse">
            <button v-if="!is_edit_trainer" type="button" @click="addNewTrainer()" class="w-full inline-flex justify-center border-2 border-color-primary 
                                    shadow-sm px-4 py-2 font-semibold text-base btn-outline-primary 
                                    focus:outline-none sm:ms-3 sm:w-auto sm:text-sm">
                {{ $t('button.create') }}
            </button>
            <button v-if="is_edit_trainer" type="button" @click="updateSelectedTrainer" class="w-full inline-flex justify-center border-2 border-color-primary 
                                    shadow-sm px-4 py-2 font-semibold text-base btn-outline-primary 
                                    focus:outline-none sm:ms-3 sm:w-auto sm:text-sm">
                {{ $t('button.update') }}
            </button>
            <button v-if="!is_edit_trainer" type="button" @click="addNewTrainer(true)" class="w-full inline-flex justify-center border-2 border-color-primary 
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
import { required, requiredIf, minLength, maxLength, integer, email, helpers, sameAs } from "@vuelidate/validators";

export default {
    props: ["selected_trainer", "branches", "generals", "admin_group_id"],
    data() {
        return {
            v$: useValidate(),
            create_another: false,
            trainer: {
                branch_ids: [],
                image: '',
                imageSizeError: '',
                admin_group_id: this.admin_group_id,
                name: '',
                email: '',
                password: '',
                confirm_password: '',
                mobile: '',
                commission_type: '',
                commission_value: '',
                remark: '',
                is_active: false,
                type: 'trainer'
            },
            modal_title: this.$t('users.add_new_trainer'),
            is_edit_trainer: false
        }
    },
    validations() {
        return {
            trainer: {
                image: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('users.image')), requiredIf(() => { return !this.is_edit_trainer })) },
                branch_ids: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('master.branch')), required) },
                admin_group_id: { required: helpers.withMessage(this.$root.getErrorMessage('required', 'Role'), required) },
                name: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('users.name')), required) },
                commission_type: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('users.commission_type')), required) },
                commission_value: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('users.commission_value')), required) },
                email: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('users.email')), required), email: helpers.withMessage(this.$root.getErrorMessage('email', 'Email'), email) },
                password: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('users.password')), requiredIf(() => { return !this.is_edit_trainer })) },
                confirm_password: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('users.confirm_password')), requiredIf(() => { return this.trainer.password })), sameAsPassword: helpers.withMessage("Passwords do not match", sameAs(this.trainer.password)), },
                mobile: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('home.mobile_no')), required), integer: helpers.withMessage("Invalid mobile number", integer), minLength: helpers.withMessage(this.$root.getLengthErrorMessage('min', 'Mobile Number', 8), minLength(8)), maxLength: helpers.withMessage(this.$root.getLengthErrorMessage('max', 'Mobile Number', 8), maxLength(8)), },
            }
        };
    },
    computed: {
        ...mapGetters(["trainersToast", "addTrainerResponse", "updateTrainerResponse"]),
    },
    methods: {
        ...mapActions(["addTrainer", "updateTrainer"]),

        handleFileUpload(event) {
            this.trainer.image = event.target.files[0];
            const file = event.target.files[0];
            if (file && file.size > 500) {
                this.trainer.imageSizeError = "Image size must be less than 500kb";
                this.trainer.image = '';
                return
            } else {
                this.trainer.imageSizeError = "";
                this.trainer.image = file;
            }
        },
        addNewTrainer(is_create_another = false) {
            this.v$.$validate()
            if (!this.v$.$error) {
                this.trainer.is_active = this.trainer.is_active ? 1 : 0
                this.addTrainer(this.trainer)
                this.create_another = is_create_another;
            }
        },
        updateSelectedTrainer() {
            this.v$.$validate()
            if (!this.v$.$error) {
                this.trainer.is_active = this.trainer.is_active ? 1 : 0
                this.updateTrainer({
                    id: this.trainer.id,
                    trainer: this.trainer,
                })
            }

        },
        setSelectedTrainer() {
            if (this.selected_trainer) {
                let selected_branch_ids = [];
                for (let i = 0; i < this.selected_trainer.branches.length; i++) {
                    selected_branch_ids.push(this.selected_trainer.branches[i].id);
                }

                this.modal_title = "Update Trainer";
                this.is_edit_trainer = true;
                this.trainer.id = this.selected_trainer.id
                this.trainer.branch_ids = selected_branch_ids
                this.trainer.admin_group_id = this.selected_trainer?.admin_group_id
                this.trainer.name = this.selected_trainer?.name
                this.trainer.email = this.selected_trainer?.email
                this.trainer.mobile = this.selected_trainer?.mobile
                this.trainer.commission_type = this.selected_trainer?.commission_type
                this.trainer.commission_value = this.selected_trainer?.commission_value
                this.trainer.remark = this.selected_trainer?.remark
                this.trainer.is_active = this.selected_trainer?.is_active
            } else {
                this.modal_title = "Add New Trainer";
                this.is_edit_trainer = false;
            }
        }
    },
    watch: {
        trainersToast(data) {
            if (data.status) {
                this.$toast.success(data.message);
            } else {
                this.$toast.error(data.message);
            }
        },
        addTrainerResponse(data) {
            if (data.status) {
                this.$toast.success(data.message);
                if (!this.create_another) {
                    this.closePopup();
                } else {
                    this.trainer.branch_ids = []
                    this.trainer.name = ''
                    this.trainer.email = ''
                    this.trainer.password = ''
                    this.trainer.confirm_password = ''
                    this.trainer.mobile = ''
                    this.trainer.commission_type = ''
                    this.trainer.commission_value = ''
                    this.trainer.remark = ''
                    this.trainer.is_active = false
                    this.v$.$reset();
                }
            } else {
                this.$toast.error(data.message);
            }
        },
        updateTrainerResponse(data) {
            if (data.status) {
                this.closePopup();
            } else {
                this.$toast.error(data.message);
            }
        }
    },
    mounted() {
        this.setSelectedTrainer()
    },
}
</script>