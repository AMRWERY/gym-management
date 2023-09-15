<template>
    <div id="lesson-type-form-modal" class="mt-7 fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title"
        role="dialog" aria-modal="true">
        <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <div
                class="inline-block align-bottom bg-white text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <form class="rounded px-8 pt-6 pb-6 mb-2">
                    <tw-icon @click="closePopup" name="heroicons-outline:x"
                        class="w-6 h-6 text-gray-400 ms-auto cursor-pointer" />
                    <div class="bg-white px-4 pt-4 pb-2 sm:p-0">
                        <div class="mt-3 text-center sm:mt-0 sm:ms-4 sm:text-left">
                            <h2 class="text-2xl text-center leading-6 font-medium text-gray-900" id="modal-title">
                                {{ modal_title }}
                            </h2>
                            <input type="hidden" :value="lesson_type.id" id="lesson_type_id" />
                            <div class="mt-3" id="modal-form-data">
                                <div class="grid grid-cols-2 gap-2 mb-1.5">
                                    <div class="col-span-3">
                                        <label class="block text-gray-700 text-sm font-bold">
                                            {{ $t('master.image') }}
                                        </label>

                                        <div class="my-1 px-1 w-full overflow-hidden">
                                            <input class="text-80" type="file" @change="handleFileUpload($event)"
                                                accept="image/*"><br />
                                            <small class="italic text-gray-500">{{ $t('master.image_validation') }}</small>
                                        </div>

                                        <div class="flex flex-col">
                                            <span class="text-sm text-red-400" v-if="v$.lesson_type.image.$error"> {{
                                                v$.lesson_type.image.$errors[0].$message }}</span>
                                            <span class="text-sm text-red-400" v-if="lesson_type.image_size_error">
                                                {{ lesson_type.image_size_error }}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <label class="block text-gray-700 text-sm font-bold mb-1" for="name_en">
                                            {{ $t('master.name_en') }} *
                                        </label>
                                        <input
                                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="name_en" type="text" v-model="lesson_type.name_en"
                                            :placeholder="$t('master.name_en')" />
                                        <span class="text-sm text-red-400" v-if="v$.lesson_type.name_en.$error"> {{
                                            v$.lesson_type.name_en.$errors[0].$message }}</span>
                                    </div>
                                    <div>
                                        <label class="block text-gray-700 text-sm font-bold mb-1" for="name_ar">
                                            {{ $t('master.name_ar') }} *
                                        </label>
                                        <input
                                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="name_ar" type="text" v-model="lesson_type.name_ar"
                                            :placeholder="$t('master.name_ar')" />
                                        <span class="text-sm text-red-400" v-if="v$.lesson_type.name_ar.$error"> {{
                                            v$.lesson_type.name_ar.$errors[0].$message }}</span>
                                    </div>
                                </div>
                                <div class="mb-1.5">
                                    <label class="block text-gray-700 text-sm font-bold mb-1" for="remark">
                                        {{ $t('master.remark') }}
                                    </label>
                                    <textarea
                                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="remark" rows="2" v-model="lesson_type.remark"
                                        :placeholder="$t('master.remark')" />
                                </div>
                                <div class="mb-1.5">
                                    <label class="block text-gray-700 text-sm font-bold mb-2" for="is_active">
                                        {{ $t('master.is_active') }}
                                    </label>
                                    <label class="switch">
                                        <input type="checkbox" id="is_active" v-model="lesson_type.is_active"
                                            :checked="lesson_type.is_active">
                                        <span class="slider round"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Buttons -->
                    <div class="sm:flex sm:flex-row-reverse">
                        <button v-if="!is_edit_lesson_type" type="button" @click="addNewLessonType()" class="w-full inline-flex justify-center border-2 border-color-primary 
                                shadow-sm px-4 py-2 font-semibold text-base btn-outline-primary 
                                focus:outline-none sm:ms-3 sm:w-auto sm:text-sm">
                            {{ $t('button.create') }}
                        </button>
                        <button v-if="is_edit_lesson_type" type="button" @click="updateSelectedLessonType" class="w-full inline-flex justify-center border-2 border-color-primary 
                                shadow-sm px-4 py-2 font-semibold text-base btn-outline-primary 
                                focus:outline-none sm:ms-3 sm:w-auto sm:text-sm">
                            {{ $t('button.update') }}
                        </button>
                        <button v-if="!is_edit_lesson_type" type="button" @click="addNewLessonType(true)" class="w-full inline-flex justify-center border-2 border-color-primary 
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
import { required, helpers, requiredIf } from "@vuelidate/validators";

