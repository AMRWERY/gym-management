<template>
  <div class="full-screen text-center bg-light-grey">
    <div class="center">
      <h2 class="font-80">403</h2>
      <div class="font-20">
        <img class="info-icon inline" src="@/assets/info_outline.svg" /> {{ $t('error.forbidden') }}
      </div>
      <button @click="signout" class="btn-primary rounded-lg h-9 text-5x px-6 mt-5">
        {{ $t('error.back_to_login') }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: '403',
    methods: {
      signout() {
        localStorage.removeItem("userInfo");
        localStorage.removeItem("redirection_url")
        window.location.href = "/";
      },
  }
}
</script>

<style scoped>
.info-icon {
  height: 30px !important;
  width: 30px !important;
}
</style>