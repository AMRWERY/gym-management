<template>
    <div id="lesson-configuration-form-modal" class="mt-7 fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
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
                            <input type="hidden" :value="lesson_configuration.id" id="lesson_configuration_id"/>
                            <div class="mt-3" id="modal-form-data">
                                
                                <div class="mb-1.5" >
                                    <label class="block text-gray-700 text-sm font-bold mb-2" for="lesson_type_id">
                                        {{ $t('users.select_lesson_type') }} *
                                    </label>
                                    <select @change="getLessons($event)" name="lesson_type_id" id="lesson_type_id" v-model="lesson_configuration.lesson_type_id"
                                        class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                        <option value="">{{ $t('users.select_lesson_type') }}</option>
                                        <option v-for="(lesson_type, index) in lesson_types" :key="index" :value="lesson_type.id">{{lesson_type.name_en}}</option>
                                    </select>
                                    <span class="text-sm text-red-400" v-if="v$.lesson_configuration.lesson_type_id.$error"> {{ v$.lesson_configuration.lesson_type_id.$errors[0].$message }}</span>
                                </div>
                                <div class="mb-1.5" >
                                    <label class="block text-gray-700 text-sm font-bold mb-2" for="lesson_package_id">
                                        {{ $t('users.select_lesson') }} *
                                    </label>
                                    <select name="lesson_package_id" id="lesson_package_id" v-model="lesson_configuration.lesson_package_id"
                                        class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                        <option value="">{{ $t('users.select_lesson') }}</option>
                                        <option v-for="(lesson, index) in lessons_list" :key="index" :value="lesson.id">{{lesson.name_en}}</option>
                                    </select>
                                    <span class="text-sm text-red-400" v-if="v$.lesson_configuration.lesson_package_id.$error"> {{ v$.lesson_configuration.lesson_package_id.$errors[0].$message }}</span>
                                </div>
                                <div class="mb-1.5" >
                                    <label class="block text-gray-700 text-sm font-bold mb-2" for="duty_type_id">
                                        {{ $t('users.select_duty_type') }} *
                                    </label>
                                    <select name="general_id" id="general_id" v-model="lesson_configuration.general_id"
                                        class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                        <option value="">{{ $t('users.select_duty_type') }}</option>
                                        <option v-for="(duty_type, index) in duty_types" :key="index" :value="duty_type.id">{{duty_type.name_en}}</option>
                                    </select>
                                    <span class="text-sm text-red-400" v-if="v$.lesson_configuration.general_id.$error"> {{ v$.lesson_configuration.general_id.$errors[0].$message }}</span>
                                </div>
                                <div class="mb-1.5">
                                    <label class="block text-gray-700 text-sm font-bold mb-2" for="commission_type">
                                        {{ $t('users.select_commission_type') }} *
                                    </label>
                                    <select name="commission_type" id="commission_type" v-model="lesson_configuration.commission_type"
                                        class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                        <option value="">{{ $t('users.select_commission_type') }}</option>
                                        <option value="flat">{{ $t('users.flat') }}</option>
                                        <option value="percentage">{{ $t('users.percentage') }}</option>
                                    </select>
                                    <span class="text-sm text-red-400" v-if="v$.lesson_configuration.commission_type.$error"> {{ v$.lesson_configuration.commission_type.$errors[0].$message }}</span>
                                </div>
                                <div class="mb-1.5">
                                    <label class="block text-gray-700 text-sm font-bold mb-1" for="commission_value">
                                        {{ $t('users.commission_value') }} *
                                    </label>
                                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="commission_value"
                                        type="number"
                                        v-model="lesson_configuration.commission_value"
                                        :placeholder="$t('users.commission_value')" />
                                    <span class="text-sm text-red-400" v-if="v$.lesson_configuration.commission_value.$error"> {{ v$.lesson_configuration.commission_value.$errors[0].$message }}</span>
                                </div>
                                <div class="mb-1.5">
                                    <label for="start_time" class="block text-gray-700 text-sm font-bold mb-1">{{ $t('users.start_time') }} *</label>
                                    <input type="time" id="start_time" v-model="lesson_configuration.start_time" :placeholder="$t('users.start_time')" class="shadow appearance-none border rounded w-full p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                                    <span class="text-sm text-red-400" v-if="v$.lesson_configuration.start_time.$error"> {{ v$.lesson_configuration.start_time.$errors[0].$message }}</span>
                                </div>
                                <div class="mb-1.5">
                                    <label for="end_time" class="block text-gray-700 text-sm font-bold mb-1">{{ $t('users.end_time') }} *</label>
                                    <input type="time" id="end_time" v-model="lesson_configuration.end_time" :placeholder="$t('users.end_time')" class="shadow p-2 appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                                    <span class="text-sm text-red-400" v-if="v$.lesson_configuration.end_time.$error"> {{ v$.lesson_configuration.end_time.$errors[0].$message }}</span>
                                </div>
                                <div class="mb-5">
                                    <label class="block text-gray-700 text-sm font-bold mb-2" for="lesson_type_id">
                                        {{ $t('users.training_days') }} *
                                    </label>
                                    <div class="grid grid-cols-4 gap-2 mb-1.5">
                                        <div>
                                            <input type="checkbox" id="sat" name="sat" v-model="lesson_configuration.saturday" true-value="1" false-value="0">
                                            <label for="sat">&nbsp;{{ $t('users.saturday') }}</label>
                                        </div>
                                        <div>
                                            <input type="checkbox" id="sun" name="sun" v-model="lesson_configuration.sunday" true-value="1" false-value="0">
                                            <label for="sun">&nbsp;{{ $t('users.sunday') }}</label>
                                        </div>
                                        <div>
                                            <input type="checkbox" id="mon" name="mon" v-model="lesson_configuration.monday" true-value="1" false-value="0">
                                            <label for="mon">&nbsp;{{ $t('users.monday') }}</label>
                                        </div>
                                        <div>
                                            <input type="checkbox" id="tue" name="tue" v-model="lesson_configuration.tuesday" true-value="1" false-value="0">
                                            <label for="tue">&nbsp;{{ $t('users.tuesday') }}</label>
                                        </div>
                                        <div>
                                            <input type="checkbox" id="wed" name="wed" v-model="lesson_configuration.wednesday" true-value="1" false-value="0">
                                            <label for="wed">&nbsp;{{ $t('users.wednesday') }}</label>
                                        </div>
                                        <div>
                                            <input type="checkbox" id="thur" name="thur" v-model="lesson_configuration.thursday" true-value="1" false-value="0">
                                            <label for="thur">&nbsp;{{ $t('users.thursday') }}</label>
                                        </div>
                                        <div>
                                            <input type="checkbox" id="fri" name="fri" v-model="lesson_configuration.friday" true-value="1" false-value="0">
                                            <label for="fri">&nbsp;{{ $t('users.friday') }}</label>
                                        </div>
                                    </div>
                                    <span class="text-sm text-red-400" v-if="lesson_configuration.error"> {{ lesson_configuration.error }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Buttons -->
                    <div class="sm:flex sm:flex-row-reverse">
                        <button v-if="!is_edit_lesson_configuration" type="button" @click="addNewLessonConfiguration()" 
                            class="w-full inline-flex justify-center border-2 border-color-primary 
                                shadow-sm px-4 py-2 font-semibold text-base btn-outline-primary 
                                focus:outline-none sm:ms-3 sm:w-auto sm:text-sm">
                            {{ $t('button.create') }}
                        </button>     
                        <button v-if="is_edit_lesson_configuration" type="button" @click="updateSelectedLessonConfiguration" 
                            class="w-full inline-flex justify-center border-2 border-color-primary 
                                shadow-sm px-4 py-2 font-semibold text-base btn-outline-primary 
                                focus:outline-none sm:ms-3 sm:w-auto sm:text-sm">
                            {{ $t('button.update') }}
                        </button>
                        <button v-if="!is_edit_lesson_configuration" type="button" @click="addNewLessonConfiguration(true)" 
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
    props: ["selected_lesson_configuration", "lessons", "trainer_id", "lesson_types", "duty_types"],
    data() {
        return {
            v$: useValidate(),
            create_another: false,
            lesson_configuration: {
                id: '',
                user_id: this.trainer_id,
                general_id: '',
                lesson_type_id: '',
                lesson_package_id: '',
                commission_type: '',
                commission_value: '',
                start_time: '',
                end_time: '',
                saturday: '0',
                sunday: '0',
                monday: '0',
                tuesday: '0',
                wednesday: '0',
                thursday: '0',
                friday: '0',
                error: ''
            },
            lessons_list: [],
            lesson_packages: this.lessons,
            modal_title: this.$t('users.add_new_lesson_configuration'),
            is_edit_lesson_configuration: false
        }
    },
    validations() {
        return {
            lesson_configuration: {
                user_id: { required: helpers.withMessage(this.$root.getErrorMessage('required', 'Trainer'), required) },
                general_id: { required: helpers.withMessage(this.$root.getErrorMessage('required', 'Duty Type'), required) },
                lesson_type_id: { required: helpers.withMessage(this.$root.getErrorMessage('required', 'Lesson Type'), required) },
                lesson_package_id: { required: helpers.withMessage(this.$root.getErrorMessage('required', 'Lesson'), required) },
                start_time: { required: helpers.withMessage(this.$root.getErrorMessage('required', 'Start Time'), required) },
                end_time: { required: helpers.withMessage(this.$root.getErrorMessage('required', 'End Time'), required) },
                commission_type: { required: helpers.withMessage(this.$root.getErrorMessage('required', 'Commission Type'), required) },
                commission_value: { required: helpers.withMessage(this.$root.getErrorMessage('required', 'Commission Value'), required) }
            }
        };
    },
    computed: {
        ...mapGetters(["lessonConfigurationsToast", "addLessonConfigurationResponse", "updateLessonConfigurationResponse"]),
    },
    methods: {
        ...mapActions(["addLessonConfiguration", "updateLessonConfiguration"]),
        
        checkIfDaysSelected() {
            if(this.lesson_configuration.sunday != '1' && this.lesson_configuration.monday != '1' && this.lesson_configuration.tuesday != '1' && this.lesson_configuration.wednesday != '1' && this.lesson_configuration.thursday != '1' && this.lesson_configuration.friday != '1' && this.lesson_configuration.saturday != '1'){
                this.lesson_configuration.error = 'Please choose atleast a Day'
            }else{
                this.lesson_configuration.error = ''
            }
        },

        getLessons(e){
            let lesson_type_id = e.target.value;
            this.lessons_list = [];
            
            Array.from(this.lesson_packages).forEach(lesson => {
                if(lesson.lesson_type_id == lesson_type_id){
                    this.lessons_list.push(lesson);
                }
            });
        },

        selectedLessons(lesson_type_id){
            this.lessons_list = [];
            this.lesson_packages.forEach(lesson => {
                if(lesson.lesson_type_id == lesson_type_id){
                    this.lessons_list.push(lesson);
                }
            });
        },

        closePopup() {
            this.$emit('close-modal');
        },
        addNewLessonConfiguration(is_create_another = false) {
            
            this.checkIfDaysSelected()
            this.v$.$validate()

            if(!this.v$.$error && !this.lesson_configuration.error) {
                this.addLessonConfiguration({
                    user_id: this.lesson_configuration.user_id,
                    general_id: this.lesson_configuration.general_id,
                    lesson_type_id: this.lesson_configuration.lesson_type_id,
                    lesson_package_id: this.lesson_configuration.lesson_package_id,
                    commission_type: this.lesson_configuration.commission_type,
                    commission_value: this.lesson_configuration.commission_value,
                    start_time: this.lesson_configuration.start_time,
                    end_time: this.lesson_configuration.end_time,
                    saturday: this.lesson_configuration.saturday,
                    sunday: this.lesson_configuration.sunday,
                    monday: this.lesson_configuration.monday,
                    tuesday: this.lesson_configuration.tuesday,
                    wednesday: this.lesson_configuration.wednesday,
                    thursday: this.lesson_configuration.thursday,
                    friday: this.lesson_configuration.friday
                })
                this.create_another = is_create_another;
            }
        },
        updateSelectedLessonConfiguration() {

            this.checkIfDaysSelected()

            this.v$.$validate()
            
            if(!this.v$.$error && !this.lesson_configuration.error) {
                this.updateLessonConfiguration({
                    id: this.lesson_configuration.id,
                    user_id: this.lesson_configuration.user_id,
                    general_id: this.lesson_configuration.general_id,
                    lesson_type_id: this.lesson_configuration.lesson_type_id,
                    lesson_package_id: this.lesson_configuration.lesson_package_id,
                    commission_type: this.lesson_configuration.commission_type,
                    commission_value: this.lesson_configuration.commission_value,
                    start_time: this.lesson_configuration.start_time,
                    end_time: this.lesson_configuration.end_time,
                    saturday: this.lesson_configuration.saturday,
                    sunday: this.lesson_configuration.sunday,
                    monday: this.lesson_configuration.monday,
                    tuesday: this.lesson_configuration.tuesday,
                    wednesday: this.lesson_configuration.wednesday,
                    thursday: this.lesson_configuration.thursday,
                    friday: this.lesson_configuration.friday
                })
            }
        },
        setSelectedLessonConfiguration(){
            if(this.selected_lesson_configuration) {
                this.modal_title = "Update Lesson Configuration";
                this.selectedLessons(this.selected_lesson_configuration?.lesson_type_id)

                this.is_edit_lesson_configuration = true;
                this.lesson_configuration.id = this.selected_lesson_configuration.id
                this.lesson_configuration.user_id = this.selected_lesson_configuration?.user_id
                this.lesson_configuration.general_id = this.selected_lesson_configuration?.general_id
                this.lesson_configuration.lesson_type_id = this.selected_lesson_configuration?.lesson_type_id
                this.lesson_configuration.lesson_package_id = this.selected_lesson_configuration?.lesson_package_id
                this.lesson_configuration.commission_type = this.selected_lesson_configuration?.commission_type
                this.lesson_configuration.commission_value = this.selected_lesson_configuration?.commission_value
                this.lesson_configuration.start_time = this.selected_lesson_configuration?.start_time
                this.lesson_configuration.end_time = this.selected_lesson_configuration?.end_time

                this.selected_lesson_configuration.days.forEach(day => {
                    if(day.day_en == 'Saturday'){
                        this.lesson_configuration.saturday = day.available
                    }
                    if(day.day_en == 'Sunday'){
                        this.lesson_configuration.sunday = day.available
                    }
                    if(day.day_en == 'Monday'){
                        this.lesson_configuration.monday = day.available
                    }
                    if(day.day_en == 'Tuesday'){
                        this.lesson_configuration.tuesday = day.available
                    }
                    if(day.day_en == 'Wednesday'){
                        this.lesson_configuration.wednesday = day.available
                    }
                    if(day.day_en == 'Thursday'){
                        this.lesson_configuration.thursday = day.available
                    }
                    if(day.day_en == 'Friday'){
                        this.lesson_configuration.friday = day.available
                    }
                });
                
            } else {
                this.modal_title = "Add New Lesson Configuration";
                this.is_edit_lesson_configuration = false;
            }
        }
    },
    watch: {
        lessonConfigurationsToast(data) {
            if(data.status) {
                this.$toast.success(data.message);
            } else {
                this.$toast.error(data.message);
            }
        },
        addLessonConfigurationResponse(data) {
            if(data.status) {
                this.$toast.success(data.message);
                if(!this.create_another) {
                    this.closePopup();
                } else {
                    this.lesson_configuration.general_id = ''
                    this.lesson_configuration.lesson_type_id = ''
                    this.lesson_configuration.lesson_package_id = ''
                    this.lesson_configuration.commission_type = ''
                    this.lesson_configuration.commission_value = ''
                    this.lesson_configuration.start_time = ''
                    this.lesson_configuration.end_time = ''
                    this.lesson_configuration.saturday = ''
                    this.lesson_configuration.sunday = ''
                    this.lesson_configuration.monday = ''
                    this.lesson_configuration.tuesday = ''
                    this.lesson_configuration.wednesday = ''
                    this.lesson_configuration.thursday = ''
                    this.lesson_configuration.friday = ''
                    this.v$.$reset();
                }
            } else {
                this.$toast.error(data.message);
            }
        },
        updateLessonConfigurationResponse(data) {
            if(data.status) {
                this.closePopup();
            } else {
                this.$toast.error(data.message);
            }
        }
    },
    mounted() {
        this.setSelectedLessonConfiguration()
    },
}
</script>