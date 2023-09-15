import axios from '../../axios'
import NProgress from "nprogress";

export default {
    state: {
        serviceTypes: [],
        serviceTypesToast: [],
        addServiceTypeResponse: [],
        updateServiceTypeResponse: []
    },
    getters: {
        serviceTypes: (state) => state.serviceTypes,
        serviceTypesToast: (state) => state.serviceTypesToast,
        addServiceTypeResponse: (state) => state.addServiceTypeResponse,
        updateServiceTypeResponse: (state) => state.updateServiceTypeResponse
    },
    mutations: {
        SET_SERVICE_TYPES(state, data) {
            state.serviceTypes = data;
        },
        SET_TOAST(state, data) {
            state.serviceTypesToast = data;
        },
        SET_ADD_SERVICE_TYPE_RESPONSE(state, data) {
            state.addServiceTypeResponse = data;
        },
        SET_UPDATE_SERVICE_TYPE_RESPONSE(state, data) {
            state.updateServiceTypeResponse = data;
        }
    },
    actions: {
        async getServiceTypes({ commit }, data) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`service-types`, { params: data }).then(
                (res) => {
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_SERVICE_TYPES", res.data.response);
                    }
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    this.dispatch('updateLoaderStatus', false)
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_SERVICE_TYPES", error.response.data);
                    }
                }
            );
        },

        async addServiceType({ commit }, data) {
            NProgress.start();
            await axios.post("service-types", data).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_SERVICE_TYPES", res.data.response);
                        commit("SET_ADD_SERVICE_TYPE_RESPONSE", res.data);
                    }
                },
                (error) => {
                    NProgress.done();
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_ADD_SERVICE_TYPE_RESPONSE", error.response.data);
                    }
                }
            );
        },

        async updateServiceType({ commit }, data) {
            NProgress.start();
            await axios.put(`service-types/${data.id}`, data).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_SERVICE_TYPES", res.data.response);
                        commit("SET_UPDATE_SERVICE_TYPE_RESPONSE", res.data);
                    }
                },
                (error) => {
                    NProgress.done();
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_UPDATE_SERVICE_TYPE_RESPONSE", error.response.data);
                    }
                }
            );
        },

        async deleteServiceType({ commit }, id) {
            NProgress.start();
            await axios.delete(`service-types/${id}`).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_SERVICE_TYPES", res.data.response);
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