export default {
    props: ["selected_lesson_type"],
    data() {
        return {
            v$: useValidate(),
            create_another: false,
            lesson_type: {
                name_en: '',
                name_ar: '',
                remark: '',
                image: '',
                image_size_error: '',
                is_active: true
            },
            modal_title: this.$t('master.add_new_lesson_type'),
            is_edit_lesson_type: false
        }
    },
    validations() {
        return {
            lesson_type: {
                image: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('master.image')), requiredIf(() => { return !this.is_edit_lesson_type })) },
                name_en: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('master.name_en')), required) },
                name_ar: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('master.name_ar')), required) }
            }
        };
    },
    computed: {
        ...mapGetters(["lessonTypesToast", "addLessonTypeResponse", "updateLessonTypeResponse"]),
    },
    methods: {
        ...mapActions(["addLessonType", "updateLessonType"]),

        closePopup() {
            this.$emit('close-modal');
        },

        handleFileUpload(event) {
            this.lesson_type.image = event.target.files[0];
            const file = event.target.files[0];
            if (file && file.size > 500) {
                this.lesson_type.image_size_error = "Image size must be less than 500kb";
                this.lesson_type.image = '';
                return
            } else {
                this.lesson_type.image_size_error = "";
                this.lesson_type.image = file;
            }
        },
        
        addNewLessonType(is_create_another = false) {
            this.v$.$validate()
            if (!this.v$.$error) {
                this.lesson_type.is_active = this.lesson_type.is_active ? 1 : 0
                this.addLessonType(this.lesson_type)
                this.create_another = is_create_another;
            }
        },
        updateSelectedLessonType() {
            this.v$.$validate()
            if (!this.v$.$error) {
                this.lesson_type.is_active = this.lesson_type.is_active ? 1 : 0
                this.lesson_type.type = 'lesson_type'
                this.updateLessonType({
                    id: this.lesson_type.id,
                    lesson_type: this.lesson_type,
                })
            }
        },
        setSelectedLessonType() {
            if (this.selected_lesson_type) {
                this.modal_title = this.$t('master.update_lesson_type');
                this.is_edit_lesson_type = true;
                this.lesson_type.id = this.selected_lesson_type.id
                this.lesson_type.name_en = this.selected_lesson_type?.name_en
                this.lesson_type.name_ar = this.selected_lesson_type?.name_ar
                this.lesson_type.remark = this.selected_lesson_type?.remark
                this.lesson_type.is_active = this.selected_lesson_type?.is_active
            } else {
                this.modal_title = this.$t('master.add_new_lesson_type');
                this.is_edit_lesson_type = false;
            }
        }
    },
    watch: {
        lessonTypesToast(data) {
            if (data.status) {
                this.$toast.success(data.message);
            } else {
                this.$toast.error(data.message);
            }
        },
        addLessonTypeResponse(data) {
            if (data.status) {
                this.$toast.success(data.message);
                if (!this.create_another) {
                    this.closePopup();
                } else {
                    this.lesson_type.name_en = "";
                    this.lesson_type.name_ar = "";
                    this.lesson_type.remark = "";
                    this.lesson_type.is_active = false;
                    this.v$.$reset();
                }
            } else {
                this.$toast.error(data.message);
            }
        },
        updateLessonTypeResponse(data) {
            if (data.status) {
                this.closePopup();
            } else {
                this.$toast.error(data.message);
            }
        }
    },
    mounted() {
        this.setSelectedLessonType()
    },
}
</script>