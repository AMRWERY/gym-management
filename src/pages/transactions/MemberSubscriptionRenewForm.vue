  <template>
    <div>
      <div class="mb-6" >
        <p class="text-3xl">{{$t('transactions.renew_member_subscription')}}</p>
      </div>

      <div class="accordion lg:w-3/4" id="accordion-member-subscription">
        <div class="bg-white border border-gray-200 mb-8">
            <h2 class="font-bold flex items-center w-full py-4 px-5 text-base color-primary text-left bg-white border-b" >
                {{$t('transactions.membership_detail')}}
            </h2>
            <div class="py-4 px-5">
                <div class="mb-2" >
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="membership_type_id">
                        {{$t('transactions.membership_type')}} *
                    </label>
                    <select @change="getMembershipPackages($event)" name="membership_type_id" id="membership_type_id" v-model="subscription.membership_type_id"
                        class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <option value="">{{$t('transactions.select_membership_type')}}</option>
                        <option v-for="(membership_type, index) in membership_types" :key="index" :value="membership_type.id">{{membership_type.name_en}}</option>
                    </select>
                    <span class="text-sm text-red-400" v-if="v$.subscription.membership_type_id.$error"> {{ v$.subscription.membership_type_id.$errors[0].$message }}</span>
                </div>

                <div class="mb-2" >
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="membership_package_id">
                        {{$t('transactions.membership_package')}} *
                    </label>
                    <select @change="setMembershipPackageAmount($event)" name="membership_package_id" id="membership_package_id" v-model="subscription.membership_package_id"
                        class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <option value="">{{$t('transactions.select_membership_package')}}</option>
                        <option v-for="(membership_package, index) in membership_packages_list" :key="index" :value="membership_package.id">{{membership_package.name_en}}</option>
                    </select>
                    <span class="text-sm text-red-400" v-if="v$.subscription.membership_package_id.$error"> {{ v$.subscription.membership_package_id.$errors[0].$message }}</span>
                </div>

                <div class="mb-2">
                    <label class="block text-gray-700 text-sm font-bold mb-1" for="p_amount">
                        {{$t('transactions.membership_package_amount')}}
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="p_amount"
                        type="text"
                        :placeholder="$t('transactions.amount')"
                        v-model="subscription.membership_package_amount"
                        disabled />
                </div>

                <div class="grid grid-cols-2 gap-2" >
                    <div>
                        <label for="start_date" class="block text-gray-700 text-sm font-bold mb-1">{{$t('transactions.start_date')}} *</label>
                        <input @change="setMembershipPackageEndDate($event)" type="date" v-model="subscription.start_date" format="dd/MM/yyyy" :placeholder="$t('transactions.start_date')" class="shadow appearance-none border rounded w-full p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        <span class="text-sm text-red-400" v-if="v$.subscription.start_date.$error"> {{ v$.subscription.start_date.$errors[0].$message }}</span>
                    </div>

                    <div>
                        <label for="end_date" class="block text-gray-700 text-sm font-bold mb-1">{{$t('transactions.expiry_date')}}</label>
                        <input type="date" disabled :min="subscription.start_date" v-model="subscription.end_date" format="dd/MM/yyyy" :placeholder="$t('transactions.expiry_date')" class="shadow p-2 appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                    </div>
                </div>
            </div>
        </div>

        <div class="accordion-item bg-white border border-gray-200 mb-8">
            <h2 class="accordion-header mb-0" id="heading-health-detail">
                <button class="accordion-button collapsed relative font-bold flex items-center w-full py-4 px-5 text-base color-primary text-left bg-white border-0 rounded-none transition focus:outline-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-health-detail" aria-expanded="false"
                    aria-controls="collapse-health-detail">
                    {{$t('transactions.health_detail_optional')}}
                </button>
            </h2>
            <div id="collapse-health-detail" class="accordion-collapse collapse" aria-labelledby="heading-health-detail">
                <div class="accordion-body py-4 px-5">
                    <div class="mb-2" >
                        <label class="block text-gray-700 text-sm font-bold mb-2">
                            {{$t('transactions.health_parameter')}} *
                        </label>
                        <select v-model="health_detail.id"
                            class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <option value="">{{$t('transactions.select_health_parameter')}}</option>
                            <option v-for="(health_parameter, index) in health_parameters" :key="index" :value="health_parameter.id">{{health_parameter.name_en}}</option>
                        </select>
                        <span class="text-sm text-red-400" v-if="v$.health_detail.id.$error"> {{ v$.health_detail.id.$errors[0].$message }}</span>
                    </div>
                    <div class="mb-2" >
                        <label class="block text-gray-700 text-sm font-bold mb-1" >
                            {{$t('transactions.value')}} *
                        </label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="number"
                            :placeholder="$t('transactions.value')"
                            v-model="health_detail.value" />
                        <span class="text-sm text-red-400" v-if="v$.health_detail.value.$error"> {{ v$.health_detail.value.$errors[0].$message }}</span>

                    </div>
                    <div class="mb-2">
                        <label for="start_date" class="block text-gray-700 text-sm font-bold mb-1">{{$t('transactions.as_on_date')}} *</label>
                        <input type="date" v-model="health_detail.as_on_date" format="dd/MM/yyyy" :placeholder="$t('transactions.as_on_date')" class="shadow appearance-none border rounded w-full p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        <span class="text-sm text-red-400" v-if="v$.health_detail.as_on_date.$error"> {{ v$.health_detail.as_on_date.$errors[0].$message }}</span>
                        
                    </div>
                    <button type="button" @click="addNewHealthDetail" 
                        class="inline-flex justify-center border-2 border-color-primary 
                            shadow-sm px-4 py-2 font-semibold text-base btn-primary 
                            focus:outline-none mt-2">
                            {{$t('button.save_details')}}
                    </button>
                    <button type="button" @click="clearHealthDetail"
                        class="inline-flex justify-center border-2 border-color-gray
                            shadow-sm px-4 py-2 font-semibold text-base btn-outline-gray 
                            focus:outline-none hover:outline-none mt-2 ms-2">
                            {{$t('button.clear')}}
                    </button>

                    <div v-if="selected_health_details.length > 0" class="flex flex-col">
                        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div class="py-4 inline-block min-w-full sm:px-6 lg:px-8">
                                <div class="overflow-hidden">
                                    <table class="min-w-full text-center">
                                        <thead class="border-b bg-gray-800">
                                            <tr>
                                                <th scope="col" colspan="4" class="text-sm font-medium text-white px-6 py-4">
                                                    {{$t('transactions.list_of_health_details')}}
                                                </th>
                                            </tr>
                                        </thead>

                                        <thead class="border-b bg-gray-200">
                                            <tr>
                                                <th scope="col" class="text-sm font-medium px-6 py-4">
                                                    {{$t('transactions.health_parameter')}}
                                                </th>
                                                <th scope="col" class="text-sm font-medium px-6 py-4">
                                                    {{$t('transactions.value')}}
                                                </th>
                                                <th scope="col" class="text-sm font-medium px-6 py-4">
                                                    {{$t('transactions.as_on_date')}}
                                                </th>
                                                <th scope="col" class="text-sm font-medium px-6 py-4">
                                                    {{$t('transactions.action')}}
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr v-for="(selected_health_detail, index) in selected_health_details" :key="index" class="bg-white border-b">
                                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {{selected_health_detail.name}}
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {{selected_health_detail.value}}
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {{selected_health_detail.as_on_date}}
                                                </td>
                                                <td align="center" class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    <a @click="removeHealthDetail(index)" href="javascript:void(0)" >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
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
            <h2 class="accordion-header mb-0" id="heading-locker-detail">
                <button :class="selected_locker_details.length > 0 ? '' : 'collapsed'" class="accordion-button relative font-bold flex items-center w-full py-4 px-5 text-base color-primary text-left bg-white border-0 rounded-none transition focus:outline-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-locker-detail" :aria-expanded="selected_locker_details.length > 0"
                    aria-controls="collapse-locker-detail">
                    {{$t('transactions.locker_detail_optional')}}
                </button>
            </h2>
            <div id="collapse-locker-detail" :class="selected_locker_details.length > 0 ? 'show' : ''" class="accordion-collapse collapse" aria-labelledby="heading-locker-detail">
                <div class="accordion-body py-4 px-5">
                    <div class="mb-2" >
                        <label class="block text-gray-700 text-sm font-bold mb-2">
                            {{$t('transactions.type')}} *
                        </label>
                        <select @change="getLockerPackages($event)" v-model="locker_detail.locker_type_id"
                            class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <option value="">{{$t('transactions.select_locker_type')}}</option>
                            <option v-for="(locker_type, index) in locker_types" :key="index" :value="locker_type.id">{{locker_type.name_en}}</option>
                        </select>
                        <span class="text-sm text-red-400" v-if="v$.locker_detail.locker_type_id.$error"> {{ v$.locker_detail.locker_type_id.$errors[0].$message }}</span>

                    </div>
                    <div class="mb-2" >
                        <label class="block text-gray-700 text-sm font-bold mb-2">
                            {{$t('transactions.package')}} *
                        </label>
                        <select @change="setLockerPackageAmount($event)" v-model="locker_detail.locker_package_id"
                            class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <option value="">{{$t('transactions.select_locker_package')}}</option>
                            <option v-for="(locker_package, index) in locker_packages_list" :key="index" :value="locker_package.id">{{locker_package.name_en}}</option>
                        </select>
                        <span class="text-sm text-red-400" v-if="v$.locker_detail.locker_package_id.$error"> {{ v$.locker_detail.locker_package_id.$errors[0].$message }}</span>
                    </div>
                    <div class="mb-2" >
                        <label class="block text-gray-700 text-sm font-bold mb-2">
                            {{$t('transactions.locker')}} *
                        </label>
                        <select v-model="locker_detail.locker_id"
                            class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <option value="">{{$t('transactions.select_locker')}}</option>
                            <option v-for="(locker, index) in lockers_list" :key="index" :value="locker.id">{{locker.name_en}}</option>
                        </select>
                        <span class="text-sm text-red-400" v-if="v$.locker_detail.locker_id.$error"> {{ v$.locker_detail.locker_id.$errors[0].$message }}</span>
                    </div>
                    <div class="grid grid-cols-2 gap-2 mb-2" >
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-1" >
                                {{$t('transactions.amount')}}
                            </label>
                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="number"
                                :placeholder="$t('transactions.amount')"
                                disabled
                                v-model="locker_detail.locker_amount" />
                        </div>
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-1" >
                                {{$t('transactions.insurance')}}
                            </label>
                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="number"
                                :placeholder="$t('transactions.insurance_amount')"
                                disabled
                                v-model="locker_detail.locker_insurance_amount" />
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-2 mb-2" >
                        <div>
                            <label for="start_date" class="block text-gray-700 text-sm font-bold mb-1">{{$t('transactions.start_date')}} *</label>
                            <input @change="setLockerPackageEndDate($event)" type="date" v-model="locker_detail.start_date" format="dd/MM/yyyy" :placeholder="$t('transactions.start_date')" class="shadow appearance-none border rounded w-full p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                            <span class="text-sm text-red-400" v-if="v$.locker_detail.start_date.$error"> {{ v$.locker_detail.start_date.$errors[0].$message }}</span>
                        </div>

                        <div>
                            <label for="end_date" class="block text-gray-700 text-sm font-bold mb-1">{{$t('transactions.expiry_date')}}</label>
                            <input type="date" disabled :min="locker_detail.start_date" v-model="locker_detail.end_date" format="dd/MM/yyyy" :placeholder="$t('transactions.expiry_date')" class="shadow p-2 appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        </div>
                    </div>
                    <button type="button" @click="addNewLockerDetail" 
                        class="inline-flex justify-center border-2 border-color-primary 
                            shadow-sm px-4 py-2 font-semibold text-base btn-primary 
                            focus:outline-none mt-2">
                            {{$t('button.save_details')}}
                    </button>
                    <button type="button" @click="clearLockerDetail"
                        class="inline-flex justify-center border-2 border-color-gray
                            shadow-sm px-4 py-2 font-semibold text-base btn-outline-gray 
                            focus:outline-none hover:outline-none mt-2 ms-2">
                            {{$t('button.clear')}}
                    </button>

                    <div v-if="selected_locker_details.length > 0" class="flex flex-col">
                        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div class="py-4 inline-block min-w-full sm:px-6 lg:px-8">
                                <div class="overflow-hidden">
                                    <table class="min-w-full text-center">
                                        <thead class="border-b bg-gray-800">
                                            <tr>
                                                <th scope="col" colspan="6" class="text-sm font-medium text-white px-6 py-4">
                                                    {{$t('transactions.list_of_locker_details')}}
                                                </th>
                                            </tr>
                                        </thead>

                                        <thead class="border-b bg-gray-200">
                                            <tr>
                                                <th scope="col" class="text-sm font-medium px-6 py-4">
                                                    {{$t('transactions.type')}}
                                                </th>
                                                <th scope="col" class="text-sm font-medium px-6 py-4">
                                                    {{$t('transactions.package')}}
                                                </th>
                                                <th scope="col" class="text-sm font-medium px-6 py-4">
                                                    {{$t('transactions.locker')}}
                                                </th>
                                                <th scope="col" class="text-sm font-medium px-6 py-4">
                                                    {{$t('transactions.amount')}}
                                                </th>
                                                <th scope="col" class="text-sm font-medium px-6 py-4">
                                                    {{$t('transactions.insurance')}}
                                                </th>
                                                <th scope="col" class="text-sm font-medium px-6 py-4">
                                                    {{$t('transactions.action')}}
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr v-for="(selected_locker_detail, index) in selected_locker_details" :key="index" class="bg-white border-b">
                                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {{selected_locker_detail.locker_type_name}}
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {{selected_locker_detail.locker_package_name}}
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {{selected_locker_detail.locker_name}}
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {{selected_locker_detail.locker_amount}}
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {{selected_locker_detail.locker_insurance_amount}}
                                                </td>
                                                <td align="center" class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    <a @click="removeLockerDetail(index)" href="javascript:void(0)" >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
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
                <button :class="selected_service_details.length > 0 ? '' : 'collapsed'" class="accordion-button relative font-bold flex items-center w-full py-4 px-5 text-base color-primary text-left bg-white border-0 rounded-none transition focus:outline-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-service-detail" :aria-expanded="selected_service_details.length > 0"
                    aria-controls="collapse-service-detail">
                    {{$t('transactions.service_detail_optional')}}
                </button>
            </h2>
            <div id="collapse-service-detail" :class="selected_service_details.length > 0 ? 'show' : ''" class="accordion-collapse collapse" aria-labelledby="heading-service-detail">
                <div class="accordion-body py-4 px-5">
                    <div class="mb-2" >
                        <label class="block text-gray-700 text-sm font-bold mb-2">
                            {{$t('transactions.type')}} *
                        </label>
                        <select @change="getServicePackages($event)" v-model="service_detail.service_type_id"
                            class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <option value="">{{$t('transactions.select_service_type')}}</option>
                            <option v-for="(service_type, index) in service_types" :key="index" :value="service_type.id">{{service_type.name_en}}</option>
                        </select>
                        <span class="text-sm text-red-400" v-if="v$.service_detail.service_type_id.$error"> {{ v$.service_detail.service_type_id.$errors[0].$message }}</span>
                    </div>
                    <div class="mb-2" >
                        <label class="block text-gray-700 text-sm font-bold mb-2">
                            {{$t('transactions.package')}} *
                        </label>
                        <select @change="setServicePackageAmount($event)" v-model="service_detail.service_package_id"
                            class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <option value="">{{$t('transactions.select_service_package')}}</option>
                            <option v-for="(service_package, index) in service_packages_list" :key="index" :value="service_package.id">{{service_package.name_en}}</option>
                        </select>
                        <span class="text-sm text-red-400" v-if="v$.service_detail.service_package_id.$error"> {{ v$.service_detail.service_package_id.$errors[0].$message }}</span>
                    </div>
                    <div class="mb-2" >
                        <label class="block text-gray-700 text-sm font-bold mb-1" >
                            {{$t('transactions.amount')}}
                        </label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="number"
                            :placeholder="$t('transactions.amount')"
                            disabled
                            v-model="service_detail.service_amount" />
                    </div>
                    <div class="grid grid-cols-2 gap-2 mb-2" >
                        <div>
                            <label for="start_date" class="block text-gray-700 text-sm font-bold mb-1">{{$t('transactions.start_date')}} *</label>
                            <input @change="setServicePackageEndDate($event)" type="date" v-model="service_detail.start_date" format="dd/MM/yyyy" :placeholder="$t('transactions.start_date')" class="shadow appearance-none border rounded w-full p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                            <span class="text-sm text-red-400" v-if="v$.service_detail.start_date.$error"> {{ v$.service_detail.start_date.$errors[0].$message }}</span>
                        </div>

                        <div>
                            <label for="end_date" class="block text-gray-700 text-sm font-bold mb-1">{{$t('transactions.expiry_date')}}</label>
                            <input type="date" disabled :min="service_detail.start_date" v-model="service_detail.end_date" format="dd/MM/yyyy" :placeholder="$t('transactions.expiry_date')" class="shadow p-2 appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        </div>
                    </div>
                    <button type="button" @click="addNewServiceDetail" 
                        class="inline-flex justify-center border-2 border-color-primary 
                            shadow-sm px-4 py-2 font-semibold text-base btn-primary 
                            focus:outline-none mt-2">
                            {{$t('button.save_details')}}
                    </button>
                    <button type="button" @click="clearServiceDetail"
                        class="inline-flex justify-center border-2 border-color-gray
                            shadow-sm px-4 py-2 font-semibold text-base btn-outline-gray 
                            focus:outline-none hover:outline-none mt-2 ms-2">
                            {{$t('button.clear')}}
                    </button>

                    <div v-if="selected_service_details.length > 0" class="flex flex-col">
                        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div class="py-4 inline-block min-w-full sm:px-6 lg:px-8">
                                <div class="overflow-hidden">
                                    <table class="min-w-full text-center">
                                        <thead class="border-b bg-gray-800">
                                            <tr>
                                                <th scope="col" colspan="6" class="text-sm font-medium text-white px-6 py-4">
                                                    {{$t('transactions.list_of_service_details')}}
                                                </th>
                                            </tr>
                                        </thead>

                                        <thead class="border-b bg-gray-200">
                                            <tr>
                                                <th scope="col" class="text-sm font-medium px-6 py-4">
                                                    {{$t('transactions.type')}}
                                                </th>
                                                <th scope="col" class="text-sm font-medium px-6 py-4">
                                                    {{$t('transactions.package')}}
                                                </th>
                                                <th scope="col" class="text-sm font-medium px-6 py-4">
                                                    {{$t('transactions.amount')}}
                                                </th>
                                                <th scope="col" class="text-sm font-medium px-6 py-4">
                                                    {{$t('transactions.action')}}
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr v-for="(selected_service_detail, index) in selected_service_details" :key="index" class="bg-white border-b">
                                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {{selected_service_detail.service_type_name}}
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {{selected_service_detail.service_package_name}}
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {{selected_service_detail.service_amount}}
                                                </td>
                                                <td align="center" class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    <a @click="removeServiceDetail(index)" href="javascript:void(0)" >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
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
                <button :class="selected_lesson_details.length > 0 ? '' : 'collapsed'" class="accordion-button collapsed relative font-bold flex items-center w-full py-4 px-5 text-base color-primary text-left bg-white border-0 rounded-none transition focus:outline-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-lesson-detail" :aria-expanded="selected_lesson_details.length > 0"
                    aria-controls="collapse-lesson-detail">
                    {{$t('transactions.lesson_detail_optional')}}
                </button>
            </h2>
            <div id="collapse-lesson-detail" :class="selected_lesson_details.length > 0 ? 'show' : ''" class="accordion-collapse collapse" aria-labelledby="heading-lesson-detail">
                <div class="accordion-body py-4 px-5">
                    <div class="mb-2" >
                        <label class="block text-gray-700 text-sm font-bold mb-2">
                            {{$t('transactions.type')}} *
                        </label>
                        <select @change="getLessonPackages($event)" v-model="lesson_detail.lesson_type_id"
                            class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <option value="">{{$t('transactions.select_lesson_type')}}</option>
                            <option v-for="(lesson_type, index) in lesson_types" :key="index" :value="lesson_type.id">{{lesson_type.name_en}}</option>
                        </select>
                        <span class="text-sm text-red-400" v-if="v$.lesson_detail.lesson_type_id.$error"> {{ v$.lesson_detail.lesson_type_id.$errors[0].$message }}</span>
                    </div>
                    <div class="mb-2" >
                        <label class="block text-gray-700 text-sm font-bold mb-2">
                            {{$t('transactions.package')}} *
                        </label>
                        <select @change="setLessonPackageAmount($event)" v-model="lesson_detail.lesson_package_id"
                            class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <option value="">{{$t('transactions.select_lesson_package')}}</option>
                            <option v-for="(lesson_package, index) in lesson_packages_list" :key="index" :value="lesson_package.id">{{lesson_package.name_en}}</option>
                        </select>
                        <span class="text-sm text-red-400" v-if="v$.lesson_detail.lesson_package_id.$error"> {{ v$.lesson_detail.lesson_package_id.$errors[0].$message }}</span>
                    </div>
                    <div class="grid grid-cols-2 gap-2 mb-2" >
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-1" >
                                {{$t('transactions.amount')}}
                            </label>
                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="number"
                                :placeholder="$t('transactions.amount')"
                                disabled
                                v-model="lesson_detail.lesson_amount" />
                        </div>
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-1" >
                                {{$t('transactions.class')}}
                            </label>
                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="number"
                                :placeholder="$t('transactions.class')"
                                disabled
                                v-model="lesson_detail.no_of_classes" />
                        </div>
                    </div>
                    <div class="mb-2" >
                        <label class="block text-gray-700 text-sm font-bold mb-2">
                            {{$t('transactions.trainer')}} *
                        </label>
                        <select v-model="lesson_detail.lesson_trainer_id"
                            class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <option value="">{{$t('transactions.select_trainer')}}</option>
                            <option v-for="(trainer, index) in trainers" :key="index" :value="trainer.id">{{trainer.name}}</option>
                        </select>
                        <span class="text-sm text-red-400" v-if="v$.lesson_detail.lesson_trainer_id.$error"> {{ v$.lesson_detail.lesson_trainer_id.$errors[0].$message }}</span>
                    </div>
                    <div class="grid grid-cols-2 gap-2 mb-2" >
                        <div>
                            <label for="start_date" class="block text-gray-700 text-sm font-bold mb-1">{{$t('transactions.start_date')}} *</label>
                            <input @change="setLessonPackageEndDate($event)" type="date" v-model="lesson_detail.start_date" format="dd/MM/yyyy" :placeholder="$t('transactions.start_date')" class="shadow appearance-none border rounded w-full p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                            <span class="text-sm text-red-400" v-if="v$.lesson_detail.start_date.$error"> {{ v$.lesson_detail.start_date.$errors[0].$message }}</span>
                        </div>
                        <div>
                            <label for="end_date" class="block text-gray-700 text-sm font-bold mb-1">{{$t('transactions.expiry_date')}}</label>
                            <input type="date" disabled :min="lesson_detail.start_date" v-model="lesson_detail.end_date" format="dd/MM/yyyy" :placeholder="$t('transactions.expiry_date')" class="shadow p-2 appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        </div>
                    </div>
                    <button type="button" @click="addNewLessonDetail" 
                        class="inline-flex justify-center border-2 border-color-primary 
                            shadow-sm px-4 py-2 font-semibold text-base btn-primary 
                            focus:outline-none mt-2">
                            {{$t('button.save_details')}}
                    </button>
                    <button type="button" @click="clearLessonDetail"
                        class="inline-flex justify-center border-2 border-color-gray
                            shadow-sm px-4 py-2 font-semibold text-base btn-outline-gray 
                            focus:outline-none hover:outline-none mt-2 ms-2">
                            {{$t('button.clear')}}
                    </button>

                    <div v-if="selected_lesson_details.length > 0" class="flex flex-col">
                        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div class="py-4 inline-block min-w-full sm:px-6 lg:px-8">
                                <div class="overflow-hidden">
                                    <table class="min-w-full text-center">
                                        <thead class="border-b bg-gray-800">
                                            <tr>
                                                <th scope="col" colspan="5" class="text-sm font-medium text-white px-6 py-4">
                                                    {{$t('transactions.list_of_lesson_details')}}
                                                </th>
                                            </tr>
                                        </thead>

                                        <thead class="border-b bg-gray-200">
                                            <tr>
                                                <th scope="col" class="text-sm font-medium px-6 py-4">
                                                    {{$t('transactions.type')}}
                                                </th>
                                                <th scope="col" class="text-sm font-medium px-6 py-4">
                                                    {{$t('transactions.package')}}
                                                </th>
                                                <th scope="col" class="text-sm font-medium px-6 py-4">
                                                    {{$t('transactions.no_of_classes')}}
                                                </th>
                                                <th scope="col" class="text-sm font-medium px-6 py-4">
                                                    {{$t('transactions.amount')}}
                                                </th>
                                                <th scope="col" class="text-sm font-medium px-6 py-4">
                                                    {{$t('transactions.action')}}
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr v-for="(selected_lesson_detail, index) in selected_lesson_details" :key="index" class="bg-white border-b">
                                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {{selected_lesson_detail.lesson_type_name}}
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {{selected_lesson_detail.lesson_package_name}}
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {{selected_lesson_detail.no_of_classes}}
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {{selected_lesson_detail.lesson_amount}}
                                                </td>
                                                <td align="center" class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    <a @click="removeLessonDetail(index)" href="javascript:void(0)" >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
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

        <div class="bg-white border border-gray-200 mb-8">
            <h2 class="font-bold flex items-center w-full py-4 px-5 text-base color-primary text-left bg-white border-b" >
                {{$t('transactions.payment_detail')}}
            </h2>
            <div class="py-4 px-5">
                <div class="mb-2" >
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="payment_type_id">
                        {{$t('transactions.payment_type')}} *
                    </label>
                    <select v-model="payment_detail.payment_type_id"
                        class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <option value="">{{$t('transactions.select_payment_type')}}</option>
                        <option v-for="(payment_type, index) in payment_types" :key="index" :value="payment_type.id">{{payment_type.name_en}}</option>
                    </select>
                    <span class="text-sm text-red-400" v-if="v$.payment_detail.payment_type_id.$error"> {{ v$.payment_detail.payment_type_id.$errors[0].$message }}</span>
                </div>

                <div class="mb-2">
                    <label class="block text-gray-700 text-sm font-bold mb-1">
                        {{$t('transactions.amount')}} *
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="p_amount"
                        type="text"
                        :placeholder="$t('transactions.amount')"
                        v-model="payment_detail.amount" />
                    <span class="text-sm text-red-400" v-if="v$.payment_detail.amount.$error"> {{ v$.payment_detail.amount.$errors[0].$message }}</span>
                </div>
                
                <div class="mb-1.5">
                    <label class="block text-gray-700 text-sm font-bold mb-1">
                        {{$t('transactions.remark')}} 
                    </label>
                    <textarea class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        rows="2"
                        v-model="payment_detail.remark"
                        :placeholder="$t('transactions.remark')" />
                </div>

                <button type="button" @click="addNewPaymentDetail" 
                    class="inline-flex justify-center border-2 border-color-primary 
                        shadow-sm px-4 py-2 font-semibold text-base btn-primary 
                        focus:outline-none mt-2">
                        {{$t('button.save_details')}}
                </button>
                <button type="button" @click="clearPaymentDetail"
                    class="inline-flex justify-center border-2 border-color-gray
                        shadow-sm px-4 py-2 font-semibold text-base btn-outline-gray 
                        focus:outline-none hover:outline-none mt-2 ms-2">
                        {{$t('button.clear')}}
                </button>

                <div v-if="selected_payment_details.length > 0" class="flex flex-col">
                    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="py-4 inline-block min-w-full sm:px-6 lg:px-8">
                            <div class="overflow-hidden">
                                <table class="min-w-full text-center">
                                    <thead class="border-b bg-gray-800">
                                        <tr>
                                            <th scope="col" colspan="4" class="text-sm font-medium text-white px-6 py-4">
                                                {{$t('transactions.list_of_payment_details')}}
                                            </th>
                                        </tr>
                                    </thead>

                                    <thead class="border-b bg-gray-200">
                                        <tr>
                                            <th scope="col" class="text-sm font-medium px-6 py-4">
                                                {{$t('transactions.payment_type')}}
                                            </th>
                                            <th scope="col" class="text-sm font-medium px-6 py-4">
                                                {{$t('transactions.amount')}}
                                            </th>
                                            <th scope="col" class="text-sm font-medium px-6 py-4">
                                                {{$t('transactions.remark')}}
                                            </th>
                                            <th scope="col" class="text-sm font-medium px-6 py-4">
                                                {{$t('transactions.action')}}
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr v-for="(selected_payment_detail, index) in selected_payment_details" :key="index" class="bg-white border-b">
                                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {{selected_payment_detail.payment_type_name}}
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {{selected_payment_detail.amount}}
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {{selected_payment_detail.remark}}
                                            </td>
                                            <td align="center" class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                <a @click="removePaymentDetail(index)" href="javascript:void(0)" >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
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

        <div class="bg-white border border-gray-200">
            <h2 class="font-bold flex items-center w-full py-4 px-5 text-base color-primary text-left bg-white border-b" >
                {{$t('transactions.subscription_summary')}}
            </h2>
            <div class="py-4 px-5">
                <div class="mb-4" >
                    <div>
                        <select @change="updateDiscount($event)" name="discount_id" id="discount_id" v-model="subscription.discount_id"
                            class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <option value="">{{$t('transactions.select_discount')}}</option>
                            <option v-for="(discount, index) in discounts" :key="index" :value="discount.id">{{discount.name_en}}</option>
                        </select>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-2 mb-2 border-b mb-4 pb-4" >
                    <div v-if="subscription.total_membership_amount > 0" >
                        <label class="block text-gray-700 text-sm font-bold mb-2" >
                            {{$t('transactions.member_package_amount')}}: {{subscription.total_membership_amount.toFixed(3)}}
                        </label>
                    </div>
                    <div v-if="subscription.total_locker_amount > 0" >
                        <label class="block text-gray-700 text-sm font-bold mb-2" >
                            {{$t('transactions.locker_amount')}}: {{subscription.total_locker_amount.toFixed(3)}}
                        </label>
                    </div>
                    <div v-if="subscription.total_insurance_amount > 0" >
                        <label class="block text-gray-700 text-sm font-bold mb-2" >
                            {{$t('transactions.insurance_amount')}}: {{subscription.total_insurance_amount.toFixed(3)}}
                        </label>
                    </div>
                    <div v-if="subscription.total_lesson_amount > 0" >
                        <label class="block text-gray-700 text-sm font-bold mb-2" >
                            {{$t('transactions.lesson_amount')}}: {{subscription.total_lesson_amount.toFixed(3)}}
                        </label>
                    </div>
                    <div v-if="subscription.total_service_amount > 0" >
                        <label class="block text-gray-700 text-sm font-bold mb-2" >
                            {{$t('transactions.service_amount')}}: {{subscription.total_service_amount.toFixed(3)}}
                        </label>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-2 mb-2">
                    <div>
                        <label class="block text-gray-700 text-sm font-bold mb-2" >
                            {{$t('transactions.sub_total_amount')}}: {{sub_total_amount.toFixed(3)}}
                        </label>
                    </div>
                    <div>
                        <label class="block text-gray-700 text-sm font-bold mb-2" >
                            {{$t('transactions.discount_amount')}}: {{subscription.discount_amount.toFixed(3)}}
                        </label>
                    </div>
                    <div>
                        <label class="block text-gray-700 text-sm font-bold mb-2" >
                            {{$t('transactions.total_amount')}}: {{total_amount.toFixed(3)}}
                        </label>
                    </div>                    
                    <div>
                        <label class="block text-gray-700 text-sm font-bold mb-2 text-success" >
                            {{$t('transactions.total_amount_paid')}}: {{total_amount_paid.toFixed(3)}}
                        </label>
                    </div>
                    <div>
                        <label class="block text-gray-700 text-sm font-bold mb-2 text-danger" >
                            {{$t('transactions.amount_remaining')}}: {{total_remaining_amount.toFixed(3)}}
                        </label>
                    </div>
                </div>
                
            </div>
        </div>


        <div class="bg-white py-4 px-3 border border-gray-200 mb-8 grid">
            <button type="button" @click="addNewSubscription()" 
                class="w-full justify-center border-2 border-color-primary 
                    shadow-sm px-4 py-2 font-semibold text-base btn-primary 
                    focus:outline-none sm:w-auto sm:text-sm">
                    {{$t('button.create_new_subscription')}}
            </button>
        </div>
      </div>
    </div> 
  </template>
  
  <script src="./memberSubscriptionRenewForm.js"/>