import axios from '../../axios'

export default {
    state: {
        activityLogs: [],
        activityLogDetails: [],
        downloadActivityLogResponse: []
    },
    getters: {
        activityLogs: (state) => state.activityLogs,
        activityLogDetails: (state) => state.activityLogDetails,
        downloadActivityLogResponse: (state) => state.downloadActivityLogResponse
    },
    mutations: {
        SET_ACTIVITY_LOGS(state, data) {
            state.activityLogs = data;
        },
        SET_ACTIVITY_LOG_DETAILS(state, data) {
            state.activityLogDetails = data;
        },
        SET_DOWNLOAD_ACTIVITY_LOG_RESPONSE(state, data) {
            state.downloadActivityLogResponse = data;
        }
    },
    actions: {
        async getActivityLogs({ commit }, data) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`activity-logs`, { params: data }).then(
                (res) => {
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_ACTIVITY_LOGS", res.data)
                    }
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    this.dispatch('updateLoaderStatus', false)
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_ACTIVITY_LOGS", error.response.data);
                    }
                }
            );
        },

        async getActivityLogDetails({ commit }, id) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`activity-logs/${id}`).then(
                (res) => {
                    this.dispatch('updateLoaderStatus', false)
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_ACTIVITY_LOG_DETAILS", res.data);
                    }
                },
                (error) => {
                    this.dispatch('updateLoaderStatus', false)
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_ACTIVITY_LOG_DETAILS", error.response.data);
                    }
                }
            );
        },

        async downloadActivityLogs({ commit }, data) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`activity-logs`, { params: data }).then(
                (res) => {
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_DOWNLOAD_ACTIVITY_LOG_RESPONSE", res.data)
                    }
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    this.dispatch('updateLoaderStatus', false)
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_DOWNLOAD_ACTIVITY_LOG_RESPONSE", error.response.data);
                    }
                }
            );
        },

    }
}