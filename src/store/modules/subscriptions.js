import axios from "../../axios";
import NProgress from "nprogress";

export default {
  state: {
    subscriptions: [],
    subscriptionsToast: [],
    addSubscriptionResponse: [],
    updateSubscriptionResponse: [],
    freezeSubscriptionResponse: [],
    refundSubscriptionResponse: [],
  },
  getters: {
    subscriptions: (state) => state.subscriptions,
    subscriptionsToast: (state) => state.subscriptionsToast,
    addSubscriptionResponse: (state) => state.addSubscriptionResponse,
    updateSubscriptionResponse: (state) => state.updateSubscriptionResponse,
    freezeSubscriptionResponse: (state) => state.freezeSubscriptionResponse,
    refundSubscriptionResponse: (state) => state.refundSubscriptionResponse,
  },
  mutations: {
    SET_SUBSCRIPTIONS(state, data) {
      state.subscriptions = data;
    },
    SET_TOAST(state, data) {
      state.subscriptionsToast = data;
    },
    SET_ADD_SUBSCRIPTION_RESPONSE(state, data) {
      state.addSubscriptionResponse = data;
    },
    SET_UPDATE_SUBSCRIPTION_RESPONSE(state, data) {
      state.updateSubscriptionResponse = data;
    },
    SET_FREEZE_SUBSCRIPTION_RESPONSE(state, data) {
      state.freezeSubscriptionResponse = data;
    },
    SET_REFUND_SUBSCRIPTION_RESPONSE(state, data) {
      state.refundSubscriptionResponse = data;
    },
  },
  actions: {
    async getSubscriptions({ commit }, id) {
      this.dispatch("updateLoaderStatus", true);
      await axios.get(`subscriptions/${id}`).then(
        (res) => {
          if (!res.data || res.data.code == 401) {
            // this.dispatch('logout');
          } else {
            commit("SET_SUBSCRIPTIONS", res.data.response);
          }
          this.dispatch("updateLoaderStatus", false);
        },
        (error) => {
          this.dispatch("updateLoaderStatus", false);
          if (!error.response || error.response.status == 401) {
            // this.dispatch('logout');
          } else {
            commit("SET_SUBSCRIPTIONS", error.response.data);
          }
        }
      );
    },

    async getSubscriptionDetails({ commit }, id) {
      this.dispatch("updateLoaderStatus", true);
      await axios.get(`subscriptions/${id}/edit`).then(
        (res) => {
          if (!res.data || res.data.code == 401) {
            // this.dispatch('logout');
          } else {
            commit("SET_SUBSCRIPTIONS", res.data.response);
          }
          this.dispatch("updateLoaderStatus", false);
        },
        (error) => {
          this.dispatch("updateLoaderStatus", false);
          if (!error.response || error.response.status == 401) {
            // this.dispatch('logout');
          } else {
            commit("SET_SUBSCRIPTIONS", error.response.data);
          }
        }
      );
    },

    async getSubscriptionInvoice({ commit }, id) {
      this.dispatch("updateLoaderStatus", true);
      await axios.get(`subscription-invoice/${id}`).then(
        (res) => {
          if (!res.data || res.data.code == 401) {
            // this.dispatch('logout');
          } else {
            commit("SET_SUBSCRIPTIONS", res.data.response);
          }
          this.dispatch("updateLoaderStatus", false);
        },
        (error) => {
          this.dispatch("updateLoaderStatus", false);
          if (!error.response || error.response.status == 401) {
            // this.dispatch('logout');
          } else {
            commit("SET_SUBSCRIPTIONS", error.response.data);
          }
        }
      );
    },

    async addSubscription({ commit }, data) {
      NProgress.start();
      await axios.post("subscriptions", data).then(
        (res) => {
          NProgress.done();
          if (!res.data || res.data.code == 401) {
            // this.dispatch('logout');
          } else {
            commit("SET_ADD_SUBSCRIPTION_RESPONSE", res.data);
          }
        },
        (error) => {
          NProgress.done();
          if (!error.response || error.response.status == 401) {
            // this.dispatch('logout');
          } else {
            commit("SET_ADD_SUBSCRIPTION_RESPONSE", error.response.data);
          }
        }
      );
    },

    async updateSubscription({ commit }, data) {
      NProgress.start();
      await axios.put(`subscriptions/${data.id}`, data).then(
        (res) => {
          NProgress.done();
          if (!res.data || res.data.code == 401) {
            // this.dispatch('logout');
          } else {
            commit("SET_SUBSCRIPTIONS", res.data.response);
            commit("SET_UPDATE_SUBSCRIPTION_RESPONSE", res.data);
          }
        },
        (error) => {
          NProgress.done();
          if (!error.response || error.response.status == 401) {
            // this.dispatch('logout');
          } else {
            commit("SET_UPDATE_SUBSCRIPTION_RESPONSE", error.response.data);
          }
        }
      );
    },

    async deleteSubscription({ commit }, id) {
      NProgress.start();
      await axios.delete(`subscriptions/${id}`).then(
        (res) => {
          NProgress.done();
          if (!res.data || res.data.code == 401) {
            // this.dispatch('logout');
          } else {
            commit("SET_SUBSCRIPTIONS", res.data.response);
            commit("SET_TOAST", res.data);
          }
        },
        (error) => {
          NProgress.done();
          if (!error.response || error.response.status == 401) {
            // this.dispatch('logout');
          } else {
            commit("SET_TOAST", error.response.data);
          }
        }
      );
    },

    async freezeSubscription({ commit }, data) {
      NProgress.start();
      await axios.put(`freeze-subscription/${data.id}`, data).then(
        (res) => {
          NProgress.done();
          if (!res.data || res.data.code == 401) {
            // this.dispatch('logout');
          } else {
            commit("SET_SUBSCRIPTIONS", res.data.response);
            commit("SET_FREEZE_SUBSCRIPTION_RESPONSE", res.data);
          }
        },
        (error) => {
          NProgress.done();
          if (!error.response || error.response.status == 401) {
            // this.dispatch('logout');
          } else {
            commit("SET_FREEZE_SUBSCRIPTION_RESPONSE", res.data);
          }
        }
      );
    },

    async refundSubscription({ commit }, data) {
      NProgress.start();
      await axios.put(`refund-subscription/${data.id}`, data).then(
        (res) => {
          NProgress.done();
          if (!res.data || res.data.code == 401) {
            // this.dispatch('logout');
          } else {
            commit("SET_REFUND_SUBSCRIPTION_RESPONSE", res.data);
          }
        },
        (error) => {
          NProgress.done();
          if (!error.response || error.response.status == 401) {
            // this.dispatch('logout');
          } else {
            commit("SET_REFUND_SUBSCRIPTION_RESPONSE", []);
          }
        }
      );
    },
  },
};
