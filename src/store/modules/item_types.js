import axios from '../../axios'
import NProgress from "nprogress";

export default {
    state: {
        itemTypes: [],
        itemTypesToast: [],
        addItemTypeResponse: [],
        updateItemTypeResponse: []
    },
    getters: {
        itemTypes: (state) => state.itemTypes,
        itemTypesToast: (state) => state.itemTypesToast,
        addItemTypeResponse: (state) => state.addItemTypeResponse,
        updateItemTypeResponse: (state) => state.updateItemTypeResponse
    },
    mutations: {
        SET_ITEM_TYPES(state, data) {
            state.itemTypes = data;
        },
        SET_TOAST(state, data) {
            state.itemTypesToast = data;
        },
        SET_ADD_ITEM_TYPE_RESPONSE(state, data) {
            state.addItemTypeResponse = data;
        },
        SET_UPDATE_ITEM_TYPE_RESPONSE(state, data) {
            state.updateItemTypeResponse = data;
        }
    },
    actions: {
        async getItemTypes({ commit }, data) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`item-types`, { params: data }).then(
                (res) => {
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_ITEM_TYPES", res.data.response);
                    }
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    this.dispatch('updateLoaderStatus', false)
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_ITEM_TYPES", error.response.data);
                    }
                }
            );
        },

        async addItemType({ commit }, data) {
            NProgress.start();
            await axios.post("item-types", data).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_ITEM_TYPES", res.data.response);
                        commit("SET_ADD_ITEM_TYPE_RESPONSE", res.data);
                    }
                },
                (error) => {
                    NProgress.done();
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_ADD_ITEM_TYPE_RESPONSE", error.response.data);
                    }
                }
            );
        },

        async updateItemType({ commit }, data) {
            NProgress.start();
            await axios.put(`item-types/${data.id}`, data).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_ITEM_TYPES", res.data.response);
                        commit("SET_UPDATE_ITEM_TYPE_RESPONSE", res.data);
                    }
                },
                (error) => {
                    NProgress.done();
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_UPDATE_ITEM_TYPE_RESPONSE", error.response.data);
                    }
                }
            );
        },

        async deleteItemType({ commit }, id) {
            NProgress.start();
            await axios.delete(`item-types/${id}`).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_ITEM_TYPES", res.data.response);
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