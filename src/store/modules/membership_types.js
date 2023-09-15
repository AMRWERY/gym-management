import axios from '../../axios'
import NProgress from "nprogress";

export default {
    state: {
        membershipTypes: [],
        membershipTypesToast: [],
        addMembershipTypeResponse: [],
        updateMembershipTypeResponse: []
    },
    getters: {
        membershipTypes: (state) => state.membershipTypes,
        membershipTypesToast: (state) => state.membershipTypesToast,
        addMembershipTypeResponse: (state) => state.addMembershipTypeResponse,
        updateMembershipTypeResponse: (state) => state.updateMembershipTypeResponse
    },
    mutations: {
        SET_MEMBERSHIP_TYPES(state, data) {
            state.membershipTypes = data;
        },
        SET_TOAST(state, data) {
            state.membershipTypesToast = data;
        },
        SET_ADD_MEMBERSHIP_TYPE_RESPONSE(state, data) {
            state.addMembershipTypeResponse = data;
        },
        SET_UPDATE_MEMBERSHIP_TYPE_RESPONSE(state, data) {
            state.updateMembershipTypeResponse = data;
        }
    },
    actions: {
        async getMembershipTypes({ commit }, data) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`membership-types`, { params: data }).then(
                (res) => {
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_MEMBERSHIP_TYPES", res.data.response);
                    }
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    this.dispatch('updateLoaderStatus', false)
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_MEMBERSHIP_TYPES", error.response.data);
                    }
                }
            );
        },

        async addMembershipType({ commit }, data) {
            console.log(data);
            NProgress.start();
            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                if (key == "branch_ids") {
                    value.forEach((branch_id) => {
                        formData.append("branch_ids[]", branch_id);
                    });
                } else {
                    formData.append(key, value);
                }
            });
            await axios.post("membership-types", formData).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_MEMBERSHIP_TYPES", res.data.response);
                        commit("SET_ADD_MEMBERSHIP_TYPE_RESPONSE", res.data);
                    }
                },
                (error) => {
                    NProgress.done();
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_ADD_MEMBERSHIP_TYPE_RESPONSE", error.response.data);
                    }
                }
            );
        },

        async updateMembershipType({ commit }, data) {
            NProgress.start();
            await axios.put(`membership-types/${data.id}`, data.membership_type).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_MEMBERSHIP_TYPES", res.data.response);
                        commit("SET_UPDATE_MEMBERSHIP_TYPE_RESPONSE", res.data);
                    }
                },
                (error) => {
                    NProgress.done();
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_UPDATE_MEMBERSHIP_TYPE_RESPONSE", error.response.data);
                    }
                }
            );
        },

        async deleteMembershipType({ commit }, id) {
            NProgress.start();
            await axios.delete(`membership-types/${id}`).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_MEMBERSHIP_TYPES", res.data.response);
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