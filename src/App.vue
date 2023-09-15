<template>
  <transition name="slide-fade">
    <router-view />
  </transition>
</template>

<script>
import { useClipboard } from '@vueuse/core'

export default {
  name: 'App',

  setup(textToCopy) {
    const source = textToCopy
    const { copy } = useClipboard({ source })
    function getErrorMessage(error_type, key_name) {
      return error_type == 'required' ? key_name + this.$t("validation.is_required_en") :
        error_type == 'email' ? 'Email entered is not valid. Please enter valid address' :
          '';
    }
    function getLengthErrorMessage(error_type, key_name, count) {
      return error_type == 'min' ? key_name + ' must be at least ' + count + ' characters.' :
        error_type == 'max' ? 'Max. allowed length is ' + count + ' characters' :
          '';
    }
    function getScreenPermissions(screen) {
      const admin_menus = JSON.parse(localStorage.getItem("userInfo"))?.admin_menu;
      let group_rights = [];
      admin_menus.forEach(group_right => {
        if (group_right.sub_menus.length > 0) {
          group_right.sub_menus.forEach(obj => {
            group_rights.push(obj)
          });
        } else {
          group_rights.push(group_right)
        }
      });
      return group_rights.find(right => right.title_en == screen)
    }
    function getPermissionStatus(permissions, title) {
      return !permissions ? false : permissions.find(permission => permission.title == title) ? true : false
    }
    function formatDateAPI(date) {
      let date_string_formatted = ''
      if (date) {
        let date_string = new Date(date)
        date_string_formatted = date_string.toLocaleDateString('es-CL')
      } else {
        date_string_formatted = date
      }
      return date_string_formatted
    }
    function formatDateUI(date) {
      let date_string_formatted = ''
      if (date) {
        date_string_formatted = date.split("-").reverse().join("-")
      } else {
        date_string_formatted = date
      }
      return date_string_formatted
    }
    function addDays(date, duration) {
      var result = new Date(date)
      result.setDate(result.getDate() + duration)
      let result_date = result.toLocaleDateString('fr-CA')
      return result_date
    }
    function diffDays(date) {
      const currentDate = new Date()
      let [day, month, year] = date.split('-')
      const endDate = new Date(+year, +month - 1, +day)
      const timeOff = endDate.getTime() - currentDate.getTime()
      const daysDiff = Math.ceil(timeOff / (1000 * 60 * 60 * 24))
      return daysDiff <= 0 ? 0 : daysDiff
    }
    return {
      copy,
      getErrorMessage,
      getLengthErrorMessage,
      getScreenPermissions,
      getPermissionStatus,
      formatDateAPI,
      formatDateUI,
      addDays,
      diffDays
    }
  }
}
</script>