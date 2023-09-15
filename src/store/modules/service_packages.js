import axios from '../../axios'
import NProgress from "nprogress";

export default {
    state: {
        servicePackages: [],
        servicePackageById: null,
        servicePackagesToast: [],
        addServicePackageResponse: [],
        updateServicePackageResponse: []
    },
    getters: {
        servicePackages: (state) => state.servicePackages,
        servicePackageById: (state) => state.servicePackageById,
        servicePackagesToast: (state) => state.servicePackagesToast,
        addServicePackageResponse: (state) => state.addServicePackageResponse,
        updateServicePackageResponse: (state) => state.updateServicePackageResponse
    },
    mutations: {
        SET_SERVICE_PACKAGES(state, data) {
            state.servicePackages = data;
        },
        SET_SERVICE_PACKAGE_BY_ID(state, data) {
            state.servicePackageById = data;
        },
        SET_TOAST(state, data) {
            state.servicePackagesToast = data;
        },
        SET_ADD_SERVICE_PACKAGE_RESPONSE(state, data) {
            state.addServicePackageResponse = data;
        },
        SET_UPDATE_SERVICE_PACKAGE_RESPONSE(state, data) {
            state.updateServicePackageResponse = data;
        }
    },
    actions: {
        async getServicePackages({ commit }, data) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`service-packages`, { params: data }).then(
                (res) => {
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_SERVICE_PACKAGES", res.data.response);
                    }
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    this.dispatch('updateLoaderStatus', false)
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_SERVICE_PACKAGES", error.response.data);
                    }
                }
            );
        },

        async addServicePackage({ commit }, data) {
            NProgress.start();
            await axios.post("service-packages", data).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_SERVICE_PACKAGES", res.data.response);
                        commit("SET_ADD_SERVICE_PACKAGE_RESPONSE", res.data);
                    }
                },
                (error) => {
                    NProgress.done();
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_ADD_SERVICE_PACKAGE_RESPONSE", error.response.data);
                    }
                }
            );
        },

        async getServicePackageById({ commit }, id) {
            let url = "service-packages/" + id;
            await axios.get(url).then(
                (res) => {
                    if (!res.data || res.data.code == 401) {
                      // this.dispatch('logout');
                    }  else {
                        commit("SET_SERVICE_PACKAGE_BY_ID", res.data.response);
                    }
                    this.dispatch("updateLoaderStatus", false);
                  },
                (error) => {
                    NProgress.done();
                    if (!error.response || error.response.status == 401) {
                    } else {
                        commit("SET_SERVICE_PACKAGE_BY_ID", error.response.data);
                    }
                }
            );
        },

        async updateServicePackage({ commit }, data) {
            NProgress.start();
            await axios.put(`service-packages/${data.id}`, data).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_SERVICE_PACKAGES", res.data.response);
                        commit("SET_UPDATE_SERVICE_PACKAGE_RESPONSE", res.data);
                    }
                },
                (error) => {
                    NProgress.done();
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_UPDATE_SERVICE_PACKAGE_RESPONSE", error.response.data);
                    }
                }
            );
        },

        async deleteServicePackage({ commit }, id) {
            NProgress.start();
            await axios.delete(`service-packages/${id}`).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_SERVICE_PACKAGES", res.data.response);
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