<template>
    <form class="rounded px-8 pt-6 pb-6 mb-2 bg-white">
        <div class="bg-white px-4 pt-4 pb-2 sm:p-0">
            <div class="mt-3 text-center sm:mt-0 sm:ms-4 sm:text-left">
                <h2 class="text-2xl text-center leading-6 font-medium text-gray-900" id="modal-title">
                    {{ modal_title }}
                </h2>
                <div>
                    <button type="button" @click="activateCivilReader()" class="w-full inline-flex justify-center border-2 border-color-primary 
                                                shadow-sm px-4 py-2 font-semibold text-base btn-outline-primary 
                                                focus:outline-none my-3 sm:text-sm">
                        {{ $t('button.activate_civil_id_reader') }}
                    </button>
                </div>
                <input type="hidden" :value="member.id" id="member_id" />
                <div class="mt-3" id="modal-form-data">

                    <div class="mb-1.5">
                        <label class="block text-gray-700 text-sm font-bold mb-1">
                            {{ $t('transactions.image') }}
                        </label>

                        <div
                            class="my-1 px-1 w-full overflow-hidden sm:my-1 sm:px-1 sm:w-2/3 md:my-1 md:px-1 md:w-2/3 lg:my-1 lg:px-1 lg:w-2/3 xl:my-1 xl:px-1 xl:w-2/3">
                            <input class="text-80" type="file" @change="handleFileUpload($event)" accept="image/*">
                            <br /><small class="italic text-gray-500">{{ $t('master.image_validation') }}</small>
                        </div>
                        <img :src="member.image_preview_url" width="120" />
                    </div>

                    <div class="grid grid-cols-2 gap-2 mb-1.5">
                        <div class="mb-1.5">
                            <label class="block text-gray-700 text-sm font-bold mb-1" for="civil_id">
                                {{ $t('transactions.civil_id') }} *
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="civil_id" type="number" v-model="member.civil_id"
                                :placeholder="$t('transactions.civil_id')" />
                            <span class="text-sm text-red-400" v-if="v$.member.civil_id.$error"> {{
                                v$.member.civil_id.$errors[0].$message }}</span>
                        </div>
                        <div class="mb-1.5">
                            <label class="block text-gray-700 text-sm font-bold mb-1" for="civil_id_expiry">
                                {{ $t('transactions.civil_id_expiry') }}
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="civil_id_expiry" type="date" format="dd/MM/yyyy" v-model="member.civil_id_expiry"
                                :placeholder="$t('transactions.civil_id_expiry')" />
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-2 mb-1.5">
                        <div class="mb-1.5">
                            <label class="block text-gray-700 text-sm font-bold mb-1" for="passport">
                                {{ $t('transactions.passport') }}
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="passport" type="text" v-model="member.passport"
                                :placeholder="$t('transactions.passport')" />
                        </div>
                        <div class="mb-1.5">
                            <label class="block text-gray-700 text-sm font-bold mb-1" for="mobile">
                                {{ $t('transactions.mobile') }} *
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="mobile" type="number" v-model="member.mobile"
                                :placeholder="$t('transactions.mobile')" />
                            <span class="text-sm text-red-400" v-if="v$.member.mobile.$error"> {{
                                v$.member.mobile.$errors[0].$message }}</span>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-2 mb-1.5">
                        <div class="mb-1.5">
                            <label class="block text-gray-700 text-sm font-bold mb-1" for="alt_mobile">
                                {{ $t('transactions.alt_mobile') }}
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="alt_mobile" type="number" v-model="member.alt_mobile"
                                :placeholder="$t('transactions.alt_mobile')" />
                            <span class="text-sm text-red-400" v-if="v$.member.alt_mobile.$error"> {{
                                v$.member.alt_mobile.$errors[0].$message }}</span>
                        </div>
                        <div class="mb-1.5">
                            <label class="block text-gray-700 text-sm font-bold mb-1" for="ref_code">
                                {{ $t('transactions.ref_code') }}
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="ref_code" type="number" v-model="member.ref_code"
                                :placeholder="$t('transactions.ref_code')" />
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-2 mb-1.5">
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-1" for="name_en">
                                {{ $t('transactions.name_english') }} *
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name_en" type="text" v-model="member.name_en"
                                :placeholder="$t('transactions.name_english')" />
                            <span class="text-sm text-red-400" v-if="v$.member.name_en.$error"> {{
                                v$.member.name_en.$errors[0].$message }}</span>
                        </div>
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-1" for="name_ar">
                                {{ $t('transactions.name_arabic') }} *
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name_ar" type="text" v-model="member.name_ar"
                                :placeholder="$t('transactions.name_english')" />
                            <span class="text-sm text-red-400" v-if="v$.member.name_ar.$error"> {{
                                v$.member.name_ar.$errors[0].$message }}</span>
                        </div>
                    </div>
                    <div class="mb-1.5">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="gender">
                            {{ $t('transactions.gender') }} *
                        </label>
                        <select name="gender" id="gender" v-model="member.gender"
                            class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <option value="">{{ $t('transactions.select_gender') }}</option>
                            <option value="male">{{ $t('transactions.male') }}</option>
                            <option value="female">{{ $t('transactions.female') }}</option>
                            <option value="others">{{ $t('transactions.others') }}</option>
                        </select>
                        <span class="text-sm text-red-400" v-if="v$.member.gender.$error"> {{
                            v$.member.gender.$errors[0].$message }}</span>
                    </div>
                    <div class="mb-1.5">
                        <label class="block text-gray-700 text-sm font-bold mb-1" for="birth_date">
                            {{ $t('transactions.birth_date') }} *
                        </label>
                        <input @change="calculateAge($event)"
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="birth_date" type="date" format="dd/MM/yyyy" v-model="member.birth_date"
                            :placeholder="$t('transactions.birth_date')" />
                        <span class="text-sm text-red-400" v-if="v$.member.birth_date.$error"> {{
                            v$.member.birth_date.$errors[0].$message }}</span>
                    </div>

                    <div class="grid grid-cols-2 gap-2 mb-1.5">
                        <div class="mb-1.5">
                            <label class="block text-gray-700 text-sm font-bold mb-1" for="age">
                                {{ $t('transactions.age') }} *
                            </label>
                            <input disabled
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="age" type="number" v-model="member.age" :placeholder="$t('transactions.age')" />
                            <span class="text-sm text-red-400" v-if="v$.member.age.$error"> {{
                                v$.member.age.$errors[0].$message }}</span>
                        </div>
                        <div class="mb-1.5">
                            <label class="block text-gray-700 text-sm font-bold mb-1" for="email">
                                {{ $t('transactions.email') }}
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email" type="email" v-model="member.email" :placeholder="$t('transactions.email')" />
                            <span class="text-sm text-red-400" v-if="v$.member.email.$error"> {{
                                v$.member.email.$errors[0].$message }}</span>
                        </div>
                    </div>

                    <div class="mb-1.5">
                        <label class="block text-gray-700 text-sm font-bold mb-1" for="address">
                            {{ $t('transactions.address') }} *
                        </label>
                        <textarea
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="address" rows="2" v-model="member.address" :placeholder="$t('transactions.address')" />
                        <span class="text-sm text-red-400" v-if="v$.member.address.$error"> {{
                            v$.member.address.$errors[0].$message }}</span>
                    </div>

                    <div class="grid grid-cols-2 gap-2 mb-1.5">
                        <div class="mb-1.5">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="country_id">
                                {{ $t('transactions.select_country') }} *
                            </label>
                            <select @change="getAreas($event)" name="country_id" id="country_id" v-model="member.country_id"
                                class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                <option value="">{{ $t('transactions.select_country') }}</option>
                                <option v-for="(country, index) in countries" :key="index" :value="country.id">
                                    {{ country.name_en }}</option>
                            </select>
                            <span class="text-sm text-red-400" v-if="v$.member.country_id.$error"> {{
                                v$.member.country_id.$errors[0].$message }}</span>
                        </div>
                        <div class="mb-1.5">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="area_id">
                                {{ $t('transactions.select_area') }}
                            </label>
                            <select name="area_id" id="area_id" v-model="member.area_id"
                                class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                <option value="">{{ $t('transactions.select_area') }}</option>
                                <option v-for="(area, index) in areas_list" :key="index" :value="area.id">{{ area.name_en }}
                                </option>
                            </select>
                        </div>
                    </div>

                    <div class="mb-1.5">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="blacklisted">
                            {{ $t('transactions.is_blacklisted') }}?
                        </label>
                        <label class="switch">
                            <input type="checkbox" id="blacklisted" v-model="member.blacklisted"
                                :checked="member.blacklisted">
                            <span class="slider round"></span>
                        </label>
                    </div>

                    <div class="mb-1.5">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="black_listed_till">
                            {{ $t('transactions.date_till_blacklisted') }}
                        </label>
                        <input
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="black_listed_till" type="date" format="dd/MM/yyyy" v-model="member.black_listed_till"
                            :placeholder="$t('transactions.date_till_blacklisted')" />
                        <span class="text-sm text-red-400" v-if="v$.member.black_listed_till.$error"> {{
                            v$.member.black_listed_till.$errors[0].$message }}</span>
                    </div>
                    <div class="mb-1.5" >
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="company_name">
                            {{ $t('transactions.company_name') }}
                        </label>
                        <input
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="company_name" type="text" v-model="member.company_name"
                            :placeholder="$t('transactions.company_name')" />
                    </div>
                    <div class="mb-1.5">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="company_type">
                            {{ $t('transactions.company_type') }}
                        </label>
                        <select name="company_type" id="company_type" v-model="member.company_type"
                            class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <option value="">{{ $t('transactions.select_company_type') }}</option>
                            <option value="government">{{ $t('transactions.government') }}</option>
                            <option value="private">{{ $t('transactions.private') }}</option>
                            <option value="other">{{ $t('transactions.other') }}</option>
                        </select>
                    </div>
                    <div class="mb-1.5">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="remark">
                            {{ $t('transactions.remark') }}
                        </label>
                        <textarea
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="remark" rows="2" v-model="member.remark" :placeholder="$t('transactions.remark')" />
                    </div>
                </div>
            </div>
        </div>
        <!-- Buttons -->
        <div class="sm:flex sm:flex-row-reverse">
            <button v-if="!is_edit_member" type="button" @click="addNewMember()" class="w-full inline-flex justify-center border-2 border-color-primary 
                                        shadow-sm px-4 py-2 font-semibold text-base btn-outline-primary 
                                        focus:outline-none sm:ms-3 sm:w-auto sm:text-sm">
                {{ $t('button.create') }}
            </button>
            <button v-if="is_edit_member" type="button" @click="updateSelectedMember" class="w-full inline-flex justify-center border-2 border-color-primary 
                                        shadow-sm px-4 py-2 font-semibold text-base btn-outline-primary 
                                        focus:outline-none sm:ms-3 sm:w-auto sm:text-sm">
                {{ $t('button.update') }}
            </button>
            <button v-if="!is_edit_member" type="button" @click="addNewMember(true)" class="w-full inline-flex justify-center border-2 border-color-primary 
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
import { required, requiredIf, minLength, maxLength, integer, email, helpers } from "@vuelidate/validators";

