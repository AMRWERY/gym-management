import axios from '../../axios'
import NProgress from "nprogress";

export default {
  state: {
    adminUser: [],
    newPassword: [],
    forgotPasswordResponse: [],
    updatePasswordResponse: [],
    changePasswordResponse: []
  },
  getters: {
    adminUser: (state) => state.adminUser,
    forgotPasswordResponse: (state) => state.forgotPasswordResponse,
    updatePasswordResponse: (state) => state.updatePasswordResponse,
    changePasswordResponse: (state) => state.changePasswordResponse
  },
  mutations: {
    SET_USER_DATA(state, data) {
      state.adminUser = data;
    },
    SET_FORGOT_PASSWORD_RESPONSE(state, data) {
      state.forgotPasswordResponse = data;
    },
    SET_UPDATE_PASSWORD_RESPONSE(state, data) {
        state.updatePasswordResponse = data;
    },
    SET_CHANGE_PASSWORD_RESPONSE(state, data) {
      state.changePasswordResponse = data
    }
  },
  actions: {
    async login({ commit }, data) {
      this.dispatch('updateLoaderStatus', true)
      await axios.post("login", data).then((response) => {
        this.dispatch('updateLoaderStatus', false)
        if (response.data.status) {
          localStorage.setItem("userInfo", JSON.stringify(response.data.response));
        }
        if(response?.data?.response?.user?.branches?.length > 0){
          localStorage.setItem("selectedBranch", JSON.stringify(response.data.response.user.branches[0]))
        }
        commit("SET_USER_DATA", response.data);
      });
    },

    async logout({ commit }, data) {
      console.log('logging out')
      NProgress.start();
      axios.post("logout", data).then((res) => {
        NProgress.done();
      });
      localStorage.removeItem("userInfo");
      localStorage.removeItem("selectedBranch");
      localStorage.removeItem("redirection_url")
      localStorage.removeItem("currentLang")
      commit("SET_USER_DATA", []);
      window.location.href = "/";
    },

    async getResetPasswordToken({ commit }, data) {
      NProgress.start();
      await axios.post("reset-password-token", data).then((response) => {
        NProgress.done();
        commit("SET_FORGOT_PASSWORD_RESPONSE", response.data);
      },
        (error) => {
          NProgress.done();
          commit("SET_FORGOT_PASSWORD_RESPONSE", error.response.data);
        }
      );
    },

    async updadePassword({commit}, data) {
      NProgress.start();
      await axios.post("reset-password", data).then((response) => {
          NProgress.done();
          commit("SET_UPDATE_PASSWORD_RESPONSE", response.data);
      },
          (error) => {
              NProgress.done();
              commit("SET_UPDATE_PASSWORD_RESPONSE", error.response.data);
          }
      );
  },

    async changePassword({commit}, data) {
      this.dispatch('updateLoaderStatus', true)
      await axios.put("update-password", data).then((response) => {
        this.dispatch('updateLoaderStatus', false)
        commit("SET_CHANGE_PASSWORD_RESPONSE", response.data);
      },
        (error) => {
          this.dispatch('updateLoaderStatus', false)
          commit("SET_CHANGE_PASSWORD_RESPONSE", error.response.data);
        }
      );
    }

  }
};
