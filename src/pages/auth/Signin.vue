<template>
  <div class="full-screen bg-light-grey">
    <div class="login center">
      <img class="h-20 mx-auto" src="@/assets/logo.png"/>
      <h1 class="text-left text-3xl">Login</h1>
      <br />
      <form>
        <div>
          <label><b>{{ $t('auth.email_address') }}</b> </label>
        </div>
        <input type="email" v-model="user.email" name="email" id="auth-email" :placeholder="$t('auth.email_address')" />
        <br/><span class="text-sm text-red-400" v-if="v$.user.email.$error"> {{ v$.user.email.$errors[0].$message }}</span>
        <br/>

        <div>
          <label><b>{{ $t('auth.password') }} </b> </label>
        </div>
        <input type="Password" v-model="user.password" name="Pass" id="auth-pass" :placeholder="$t('auth.password')" @keyup.enter="userLogin()"/>
        <br/><span class="text-sm text-red-400" v-if="v$.user.password.$error"> {{ v$.user.password.$errors[0].$message }}</span>
        <br/>

        <div class="text-right color-primary">
          <span><router-link to="/forgot-password"><b>{{ $t('auth.forgot_your_password') }}</b></router-link></span>
        </div>

        <button class="btn-primary" @click="userLogin()" type="button" id="auth-login">{{ $t('auth.login') }}</button>
        <br/><br/>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import useValidate from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";

export default {
  name: "Signin",
  data() {
    return {
      v$: useValidate(),
      user: {
        email: "",
        password: ""
      }
    }
  },
  validations() {
      return {
        user: {
          email: { required: helpers.withMessage(this.$root.getErrorMessage('required', 'Email'), required), email: helpers.withMessage(this.$root.getErrorMessage('email', 'Email'), email) },
          password: { required: helpers.withMessage(this.$root.getErrorMessage('required', 'Password'), required) }
        }
    };
  },
  computed: {
    ...mapGetters(["adminUser"]),
  },
  watch: {
    adminUser(data) {
      this.adminUser = data;
      if(this.adminUser.status) {
        this.$toast.success(data.message);
        window.location.reload()
      } else {
        this.$toast.error(data.message);
      }
    }
  },
  methods: {
    ...mapActions(["login"]),

    userLogin() {
      this.v$.$validate();
      if(!this.v$.$error) {
        this.login({
          email: this.user.email,
          password: this.user.password
        });
      }
    }
  }
};
</script>