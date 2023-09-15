import axios from '../../axios'
import NProgress from "nprogress";

export default {
    state: {
        lockerTypes: [],
        lockerTypesToast: [],
        addLockerTypeResponse: [],
        updateLockerTypeResponse: []
    },
    getters: {
        lockerTypes: (state) => state.lockerTypes,
        lockerTypesToast: (state) => state.lockerTypesToast,
        addLockerTypeResponse: (state) => state.addLockerTypeResponse,
        updateLockerTypeResponse: (state) => state.updateLockerTypeResponse
    },
    mutations: {
        SET_LOCKER_TYPES(state, data) {
            state.lockerTypes = data;
        },
        SET_TOAST(state, data) {
            state.lockerTypesToast = data;
        },
        SET_ADD_LOCKER_TYPE_RESPONSE(state, data) {
            state.addLockerTypeResponse = data;
        },
        SET_UPDATE_LOCKER_TYPE_RESPONSE(state, data) {
            state.updateLockerTypeResponse = data;
        }
    },
    actions: {
        async getLockerTypes({ commit }, data) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`locker-types`, { params: data }).then(
                (res) => {
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_LOCKER_TYPES", res.data.response);
                    }
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    this.dispatch('updateLoaderStatus', false)
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_LOCKER_TYPES", error.response.data);
                    }
                }
            );
        },

        async addLockerType({ commit }, data) {
            NProgress.start();
            await axios.post("locker-types", data).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_LOCKER_TYPES", res.data.response);
                        commit("SET_ADD_LOCKER_TYPE_RESPONSE", res.data);
                    }
                },
                (error) => {
                    NProgress.done();
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_ADD_LOCKER_TYPE_RESPONSE", error.response.data);
                    }
                }
            );
        },

        async updateLockerType({ commit }, data) {
            NProgress.start();
            await axios.put(`locker-types/${data.id}`, data).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_LOCKER_TYPES", res.data.response);
                        commit("SET_UPDATE_LOCKER_TYPE_RESPONSE", res.data);
                    }
                },
                (error) => {
                    NProgress.done();
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_UPDATE_LOCKER_TYPE_RESPONSE", error.response.data);
                    }
                }
            );
        },

        async deleteLockerType({ commit }, id) {
            NProgress.start();
            await axios.delete(`locker-types/${id}`).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_LOCKER_TYPES", res.data.response);
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