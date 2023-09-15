<template>
  <div id="update-password-modal" class="mt-7 fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0" >
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

      <div class="inline-block align-bottom bg-white text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full ms-64">
        <form class="rounded px-8 pt-6 mb-4">
            <tw-icon @click="$emit('close-modal')" name="heroicons-outline:x" class="w-6 h-6 text-gray-400 ms-auto cursor-pointer"/>
            <div class="bg-white px-4 pt-5 pb-2 sm:p-0">
              <h1 class="text-2xl text-center leading-6 font-medium text-gray-900">{{ $t('auth.update_password') }}</h1>

              <div class="mb-1.5 mt-4">
                <label class="block text-gray-700 text-sm font-bold mb-1" for="old-pass">
                  {{ $t('auth.old_password') }} *
                </label>
                <input type="Password" v-model="password" name="oldpass" id="old-pass" :placeholder="$t('auth.old_password')"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                <span class="text-sm text-red-400" v-if="v$.password.$error"> {{ v$.password.$errors[0].$message }}</span>
              </div>

              <div class="mb-1.5">
                <label class="block text-gray-700 text-sm font-bold mb-1" for="new-pass">
                  {{ $t('auth.new_password') }} *
                </label>
                <input type="Password" v-model="new_password" name="newpass" id="new-pass" :placeholder="$t('auth.new_password')" 
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                  <span class="text-sm text-red-400" v-if="v$.new_password.$error"> {{ v$.new_password.$errors[0].$message }}</span>
              </div>

              <div class="mb-1.5">
                <label class="block text-gray-700 text-sm font-bold mb-1" for="confirm-pass">
                  {{ $t('auth.confirm_password') }} *
                </label>
                <input type="Password" v-model="confirm_password" name="newpass" id="confirm-pass" :placeholder="$t('auth.confirm_password')" 
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                  <span class="text-sm text-red-400" v-if="v$.confirm_password.$error"> {{ v$.confirm_password.$errors[0].$message }}</span>
              </div>

              <div class="sm:flex sm:flex-row-reverse mt-4">
                <button type="button" @click="onUpdatePassword" 
                  class="w-full inline-flex justify-center border-2 border-color-primary 
                    shadow-sm px-4 py-2 font-semibold text-base btn-outline-primary 
                    focus:outline-none sm:ms-3 sm:w-auto sm:text-sm">
                  {{ $t("button.update") }}
                </button>
                <button type="button" @click="$emit('close-modal')"
                  class="w-full inline-flex justify-center border-2 border-color-primary 
                    shadow-sm px-4 py-2 font-semibold text-base btn-outline-primary 
                    focus:outline-none sm:ms-3 sm:w-auto sm:text-sm">
                  {{ $t("button.cancel") }}
                </button>
              </div>

            </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import useValidate from "@vuelidate/core";
import { required, minLength, sameAs, helpers } from "@vuelidate/validators";

export default {
  name: "UpdatePassword",
  data() {
    return {
      v$: useValidate(),
      password: "",
      new_password: "",
      confirm_password: ""
    }
  },
  validations() {
    return {
      password: { required: helpers.withMessage(this.$root.getErrorMessage('required', 'Old password'), required) },
      new_password: { required: helpers.withMessage(this.$root.getErrorMessage('required', 'Password'), required), minLength: helpers.withMessage(this.$root.getLengthErrorMessage('min', 'Password', 8), minLength(8)) },
      confirm_password: { required: helpers.withMessage(this.$root.getErrorMessage('required', 'Confirm password'), required), sameAsPassword: helpers.withMessage("Passwords do not match", sameAs(this.new_password)) }
    }
  },
  computed: {
    ...mapGetters(["changePasswordResponse"])
  },

  methods: {
    ...mapActions(["changePassword"]),

    onUpdatePassword() {
      this.v$.$validate()
      if(!this.v$.$error) {
        this.changePassword({
          email: JSON.parse(localStorage.getItem("userInfo"))?.user.email,
          old_password: this.password,
          password: this.new_password,
          password_confirmation: this.confirm_password
        })
      }
    }
  },

  watch: {
    changePasswordResponse(data) {
      if(data.status) {
        this.$toast.success(data.message);
        this.$emit('close-modal')
      } else {
        this.$toast.error(data.message);
      }
    }
  }
};
</script>