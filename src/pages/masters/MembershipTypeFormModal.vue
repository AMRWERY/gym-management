<template>
    <div id="membership-type-form-modal" class="mt-7 fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
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
                            <input type="hidden" :value="membership_type.id" id="membership_type_id"/>
                            <div class="mt-3" id="modal-form-data">
                                <div class="mb-1.5">
                                        <label class="block text-gray-700 text-sm font-bold mb-2" for="branch_ids">
                                            {{ $t('master.branches_hint') }} *
                                        </label>
                                        <Multiselect
                                            mode="tags"
                                            :searchable="true"
                                            :createTag="true"
                                            v-model="membership_type.branch_ids"
                                            :multiple="true"
                                            label="name_en"
                                            valueProp='id'
                                            :placeholder="$t('master.branches_hint')"
                                            class="shadow border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            :options="branches"/>
                                        <span class="text-sm text-red-400" v-if="v$.membership_type.branch_ids.$error"> {{ v$.membership_type.branch_ids.$errors[0].$message }}</span>
                                    </div>
                                <div class="grid grid-cols-2 gap-2 mb-1.5">
                                    <div>
                                        <label class="block text-gray-700 text-sm font-bold mb-1" for="name_en">
                                            {{ $t('master.name_en') }} *
                                        </label>
                                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="name_en"
                                            type="text"
                                            v-model="membership_type.name_en"
                                            :placeholder="$t('master.name_en')" />
                                        <span class="text-sm text-red-400" v-if="v$.membership_type.name_en.$error"> {{ v$.membership_type.name_en.$errors[0].$message }}</span>
                                    </div>
                                    <div>
                                        <label class="block text-gray-700 text-sm font-bold mb-1" for="name_ar">
                                            {{ $t('master.name_ar') }} *
                                        </label>
                                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="name_ar"
                                            type="text"
                                            v-model="membership_type.name_ar"
                                            :placeholder="$t('master.name_ar')" />
                                        <span class="text-sm text-red-400" v-if="v$.membership_type.name_ar.$error"> {{ v$.membership_type.name_ar.$errors[0].$message }}</span>
                                    </div>
                                </div>
                                <div class="mb-1.5">
                                    <label class="block text-gray-700 text-sm font-bold mb-1" for="description_en">
                                        {{ $t('master.description_en') }}
                                    </label>
                                    <textarea class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="description_en"
                                        rows="2"
                                        v-model="membership_type.description_en"
                                        :placeholder="$t('master.description_en')"></textarea>
                                        <span class="text-sm text-red-400" v-if="v$.membership_type.description_en.$error"> {{ v$.membership_type.description_en.$errors[0].$message }}</span>
                                </div>
                                <div class="mb-1.5">
                                    <label class="block text-gray-700 text-sm font-bold mb-1" for="description_ar">
                                        {{ $t('master.description_ar') }}
                                    </label>
                                    <textarea class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="description_ar"
                                        rows="2"
                                        v-model="membership_type.description_ar"
                                        :placeholder="$t('master.description_ar')"></textarea>
                                        <span class="text-sm text-red-400" v-if="v$.membership_type.description_ar.$error"> {{ v$.membership_type.description_ar.$errors[0].$message }}</span>
                                </div>
                                <div class="mb-1.5">
                                    <label class="block text-gray-700 text-sm font-bold mb-1" for="remark">
                                        {{ $t('master.remark') }}
                                    </label>
                                    <textarea class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="remark"
                                        rows="2"
                                        v-model="membership_type.remark"
                                        :placeholder="$t('master.remark')"></textarea>
                                </div>
                                <div class="mb-1.5">
                                    <label class="block text-gray-700 text-sm font-bold mb-2" for="is_active">
                                        {{ $t('master.is_active') }}
                                    </label>
                                    <label class="switch">
                                        <input type="checkbox" id="is_active" v-model="membership_type.is_active" :checked="membership_type.is_active">
                                        <span class="slider round"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Buttons -->
                    <div class="sm:flex sm:flex-row-reverse">
                        <button v-if="!is_edit_membership_type" type="button" @click="addNewMembershipType()" 
                            class="w-full inline-flex justify-center border-2 border-color-primary 
                                shadow-sm px-4 py-2 font-semibold text-base btn-outline-primary 
                                focus:outline-none sm:ms-3 sm:w-auto sm:text-sm">
                            {{ $t('button.create') }}
                        </button>     
                        <button v-if="is_edit_membership_type" type="button" @click="updateSelectedMembershipType" 
                            class="w-full inline-flex justify-center border-2 border-color-primary 
                                shadow-sm px-4 py-2 font-semibold text-base btn-outline-primary 
                                focus:outline-none sm:ms-3 sm:w-auto sm:text-sm">
                            {{ $t('button.update') }}
                        </button>
                        <button v-if="!is_edit_membership_type" type="button" @click="addNewMembershipType(true)" 
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
    props: ["selected_membership_type", "branches"],
    data() {
        return {
            v$: useValidate(),
            create_another: false,
            membership_type: {
                name_en: '',
                name_ar: '',
                description_en: '',
                description_ar: '',
                remark: '',
                branch_ids: [],
                is_active: false,
                type: 'membership_type'
            },
            modal_title: this.$t('master.add_new_membership_type'),
            is_edit_membership_type: false
        }
    },
    validations() {
        return {
            membership_type: {
                branch_ids: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('master.branch')), required) },
                name_en: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('master.name_en')), required) },
                name_ar: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('master.name_ar')), required) },
                description_en: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('master.description_en')), required) },
                description_ar: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('master.description_ar')), required) }
            }
        };
    },
    computed: {
        ...mapGetters(["membershipTypesToast", "addMembershipTypeResponse", "updateMembershipTypeResponse"]),
    },
    methods: {
        ...mapActions(["addMembershipType", "updateMembershipType"]),

        closePopup() {
            this.$emit('close-modal');
        },
        addNewMembershipType(is_create_another = false) {
            this.v$.$validate()
            if(!this.v$.$error) {
                this.membership_type.is_active = this.membership_type.is_active ? 1 : 0
                this.addMembershipType(this.membership_type)
                this.create_another = is_create_another;
            }
        },
        updateSelectedMembershipType() {
            this.v$.$validate()
            if(!this.v$.$error) {
                this.membership_type.is_active = this.membership_type.is_active ? 1 : 0
                this.updateMembershipType({
                    id: this.membership_type.id,
                    membership_type: this.membership_type
                })
            }
        },
        setSelectedMembershipType(){
            if(this.selected_membership_type) {
                let selected_branch_ids = [];
                for(let i = 0; i < this.selected_membership_type.branches.length; i++) {
                    selected_branch_ids.push(this.selected_membership_type.branches[i].id);
                }
                this.modal_title = this.$t('master.update_membership_type');
                this.is_edit_membership_type = true;
                this.membership_type.id = this.selected_membership_type.id
                this.membership_type.branch_ids = selected_branch_ids
                this.membership_type.name_en = this.selected_membership_type?.name_en
                this.membership_type.name_ar = this.selected_membership_type?.name_ar
                this.membership_type.description_en = this.selected_membership_type?.description_en
                this.membership_type.description_ar = this.selected_membership_type?.description_ar
                this.membership_type.remark = this.selected_membership_type?.remark
                this.membership_type.is_active = this.selected_membership_type?.is_active
            } else {
                this.modal_title = this.$t('master.add_new_membership_type');
                this.is_edit_membership_type = false;
            }
        }
    },
    watch: {
        membershipTypesToast(data) {
            if(data.status) {
                this.$toast.success(data.message);
            } else {
                this.$toast.error(data.message);
            }
        },
        addMembershipTypeResponse(data) {
            if(data.status) {
                this.$toast.success(data.message);
                if(!this.create_another) {
                    this.closePopup();
                } else {
                    this.membership_type.name_en = "";
                    this.membership_type.name_ar = "";
                    this.membership_type.description_en = "";
                    this.membership_type.description_ar = "";
                    this.membership_type.remark = "";
                    this.membership_type.is_active = false;
                    this.v$.$reset();
                }
            } else {
                this.$toast.error(data.message);
            }
        },
        updateMembershipTypeResponse(data) {
            if(data.status) {
                this.closePopup();
            } else {
                this.$toast.error(data.message);
            }
        }
    },
    mounted() {
        this.setSelectedMembershipType()
    },
}
</script>