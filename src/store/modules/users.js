import axios from '../../axios'
import NProgress from "nprogress";

export default {
    state: {
        users: [],
        usersToast: [],
        addUserResponse: [],
        updateUserResponse: []
    },
    getters: {
        users: (state) => state.users,
        usersToast: (state) => state.usersToast,
        addUserResponse: (state) => state.addUserResponse,
        updateUserResponse: (state) => state.updateUserResponse
    },
    mutations: {
        SET_USERS(state, data) {
            state.users = data;
        },
        SET_TOAST(state, data) {
            state.usersToast = data;
        },
        SET_ADD_USER_RESPONSE(state, data) {
            state.addUserResponse = data;
        },
        SET_UPDATE_USER_RESPONSE(state, data) {
            state.updateUserResponse = data;
        }
    },
    actions: {
        async getUsers({ commit }, data) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`users`, { params: data }).then(
                (res) => {
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_USERS", res.data.response);
                    }
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    this.dispatch('updateLoaderStatus', false)
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_USERS", error.response.data);
                    }
                }
            );
        },

        async addUser({ commit }, data) {
            NProgress.start();
            await axios.post("users", data).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_USERS", res.data.response);
                        commit("SET_ADD_USER_RESPONSE", res.data);
                    }
                },
                (error) => {
                    NProgress.done();
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_ADD_USER_RESPONSE", error.response.data);
                    }
                }
            );
        },

        async updateUser({ commit }, data) {
            NProgress.start();
            await axios.put(`users/${data.id}`, data).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_USERS", res.data.response);
                        commit("SET_UPDATE_USER_RESPONSE", res.data);
                    }
                },
                (error) => {
                    NProgress.done();
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_UPDATE_USER_RESPONSE", error.response.data);
                    }
                }
            );
        },

        async deleteUser({ commit }, id) {
            NProgress.start();
            await axios.delete(`users/${id}`).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_USERS", res.data.response);
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