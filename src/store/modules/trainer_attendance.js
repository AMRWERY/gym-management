import axios from '../../axios'
import NProgress from "nprogress";

export default {
    state: {
        trainerAttendance: [],
        trainerAttendanceToast: [],
        addTrainerAttendanceResponse: [],
        updateTrainerAttendanceResponse: []
    },
    getters: {
        trainerAttendance: (state) => state.trainerAttendance,
        trainerAttendanceToast: (state) => state.trainerAttendanceToast,
        addTrainerAttendanceResponse: (state) => state.addTrainerAttendanceResponse,
        updateTrainerAttendanceResponse: (state) => state.updateTrainerAttendanceResponse
    },
    mutations: {
        SET_TRAINER_ATTENDANCE(state, data) {
            state.trainerAttendance = data;
        },
        SET_TOAST(state, data) {
            state.trainerAttendanceToast = data;
        },
        SET_ADD_TRAINER_ATTENDANCE_RESPONSE(state, data) {
            state.addTrainerAttendanceResponse = data;
        },
        SET_UPDATE_TRAINER_ATTENDANCE_RESPONSE(state, data) {
            state.updateTrainerAttendanceResponse = data;
        }
    },
    actions: {
        async getTrainerAttendance({ commit }, data) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`trainer-attendance`, { params: data }).then(
                (res) => {
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_TRAINER_ATTENDANCE", res.data.response);
                    }
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    this.dispatch('updateLoaderStatus', false)
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_TRAINER_ATTENDANCE", error.response.data);
                    }
                }
            );
        },

        async getTrainerAttendanceDetails({ commit }, data) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`trainer-attendance/${data}`).then(
                (res) => {
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_TRAINER_ATTENDANCE", res.data.response);
                    }
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    this.dispatch('updateLoaderStatus', false)
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_TRAINER_ATTENDANCE", error.response.data);
                    }
                }
            );
        },

        async addTrainerAttendance({ commit }, data) {
            this.dispatch('updateLoaderStatus', true)
            await axios.post("trainer-attendance", data).then(
                (res) => {
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_TRAINER_ATTENDANCE", res.data.response);
                        commit("SET_ADD_TRAINER_ATTENDANCE_RESPONSE", res.data);
                    }
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    this.dispatch('updateLoaderStatus', false)
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_TRAINER_ATTENDANCE", error.response.data);
                        commit("SET_ADD_TRAINER_ATTENDANCE_RESPONSE", error.response);
                    }
                }
            );
        },

    }
}