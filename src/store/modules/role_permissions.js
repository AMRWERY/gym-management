import axios from '../../axios'

export default {
    state: {
        userRoles: [],
        groupRights: [],
        updateGroupRightsResponse: []
    },
    getters: {
        userRoles: (state) => state.userRoles,
        groupRights: (state) => state.groupRights,
        updateGroupRightsResponse: (state) => state.updateGroupRightsResponse
    },
    mutations: {
        SET_USER_ROLES_RESPONSE(state, data) {
            state.userRoles = data;
        },
        SET_GROUP_RIGHTS_RESPONSE(state, data) {
            state.groupRights = data;
        },
        SET_UPDATE_GROUP_RIGHTS_RESPONSE(state, data) {
            state.updateGroupRightsResponse = data;
        }
    },
    actions: {

        async getUserRoles({ commit }) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`admin-groups`).then(
                (res) => {
                    this.dispatch('updateLoaderStatus', false)
                    if(res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_USER_ROLES_RESPONSE", res.data);
                    }
                },
                (error) => {
                    this.dispatch('updateLoaderStatus', false)
                    if (error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_USER_ROLES_RESPONSE", error.response.data);
                    }
                }
            );
        },

        async getGroupRights({ commit }, id) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`admin-groups/${id}`).then(
                (res) => {
                    this.dispatch('updateLoaderStatus', false)
                    if(res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_GROUP_RIGHTS_RESPONSE", res.data);
                    }
                },
                (error) => {
                    this.dispatch('updateLoaderStatus', false)
                    if (error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_GROUP_RIGHTS_RESPONSE", error.response.data);
                    }
                }
            );
        },

        async updateGroupRights({ commit }, data) {
            this.dispatch('updateLoaderStatus', true)
            await axios.put(`admin-groups/${data.id}`, {
                type: data.type,
                permission_id: data.permission_id
            }).then(
                (res) => {
                    this.dispatch('updateLoaderStatus', false)
                    if(res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        let existingToken = JSON.parse(localStorage.getItem("userInfo"))?.token
                        res.data.response.token = existingToken

                        localStorage.setItem("userInfo", JSON.stringify(res.data.response));
                        if(res.data.response.user.branches.length > 0){
                            localStorage.setItem("selectedBranch", JSON.stringify(res.data.response.user.branches[0]))
                        }
                        commit("SET_UPDATE_GROUP_RIGHTS_RESPONSE", res.data);
                    }
                },
                (error) => {
                    this.dispatch('updateLoaderStatus', false)
                    if (error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_UPDATE_GROUP_RIGHTS_RESPONSE", res.data);
                    }
                }
            );
        },

    }
}