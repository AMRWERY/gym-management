<template>
    <form class="rounded px-8 pt-6 pb-6 mb-2 bg-white">
        <div class="px-4 pt-4 pb-2 sm:p-0">
            <div class="mt-3 text-center sm:mt-0 sm:ms-4 sm:text-left">
                <h2 class="text-2xl text-center leading-6 font-medium text-gray-900" id="modal-title">
                    {{ modal_title }}
                </h2>
                <input type="hidden" :value="membership_package.id" id="membership_package_id" />
                <div class="mt-3" id="modal-form-data">
                    <div class="grid grid-cols-2 gap-2 mb-1.5">
                        <div class="mb-1.5">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="membership_category_id">
                                {{ $t('packages.membership_category') }} *
                            </label>
                            <select name="membership_category_id" id="membership_category_id"
                                v-model="membership_package.membership_category_id"
                                class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                <option value="">{{ $t('packages.membership_category_hint') }}</option>
                                <option v-for="(membership_category, index) in membership_categories_list" :key="index"
                                    :value="membership_category.id">{{ membership_category.name_en }}</option>
                            </select>
                            <span class="text-sm text-red-400" v-if="v$.membership_package.membership_category_id.$error"> {{
                                v$.membership_package.membership_category_id.$errors[0].$message }}</span>
                        </div>
                        <div class="mb-1.5">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="membership_type_id">
                                {{ $t('packages.membership_type_hint') }} *
                            </label>
                            <select name="membership_type_id" id="membership_type_id"
                                v-model="membership_package.membership_type_id"
                                class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                <option value="">{{ $t('packages.membership_type_hint') }}</option>
                                <option v-for="(membership_type, index) in membership_types_list" :key="index"
                                    :value="membership_type.id">{{ membership_type.name_en }}</option>
                            </select>
                            <span class="text-sm text-red-400" v-if="v$.membership_package.membership_type_id.$error"> {{
                                v$.membership_package.membership_type_id.$errors[0].$message }}</span>
                        </div>
                        <div class="mb-1.5">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="branch_ids">
                                {{ $t('packages.branches_hint') }} *
                            </label>
                            <Multiselect mode="tags" :searchable="true" :createTag="true"
                                v-model="membership_package.branch_ids" :multiple="true" label="name_en" valueProp='id'
                                :placeholder="$t('packages.branches_hint')"
                                class="shadow border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                :options="branches_list" />
                            <span class="text-sm text-red-400" v-if="v$.membership_package.branch_ids.$error"> {{
                                v$.membership_package.branch_ids.$errors[0].$message }}</span>
                        </div>
                        <div class="mb-1.5">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="min_age">
                                {{ $t('packages.min_age') }}
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="min_age" type="number" v-model="membership_package.min_age"
                                :placeholder="$t('packages.min_age')" />
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-2 mb-1.5">
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-1" for="name_en">
                                {{ $t('packages.name_en') }} *
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name_en" type="text" v-model="membership_package.name_en"
                                :placeholder="$t('packages.name_en')" />
                            <span class="text-sm text-red-400" v-if="v$.membership_package.name_en.$error"> {{
                                v$.membership_package.name_en.$errors[0].$message }}</span>
                        </div>
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-1" for="name_ar">
                                {{ $t('packages.name_ar') }} *
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name_ar" type="text" v-model="membership_package.name_ar"
                                :placeholder="$t('packages.name_ar')" />
                            <span class="text-sm text-red-400" v-if="v$.membership_package.name_ar.$error"> {{
                                v$.membership_package.name_ar.$errors[0].$message }}</span>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-2 mb-1.5">
                        <div class="mb-1.5">
                            <label class="block text-gray-700 text-sm font-bold mb-1" for="amount">
                                {{ $t('packages.amount') }} *
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="amount" type="number" v-model="membership_package.amount"
                                :placeholder="$t('packages.amount')" min="0" />
                            <span class="text-sm text-red-400" v-if="v$.membership_package.amount.$error"> {{
                                v$.membership_package.amount.$errors[0].$message }}</span>
                        </div>
                        <div class="mb-1.5">
                            <label class="block text-gray-700 text-sm font-bold mb-1" for="duration">
                                {{ $t('packages.duration') }} *
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="duration" type="number" v-model="membership_package.duration"
                                :placeholder="$t('packages.duration')" min="0" />
                            <span class="text-sm text-red-400" v-if="v$.membership_package.duration.$error"> {{
                                v$.membership_package.duration.$errors[0].$message }}</span>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-2 mb-1.5">
                        <div class="mb-1.5">
                            <label for="start_date" class="block text-gray-700 text-sm font-bold mb-1">{{
                                $t('packages.start_date') }}</label>
                            <input type="date" :min="todaysDate" v-model="membership_package.start_date" format="dd/MM/yyyy"
                                :placeholder="$t('packages.start_date')"
                                class="shadow appearance-none border rounded w-full p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <div class="mb-1.5">
                            <label for="end_date" class="block text-gray-700 text-sm font-bold mb-1">{{
                                $t('packages.expiry_date') }}</label>
                            <input type="date" :min="todaysDate" v-model="membership_package.end_date" format="dd/MM/yyyy"
                                :placeholder="$t('packages.expiry_date')"
                                class="shadow p-2 appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-2 mb-6">
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-1" for="freeze_quantity">
                                {{ $t('packages.freeze_quantity') }}
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="freeze_quantity" type="number" v-model="membership_package.freeze_quantity"
                                :placeholder="$t('packages.freeze_qty')" />
                        </div>
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-1" for="total_freeze_days">
                                {{ $t('packages.total_freeze_days') }}
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="total_freeze_days" type="number" v-model="membership_package.total_freeze_days"
                                :placeholder="$t('packages.total_freeze_days')" />
                        </div>
                    </div>

                    <div class="accordion-item bg-white border border-gray-200 mb-8">
                        <h2 class="accordion-header mb-0" id="heading-locker-detail">
                            <button :class="selected_locker_details.length > 0 ? '' : 'collapsed'"
                                class="accordion-button relative font-bold flex items-center w-full py-2 px-2 text-base color-primary text-left bg-white border rounded-none transition focus:outline-none"
                                type="button" data-bs-toggle="collapse" data-bs-target="#collapse-locker-detail"
                                :aria-expanded="selected_locker_details.length > 0" aria-controls="collapse-locker-detail">
                                {{ $t('packages.free_locker_hint') }}
                            </button>
                        </h2>
                        <div id="collapse-locker-detail" :class="selected_locker_details.length > 0 ? 'show' : ''"
                            class="accordion-collapse collapse block" aria-labelledby="heading-locker-detail">
                            <div class="accordion-body py-4 px-5">
                                <div class="mb-2">
                                    <label class="block text-gray-700 text-sm font-bold mb-2">
                                        {{ $t('packages.locker_type') }} *
                                    </label>
                                    <select @change="getLockerPackages($event)" v-model="locker_detail.locker_type_id"
                                        name="locker_type_id" id="locker_type_id"
                                        class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                        <option value="">{{ $t('packages.locker_type_hint') }}</option>
                                        <option v-for="(locker_type, index) in locker_types" :key="index"
                                            :value="locker_type.id">{{ locker_type.name_en }}</option>
                                    </select>
                                    <span class="text-sm text-red-400" v-if="v$.locker_detail.locker_type_id.$error"> {{
                                        v$.locker_detail.locker_type_id.$errors[0].$message }}</span>
                                </div>
                                <div class="mb-2">
                                    <label class="block text-gray-700 text-sm font-bold mb-2">
                                        {{ $t('packages.locker_package') }}*
                                    </label>
                                    <select name="locker_package_id" id="locker_package_id"
                                        v-model="locker_detail.locker_package_id"
                                        class="shadow border rounded w-full py-2 px-3 mt-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                        <option value="">{{ $t('packages.locker_package_hint') }}</option>
                                        <option v-for="(locker_package, index) in locker_packages_list" :key="index"
                                            :value="locker_package.id">{{ locker_package.name_en }}</option>
                                    </select>
                                    <span class="text-sm text-red-400" v-if="v$.locker_detail.locker_package_id.$error"> {{
                                        v$.locker_detail.locker_package_id.$errors[0].$message }}</span>
                                </div>
                                <button type="button" @click="addNewLockerDetail" class="inline-flex justify-center border-2 border-color-primary 
                                                        shadow-sm px-2 py-1 font-semibold text-base btn-primary 
                                                        focus:outline-none mt-2">
                                    {{ $t('button.save_details') }}
                                </button>
                                <button type="button" @click="clearLockerDetail" class="inline-flex justify-center border-2 border-color-gray
                                                        shadow-sm px-2 py-1 font-semibold text-base btn-outline-gray 
                                                        focus:outline-none hover:outline-none mt-2 ms-2">
                                    {{ $t('button.clear') }}
                                </button>

                                <div v-if="selected_locker_details.length > 0" class="flex flex-col">
                                    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                        <div class="py-4 inline-block min-w-full sm:px-6 lg:px-8">
                                            <div class="overflow-hidden">
                                                <table class="min-w-full text-center">
                                                    <thead class="border-b bg-gray-800">
                                                        <tr>
                                                            <th scope="col" colspan="6"
                                                                class="text-sm font-medium text-white px-6 py-4">
                                                                {{ $t('packages.list_of_locker_details') }}
                                                            </th>
                                                        </tr>
                                                    </thead>

                                                    <thead class="border-b bg-gray-200">
                                                        <tr>
                                                            <th scope="col" class="text-sm font-medium px-6 py-4">
                                                                {{ $t('packages.type') }}
                                                            </th>
                                                            <th scope="col" class="text-sm font-medium px-6 py-4">
                                                                {{ $t('packages.package') }}
                                                            </th>
                                                            <th scope="col" class="text-sm font-medium px-6 py-4">
                                                                {{ $t('packages.action') }}
                                                            </th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        <tr v-for="(selected_locker_detail, index) in selected_locker_details"
                                                            :key="index" class="bg-white border-b">
                                                            <td
                                                                class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                                {{ selected_locker_detail.locker_type_name }}
                                                            </td>
                                                            <td
                                                                class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                {{ selected_locker_detail.locker_package_name }}
                                                            </td>
                                                            <td align="center"
                                                                class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                <a @click="removeLockerDetail(index)"
                                                                    href="javascript:void(0)">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                        viewBox="0 0 24 24" stroke-width="1.5"
                                                                        stroke="currentColor" class="w-6 h-6">
                                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                                    </svg>
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="accordion-item bg-white border border-gray-200 mb-8">
                        <h2 class="accordion-header mb-0" id="heading-service-detail">
                            <button :class="selected_service_details.length > 0 ? '' : 'collapsed'"
                                class="accordion-button relative font-bold flex items-center w-full py-2 px-2 text-base color-primary text-left bg-white border rounded-none transition focus:outline-none"
                                type="button" data-bs-toggle="collapse" data-bs-target="#collapse-service-detail"
                                :aria-expanded="selected_service_details.length > 0"
                                aria-controls="collapse-service-detail">
                                {{ $t('packages.free_service_hint') }}
                            </button>
                        </h2>
                        <div id="collapse-service-detail" :class="selected_service_details.length > 0 ? 'show' : ''"
                            class="accordion-collapse collapse block" aria-labelledby="heading-service-detail">
                            <div class="accordion-body py-4 px-5">
                                <div class="mb-2">
                                    <label class="block text-gray-700 text-sm font-bold mb-2">
                                        {{ $t('packages.service_type') }} *
                                    </label>
                                    <select @change="getServicePackages($event)" v-model="service_detail.service_type_id"
                                        name="service_type_id" id="service_type_id"
                                        class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                        <option value="">{{ $t('packages.service_type_hint') }}</option>
                                        <option v-for="(service_type, index) in service_types" :key="index"
                                            :value="service_type.id">{{ service_type.name_en }}</option>
                                    </select>
                                    <span class="text-sm text-red-400" v-if="v$.service_detail.service_type_id.$error"> {{
                                        v$.service_detail.service_type_id.$errors[0].$message }}</span>
                                </div>
                                <div class="mb-2">
                                    <label class="block text-gray-700 text-sm font-bold mb-2">
                                        {{ $t('packages.service_package') }}*
                                    </label>
                                    <select name="service_package_id" id="service_package_id"
                                        v-model="service_detail.service_package_id"
                                        class="shadow border rounded w-full py-2 px-3 mt-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                        <option value="">{{ $t('packages.service_package_hint') }}</option>
                                        <option v-for="(service_package, index) in service_packages_list" :key="index"
                                            :value="service_package.id">{{ service_package.name_en }}</option>
                                    </select>
                                    <span class="text-sm text-red-400" v-if="v$.service_detail.service_package_id.$error">
                                        {{ v$.service_detail.service_package_id.$errors[0].$message }}</span>
                                </div>
                                <button type="button" @click="addNewServiceDetail" class="inline-flex justify-center border-2 border-color-primary 
                                                        shadow-sm px-2 py-1 font-semibold text-base btn-primary 
                                                        focus:outline-none mt-2">
                                    {{ $t('button.save_details') }}
                                </button>
                                <button type="button" @click="clearServiceDetail" class="inline-flex justify-center border-2 border-color-gray
                                                        shadow-sm px-2 py-1 font-semibold text-base btn-outline-gray 
                                                        focus:outline-none hover:outline-none mt-2 ms-2">
                                    {{ $t('button.clear') }}
                                </button>

                                <div v-if="selected_service_details.length > 0" class="flex flex-col">
                                    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                        <div class="py-4 inline-block min-w-full sm:px-6 lg:px-8">
                                            <div class="overflow-hidden">
                                                <table class="min-w-full text-center">
                                                    <thead class="border-b bg-gray-800">
                                                        <tr>
                                                            <th scope="col" colspan="6"
                                                                class="text-sm font-medium text-white px-6 py-4">
                                                                {{ $t('packages.list_of_service_details') }}
                                                            </th>
                                                        </tr>
                                                    </thead>

                                                    <thead class="border-b bg-gray-200">
                                                        <tr>
                                                            <th scope="col" class="text-sm font-medium px-6 py-4">
                                                                {{ $t('packages.type') }}
                                                            </th>
                                                            <th scope="col" class="text-sm font-medium px-6 py-4">
                                                                {{ $t('packages.package') }}
                                                            </th>
                                                            <th scope="col" class="text-sm font-medium px-6 py-4">
                                                                {{ $t('packages.action') }}
                                                            </th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        <tr v-for="(selected_service_detail, index) in selected_service_details"
                                                            :key="index" class="bg-white border-b">
                                                            <td
                                                                class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                                {{ selected_service_detail.service_type_name }}
                                                            </td>
                                                            <td
                                                                class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                {{ selected_service_detail.service_package_name }}
                                                            </td>
                                                            <td align="center"
                                                                class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                <a @click="removeServiceDetail(index)"
                                                                    href="javascript:void(0)">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                        viewBox="0 0 24 24" stroke-width="1.5"
                                                                        stroke="currentColor" class="w-6 h-6">
                                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                                    </svg>
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="accordion-item bg-white border border-gray-200 mb-8">
                        <h2 class="accordion-header mb-0" id="heading-lesson-detail">
                            <button :class="selected_lesson_details.length > 0 ? '' : 'collapsed'"
                                class="accordion-button relative font-bold flex items-center w-full py-2 px-2 text-base color-primary text-left bg-white border rounded-none transition focus:outline-none"
                                type="button" data-bs-toggle="collapse" data-bs-target="#collapse-lesson-detail"
                                aria-expanded="false" aria-controls="collapse-lesson-detail">
                                {{ $t('packages.add_free_lesson_opt') }}
                            </button>
                        </h2>
                        <div id="collapse-lesson-detail" :class="selected_lesson_details.length > 0 ? 'show' : ''"
                            class="accordion-collapse collapse block" aria-labelledby="heading-lesson-detail">
                            <div class="accordion-body py-4 px-5">
                                <div class="mb-2">
                                    <label class="block text-gray-700 text-sm font-bold mb-2">
                                        {{ $t('packages.lesson_type') }} *
                                    </label>
                                    <select @change="getLessonPackages($event)" v-model="lesson_detail.lesson_type_id"
                                        name="lesson_type_id" id="lesson_type_id"
                                        class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                        <option value="">{{ $t('packages.lesson_type_hint') }}</option>
                                        <option v-for="(lesson_type, index) in lesson_types" :key="index"
                                            :value="lesson_type.id">{{ lesson_type.name_en }}</option>
                                    </select>
                                    <span class="text-sm text-red-400" v-if="v$.lesson_detail.lesson_type_id.$error"> {{
                                        v$.lesson_detail.lesson_type_id.$errors[0].$message }}</span>
                                </div>
                                <div class="mb-2">
                                    <label class="block text-gray-700 text-sm font-bold mb-2">
                                        {{ $t('packages.lesson_package') }}*
                                    </label>
                                    <select name="lesson_package_id" id="lesson_package_id"
                                        v-model="lesson_detail.lesson_package_id"
                                        class="shadow border rounded w-full py-2 px-3 mt-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                        <option value="">{{ $t('packages.lesson_package_hint') }}</option>
                                        <option v-for="(lesson_package, index) in lesson_packages_list" :key="index"
                                            :value="lesson_package.id">{{ lesson_package.name_en }}</option>
                                    </select>
                                    <span class="text-sm text-red-400" v-if="v$.lesson_detail.lesson_package_id.$error"> {{
                                        v$.lesson_detail.lesson_package_id.$errors[0].$message }}</span>
                                </div>
                                <button type="button" @click="addNewLessonDetail" class="inline-flex justify-center border-2 border-color-primary 
                                                        shadow-sm px-2 py-1 font-semibold text-base btn-primary 
                                                        focus:outline-none mt-2">
                                    {{ $t('button.save_details') }}
                                </button>
                                <button type="button" @click="clearLessonDetail" class="inline-flex justify-center border-2 border-color-gray
                                                        shadow-sm px-2 py-1 font-semibold text-base btn-outline-gray 
                                                        focus:outline-none hover:outline-none mt-2 ms-2">
                                    {{ $t('button.clear') }}
                                </button>

                                <div v-if="selected_lesson_details.length > 0" class="flex flex-col">
                                    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                        <div class="py-4 inline-block min-w-full sm:px-6 lg:px-8">
                                            <div class="overflow-hidden">
                                                <table class="min-w-full text-center">
                                                    <thead class="border-b bg-gray-800">
                                                        <tr>
                                                            <th scope="col" colspan="6"
                                                                class="text-sm font-medium text-white px-6 py-4">
                                                                {{ $t('packages.list_of_lesson_details') }}
                                                            </th>
                                                        </tr>
                                                    </thead>

                                                    <thead class="border-b bg-gray-200">
                                                        <tr>
                                                            <th scope="col" class="text-sm font-medium px-6 py-4">
                                                                {{ $t('packages.type') }}
                                                            </th>
                                                            <th scope="col" class="text-sm font-medium px-6 py-4">
                                                                {{ $t('packages.package') }}
                                                            </th>
                                                            <th scope="col" class="text-sm font-medium px-6 py-4">
                                                                {{ $t('packages.action') }}
                                                            </th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        <tr v-for="(selected_lesson_detail, index) in selected_lesson_details"
                                                            :key="index" class="bg-white border-b">
                                                            <td
                                                                class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                                {{ selected_lesson_detail.lesson_type_name }}
                                                            </td>
                                                            <td
                                                                class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                {{ selected_lesson_detail.lesson_package_name }}
                                                            </td>
                                                            <td align="center"
                                                                class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                <a @click="removeLessonDetail(index)"
                                                                    href="javascript:void(0)">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                        viewBox="0 0 24 24" stroke-width="1.5"
                                                                        stroke="currentColor" class="w-6 h-6">
                                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                                    </svg>
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="mb-1.5">
                        <label class="block text-gray-700 text-sm font-bold mb-1" for="remark">
                            {{ $t('packages.remark') }}
                        </label>
                        <textarea
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="remark" rows="2" v-model="membership_package.remark" :placeholder="$t('packages.remark')" />
                    </div>
                    <div class="mb-1.5">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="is_active">
                            {{ $t('packages.is_active') }}
                        </label>
                        <label class="switch">
                            <input type="checkbox" id="is_active" v-model="membership_package.is_active"
                                :checked="membership_package.is_active">
                            <span class="slider round"></span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <!-- Buttons -->
        <div class="sm:flex sm:flex-row-reverse">
            <button v-if="!is_edit_membership_package" type="button" @click="addNewMembershipPackage()" class="w-full inline-flex justify-center border-2 border-color-primary 
                                    shadow-sm px-4 py-2 font-semibold text-base btn-outline-primary 
                                    focus:outline-none sm:ms-3 sm:w-auto sm:text-sm">
                {{ $t('button.create') }}
            </button>
            <button v-if="is_edit_membership_package" type="button" @click="updateSelectedMembershipPackage" class="w-full inline-flex justify-center border-2 border-color-primary 
                                    shadow-sm px-4 py-2 font-semibold text-base btn-outline-primary 
                                    focus:outline-none sm:ms-3 sm:w-auto sm:text-sm">
                {{ $t('button.update') }}
            </button>
            <button v-if="!is_edit_membership_package" type="button" @click="addNewMembershipPackage(true)" class="w-full inline-flex justify-center border-2 border-color-primary 
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
            todaysDate: new Date().toISOString().split('T')[0],
            membership_package: {
                id: this.$route.params.id,
                membership_category_id: '',
                membership_type_id: '',
                branch_ids: null,
                name_en: '',
                name_ar: '',
                amount: '',
                duration: '',
                start_date: '',
                end_date: '',
                min_age: '',
                freeze_quantity: '',
                total_freeze_days: '',
                lesson_type_ids: [],
                lesson_package_ids: [],
                locker_type_ids: [],
                locker_package_ids: [],
                service_type_ids: [],
                service_package_ids: [],
                remark: '',
                is_active: false
            },
            membership_types_list: [],
            selected_membership_package: [],
            lesson_packages_list: [],
            branches_list: [],
            membership_categories_list: [],
            locker_types: [],
            service_packages_list: [],
            locker_packages_list: [],
            service_types: [],
            lesson_types: [],

            locker_detail: {
                locker_type_id: '',
                locker_package_id: ''
            },
            service_detail: {
                service_type_id: '',
                service_package_id: ''
            },
            lesson_detail: {
                lesson_type_id: '',
                lesson_package_id: ''
            },

            selected_locker_details: [],
            selected_service_details: [],
            selected_lesson_details: [],

            modal_title: this.$t('packages.add_new_membership'),
            is_edit_membership_package: false
        }
    },
    validations() {
        return {
            membership_package: {
                membership_category_id: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('packages.membership_category')), required) },
                membership_type_id: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('packages.membership_type')), required) },
                branch_ids: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('master.branch')), required) },
                name_en: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('master.name_en')), required) },
                name_ar: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('master.name_ar')), required) },
                amount: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('master.amount')), required) },
                duration: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('reports.duration')), required) },
            },
            locker_detail: {
                locker_type_id: { required: helpers.withMessage(this.$root.getErrorMessage('required', 'Locker Type'), required) },
                locker_package_id: { required: helpers.withMessage(this.$root.getErrorMessage('required', 'Locker Package'), required) }
            },
            service_detail: {
                service_type_id: { required: helpers.withMessage(this.$root.getErrorMessage('required', 'Service Type'), required) },
                service_package_id: { required: helpers.withMessage(this.$root.getErrorMessage('required', 'Service Package'), required) }
            },
            lesson_detail: {
                lesson_type_id: { required: helpers.withMessage(this.$root.getErrorMessage('required', 'Lesson Type'), required) },
                lesson_package_id: { required: helpers.withMessage(this.$root.getErrorMessage('required', 'Lesson Package'), required) }
            },
        };
    },
    computed: {
        ...mapGetters(["membershipPackagesToast", "addMembershipPackageResponse", "updateMembershipPackageResponse", 'membershipPackages', 'memberShipPackageById']),
    },
    methods: {
        ...mapActions(["addMembershipPackage", "updateMembershipPackage", 'getMembershipPackages', 'getMembershipPackageById']),

        addNewLockerDetail() {
            this.v$.locker_detail.$validate();
            if (!this.v$.locker_detail.$error) {
                let selected_locker_obj = []

                this.locker_types.forEach(locker_type => {
                    if (this.locker_detail.locker_type_id == locker_type.id) {
                        selected_locker_obj.locker_type_id = this.locker_detail.locker_type_id
                        selected_locker_obj.locker_type_name = locker_type.name_en
                    }
                });

                this.locker_packages.forEach(locker_package => {
                    if (this.locker_detail.locker_package_id == locker_package.id) {
                        selected_locker_obj.locker_package_id = this.locker_detail.locker_package_id
                        selected_locker_obj.locker_package_name = locker_package.name_en
                    }
                });

                this.selected_locker_details.push(selected_locker_obj)
                this.clearLockerDetail()
                this.updateMembershipLockerDetails()
            }
        },
        addNewServiceDetail() {
            this.v$.service_detail.$validate();
            if (!this.v$.service_detail.$error) {
                let selected_service_obj = []

                this.service_types.forEach(service_type => {
                    if (this.service_detail.service_type_id == service_type.id) {
                        selected_service_obj.service_type_id = this.service_detail.service_type_id
                        selected_service_obj.service_type_name = service_type.name_en
                    }
                });

                this.service_packages.forEach(service_package => {
                    if (this.service_detail.service_package_id == service_package.id) {
                        selected_service_obj.service_package_id = this.service_detail.service_package_id
                        selected_service_obj.service_package_name = service_package.name_en
                    }
                });

                this.selected_service_details.push(selected_service_obj)
                this.clearServiceDetail()
                this.updateMembershipServiceDetails()
            }
        },
        addNewLessonDetail() {
            this.v$.lesson_detail.$validate();
            if (!this.v$.lesson_detail.$error) {
                let selected_lesson_obj = []

                this.lesson_types.forEach(lesson_type => {
                    if (this.lesson_detail.lesson_type_id == lesson_type.id) {
                        selected_lesson_obj.lesson_type_id = this.lesson_detail.lesson_type_id
                        selected_lesson_obj.lesson_type_name = lesson_type.name_en
                    }
                });

                this.lesson_packages.forEach(lesson_package => {
                    if (this.lesson_detail.lesson_package_id == lesson_package.id) {
                        selected_lesson_obj.lesson_package_id = this.lesson_detail.lesson_package_id
                        selected_lesson_obj.lesson_package_name = lesson_package.name_en
                    }
                });

                this.selected_lesson_details.push(selected_lesson_obj)
                this.clearLessonDetail()
                this.updateMembershipLessonDetails()
            }
        },

        clearLockerDetail() {
            this.locker_packages_list = []

            this.locker_detail.locker_type_id = ''
            this.locker_detail.locker_package_id = ''
            this.v$.locker_detail.$reset();
        },
        clearServiceDetail() {
            this.service_packages_list = []

            this.service_detail.service_type_id = ''
            this.service_detail.service_package_id = ''
            this.v$.service_detail.$reset();
        },
        clearLessonDetail() {
            this.lesson_packages_list = []

            this.lesson_detail.lesson_type_id = ''
            this.lesson_detail.lesson_package_id = ''
            this.v$.lesson_detail.$reset();
        },

        removeLockerDetail(index) {
            this.selected_locker_details.splice(index, 1)
            this.updateMembershipLockerDetails()
        },
        removeServiceDetail(index) {
            this.selected_service_details.splice(index, 1)
            this.updateMembershipServiceDetails()
        },
        removeLessonDetail(index) {
            this.selected_lesson_details.splice(index, 1)
            this.updateMembershipLessonDetails()
        },

        updateMembershipLockerDetails() {
            this.membership_package.locker_type_ids = []
            this.membership_package.locker_package_ids = []

            this.selected_locker_details.forEach(selected_locker_detail => {
                this.membership_package.locker_type_ids.push(selected_locker_detail.locker_type_id)
                this.membership_package.locker_package_ids.push(selected_locker_detail.locker_package_id)
            });
        },
        updateMembershipServiceDetails() {
            this.membership_package.service_type_ids = []
            this.membership_package.service_package_ids = []

            this.selected_service_details.forEach(selected_service_detail => {
                this.membership_package.service_type_ids.push(selected_service_detail.service_type_id)
                this.membership_package.service_package_ids.push(selected_service_detail.service_package_id)
            });
        },
        updateMembershipLessonDetails() {
            this.membership_package.lesson_type_ids = []
            this.membership_package.lesson_package_ids = []

            this.selected_lesson_details.forEach(selected_lesson_detail => {
                this.membership_package.lesson_type_ids.push(selected_lesson_detail.lesson_type_id)
                this.membership_package.lesson_package_ids.push(selected_lesson_detail.lesson_package_id)
            });
        },

        getLessonPackages(e) {
            let lesson_type_id = e.target.value;
            this.lesson_packages_list = [];
            this.lesson_packages.forEach(lesson_package => {
                if (lesson_package.lesson_type_id == lesson_type_id) {
                    this.lesson_packages_list.push(lesson_package);
                }
            });
        },
        getLockerPackages(e) {
            let locker_type_id = e.target.value;

            this.locker_packages_list = [];
            this.locker_packages.forEach(locker_package => {
                if (locker_package.locker_type_id == locker_type_id) {
                    this.locker_packages_list.push(locker_package);
                }
            });
        },
        getServicePackages(e) {
            let service_type_id = e.target.value;

            this.service_packages_list = [];
            this.service_packages.forEach(service_package => {
                if (service_package.service_type_id == service_type_id) {
                    this.service_packages_list.push(service_package);
                }
            });
        },

        addNewMembershipPackage(is_create_another = false) {
            this.v$.membership_package.$validate()
            if (!this.v$.membership_package.$error) {
                let start_date = this.$root.formatDateAPI(this.membership_package.start_date)
                let end_date = this.$root.formatDateAPI(this.membership_package.end_date)

                this.addMembershipPackage({
                    membership_category_id: this.membership_package.membership_category_id,
                    membership_type_id: this.membership_package.membership_type_id,
                    branch_ids: this.membership_package.branch_ids,
                    name_en: this.membership_package.name_en,
                    name_ar: this.membership_package.name_ar,
                    amount: this.membership_package.amount,
                    duration: this.membership_package.duration,
                    start_date: start_date,
                    end_date: end_date,
                    min_age: this.membership_package.min_age,
                    freeze_quantity: this.membership_package.freeze_quantity,
                    total_freeze_days: this.membership_package.total_freeze_days,
                    lesson_package_ids: this.membership_package.lesson_package_ids,
                    lesson_type_ids: this.membership_package.lesson_type_ids,
                    locker_package_ids: this.membership_package.locker_package_ids,
                    locker_type_ids: this.membership_package.locker_type_ids,
                    service_package_ids: this.membership_package.service_package_ids,
                    service_type_ids: this.membership_package.service_type_ids,
                    remark: this.membership_package.remark,
                    is_active: this.membership_package.is_active
                })
                this.create_another = is_create_another;
            }
        },
        updateSelectedMembershipPackage() {
            this.v$.membership_package.$validate()
            if (!this.v$.membership_package.$error) {
                let start_date = this.$root.formatDateAPI(this.membership_package.start_date)
                let end_date = this.$root.formatDateAPI(this.membership_package.end_date)

                this.updateMembershipPackage({
                    id: this.membership_package.id,
                    membership_category_id: this.membership_package.membership_category_id,
                    membership_type_id: this.membership_package.membership_type_id,
                    branch_ids: this.membership_package.branch_ids,
                    name_en: this.membership_package.name_en,
                    name_ar: this.membership_package.name_ar,
                    amount: this.membership_package.amount,
                    duration: this.membership_package.duration,
                    start_date: start_date,
                    end_date: end_date,
                    min_age: this.membership_package.min_age,
                    freeze_quantity: this.membership_package.freeze_quantity,
                    total_freeze_days: this.membership_package.total_freeze_days,
                    remark: this.membership_package.remark,
                    lesson_package_ids: this.membership_package.lesson_package_ids,
                    lesson_type_ids: this.membership_package.lesson_type_ids,
                    locker_package_ids: this.membership_package.locker_package_ids,
                    locker_type_ids: this.membership_package.locker_type_ids,
                    service_package_ids: this.membership_package.service_package_ids,
                    service_type_ids: this.membership_package.service_type_ids,
                    is_active: this.membership_package.is_active
                })
            }
        },
        setSelectedMembershipPackage() {
            if (this.selected_membership_package) {
                this.service_packages_list = this.service_packages
                this.locker_packages_list = this.locker_packages
                this.lesson_packages_list = this.lesson_packages

                let selected_branch_ids = [];
                for (let i = 0; i < this.selected_membership_package.branches.length; i++) {
                    selected_branch_ids.push(this.selected_membership_package.branches[i].id);
                }

                this.modal_title = this.$t('packages.update_membership');
                this.is_edit_membership_package = true;
                this.membership_package.id = this.selected_membership_package.id
                this.membership_package.membership_type_id = this.selected_membership_package.membership_type_id
                this.membership_package.membership_category_id = this.selected_membership_package.membership_category_id
                this.membership_package.branch_ids = selected_branch_ids
                this.membership_package.name_en = this.selected_membership_package?.name_en
                this.membership_package.name_ar = this.selected_membership_package?.name_ar
                this.membership_package.amount = this.selected_membership_package?.amount
                this.membership_package.duration = this.selected_membership_package?.duration
                this.membership_package.start_date = this.$root.formatDateUI(this.selected_membership_package?.start_date)
                this.membership_package.end_date = this.$root.formatDateUI(this.selected_membership_package?.end_date)
                this.membership_package.min_age = this.selected_membership_package?.min_age
                this.membership_package.freeze_quantity = this.selected_membership_package?.freeze_quantity
                this.membership_package.total_freeze_days = this.selected_membership_package?.total_freeze_days

                this.selected_membership_package?.locker_packages.forEach(locker_package => {
                    let selected_locker_obj = []
                    selected_locker_obj.locker_package_id = locker_package.id
                    selected_locker_obj.locker_type_id = locker_package.locker_type.id
                    selected_locker_obj.locker_package_name = locker_package.name_en
                    selected_locker_obj.locker_type_name = locker_package.locker_type.name_en
                    this.selected_locker_details.push(selected_locker_obj)

                    this.membership_package.locker_type_ids.push(locker_package.locker_type.id)
                    this.membership_package.locker_package_ids.push(locker_package.id)
                });

                this.selected_membership_package?.lesson_packages.forEach(lesson_package => {
                    let selected_lesson_obj = []
                    selected_lesson_obj.lesson_package_id = lesson_package.id
                    selected_lesson_obj.lesson_type_id = lesson_package.lesson_type.id
                    selected_lesson_obj.lesson_package_name = lesson_package.name_en
                    selected_lesson_obj.lesson_type_name = lesson_package.lesson_type.name_en
                    this.selected_lesson_details.push(selected_lesson_obj)

                    this.membership_package.lesson_type_ids.push(lesson_package.lesson_type.id)
                    this.membership_package.lesson_package_ids.push(lesson_package.id)
                });

                this.selected_membership_package?.service_packages.forEach(service_package => {
                    let selected_service_obj = []
                    selected_service_obj.service_package_id = service_package.id
                    selected_service_obj.service_type_id = service_package.service_type.id
                    selected_service_obj.service_package_name = service_package.name_en
                    selected_service_obj.service_type_name = service_package.service_type.name_en
                    this.selected_service_details.push(selected_service_obj)

                    this.membership_package.service_type_ids.push(service_package.service_type.id)
                    this.membership_package.service_package_ids.push(service_package.id)
                });

                this.membership_package.remark = this.selected_membership_package?.remark
                this.membership_package.is_active = this.selected_membership_package?.is_active
            } else {
                this.modal_title = this.$t('packages.add_new_membership');
                this.is_edit_membership_package = false;
            }
        }
    },
    watch: {
        membershipPackagesToast(data) {
            if (data.status) {
                this.$toast.success(data.message);
            } else {
                this.$toast.error(data.message);
            }
        },
        addMembershipPackageResponse(data) {
            if (data.status) {
                this.$toast.success(data.message);

                if (!this.create_another) {
                    this.$router.push('/memberships')
                } else {
                    this.membership_package.membership_category_id = "";
                    this.membership_package.membership_type_id = "";
                    this.membership_package.branch_ids = null;
                    this.membership_package.name_en = "";
                    this.membership_package.name_ar = "";
                    this.membership_package.amount = "";
                    this.membership_package.duration = "";
                    this.membership_package.start_date = "";
                    this.membership_package.end_date = "";
                    this.membership_package.min_age = "";
                    this.membership_package.freeze_quantity = "";
                    this.membership_package.total_freeze_days = "";
                    this.membership_package.lesson_package_ids = "";
                    this.membership_package.lesson_type_ids = "";
                    this.membership_package.locker_package_ids = "";
                    this.membership_package.locker_type_ids = "";
                    this.membership_package.service_package_ids = "";
                    this.membership_package.service_type_ids = "";
                    this.membership_package.remark = "";
                    this.membership_package.is_active = false;
                    this.v$.$reset();
                }
            } else {
                this.$toast.error(data.message);
            }
        },
        updateMembershipPackageResponse(data) {
            if (data.status) {
                this.$router.push('/memberships')
            } else {
                this.$toast.error(data.message);
            }
        },
        membershipPackages(data) {
            if (data != null) {
                this.membership_categories_list = data.membership_categories
                this.membership_types_list = data.membership_types
                this.branches_list = data.branches
                this.service_types = data.service_types
                this.service_packages = data.service_packages
                this.locker_types = data.locker_types
                this.locker_packages = data.locker_packages
                this.lesson_types = data.lesson_types
                this.lesson_packages = data.lesson_packages
            }
        },
        memberShipPackageById(data) {
            if (data) {
                this.selected_membership_package = data.membership_package_details
                this.membership_categories_list = data.membership_categories
                this.membership_types_list = data.membership_types
                
                this.branches_list = data.branches
                this.service_types = data.service_types
                this.service_packages = data.service_packages
                this.locker_types = data.locker_types
                this.locker_packages = data.locker_packages
                this.lesson_types = data.lesson_types
                this.lesson_packages = data.lesson_packages
                this.setSelectedMembershipPackage()
            }
        }
    },
    mounted() {
        if (this.membership_package.id && this.membership_package.id != 'add') {
            this.getMembershipPackageById(this.membership_package.id)
        } else {
            this.getMembershipPackages()
        }
    },
}
</script>