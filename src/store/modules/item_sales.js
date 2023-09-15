import axios from '../../axios'
import NProgress from "nprogress";

export default {
    state: {
        itemSales: [],
        itemSalesToast: [],
        addItemSaleResponse: [],
        updateItemSaleResponse: []
    },
    getters: {
        itemSales: (state) => state.itemSales,
        itemSalesToast: (state) => state.itemSalesToast,
        addItemSaleResponse: (state) => state.addItemSaleResponse,
        updateItemSaleResponse: (state) => state.updateItemSaleResponse
    },
    mutations: {
        SET_ITEM_SALES(state, data) {
            state.itemSales = data;
        },
        SET_TOAST(state, data) {
            state.itemSalesToast = data;
        },
        SET_ADD_ITEM_SALE_RESPONSE(state, data) {
            state.addItemSaleResponse = data;
        },
        SET_UPDATE_ITEM_SALE_RESPONSE(state, data) {
            state.updateItemSaleResponse = data;
        }
    },
    actions: {
        async getItemSales({ commit }, data) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`item-sales`, { params: data }).then(
                (res) => {
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_ITEM_SALES", res.data.response);
                    }
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    this.dispatch('updateLoaderStatus', false)
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_ITEM_SALES", error.response.data);
                    }
                }
            );
        },

        async addItemSale({ commit }, data) {
            NProgress.start();
            await axios.post("item-sales", data).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_ITEM_SALES", res.data.response);
                        commit("SET_ADD_ITEM_SALE_RESPONSE", res.data);
                    }
                },
                (error) => {
                    NProgress.done();
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_ADD_ITEM_SALE_RESPONSE", error.response.data);
                    }
                }
            );
        },

        async updateItemSale({ commit }, data) {
            NProgress.start();
            await axios.put(`item-sales/${data.id}`, data).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_ITEM_SALES", res.data.response);
                        commit("SET_UPDATE_ITEM_SALE_RESPONSE", res.data);
                    }
                },
                (error) => {
                    NProgress.done();
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_UPDATE_ITEM_SALE_RESPONSE", error.response.data);
                    }
                }
            );
        },

        async deleteItemSale({ commit }, id) {
            NProgress.start();
            await axios.delete(`item-sales/${id}`).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_ITEM_SALES", res.data.response);
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