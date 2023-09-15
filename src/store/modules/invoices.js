import axios from '../../axios'
import NProgress from "nprogress";

export default {
    state: {
        refundInvoices: [],
        refundInvoiceDetails: [],
        freezedInvoices: [],
        freezedInvoiceDetails: [],
        cancelFreezeResponse: []
    },
    getters: {
        refundInvoices: (state) => state.refundInvoices,
        refundInvoiceDetails: (state) => state.refundInvoiceDetails,
        freezedInvoices: (state) => state.freezedInvoices,
        freezedInvoiceDetails: (state) => state.freezedInvoiceDetails,
        cancelFreezeResponse: (state) => state.cancelFreezeResponse
    },
    mutations: {
        SET_REFUND_INVOICES(state, data) {
            state.refundInvoices = data;
        },
        SET_REFUND_INVOICES_DETAILS(state, data) {
            state.refundInvoiceDetails = data;
        },
        SET_FREEZED_INVOICES(state, data) {
            state.freezedInvoices = data;
        },
        SET_FREEZED_INVOICES_DETAILS(state, data) {
            state.freezedInvoiceDetails = data;
        },
        SET_CANCEL_FREEZE_RESPONSE(state, data) {
            state.cancelFreezeResponse = data;
        }
    },
    actions: {
        async getRefundInvoices({ commit }, data) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`refund-invoices`, { params: data }).then(
                (res) => {
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_REFUND_INVOICES", res.data.response);
                    }
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    this.dispatch('updateLoaderStatus', false)
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_REFUND_INVOICES", error.response.data);
                    }
                }
            );
        },
        async getFreezedInvoices({ commit }, data) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`subscription-freeze`, { params: data }).then(
                (res) => {
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_FREEZED_INVOICES", res.data.response);
                    }
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    this.dispatch('updateLoaderStatus', false)
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_FREEZED_INVOICES", error.response.data);
                    }
                }
            );
        },
        async getRefundInvoiceDetails({ commit }, id) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`refund-invoices/${id}`).then(
                (res) => {
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_REFUND_INVOICES_DETAILS", res.data.response);
                    }
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    this.dispatch('updateLoaderStatus', false)
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_REFUND_INVOICES_DETAILS", error.response.data);
                    }
                }
            );
        },
        async getFreezedInvoiceDetails({ commit }, id) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`subscription-freeze/${id}`).then(
                (res) => {
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_FREEZED_INVOICES_DETAILS", res.data.response);
                    }
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    this.dispatch('updateLoaderStatus', false)
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_FREEZED_INVOICES_DETAILS", error.response.data);
                    }
                }
            );
        },
        async cancelFreeze({ commit }, data) {
            this.dispatch('updateLoaderStatus', true)
            await axios.put(`subscription-freeze/${data.id}`, data).then(
                (res) => {
                    this.dispatch('updateLoaderStatus', false)
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_CANCEL_FREEZE_RESPONSE", res.data);
                    }
                },
                (error) => {
                    this.dispatch('updateLoaderStatus', false)
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_CANCEL_FREEZE_RESPONSE", error.response.data);
                    }
                }
            );
        },
    }
}