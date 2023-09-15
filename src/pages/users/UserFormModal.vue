<template>
                <form class="rounded px-8 pt-6 pb-6 mb-2">
                    <div class="px-4 pt-4 pb-2 sm:p-0">
                        <div class="mt-3 text-center sm:mt-0 sm:ms-4 sm:text-left">
                            <h2 class="text-2xl text-center leading-6 font-medium text-gray-900" id="modal-title">
                                {{ $t('datatable.add_new_user') }}
                            </h2>
                            <input type="hidden" :value="user.id" id="user_id"/>
                            <div class="mt-3" id="modal-form-data">

                                <div class="grid grid-cols-2 gap-2 mb-1.5">
                                <div class="mb-1.5">
                                    <label class="block text-gray-700 text-sm font-bold mb-2" for="branch_ids">
                                        {{ $t('master.select_branches') }} *
                                    </label>
                                    <Multiselect
                                        mode="tags"
                                        :searchable="true"
                                        :createTag="true"
                                        v-model="user.branch_ids"
                                        :multiple="true"
                                        label="name_en"
                                        valueProp='id'
                                        placeholder="Select Branches"
                                        class="shadow border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        :options="branches_list"/>
                                    <span class="text-sm text-red-400" v-if="v$.user.branch_ids.$error"> {{ v$.user.branch_ids.$errors[0].$message }}</span>
                                </div>
                                <div class="mb-1.5" >
                                    <label class="block text-gray-700 text-sm font-bold mb-2" for="general_id">
                                        {{ $t('users.select_designation') }}
                                    </label>
                                    <select name="general_id" id="general_id" v-model="user.general_id"
                                        class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                        <option value="">Select Designation</option>
                                        <option v-for="(general, index) in generals_list" :key="index" :value="general.id">{{general.name_en}}</option>
                                    </select>
                                </div>
                                </div>

                                <div class="mb-1.5" >
                                    <label class="block text-gray-700 text-sm font-bold mb-2" for="admin_group_id">
                                        {{ $t('users.select_role') }} *
                                    </label>
                                    <select name="admin_group_id" id="admin_group_id" v-model="user.admin_group_id"
                                        class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                        <option value="">Select Role</option>
                                        <option v-for="(admin_group, index) in admin_groups_list" :key="index" :value="admin_group.id">{{admin_group.title_en}}</option>
                                    </select>
                                    <span class="text-sm text-red-400" v-if="v$.user.admin_group_id.$error"> {{ v$.user.admin_group_id.$errors[0].$message }}</span>
                                </div>

                                <div class="grid grid-cols-2 gap-2 mb-1.5">
                                <div class="mb-1.5">
                                    <label class="block text-gray-700 text-sm font-bold mb-1" for="name">
                                        {{ $t('datatable.name') }} *
                                    </label>
                                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="name"
                                        type="text"
                                        v-model="user.name"
                                        placeholder="Name" />
                                    <span class="text-sm text-red-400" v-if="v$.user.name.$error"> {{ v$.user.name.$errors[0].$message }}</span>
                                </div>
                                <div class="mb-1.5">
                                    <label class="block text-gray-700 text-sm font-bold mb-1" for="email">
                                        {{ $t('datatable.email') }} *
                                    </label>
                                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="email"
                                        type="email"
                                        v-model="user.email"
                                        placeholder="E-Mail" />
                                    <span class="text-sm text-red-400" v-if="v$.user.email.$error"> {{ v$.user.email.$errors[0].$message }}</span>
                                </div>
                                </div>

                                <div class="grid grid-cols-2 gap-2 mb-1.5">
                                <div v-if="!is_edit_user" class="mb-1.5">
                                    <label class="block text-gray-700 text-sm font-bold mb-1" for="password">
                                        {{ $t('auth.password') }} *
                                    </label>
                                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="password"
                                        type="password"
                                        v-model="user.password"
                                        placeholder="Password" />
                                    <span class="text-sm text-red-400" v-if="v$.user.password.$error"> {{ v$.user.password.$errors[0].$message }}</span>
                                </div>
                                <div v-if="!is_edit_user" class="mb-3">
                                    <label class="block text-gray-700 text-sm font-bold mb-1" for="confirm_password">
                                        {{ $t('users.confirm_password') }} *
                                    </label>
                                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="confirm_password"
                                        v-model="user.confirm_password"
                                        type="password"
                                        placeholder="Confirm Password" />
                                        <span class="text-sm text-red-400" v-if="v$.user.confirm_password.$error"> {{ v$.user.confirm_password.$errors[0].$message }}</span>
                                </div>
                                </div>
                                
                                <div class="mb-1.5">
                                    <label class="block text-gray-700 text-sm font-bold mb-1" for="mobile">
                                        {{ $t('datatable.mobile') }} *
                                    </label>
                                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="mobile"
                                        type="number"
                                        v-model="user.mobile"
                                        placeholder="Mobile"
                                        min="0" />
                                    <span class="text-sm text-red-400" v-if="v$.user.mobile.$error"> {{ v$.user.mobile.$errors[0].$message }}</span>
                                </div>
                                <div v-if="user.admin_group_id == role_trainer_id" class="mb-1.5">
                                    <label class="block text-gray-700 text-sm font-bold mb-2" for="commission_type">
                                        {{ $t('users.commission_type') }} *
                                    </label>
                                    <select name="commission_type" id="commission_type" v-model="user.commission_type"
                                        class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                        <option value="">Select Commission Type</option>
                                        <option value="flat">Flat</option>
                                        <option value="percentage">Percentage</option>
                                    </select>
                                </div>
                                <div v-if="user.admin_group_id == role_trainer_id" class="mb-1.5">
                                    <label class="block text-gray-700 text-sm font-bold mb-1" for="commission_value">
                                        {{ $t('users.commission_value') }} *
                                    </label>
                                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="commission_value"
                                        type="number"
                                        v-model="user.commission_value"
                                        placeholder="Commission Value" />
                                </div>
                                <div class="mb-1.5">
                                    <label class="block text-gray-700 text-sm font-bold mb-1" for="remark">
                                        {{ $t('users.remark') }} 
                                    </label>
                                    <textarea class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="remark"
                                        rows="2"
                                        v-model="user.remark"
                                        :placeholder="$t('transactions.remark')" />
                                </div>
                                <div class="mb-1.5">
                                    <label class="block text-gray-700 text-sm font-bold mb-2" for="is_active">
                                        {{ $t('users.is_active') }}
                                    </label>
                                    <label class="switch">
                                        <input type="checkbox" id="is_active" v-model="user.is_active" :checked="user.is_active">
                                        <span class="slider round"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Buttons -->
                    <div class="sm:flex sm:flex-row-reverse">
                        <button v-if="!is_edit_user" type="button" @click="addNewUser()" 
                            class="w-full inline-flex justify-center border-2 border-color-primary 
                                shadow-sm px-4 py-2 font-semibold text-base btn-outline-primary 
                                focus:outline-none sm:ms-3 sm:w-auto sm:text-sm">
                            {{ $t('button.create') }}
                        </button>     
                        <button v-if="is_edit_user" type="button" @click="updateSelectedUser" 
                            class="w-full inline-flex justify-center border-2 border-color-primary 
                                shadow-sm px-4 py-2 font-semibold text-base btn-outline-primary 
                                focus:outline-none sm:ms-3 sm:w-auto sm:text-sm">
                            {{ $t('button.update') }}
                        </button>
                        <button v-if="!is_edit_user" type="button" @click="addNewUser(true)" 
                            class="w-full inline-flex justify-center border-2 border-color-primary 
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
    data() {
        return {
            v$: useValidate(),
            create_another: false,
            role_trainer_id: 9,
            branches_list: [],
            user: {
                id: '',
                branch_ids: [],
                general_id: '',
                admin_group_id: '',
                name: '',
                email: '',
                password: '',
                confirm_password: '',
                mobile: '',
                commission_type: '',
                commission_value: '',
                remark: '',
                is_active: false
            },
            modal_title: "Add New User",
            is_edit_user: false
        }
    },
    validations() {
        return {
            user: {
                branch_ids: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('master.branch')), required) },
                admin_group_id: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('datatable.role')), required) },
                name: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('datatable.name')), required) },
                email: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('datatable.email')), required), email: helpers.withMessage(this.$root.getErrorMessage('email', 'Email'), email) },
                password: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('datatable.password')), requiredIf(()=> { return !this.is_edit_user })) },
                confirm_password: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('auth.confirm_password')), requiredIf(()=> { return this.user.password })), sameAsPassword: helpers.withMessage("Passwords do not match", sameAs(this.user.password)), },
                mobile: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('datatable.mobile')), required), integer: helpers.withMessage("Invalid mobile number", integer), minLength: helpers.withMessage(this.$root.getLengthErrorMessage('min', 'Mobile number', 8), minLength(8)), maxLength: helpers.withMessage(this.$root.getLengthErrorMessage('max', 'Mobile number', 8), maxLength(8)), },
            }
        };
    },
    computed: {
        ...mapGetters(["usersToast", "addUserResponse", "updateUserResponse", 'users', 'branches', 'generals']),
    },
    methods: {
        ...mapActions(["addUser", "updateUser", 'getUsers', 'getBranches', 'getGenerals']),

        addNewUser(is_create_another = false) {
            this.v$.$validate()
            if(!this.v$.$error) {
                this.addUser({
                    branch_ids: this.user.branch_ids,
                    general_id: this.user.general_id,
                    admin_group_id: this.user.admin_group_id,
                    name: this.user.name,
                    email: this.user.email,
                    password: this.user.password,
                    mobile: this.user.mobile,
                    commission_type: this.user.commission_type,
                    commission_value: this.user.commission_value,
                    remark: this.user.remark,
                    is_active: this.user.is_active
                })
                this.create_another = is_create_another;
            }
        },
        updateSelectedUser() {
            this.v$.$validate()
            if(!this.v$.$error) {
                this.updateUser({
                    id: this.user.id,
                    branch_ids: this.user.branch_ids,
                    general_id: this.user.general_id,
                    admin_group_id: this.user.admin_group_id,
                    name: this.user.name,
                    email: this.user.email,
                    mobile: this.user.mobile,
                    commission_type: this.user.commission_type,
                    commission_value: this.user.commission_value,
                    remark: this.user.remark,
                    is_active: this.user.is_active
                })
            }

        },
        setSelectedUser(){
            if(this.selected_user) {
                let selected_branch_ids = [];
                for(let i = 0; i < this.selected_user.branches.length; i++) {
                    selected_branch_ids.push(this.selected_user.branches[i].id);
                }

                this.modal_title = "Update User";
                this.is_edit_user = true;
                this.user.id = this.selected_user.id
                this.user.branch_ids = selected_branch_ids
                this.user.general_id = this.selected_user?.general_id
                this.user.admin_group_id = this.selected_user?.admin_group_id
                this.user.name = this.selected_user?.name
                this.user.email = this.selected_user?.email
                this.user.mobile = this.selected_user?.mobile
                this.user.commission_type = this.selected_user?.commission_type
                this.user.commission_value = this.selected_user?.commission_value
                this.user.remark = this.selected_user?.remark
                this.user.is_active = this.selected_user?.is_active
            } else {
                this.modal_title = "Add New User";
                this.is_edit_user = false;
            }
        }
    },
    watch: {
        usersToast(data) {
            if(data.status) {
                this.$toast.success(data.message);
            } else {
                this.$toast.error(data.message);
            }
        },
        addUserResponse(data) {
            if(data.status) {
                this.$toast.success(data.message);
                if(!this.create_another) {
                    this.closePopup();
                } else {
                    this.user.branch_ids = []
                    this.user.general_id = ''
                    this.user.admin_group_id = ''
                    this.user.name = ''
                    this.user.email = ''
                    this.user.password = ''
                    this.user.mobile = ''
                    this.user.commission_type = ''
                    this.user.commission_value = ''
                    this.user.remark = ''
                    this.user.is_active = false
                    this.v$.$reset();
                }
            } else {
                this.$toast.error(data.message);
            }
        },
        updateUserResponse(data) {
            if(data.status) {
                this.closePopup();
            } else {
                this.$toast.error(data.message);
            }
        },
        users(data) {
            if(data != null) {
                this.branches_list = data.branches
                this.generals_list = data.generals
                this.admin_groups_list = data.admin_groups
            }
        },
    },
    mounted() {
        this.setSelectedUser();
        this.getUsers()
    },
}
</script>