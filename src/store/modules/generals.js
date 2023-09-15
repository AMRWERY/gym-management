import axios from '../../axios'
import NProgress from "nprogress";

export default {
    state: {
        generals: [],
        generalsToast: [],
        addGeneralResponse: [],
        updateGeneralResponse: []
    },
    getters: {
        generals: (state) => state.generals,
        generalsToast: (state) => state.generalsToast,
        addGeneralResponse: (state) => state.addGeneralResponse,
        updateGeneralResponse: (state) => state.updateGeneralResponse
    },
    mutations: {
        SET_GENERALS(state, data) {
            state.generals = data;
        },
        SET_TOAST(state, data) {
            state.generalsToast = data;
        },
        SET_ADD_GENERAL_RESPONSE(state, data) {
            state.addGeneralResponse = data;
        },
        SET_UPDATE_GENERAL_RESPONSE(state, data) {
            state.updateGeneralResponse = data;
        }
    },
    actions: {
        async getGenerals({ commit }, data) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`generals`, { params: data }).then(
                (res) => {
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_GENERALS", res.data.response);
                    }
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    this.dispatch('updateLoaderStatus', false)
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_GENERALS", error.response.data);
                    }
                }
            );
        },

        async addGeneral({ commit }, data) {
            NProgress.start();
            await axios.post("generals", data).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_GENERALS", res.data.response);
                        commit("SET_ADD_GENERAL_RESPONSE", res.data);
                    }
                },
                (error) => {
                    NProgress.done();
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_ADD_GENERAL_RESPONSE", error.response.data);
                    }
                }
            );
        },

        async updateGeneral({ commit }, data) {
            NProgress.start();
            await axios.put(`generals/${data.id}`, data).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_GENERALS", res.data.response);
                        commit("SET_UPDATE_GENERAL_RESPONSE", res.data);
                    }
                },
                (error) => {
                    NProgress.done();
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_UPDATE_GENERAL_RESPONSE", error.response.data);
                    }
                }
            );
        },

        async deleteGeneral({ commit }, id) {
            NProgress.start();
            await axios.delete(`generals/${id}`).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_GENERALS", res.data.response);
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