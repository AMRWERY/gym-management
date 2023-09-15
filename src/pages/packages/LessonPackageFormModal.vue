<template>
    <form class="rounded px-8 pt-6 pb-6 mb-2 bg-white">
        <div class="px-4 pt-4 pb-2 sm:p-0">
            <div class="mt-3 text-center sm:mt-0 sm:ms-4 sm:text-left">
                <h2 class="text-2xl text-center leading-6 font-medium text-gray-900" id="modal-title">
                    {{ modal_title }}
                </h2>
                <input type="hidden" :value="lesson_package.id" id="lesson_package_id" />
                <div class="mt-3" id="modal-form-data">
                    <div class="col-span-3">
                        <label class="block text-gray-700 text-sm font-bold">
                            {{ $t('master.image') }}
                        </label>

                        <div class="my-1 px-1 w-full overflow-hidden">
                            <input class="text-80" type="file" @change="handleFileUpload($event)" accept="image/*"><br />
                            <small class="italic text-gray-500">{{ $t('master.image_validation') }}</small>
                        </div>
                            <div class="flex flex-col">
                                <span class="text-sm text-red-400" v-if="v$.lesson_package.image.$error"> {{
                                    v$.lesson_package.image.$errors[0].$message }}</span>
                                <span class="text-sm text-red-400" v-if="image_size_error">
                                    {{ image_size_error }}</span>
                            </div>
                    </div>

                    <div class="grid grid-cols-2 gap-2 mb-1.5">
                        <div class="mb-1.5">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="lesson_type_id">
                                {{ $t('packages.lesson_type_hint') }} *
                            </label>
                            <select name="lesson_type_id" id="lesson_type_id" v-model="lesson_package.lesson_type_id"
                                class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                <option value="">{{ $t('packages.lesson_type_hint') }}</option>
                                <option v-for="(lesson_type, index) in lesson_types_list" :key="index" :value="lesson_type.id">
                                    {{ lesson_type.name_en }}</option>
                            </select>
                            <span class="text-sm text-red-400" v-if="v$.lesson_package.lesson_type_id.$error"> {{
                                v$.lesson_package.lesson_type_id.$errors[0].$message }}</span>
                        </div>
                        <div class="mb-1.5">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="branch_ids">
                                {{ $t('packages.branches_hint') }} *
                            </label>
                            <Multiselect mode="tags" :searchable="true" :createTag="true"
                                v-model="lesson_package.branch_ids" :multiple="true" label="name_en" valueProp='id'
                                :placeholder="$t('packages.branches_hint')"
                                class="shadow border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                :options="branches_list" />
                            <span class="text-sm text-red-400" v-if="v$.lesson_package.branch_ids.$error"> {{
                                v$.lesson_package.branch_ids.$errors[0].$message }}</span>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-2 mb-1.5">
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-1" for="name_en">
                                {{ $t('packages.name_en') }} *
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name_en" type="text" v-model="lesson_package.name_en"
                                :placeholder="$t('packages.name_en')" />
                            <span class="text-sm text-red-400" v-if="v$.lesson_package.name_en.$error"> {{
                                v$.lesson_package.name_en.$errors[0].$message }}</span>
                        </div>
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-1" for="name_ar">
                                {{ $t('packages.name_ar') }} *
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name_ar" type="text" v-model="lesson_package.name_ar"
                                :placeholder="$t('packages.name_ar')" />
                            <span class="text-sm text-red-400" v-if="v$.lesson_package.name_ar.$error"> {{
                                v$.lesson_package.name_ar.$errors[0].$message }}</span>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-2 mb-1.5">
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-1" for="amount">
                                {{ $t('packages.amount') }} *
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="amount" type="number" v-model="lesson_package.amount"
                                :placeholder="$t('packages.amount')" min="0" />
                            <span class="text-sm text-red-400" v-if="v$.lesson_package.amount.$error"> {{
                                v$.lesson_package.amount.$errors[0].$message }}</span>
                        </div>
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-1" for="no_of_classes">
                                {{ $t('packages.no_of_classes') }} *
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="no_of_classes" type="number" v-model="lesson_package.no_of_classes"
                                :placeholder="$t('packages.no_of_classes')" min="0" />
                            <span class="text-sm text-red-400" v-if="v$.lesson_package.no_of_classes.$error"> {{
                                v$.lesson_package.no_of_classes.$errors[0].$message }}</span>
                        </div>
                    </div>

                    <div class="mb-1.5">
                        <label class="block text-gray-700 text-sm font-bold mb-1" for="duration">
                            {{ $t('packages.duration') }} *
                        </label>
                        <input
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="duration" rows="2" v-model="lesson_package.duration"
                            :placeholder="$t('packages.duration')" />
                        <span class="text-sm text-red-400" v-if="v$.lesson_package.duration.$error"> {{
                            v$.lesson_package.duration.$errors[0].$message }}</span>
                    </div>
                    <div class="mb-1.5">
                        <label class="block text-gray-700 text-sm font-bold mb-1" for="duration">
                            {{ $t('packages.remark') }}
                        </label>
                        <textarea
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="remark" rows="2" v-model="lesson_package.remark"
                            :placeholder="$t('packages.remark')"></textarea>
                    </div>
                    <div class="mb-1.5">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="is_active">
                            {{ $t('packages.is_active') }}
                        </label>
                        <label class="switch">
                            <input type="checkbox" id="is_active" v-model="lesson_package.is_active"
                                :checked="lesson_package.is_active">
                            <span class="slider round"></span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <!-- Buttons -->
        <div class="sm:flex sm:flex-row-reverse">
            <button v-if="!is_edit_lesson_package" type="button" @click="addNewLessonPackage()" class="w-full inline-flex justify-center border-2 border-color-primary 
                                shadow-sm px-4 py-2 font-semibold text-base btn-outline-primary 
                                focus:outline-none sm:ms-3 sm:w-auto sm:text-sm">
                {{ $t('button.create') }}
            </button>
            <button v-if="is_edit_lesson_package" type="button" @click="updateSelectedLessonPackage" class="w-full inline-flex justify-center border-2 border-color-primary 
                                shadow-sm px-4 py-2 font-semibold text-base btn-outline-primary 
                                focus:outline-none sm:ms-3 sm:w-auto sm:text-sm">
                {{ $t('button.update') }}
            </button>
            <button v-if="!is_edit_lesson_package" type="button" @click="addNewLessonPackage(true)" class="w-full inline-flex justify-center border-2 border-color-primary 
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
import { required, requiredIf, helpers } from "@vuelidate/validators";

