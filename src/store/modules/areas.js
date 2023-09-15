import axios from '../../axios'
import NProgress from "nprogress";

export default {
    state: {
        areasResponse: {},
        areasToast: {},
    },
    getters: {
        areasResponse: (state) => state.areasResponse,
        areasToast: (state) => state.areasToast,
    },
    mutations: {
        SET_AREAS(state, data) {
            state.areasResponse = data;
        },
        SET_TOAST(state, data) {
            state.areasToast = data;
        }
    },
    actions: {
        async getAreas({ commit }, data) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`areas`, { params: data })
            .then(
                (res) => {
                    // if (res?.data?.code == 401) this.dispatch('logout');
                    if (res?.data?.response) commit("SET_AREAS", res.data.response);
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    // if (error?.response?.status == 401) this.dispatch('logout');
                    commit("SET_AREAS", {});
                    this.dispatch('updateLoaderStatus', false)
                }
            );
        },

        async addArea({ commit }, data) {
            NProgress.start();
            await axios.post("areas", data)
            .then(
                (res) => {
                    // if (res?.data?.code == 401) this.dispatch('logout');
                    if (res?.data?.response) commit("SET_AREAS", res.data.response);
                    if (res?.data) commit("SET_TOAST", res.data);
                    NProgress.done();
                },
                (error) => {

                    // if (error?.response?.status == 401) this.dispatch('logout');
                    commit("SET_AREAS", {});
                    commit("SET_TOAST", {}); 
                    NProgress.done();
                }
            );
        },

        async updateArea({ commit }, data) {
            NProgress.start();
            await axios.put(`areas/${data.id}`, data.form_data)
            .then(
                (res) => {
                    // if (res?.data?.code == 401) this.dispatch('logout');
                    if (res?.data?.response) commit("SET_AREAS", res.data.response);
                    if (res?.data) commit("SET_TOAST", res.data);
                    NProgress.done();
                },
                (error) => {
                    NProgress.done();
                    // if (error?.response?.status == 401) this.dispatch('logout');
                    commit("SET_AREAS", {});
                    commit("SET_TOAST", {}); 
                    NProgress.done();
                }
            );
        },

        async deleteArea({ commit }, id) {
            NProgress.start();
            await axios.delete(`areas/${id}`)
            .then(
                (res) => {
                    // if (res?.data?.code == 401) this.dispatch('logout');
                    if (res?.data?.response) commit("SET_AREAS", res.data.response);
                    if (res?.data) commit("SET_TOAST", res.data);
                    NProgress.done();
                },
                (error) => {
                    // if (error?.response?.status == 401) this.dispatch('logout');
                    commit("SET_AREAS", {});
                    commit("SET_TOAST", {}); 
                    NProgress.done();
                }
            );
        }
    }
}