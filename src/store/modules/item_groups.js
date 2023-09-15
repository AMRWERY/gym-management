import axios from '../../axios'
import NProgress from "nprogress";

export default {
    state: {
        itemGroups: [],
        itemGroupsToast: [],
        addItemGroupResponse: [],
        updateItemGroupResponse: []
    },
    getters: {
        itemGroups: (state) => state.itemGroups,
        itemGroupsToast: (state) => state.itemGroupsToast,
        addItemGroupResponse: (state) => state.addItemGroupResponse,
        updateItemGroupResponse: (state) => state.updateItemGroupResponse
    },
    mutations: {
        SET_ITEM_GROUPS(state, data) {
            state.itemGroups = data;
        },
        SET_TOAST(state, data) {
            state.itemGroupsToast = data;
        },
        SET_ADD_ITEM_GROUP_RESPONSE(state, data) {
            state.addItemGroupResponse = data;
        },
        SET_UPDATE_ITEM_GROUP_RESPONSE(state, data) {
            state.updateItemGroupResponse = data;
        }
    },
    actions: {
        async getItemGroups({ commit }, data) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`item-groups`, { params: data }).then(
                (res) => {
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_ITEM_GROUPS", res.data.response);
                    }
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    this.dispatch('updateLoaderStatus', false)
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_ITEM_GROUPS", error.response.data);
                    }
                }
            );
        },

        async addItemGroup({ commit }, data) {
            NProgress.start();
            await axios.post("item-groups", data).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_ITEM_GROUPS", res.data.response);
                        commit("SET_ADD_ITEM_GROUP_RESPONSE", res.data);
                    }
                },
                (error) => {
                    NProgress.done();
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_ADD_ITEM_GROUP_RESPONSE", error.response.data);
                    }
                }
            );
        },

        async updateItemGroup({ commit }, data) {
            NProgress.start();
            await axios.put(`item-groups/${data.id}`, data).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_ITEM_GROUPS", res.data.response);
                        commit("SET_UPDATE_ITEM_GROUP_RESPONSE", res.data);
                    }
                },
                (error) => {
                    NProgress.done();
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_UPDATE_ITEM_GROUP_RESPONSE", error.response.data);
                    }
                }
            );
        },

        async deleteItemGroup({ commit }, id) {
            NProgress.start();
            await axios.delete(`item-groups/${id}`).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_ITEM_GROUPS", res.data.response);
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