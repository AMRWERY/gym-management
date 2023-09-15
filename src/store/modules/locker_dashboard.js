import axios from '../../axios'
import NProgress from "nprogress";

export default {
    state: {
        lockerDashboard: [],
        memberLockerDashboard: [],
        lockerDashboardToast: [],
        addLockerDashboardResponse: [],
        updateLockerDashboardResponse: [],
        releaseLockerResponse: [],
        releaseLockerToast: []
    },
    getters: {
        lockerDashboard: (state) => state.lockerDashboard,
        memberLockerDashboard: (state) => state.memberLockerDashboard,
        lockerDashboardToast: (state) => state.lockerDashboardToast,
        addLockerDashboardResponse: (state) => state.addLockerDashboardResponse,
        updateLockerDashboardResponse: (state) => state.updateLockerDashboardResponse,
        releaseLockerResponse: (state) => state.releaseLockerResponse,
        releaseLockerToast: (state) => state.releaseLockerToast
    },
    mutations: {
        SET_LOCKER_DASHBOARD(state, data) {
            state.lockerDashboard = data;
        },
        SET_MEMBER_LOCKER_DASHBOARD(state, data) {
            state.memberLockerDashboard = data;
        },
        SET_TOAST(state, data) {
            state.lockerDashboardToast = data;
        },
        SET_ADD_LOCKER_DASHBOARD_RESPONSE(state, data) {
            state.addLockerDashboardResponse = data;
        },
        SET_UPDATE_LOCKER_DASHBOARD_RESPONSE(state, data) {
            state.updateLockerDashboardResponse = data;
        },
        SET_RELEASE_LOCKER_RESPONSE(state, data){
            state.releaseLockerResponse = data
        },
        SET_RELEASE_TOAST(state, data){
            state.releaseLockerToast = data
        }
    },
    actions: {
        async getLockerDashboard({ commit }, data) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`locker-dashboard`, { params: data }).then(
                (res) => {
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_LOCKER_DASHBOARD", res.data.response);
                    }
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    this.dispatch('updateLoaderStatus', false)
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_LOCKER_DASHBOARD", error.response.data);
                    }
                }
            );
        },

        async searchLockerDashboard({ commit }, data) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`locker-dashboard/${data}`).then(
                (res) => {
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_MEMBER_LOCKER_DASHBOARD", res.data.response);
                        commit("SET_TOAST", res.data);
                    }
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    this.dispatch('updateLoaderStatus', false)
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_MEMBER_LOCKER_DASHBOARD", error.response.data);
                        commit("SET_TOAST", res.data);
                    }
                    this.dispatch('updateLoaderStatus', false)
                }
            );
        },

        async releaseLocker({ commit }, data) {
            this.dispatch('updateLoaderStatus', true)
            await axios.put(`release-locker`, data).then(
                (res) => {
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_RELEASE_LOCKER_RESPONSE", res.data.response);
                        commit("SET_RELEASE_TOAST", res.data);
                    }
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    this.dispatch('updateLoaderStatus', false)
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_RELEASE_TOAST", res.data);
                        this.dispatch('updateLoaderStatus', false)
                    }
                }
            );
        },

    }
}