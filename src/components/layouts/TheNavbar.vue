<template>
  <div
    class="fixed z-20 top-0 h-14 bg-white border-b border-gray-200 flex flex-row items-center justify-between px-5"
      :class="language == 'en' ? 'left-0 lg:left-64 right-0' : 'right-0 lg:right-64 left-0'">
    <h3 class="text-sm font-medium text-gray-600">{{ getUserRole() }}</h3>
    <div class="flex items-center">
      <div class="cursor-pointer font-semibold"  @click="switchLanguage">
        {{ $t('app.language') }}
      </div>
      <tw-dropdown class="ms-3 rounded-xl p-2 border-1 border-black" origin="right" body-class="top-8 border-none">
        <div class="flex items-center cursor-pointer">
          <span class="me-1">{{ getSelectedBranchName() }}</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>

        </div>
        <template #body>
          <ul>
            <li v-for="(branch, index) in branches" :key="index" @click="selectBranch(branch)" class="px-4 py-2 border cursor-pointer profile-links">
              {{language == 'ar' ? branch.name_ar : branch.name_en}}
            </li>
          </ul>
        </template>
      </tw-dropdown>
      <tw-dropdown class="ms-3" origin="right" body-class="top-8">
        <div class="flex items-center cursor-pointer">
          <span class="me-1">{{ getUserName() }}</span>
          <img src="@/assets/profile_pic.png" alt="Avatar" class="w-8 h-8 rounded-full">
        </div>
        <template #body>
          <ul>
            <li @click="show_update_password_modal = true" class="px-4 py-2 cursor-pointer profile-links">
              {{ $t('navbar.update_password') }}
            </li>
            <li @click="signout()" class="px-4 py-2 cursor-pointer profile-links">
              {{ $t('navbar.sign_out') }}
            </li>
          </ul>
        </template>
      </tw-dropdown>
    </div>
    <ChangePassword 
      v-if="show_update_password_modal"
      @close-modal="show_update_password_modal = false"/>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import ChangePassword from '@/pages/auth/ChangePassword.vue';

export default {
  name: 'TheNavbar',
  components: {
    ChangePassword
  },
  data() {
    return {
      language: localStorage.getItem("currentLang") ?? "en",
      branches: JSON.parse(localStorage.getItem("userInfo"))?.user?.branches,
      show_update_password_modal: false
    }
  },
  methods: {
    ...mapActions(["logout"]),

    signout() {
      this.logout({
        Token: JSON.parse(localStorage.getItem("userInfo"))?.token
      });
    },
    getUserName() {
      return JSON.parse(localStorage.getItem("userInfo"))?.user.name;
    },
    getUserRole() {
      return this.language == 'ar' ? JSON.parse(localStorage.getItem("userInfo"))?.user?.admin_group?.title_ar : JSON.parse(localStorage.getItem("userInfo"))?.user?.admin_group?.title_en;
    },
    getUserRoleId() {
      return JSON.parse(localStorage.getItem("userInfo"))?.user?.admin_group?.id;
    },
    getSelectedBranchName() {
      return this.language == 'ar' ? JSON.parse(localStorage.getItem("selectedBranch"))?.name_ar : JSON.parse(localStorage.getItem("selectedBranch"))?.name_en;
    },
    selectBranch(branch){
      localStorage.setItem("selectedBranch", JSON.stringify(branch))
      this.$router.go(0)
    },
    switchLanguage() {
      let currentLang = localStorage.getItem("currentLang")
      localStorage.setItem("currentLang", currentLang == "ar" ? "en" : "ar");
      this.$i18n.locale = currentLang == "en" ? "ar" : "en";
      this.updateLanguageClassInBody(currentLang)
      window.location.reload()
    },
    updateLanguageClassInBody(lang) {
      if (lang == "ar") {
          document.querySelector("body").classList.remove("ltr");
          document.querySelector("body").classList.add("rtl");
      } else {
          document.querySelector("body").classList.remove("rtl");
          document.querySelector("body").classList.add("ltr");
      }
    },
  },
  mounted() {
    if (
      localStorage.getItem("userInfo") != null &&
      localStorage.getItem("userInfo").length > 0
    ){
      this.$i18n.locale = this.language;
      this.updateLanguageClassInBody(this.language);
    }else{
      this.signout()      
    }
  },
}
</script>