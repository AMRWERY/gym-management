import axios from '../../axios'

export default {
    state: {
        notifications: [],
        updateNotificationResponse: [],
        sendNotificationResponse: []
    },
    getters: {
        notifications: (state) => state.notifications,
        updateNotificationResponse: (state) => state.updateCustomNotificationResponse,
        sendNotificationResponse: (state) => state.sendNotificationResponse
    },
    mutations: {
        SET_NOTIFICATIONS(state, data) {
            state.notifications = data;
        },
        SET_UPDATE_NOTIFICATION_RESPONSE(state, data) {
            state.updateNotificationResponse = data;
        },
        SET_SEND_NOTIFICATION_RESPONSE(state, data) {
            state.sendNotificationResponse = data;
        }
    },
    actions: {
        async getNotifications({ commit }) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`notifications`).then(
                (res) => {
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_NOTIFICATIONS", res.data)
                    }
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    this.dispatch('updateLoaderStatus', false)
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_NOTIFICATIONS", error.response.data);
                    }
                }
            );
        },

        async updateNotification({ commit }, data) {
            this.dispatch('updateLoaderStatus', true)
            await axios.put(`notifications/${data.id}`, {
                is_active: data.status_flag
            }).then(
                (res) => {
                    this.dispatch('updateLoaderStatus', false)
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_UPDATE_NOTIFICATION_RESPONSE", res.data);
                        commit("SET_NOTIFICATIONS", res.data);
                    }
                },
                (error) => {
                    this.dispatch('updateLoaderStatus', false)
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_UPDATE_NOTIFICATION_RESPONSE", error.response.data);
                    }
                }
            );
        },

        async sendNewNotification({ commit }, form) {
            this.dispatch('updateLoaderStatus', true)
            await axios.post(`notifications`, form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }).then(
                (res) => {
                    this.dispatch('updateLoaderStatus', false)
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_SEND_NOTIFICATION_RESPONSE", res.data);
                    }
                },
                (error) => {
                    this.dispatch('updateLoaderStatus', false)
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_SEND_NOTIFICATION_RESPONSE", error.response.data);
                    }
                }
            );
        },

    }
}