import axios from '../../axios'
import NProgress from "nprogress";

export default {
    state: {
        packageTypes: [],
        packageTypesToast: [],
        addPackageTypeResponse: [],
        updatePackageTypeResponse: []
    },
    getters: {
        packageTypes: (state) => state.packageTypes,
        packageTypesToast: (state) => state.packageTypesToast,
        addPackageTypeResponse: (state) => state.addPackageTypeResponse,
        updatePackageTypeResponse: (state) => state.updatePackageTypeResponse
    },
    mutations: {
        SET_PACKAGE_TYPES(state, data) {
            state.packageTypes = data;
        },
        SET_TOAST(state, data) {
            state.packageTypesToast = data;
        },
        SET_ADD_PACKAGE_TYPE_RESPONSE(state, data) {
            state.addPackageTypeResponse = data;
        },
        SET_UPDATE_PACKAGE_TYPE_RESPONSE(state, data) {
            state.updatePackageTypeResponse = data;
        }
    },
    actions: {
        async getPackageTypes({ commit }, data) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`package-types`, { params: data }).then(
                (res) => {
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_PACKAGE_TYPES", res.data.response);
                    }
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    this.dispatch('updateLoaderStatus', false)
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_PACKAGE_TYPES", error.response.data);
                    }
                }
            );
        },

        async addPackageType({ commit }, data) {
            NProgress.start();
            await axios.post("package-types", data).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_PACKAGE_TYPES", res.data.response);
                        commit("SET_ADD_PACKAGE_TYPE_RESPONSE", res.data);
                    }
                },
                (error) => {
                    NProgress.done();
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_ADD_PACKAGE_TYPE_RESPONSE", error.response.data);
                    }
                }
            );
        },

        async updatePackageType({ commit }, data) {
            NProgress.start();
            await axios.put(`package-types/${data.id}`, data).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_PACKAGE_TYPES", res.data.response);
                        commit("SET_UPDATE_PACKAGE_TYPE_RESPONSE", res.data);
                    }
                },
                (error) => {
                    NProgress.done();
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_UPDATE_PACKAGE_TYPE_RESPONSE", error.response.data);
                    }
                }
            );
        },

        async deletePackageType({ commit }, id) {
            NProgress.start();
            await axios.delete(`package-types/${id}`).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_PACKAGE_TYPES", res.data.response);
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