import axios from '../../axios'
import NProgress from "nprogress";

export default {
    state: {
        discounts: [],
        discountById: null,
        discountsToast: [],
        addDiscountResponse: [],
        updateDiscountResponse: []
    },
    getters: {
        discounts: (state) => state.discounts,
        discountById: (state) => state.discountById,
        discountsToast: (state) => state.discountsToast,
        addDiscountResponse: (state) => state.addDiscountResponse,
        updateDiscountResponse: (state) => state.updateDiscountResponse
    },
    mutations: {
        SET_DISCOUNTS(state, data) {
            state.discounts = data;
        },
        SET_DISCOUNT_BY_ID(state, data) {
            state.discountById = data;
        },
        SET_TOAST(state, data) {
            state.discountsToast = data;
        },
        SET_ADD_DISCOUNT_RESPONSE(state, data) {
            state.addDiscountResponse = data;
        },
        SET_UPDATE_DISCOUNT_RESPONSE(state, data) {
            state.updateDiscountResponse = data;
        }
    },
    actions: {
        async getDiscounts({ commit }, data) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`discounts`, { params: data }).then(
                (res) => {
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_DISCOUNTS", res.data.response);
                    }
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    this.dispatch('updateLoaderStatus', false)
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_DISCOUNTS", error.response.data);
                    }
                }
            );
        },
        async getDiscountById({ commit }, id) {
            let url = "discounts/" + id;
            await axios.get(url).then(
                (res) => {
                    if (!res.data || res.data.code == 401) {
                      // this.dispatch('logout');
                    }  else {
                        commit("SET_DISCOUNT_BY_ID", res.data.response);
                    }
                    this.dispatch("updateLoaderStatus", false);
                  },
                (error) => {
                    NProgress.done();
                    if (!error.response || error.response.status == 401) {
                    } else {
                        commit("SET_DISCOUNT_BY_ID", error.response.data);
                    }
                }
            );
        },

        async addDiscount({ commit }, data) {
            NProgress.start();
            await axios.post("discounts", data).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_DISCOUNTS", res.data.response);
                        commit("SET_ADD_DISCOUNT_RESPONSE", res.data);
                    }
                },
                (error) => {
                    NProgress.done();
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_ADD_DISCOUNT_RESPONSE", error.response.data);
                    }
                }
            );
        },

        async updateDiscount({ commit }, data) {
            NProgress.start();
            await axios.put(`discounts/${data.id}`, data).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_DISCOUNTS", res.data.response);
                        commit("SET_UPDATE_DISCOUNT_RESPONSE", res.data);
                    }
                },
                (error) => {
                    NProgress.done();
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_UPDATE_DISCOUNT_RESPONSE", error.response.data);
                    }
                }
            );
        },

        async deleteDiscount({ commit }, id) {
            NProgress.start();
            await axios.delete(`discounts/${id}`).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_DISCOUNTS", res.data.response);
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
        }
    }
}