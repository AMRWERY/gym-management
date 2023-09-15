<template>
    <div id="item-group-form-modal" class="mt-7 fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
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
                            <input type="hidden" :value="item_group.id" id="item_group_id"/>
                            <div class="mt-3" id="modal-form-data">
                                <div class="mb-1.5">
                                    <label class="block text-gray-700 text-sm font-bold mb-2" for="item_type_id">
                                        {{ $t('master.item_type') }} *
                                    </label>
                                    <select name="item_type_id" id="item_type_id" v-model="item_group.item_type_id"
                                        class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                        <option value="">{{ $t('master.item_type_hint') }}</option>
                                        <option v-for="(item_type, index) in item_types" :key="index" :value="item_type.id">{{item_type.name_en}}</option>
                                    </select>
                                    <span class="text-sm text-red-400" v-if="v$.item_group.item_type_id.$error"> {{ v$.item_group.item_type_id.$errors[0].$message }}</span>
                                </div>
                                <div class="grid grid-cols-2 gap-2 mb-1.5">
                                    <div>
                                        <label class="block text-gray-700 text-sm font-bold mb-1" for="name_en">
                                            {{ $t('master.name_en') }} *
                                        </label>
                                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="name_en"
                                            type="text"
                                            v-model="item_group.name_en"
                                            :placeholder="$t('master.name_en')" />
                                        <span class="text-sm text-red-400" v-if="v$.item_group.name_en.$error"> {{ v$.item_group.name_en.$errors[0].$message }}</span>
                                    </div>
                                    <div>
                                        <label class="block text-gray-700 text-sm font-bold mb-1" for="name_ar">
                                            {{ $t('master.name_ar') }} *
                                        </label>
                                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="name_ar"
                                            type="text"
                                            v-model="item_group.name_ar"
                                            :placeholder="$t('master.name_ar')" />
                                        <span class="text-sm text-red-400" v-if="v$.item_group.name_ar.$error"> {{ v$.item_group.name_ar.$errors[0].$message }}</span>
                                    </div>
                                </div>
                                <div class="mb-1.5">
                                    <label class="block text-gray-700 text-sm font-bold mb-1" for="remark">
                                        {{ $t('master.remark') }} 
                                    </label>
                                    <textarea class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="remark"
                                        rows="2"
                                        v-model="item_group.remark"
                                        :placeholder="$t('master.remark')" />
                                </div>
                                <div class="mb-1.5">
                                    <label class="block text-gray-700 text-sm font-bold mb-2" for="is_active">
                                        {{ $t('master.is_active') }}
                                    </label>
                                    <label class="switch">
                                        <input type="checkbox" id="is_active" v-model="item_group.is_active" :checked="item_group.is_active">
                                        <span class="slider round"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Buttons -->
                    <div class="sm:flex sm:flex-row-reverse">
                        <button v-if="!is_edit_item_group" type="button" @click="addNewItemGroup()" 
                            class="w-full inline-flex justify-center border-2 border-color-primary 
                                shadow-sm px-4 py-2 font-semibold text-base btn-outline-primary 
                                focus:outline-none sm:ms-3 sm:w-auto sm:text-sm">
                            {{ $t('button.create') }}
                        </button>     
                        <button v-if="is_edit_item_group" type="button" @click="updateSelectedItemGroup" 
                            class="w-full inline-flex justify-center border-2 border-color-primary 
                                shadow-sm px-4 py-2 font-semibold text-base btn-outline-primary 
                                focus:outline-none sm:ms-3 sm:w-auto sm:text-sm">
                            {{ $t('button.update') }}
                        </button>
                        <button v-if="!is_edit_item_group" type="button" @click="addNewItemGroup(true)" 
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
    props: ["selected_item_group", "item_types"],
    data() {
        return {
            v$: useValidate(),
            create_another: false,
            item_group: {
                id: '',
                item_type_id: '',
                name_en: '',
                name_ar: '',
                remark: '',
                is_active: false
            },
            modal_title: this.$t('master.add_new_item_group'),
            is_edit_item_group: false
        }
    },
    validations() {
        return {
            item_group: {
                item_type_id: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('datatable.item_type')), required) },
                name_en: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('master.name_en')), required) },
                name_ar: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('master.name_ar')), required) },
            }
        };
    },
    computed: {
        ...mapGetters(["itemGroupsToast", "addItemGroupResponse", "updateItemGroupResponse"]),
    },
    methods: {
        ...mapActions(["addItemGroup", "updateItemGroup"]),

        closePopup() {
            this.$emit('close-modal');
        },
        addNewItemGroup(is_create_another = false) {
            this.v$.$validate()
            if(!this.v$.$error) {
                this.addItemGroup({
                    item_type_id: this.item_group.item_type_id,
                    name_en: this.item_group.name_en,
                    name_ar: this.item_group.name_ar,
                    remark: this.item_group.remark,
                    is_active: this.item_group.is_active
                })
                this.create_another = is_create_another;
            }
        },
        updateSelectedItemGroup() {
            this.v$.$validate()
            if(!this.v$.$error) {
                this.updateItemGroup({
                    id: this.item_group.id,
                    item_type_id: this.item_group.item_type_id,
                    name_en: this.item_group.name_en,
                    name_ar: this.item_group.name_ar,
                    remark: this.item_group.remark,
                    is_active: this.item_group.is_active
                })
            }
        },
        setSelectedItemGroup(){
            if(this.selected_item_group) {
                this.modal_title = this.$t('master.update_item_group');
                this.is_edit_item_group = true;
                this.item_group.id = this.selected_item_group.id
                this.item_group.item_type_id = this.selected_item_group.item_type_id
                this.item_group.name_en = this.selected_item_group?.name_en
                this.item_group.name_ar = this.selected_item_group?.name_ar
                this.item_group.remark = this.selected_item_group?.remark
                this.item_group.is_active = this.selected_item_group?.is_active
            } else {
                this.modal_title = this.$t('master.add_new_item_group');
                this.is_edit_item_group = false;
            }
        }
    },
    watch: {
        itemGroupsToast(data) {
            if(data.status) {
                this.$toast.success(data.message);
            } else {
                this.$toast.error(data.message);
            }
        },
        addItemGroupResponse(data) {
            if(data.status) {
                this.$toast.success(data.message);
                if(!this.create_another) {
                    this.closePopup();
                } else {
                    this.item_group.item_type_id = "";
                    this.item_group.name_en = "";
                    this.item_group.name_ar = "";
                    this.item_group.remark = "";
                    this.item_group.is_active = false;
                    this.v$.$reset();
                }
            } else {
                this.$toast.error(data.message);
            }
        },
        updateItemGroupResponse(data) {
            if(data.status) {
                this.closePopup();
            } else {
                this.$toast.error(data.message);
            }
        }
    },
    mounted() {
        this.setSelectedItemGroup()
    },
}
</script>