import axios from '../../axios'
import NProgress from "nprogress";

export default {
    state: {
        roles: [],
        rolesToast: [],
        addRoleResponse: [],
        updateRoleResponse: []
    },
    getters: {
        roles: (state) => state.roles,
        rolesToast: (state) => state.rolesToast,
        addRoleResponse: (state) => state.addRoleResponse,
        updateRoleResponse: (state) => state.updateRoleResponse
    },
    mutations: {
        SET_ROLES(state, data) {
            state.roles = data;
        },
        SET_TOAST(state, data) {
            state.rolesToast = data;
        },
        SET_ADD_ROLE_RESPONSE(state, data) {
            state.addRoleResponse = data;
        },
        SET_UPDATE_ROLE_RESPONSE(state, data) {
            state.updateRoleResponse = data;
        }
    },
    actions: {
        async getRoles({ commit }, data) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`admin-groups`, { params: data }).then(
                (res) => {
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_ROLES", res.data.response);
                    }
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    this.dispatch('updateLoaderStatus', false)
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_ROLES", error.response.data);
                    }
                }
            );
        },

        async addRole({ commit }, data) {
            NProgress.start();
            await axios.post("admin-groups", data).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_ROLES", res.data.response);
                        commit("SET_ADD_ROLE_RESPONSE", res.data);
                    }
                },
                (error) => {
                    NProgress.done();
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_ADD_ROLE_RESPONSE", error.response.data);
                    }
                }
            );
        },

        async updateRole({ commit }, data) {
            NProgress.start();
            await axios.put(`admin-groups/${data.id}`, data).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_ROLES", res.data.response);
                        commit("SET_UPDATE_ROLE_RESPONSE", res.data);
                    }
                },
                (error) => {
                    NProgress.done();
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_UPDATE_ROLE_RESPONSE", error.response.data);
                    }
                }
            );
        },

        async deleteRole({ commit }, id) {
            NProgress.start();
            await axios.delete(`admin-groups/${id}`).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_ROLES", res.data.response);
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