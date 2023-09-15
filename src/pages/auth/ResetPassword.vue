<template>
    <div class="full-screen bg-light-grey">
        <div class="login center">
            <img class="h-20 mx-auto" src="@/assets/logo.png"/>
            <h1 class="text-left text-3xl">{{ $t("auth.reset_password") }}</h1>
            <br />
            <form autocomplete="off">
                <div>
                    <label><b>{{ $t("auth.email_address") }}</b> </label>
                </div>
                <input type="email" v-model="admin_email" name="email" id="auth-email" :placeholder="$t('auth.email_address')" disabled/>
                <br/><span class="text-sm text-red-400" v-if="v$.admin_email.$error"> {{ v$.admin_email.$errors[0].$message }}</span>
                <br/>

                <div>
                    <label><b>{{ $t("auth.password") }} </b> </label>
                </div>
                <input type="Password" v-model="password" name="Pass" id="auth-pass" :placeholder="$t('auth.password')" @keyup.enter="resetPassword()"/>
                <br/><span class="text-sm text-red-400" v-if="v$.password.$error"> {{ v$.password.$errors[0].$message }}</span>
                <br/>

                <div>
                    <label><b>{{ $t('auth.confirm_password') }} </b> </label>
                </div>
                <input type="Password" v-model="password_confirmation" name="ConfirmPass" id="auth-confirm-pass" :placeholder="$t('auth.confirm_password')" @keyup.enter="resetPassword()"/>
                <br/><span class="text-sm text-red-400" v-if="v$.password_confirmation.$error"> {{ v$.password_confirmation.$errors[0].$message }}</span>
                <br/>

                <button class="btn-primary" @click="resetPassword()" @keyup.enter="resetPassword()" type="button" id="reset-password">{{ $t("auth.reset_password") }}</button>
                <br/>
            </form>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import useValidate from "@vuelidate/core";
import { required, minLength, sameAs, requiredIf, email, helpers } from "@vuelidate/validators";

export default {
    data() {
        return {
            v$: useValidate(),
            token: this.$route.query.token,
            admin_email: this.$route.query.email,
            password: "",
            password_confirmation: ""
        }
    },
    validations() {
        return {
            admin_email: { required: helpers.withMessage(this.$root.getErrorMessage('required', 'Email'), required), email: helpers.withMessage(this.$root.getErrorMessage('email', 'Email'), email) },
            password: { required: helpers.withMessage(this.$root.getErrorMessage('required', 'Password'), required), minLength: helpers.withMessage(this.$root.getLengthErrorMessage('min', 'Password', 8), minLength(8)) },
            password_confirmation: { required: helpers.withMessage(this.$root.getErrorMessage('required', 'Confirm password'), required),  requiredIf: requiredIf(()=> { return this.password }), sameAsPassword: helpers.withMessage("Passwords do not match", sameAs(this.password)) }
        };
    },
    computed: {
        ...mapGetters(["updatePasswordResponse"]),
    },
    methods: {
        ...mapActions(["updadePassword"]),

        resetPassword() {
            this.v$.$validate()
            if(!this.v$.$error) {
                this.updadePassword({
                    token: this.token,
                    password: this.password,
                    password_confirmation: this.password_confirmation,
                    email: this.admin_email
                });
            }
        }
    },
    watch: {
        updatePasswordResponse(data) {
            if(data.status) {
                this.$toast.success(data.message);
                this.$router.push('/login');
            } else {
                this.$toast.error(data.message);
            }
        }
    },
    mounted() {

    },
}
</script>