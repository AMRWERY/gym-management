import axios from '../../axios'
import NProgress from "nprogress";

export default {
    state: {
        lockerPackages: [],
        lockerById: null,
        lockerPackagesToast: [],
        addLockerPackageResponse: [],
        updateLockerPackageResponse: []
    },
    getters: {
        lockerPackages: (state) => state.lockerPackages,
        lockerById: (state) => state.lockerById,
        lockerPackagesToast: (state) => state.lockerPackagesToast,
        addLockerPackageResponse: (state) => state.addLockerPackageResponse,
        updateLockerPackageResponse: (state) => state.updateLockerPackageResponse
    },
    mutations: {
        SET_LOCKER_PACKAGES(state, data) {
            state.lockerPackages = data;
        },
        SET_LOCKER_PACKAGE_BY_ID(state, data) {
            state.lockerById = data;
        },
        SET_TOAST(state, data) {
            state.lockerPackagesToast = data;
        },
        SET_ADD_LOCKER_PACKAGE_RESPONSE(state, data) {
            state.addLockerPackageResponse = data;
        },
        SET_UPDATE_LOCKER_PACKAGE_RESPONSE(state, data) {
            state.updateLockerPackageResponse = data;
        }
    },
    actions: {
        async getLockerPackages({ commit }, data) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`locker-packages`, { params: data }).then(
                (res) => {
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_LOCKER_PACKAGES", res.data.response);
                    }
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    this.dispatch('updateLoaderStatus', false)
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_LOCKER_PACKAGES", error.response.data);
                    }
                }
            );
        },

        async getLockerById({ commit }, id) {
            let url = "locker-packages/" + id;
            await axios.get(url).then(
                (res) => {
                    if (!res.data || res.data.code == 401) {
                      // this.dispatch('logout');
                    }  else {
                        commit("SET_LOCKER_PACKAGE_BY_ID", res.data.response);
                    }
                    this.dispatch("updateLoaderStatus", false);
                  },
                (error) => {
                    NProgress.done();
                    if (!error.response || error.response.status == 401) {
                    } else {
                        commit("SET_LOCKER_PACKAGE_BY_ID", error.response.data);
                    }
                }
            );
        },

        async addLockerPackage({ commit }, data) {
            NProgress.start();
            await axios.post("locker-packages", data).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_LOCKER_PACKAGES", res.data.response);
                        commit("SET_ADD_LOCKER_PACKAGE_RESPONSE", res.data);
                    }
                },
                (error) => {
                    NProgress.done();
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_ADD_LOCKER_PACKAGE_RESPONSE", error.response.data);
                    }
                }
            );
        },

        async updateLockerPackage({ commit }, data) {
            NProgress.start();
            await axios.put(`locker-packages/${data.id}`, data).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_LOCKER_PACKAGES", res.data.response);
                        commit("SET_UPDATE_LOCKER_PACKAGE_RESPONSE", res.data);
                    }
                },
                (error) => {
                    NProgress.done();
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_UPDATE_LOCKER_PACKAGE_RESPONSE", error.response.data);
                    }
                }
            );
        },

        async deleteLockerPackage({ commit }, id) {
            NProgress.start();
            await axios.delete(`locker-packages/${id}`).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_LOCKER_PACKAGES", res.data.response);
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