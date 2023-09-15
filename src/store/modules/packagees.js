import axios from '../../axios'
import NProgress from "nprogress";

export default {
    state: {
        packagees: [],
        packageesToast: [],
        addPackageeResponse: [],
        updatePackageeResponse: []
    },
    getters: {
        packagees: (state) => state.packagees,
        packageesToast: (state) => state.packageesToast,
        addPackageeResponse: (state) => state.addPackageeResponse,
        updatePackageeResponse: (state) => state.updatePackageeResponse
    },
    mutations: {
        SET_PACKAGEES(state, data) {
            state.packagees = data;
        },
        SET_TOAST(state, data) {
            state.packageesToast = data;
        },
        SET_ADD_PACKAGEE_RESPONSE(state, data) {
            state.addPackageeResponse = data;
        },
        SET_UPDATE_PACKAGEE_RESPONSE(state, data) {
            state.updatePackageeResponse = data;
        }
    },
    actions: {
        async getPackagees({ commit }, data) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`packages`, { params: data }).then(
                (res) => {
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_PACKAGEES", res.data.response);
                    }
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    this.dispatch('updateLoaderStatus', false)
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_PACKAGEES", error.response.data);
                    }
                }
            );
        },

        async addPackagee({ commit }, data) {
            NProgress.start();
            await axios.post("packages", data).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_PACKAGEES", res.data.response);
                        commit("SET_ADD_PACKAGEE_RESPONSE", res.data);
                    }
                },
                (error) => {
                    NProgress.done();
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_ADD_PACKAGEE_RESPONSE", error.response.data);
                    }
                }
            );
        },

        async updatePackagee({ commit }, data) {
            NProgress.start();
            await axios.put(`packages/${data.id}`, data).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_PACKAGEES", res.data.response);
                        commit("SET_UPDATE_PACKAGEE_RESPONSE", res.data);
                    }
                },
                (error) => {
                    NProgress.done();
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_UPDATE_PACKAGEE_RESPONSE", error.response.data);
                    }
                }
            );
        },

        async deletePackagee({ commit }, id) {
            NProgress.start();
            await axios.delete(`packages/${id}`).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_PACKAGEES", res.data.response);
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