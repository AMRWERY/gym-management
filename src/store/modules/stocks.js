import axios from '../../axios'
import NProgress from "nprogress";

export default {
    state: {
        stocks: [],
        stockDetails: [],
        stockItemsForm: [],
        stocksToast: [],
        addStockResponse: [],
        updateStockResponse: []
    },
    getters: {
        stocks: (state) => state.stocks,
        stockDetails: (state) => state.stockDetails,
        stockItemsForm: (state) => state.stockItemsForm,
        stocksToast: (state) => state.stocksToast,
        addStockResponse: (state) => state.addStockResponse,
    },
    mutations: {
        SET_STOCKS(state, data) {
            state.stocks = data;
        },
        SET_STOCK_DETAILS(state, data) {
            state.stockDetails = data;
        },
        SET_STOCK_ITEMS_FORM(state, data) {
            state.stockItemsForm = data;
        },
        SET_TOAST(state, data) {
            state.stocksToast = data;
        },
        SET_ADD_STOCK_RESPONSE(state, data) {
            state.addStockResponse = data;
        },
    },
    actions: {
        async getStocks({ commit }, data) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`item-stock-history`, { params: data }).then(
                (res) => {
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_STOCKS", res.data.response);
                    }
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    this.dispatch('updateLoaderStatus', false)
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_STOCKS", error.response.data);
                    }
                }
            );
        },

        async getStockDetails({ commit }, id) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`item-stock-history/${id}`).then(
                (res) => {
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_STOCK_DETAILS", res.data.response);
                    }
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    this.dispatch('updateLoaderStatus', false)
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_STOCK_DETAILS", error.response.data);
                    }
                }
            );
        },

        async getStockItemsForm({ commit }, data) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`item-stock-history/create`, { params: data }).then(
                (res) => {
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_STOCK_ITEMS_FORM", res.data.response);
                    }
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    this.dispatch('updateLoaderStatus', false)
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_STOCK_ITEMS_FORM", error.response.data);
                    }
                }
            );
        },

        async addStock({ commit }, data) {
            NProgress.start();
            await axios.post("item-stock-history", data).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_STOCKS", res.data.response);
                        commit("SET_ADD_STOCK_RESPONSE", res.data);
                    }
                },
                (error) => {
                    NProgress.done();
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_ADD_STOCK_RESPONSE", error.response.data);
                    }
                }
            );
        },
    }
}