export default {
    data() {
        return {
            v$: useValidate(),
            areas: [],
            countries: [],
            selected_member: [],
            create_another: false,
            member: {
                id: this.$route.params.id,
                image: '',
                image_url: '',
                civil_id: '',
                passport: '',
                mobile: '',
                alt_mobile: '',
                civil_id_expiry: new Date().toLocaleDateString("fr-CA"),
                ref_code: '',
                name_en: '',
                name_ar: '',
                gender: '',
                birth_date: '',
                age: '',
                email: '',
                address: '',
                area_id: '',
                country_id: '',
                blacklisted: '',
                black_listed_till: '',
                company_name: '',
                company_type: '',
                remark: '',
            },
            image_size_error: '',
            areas_list: [],
            modal_title: "Add New Member",
            is_edit_member: false
        }
    },
    validations() {
        return {
            member: {
                civil_id: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('transactions.civil_id')), required), integer: helpers.withMessage("Invalid Civil ID", integer), minLength: helpers.withMessage(this.$root.getLengthErrorMessage('min', 'Civil ID', 12), minLength(12)), maxLength: helpers.withMessage(this.$root.getLengthErrorMessage('max', 'Civil ID', 12), maxLength(12)), },
                mobile: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('activity_log.mobile_no')), required), integer: helpers.withMessage("Invalid mobile number", integer), minLength: helpers.withMessage(this.$root.getLengthErrorMessage('min', 'Mobile number', 8), minLength(8)), maxLength: helpers.withMessage(this.$root.getLengthErrorMessage('max', 'Mobile number', 8), maxLength(8)), },
                alt_mobile: { integer: helpers.withMessage("Invalid mobile number", integer), minLength: helpers.withMessage(this.$root.getLengthErrorMessage('min', 'Mobile number', 8), minLength(8)), maxLength: helpers.withMessage(this.$root.getLengthErrorMessage('max', 'Mobile number', 8), maxLength(8)), },
                name_en: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('master.name_en')), required) },
                name_ar: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('master.name_ar')), required) },
                gender: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('transactions.gender')), required) },
                birth_date: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('transactions.birth_date')), required) },
                age: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('transactions.age')), required) },
                email: { email: helpers.withMessage(this.$root.getErrorMessage('email', 'Email'), email) },
                address: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('datatable.address')), required) },
                black_listed_till: { required: helpers.withMessage(this.$root.getErrorMessage('required', 'Blacklisted till'), requiredIf(() => { return this.member.blacklisted })) },
                country_id: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('datatable.country')), required) }
            }
        };
    },
    computed: {
        ...mapGetters(["members", "memberDetails", "membersToast", "addMemberResponse", "updateMemberResponse"]),
    },
    methods: {
        ...mapActions(["getMembers", "getMemberDetails", "addMember", "updateMember"]),

        calculateAge(e) {
            let selected_date = e.target.value
            var today = new Date();
            var birthDate = new Date(selected_date);
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            this.member.age = age;
        },

        activateCivilReader() {
            let _this = this;

            $civilId({
                acquired: function (data, url) {
                    console.log(data)
                    _this.member.image_preview_url = url + 'photo/' + data?.civilId + '.jpg'
                    _this.member.civil_id = data?.civilId
                    _this.member.passport = data?.registration?.passport
                    _this.member.mobile = data?.contacts?.mobile?.number
                    _this.member.civil_id_expiry = data?.registration?.expires?.dateFormat
                    _this.member.name_en = data?.englishName?.full
                    _this.member.name_ar = data?.arabicName?.full
                    _this.member.gender = data?.sex?.text?.english.toLowerCase()
                    _this.member.birth_date = data?.dateOfBirth?.dateFormat
                    _this.member.age = data?.dateOfBirth?.age
                    _this.member.email = data?.contacts?.email
                    _this.member.address = data?.address?.oneLine?.english
                    _this.setCountryId(data?.nationality?.name?.english)
                },
                lost: function (data) {
                    // occurs when the card is removed from the reader
                    alert('Civil ID ' + data.civilId + ' removed.')
                },
                invalid: function () {
                    // occurs when the inserted smart card is not a Kuwait Smart Civil ID
                    alert('That card is not a valid Civil ID card.')
                }
            });
        },

        getAreas(e) {
            let country_id = e.target.value

            this.areas_list = []
            this.areas.forEach(area => {
                if (area.country_id == country_id) {
                    this.areas_list.push(area)
                }
            });
        },

        setCountryId(countryName) {
            let _this = this
            this.countries.forEach(country => {
                if (country.name_en.toLowerCase() == countryName.toLowerCase()) {
                    _this.member.country_id = country.id
                }
            });
        },

        handleFileUpload(event) {
            this.member.image = event.target.files[0];
            const file = event.target.files[0];
            if (file && file.size > 512000) {
                this.member.image_size_error = "Image size must be less than 500kb";
            } else {
                this.member.image_size_error = "";
                this.member.image = file;
            }
        },

        addNewMember(is_create_another = false) {
            this.v$.$validate()
            if (!this.v$.$error) {
                if (this.member.image.size > 512000) {
                    this.image_size_error = "Image size must be less than 500kb";
                } else {
                    let birth_date = this.$root.formatDateAPI(this.member.birth_date)
                    let civil_id_expiry = this.$root.formatDateAPI(this.member.civil_id_expiry)
                    let black_listed_till = this.member.black_listed_till ? this.$root.formatDateAPI(this.member.black_listed_till) : ''
                    this.addMember({
                        image: this.member.image,
                        image_url: this.member.image_preview_url,
                        civil_id: this.member.civil_id,
                        passport: this.member.passport,
                        mobile: this.member.mobile,
                        alt_mobile: this.member.alt_mobile,
                        civil_id_expiry: civil_id_expiry,
                        ref_code: this.member.ref_code,
                        name_en: this.member.name_en,
                        name_ar: this.member.name_ar,
                        gender: this.member.gender,
                        birth_date: birth_date,
                        age: this.member.age,
                        email: this.member.email,
                        address: this.member.address,
                        area_id: this.member.area_id,
                        country_id: this.member.country_id,
                        blacklisted: this.member.blacklisted,
                        black_listed_till: black_listed_till,
                        company_name: this.member.company_name,
                        company_type: this.member.company_type,
                        remark: this.member.remark,
                    })
                    this.create_another = is_create_another;
                }
            }
        },
        updateSelectedMember() {
            this.v$.$validate()
            if (!this.v$.$error) {
                if (this.member.image.size > 512000) {
                    this.image_size_error = "Image size must be less than 500kb";
                } else {
                    let birth_date = this.$root.formatDateAPI(this.member.birth_date)
                    let civil_id_expiry = this.$root.formatDateAPI(this.member.civil_id_expiry)
                    let black_listed_till = this.$root.formatDateAPI(this.member.black_listed_till)
                    this.updateMember({
                        id: this.member.id,
                        image: this.member.image,
                        civil_id: this.member.civil_id,
                        passport: this.member.passport,
                        mobile: this.member.mobile,
                        alt_mobile: this.member.alt_mobile,
                        civil_id_expiry: civil_id_expiry,
                        ref_code: this.member.ref_code,
                        name_en: this.member.name_en,
                        name_ar: this.member.name_ar,
                        gender: this.member.gender,
                        birth_date: birth_date,
                        age: this.member.age,
                        email: this.member.email,
                        address: this.member.address,
                        area_id: this.member.area_id,
                        country_id: this.member.country_id,
                        blacklisted: this.member.blacklisted,
                        black_listed_till: black_listed_till,
                        company_name: this.member.company_name,
                        company_type: this.member.company_type,
                        remark: this.member.remark,
                    })
                }
            }
        },
        setSelectedMember() {
            if (this.selected_member) {
                this.modal_title = "Update Member";
                this.is_edit_member = true;
                this.member.id = this.selected_member.id
                this.member.civil_id = this.selected_member?.civil_id
                this.member.passport = this.selected_member?.passport
                this.member.mobile = this.selected_member?.mobile
                this.member.alt_mobile = this.selected_member?.alt_mobile
                this.member.civil_id_expiry = this.$root.formatDateUI(this.selected_member?.civil_id_expiry)
                this.member.code = this.selected_member?.code
                this.member.ref_code = this.selected_member?.ref_code
                this.member.name_en = this.selected_member?.name_en
                this.member.name_ar = this.selected_member?.name_ar
                this.member.gender = this.selected_member?.gender
                this.member.birth_date = this.$root.formatDateUI(this.selected_member?.birth_date)
                this.member.age = this.selected_member?.age
                this.member.email = this.selected_member?.email
                this.member.address = this.selected_member?.address
                this.member.area_id = this.selected_member?.area_id
                this.member.country_id = this.selected_member?.country_id
                this.member.blacklisted = this.selected_member?.blacklisted
                this.member.black_listed_till = this.$root.formatDateUI(this.selected_member?.black_listed_till)
                this.member.company_name = this.selected_member?.company_name
                this.member.company_type = this.selected_member?.company_type
                this.member.remark = this.selected_member?.remark
            } else {
                this.modal_title = "Add New Member";
                this.is_edit_member = false;
            }
        }
    },
    watch: {
        members(data) {
            if (data != null) {
                this.areas = data.areas
                this.countries = data.countries
            }
        },
        memberDetails(data) {
            if (data != null) {
                this.areas_list = data.areas
                this.countries = data.countries
                this.selected_member = data.member_details
                this.setSelectedMember()
            }
        },
        membersToast(data) {
            if (data.status) {
                this.$toast.success(data.message);
            } else {
                this.$toast.error(data.message);
            }
        },
        addMemberResponse(data) {
            if (data.status) {
                this.$toast.success(data.message);
                this.$router.push('/member-subscriptions/' + data.response.id)
                // if (!this.create_another) {
                //     this.$router.push('/members')
                // } else {
                //     this.member.image = "";
                //     this.member.civil_id = "";
                //     this.member.passport = "";
                //     this.member.mobile = "";
                //     this.member.alt_mobile = "";
                //     this.member.civil_id_expiry = "";
                //     this.member.ref_code = "";
                //     this.member.name_en = "";
                //     this.member.name_ar = "";
                //     this.member.gender = "";
                //     this.member.birth_date = "";
                //     this.member.age = "";
                //     this.member.email = "";
                //     this.member.address = "";
                //     this.member.area_id = "";
                //     this.member.country_id = "";
                //     this.member.blacklisted = "";
                //     this.member.black_listed_till = "";
                //     this.member.company_name = "";
                //     this.member.company_type = "";
                //     this.member.remark = "";
                //     this.v$.$reset();
                // }
                // console.log(data)
            } else {
                this.$toast.error(data.message);
            }
        },
        updateMemberResponse(data) {
            if (data.status) {
                this.$router.push('/members')
            } else {
                this.$toast.error(data.message);
            }
        }
    },
    mounted() {
        if (this.member.id && this.member.id != 'add') {
            this.getMemberDetails(this.member.id)
        } else {
            this.getMembers()
        }
    }
}
</script>