export default {
    data() {
        return {
            v$: useValidate(),
            create_another: false,
            lesson_types_list: [],
            branches_list: [],
            lesson_package: {
                id: this.$route.params.id,
                lesson_type_id: '',
                branch_ids: null,
                name_en: '',
                name_ar: '',
                amount: '',
                duration: '',
                no_of_classes: '',
                remark: '',
                image: '',
                is_active: false,
                type: 'lesson_package'
            },
            selected_lesson_package: [],
            // branches: [],
            lesson_types: [],
            image_size_error: '',
            modal_title: this.$t('packages.add_new_lesson'),
            is_edit_lesson_package: false
        }
    },
    validations() {
        return {
            lesson_package: {
                image: { required: helpers.withMessage(this.$root.getErrorMessage('required', 'Image'), requiredIf(() => { return !this.is_edit_lesson_package })) },
                lesson_type_id: { required: helpers.withMessage(this.$root.getErrorMessage('required', 'Lesson Type'), required) },
                branch_ids: { required: helpers.withMessage(this.$root.getErrorMessage('required', 'Branch'), required) },
                name_en: { required: helpers.withMessage(this.$root.getErrorMessage('required', 'Name (English)'), required) },
                name_ar: { required: helpers.withMessage(this.$root.getErrorMessage('required', 'Name (Arabic)'), required) },
                amount: { required: helpers.withMessage(this.$root.getErrorMessage('required', 'Amount'), required) },
                duration: { required: helpers.withMessage(this.$root.getErrorMessage('required', 'Duration'), required) },
                no_of_classes: { required: helpers.withMessage(this.$root.getErrorMessage('required', 'Classes'), required) },
            }
        };
    },
    computed: {
        ...mapGetters(["lessonPackagesToast", "addLessonPackageResponse", "updateLessonPackageResponse", 'lessonPackageById']),
    },
    methods: {
        ...mapActions(["addLessonPackage", "updateLessonPackage", 'getLessonPackageById']),

        handleFileUpload(event) {
            this.lesson_package.image = event.target.files[0]
            const file = event.target.files[0];
            if (file && file.size > 512000) {
                this.image_size_error = "Image size must be less than 500kb";
                this.lesson_package.image = '';
                return
            } else {
                this.image_size_error = "";
                this.lesson_package.image = file;
            }
        },

        addNewLessonPackage(is_create_another = false) {
            this.v$.$validate()
            if (!this.v$.$error) {
                this.lesson_package.is_active = this.lesson_package.is_active ? 1 : 0
                this.addLessonPackage(this.lesson_package)
                this.create_another = is_create_another;
            }
        },
        updateSelectedLessonPackage() {
            this.v$.$validate()
            if (!this.v$.$error) {
                this.lesson_package.is_active = this.lesson_package.is_active ? 1 : 0
                this.updateLessonPackage({
                    id: this.lesson_package.id,
                    lesson_package: this.lesson_package
                })
            }
        },
        setSelectedLessonPackage() {
            if (this.selected_lesson_package) {
                let selected_branch_ids = [];
                for (let i = 0; i < this.selected_lesson_package.branches.length; i++) {
                    selected_branch_ids.push(this.selected_lesson_package.branches[i].id);
                }

                this.modal_title = this.$t('packages.update_lesson');
                this.is_edit_lesson_package = true;
                this.lesson_package.id = this.selected_lesson_package.id
                this.lesson_package.lesson_type_id = this.selected_lesson_package.lesson_type_id
                this.lesson_package.branch_ids = selected_branch_ids
                this.lesson_package.name_en = this.selected_lesson_package?.name_en
                this.lesson_package.name_ar = this.selected_lesson_package?.name_ar
                this.lesson_package.amount = this.selected_lesson_package?.amount
                this.lesson_package.duration = this.selected_lesson_package?.duration
                this.lesson_package.no_of_classes = this.selected_lesson_package?.no_of_classes
                this.lesson_package.remark = this.selected_lesson_package?.remark
                this.lesson_package.is_active = this.selected_lesson_package?.is_active
            } else {
                this.modal_title = this.$t('packages.add_new_lesson');
                this.is_edit_lesson_package = false;
            }
        }
    },
    watch: {
        lessonPackages(data) {
            if(data != null) {
                this.branches_list = data.branches
                this.lesson_types_list = data.lesson_types
            }
        },
        lessonPackagesToast(data) {
            if (data.status) {
                this.$toast.success(data.message);
            } else {
                this.$toast.error(data.message);
            }
        },
        addLessonPackageResponse(data) {
            if (data.status) {
                this.$toast.success(data.message);

                if (!this.create_another) {
                    this.$router.push('/lessons')
                } else {
                    this.lesson_package.lesson_type_id = "";
                    this.lesson_package.branch_ids = null;
                    this.lesson_package.name_en = "";
                    this.lesson_package.name_ar = "";
                    this.lesson_package.amount = "";
                    this.lesson_package.duration = "";
                    this.lesson_package.no_of_classes = "";
                    this.lesson_package.remark = "";
                    this.lesson_package.is_active = false;
                    this.v$.$reset();
                }
            } else {
                this.$toast.error(data.message);
            }
        },
        updateLessonPackageResponse(data) {
            if (data.status) {
                this.$router.push('/lessons')
            } else {
                this.$toast.error(data.message);
            }
        },
        lessonPackageById(data) {
            if (data) {
                this.selected_lesson_package = data.lesson_package_details
                this.lesson_types_list = data.lesson_types
                this.branches_list = data.branches
                this.setSelectedLessonPackage();
            }
        },
    },
    mounted() {
        if (this.lesson_package.id && this.lesson_package.id != 'add') {
            this.getLessonPackageById(this.lesson_package.id)
        } else {
            this.getLessonPackages()
        }
    },
}
</script>