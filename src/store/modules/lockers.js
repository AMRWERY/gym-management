import axios from '../../axios'
import NProgress from "nprogress";

export default {
    state: {
        lockers: [],
        lockersToast: [],
        addLockerResponse: [],
        updateLockerResponse: []
    },
    getters: {
        lockers: (state) => state.lockers,
        lockersToast: (state) => state.lockersToast,
        addLockerResponse: (state) => state.addLockerResponse,
        updateLockerResponse: (state) => state.updateLockerResponse
    },
    mutations: {
        SET_LOCKERS(state, data) {
            state.lockers = data;
        },
        SET_TOAST(state, data) {
            state.lockersToast = data;
        },
        SET_ADD_LOCKER_RESPONSE(state, data) {
            state.addLockerResponse = data;
        },
        SET_UPDATE_LOCKER_RESPONSE(state, data) {
            state.updateLockerResponse = data;
        }
    },
    actions: {
        async getLockers({ commit }, data) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`lockers`, { params: data }).then(
                (res) => {
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_LOCKERS", res.data.response);
                    }
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    this.dispatch('updateLoaderStatus', false)
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_LOCKERS", error.response.data);
                    }
                }
            );
        },

        async addLocker({ commit }, data) {
            NProgress.start();
            await axios.post("lockers", data).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_LOCKERS", res.data.response);
                        commit("SET_ADD_LOCKER_RESPONSE", res.data);
                    }
                },
                (error) => {
                    NProgress.done();
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_ADD_LOCKER_RESPONSE", error.response.data);
                    }
                }
            );
        },

        async updateLocker({ commit }, data) {
            NProgress.start();
            await axios.put(`lockers/${data.id}`, data).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_LOCKERS", res.data.response);
                        commit("SET_UPDATE_LOCKER_RESPONSE", res.data);
                    }
                },
                (error) => {
                    NProgress.done();
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_UPDATE_LOCKER_RESPONSE", error.response.data);
                    }
                }
            );
        },

        async deleteLocker({ commit }, id) {
            NProgress.start();
            await axios.delete(`lockers/${id}`).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_LOCKERS", res.data.response);
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