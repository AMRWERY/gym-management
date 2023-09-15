import axios from '../../axios'
import NProgress from "nprogress";

export default {
    state: {
        membershipPackages: [],
        memberShipPackageById: null,
        membershipPackagesToast: [],
        addMembershipPackageResponse: [],
        updateMembershipPackageResponse: []
    },
    getters: {
        membershipPackages: (state) => state.membershipPackages,
        memberShipPackageById: (state) => state.memberShipPackageById,
        membershipPackagesToast: (state) => state.membershipPackagesToast,
        addMembershipPackageResponse: (state) => state.addMembershipPackageResponse,
        updateMembershipPackageResponse: (state) => state.updateMembershipPackageResponse
    },
    mutations: {
        SET_MEMBERSHIP_PACKAGES(state, data) {
            state.membershipPackages = data;
        },
        SET_MEMBERSHIP_PACKAGES_BY_ID(state, data) {
            state.memberShipPackageById = data;
        },
        SET_TOAST(state, data) {
            state.membershipPackagesToast = data;
        },
        SET_ADD_MEMBERSHIP_PACKAGE_RESPONSE(state, data) {
            state.addMembershipPackageResponse = data;
        },
        SET_UPDATE_MEMBERSHIP_PACKAGE_RESPONSE(state, data) {
            state.updateMembershipPackageResponse = data;
        }
    },
    actions: {
        async getMembershipPackages({ commit }, data) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`membership-packages`, { params: data }).then(
                (res) => {
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_MEMBERSHIP_PACKAGES", res.data.response);
                    }
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    this.dispatch('updateLoaderStatus', false)
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_MEMBERSHIP_PACKAGES", error.response.data);
                    }
                }
            );
        },

        async getMembershipPackageById({ commit }, id) {
            let url = "membership-packages/" + id;
            await axios.get(url).then(
                (res) => {
                    if (!res.data || res.data.code == 401) {
                      // this.dispatch('logout');
                    }  else {
                        commit("SET_MEMBERSHIP_PACKAGES_BY_ID", res.data.response);
                    }
                    this.dispatch("updateLoaderStatus", false);
                  },
                (error) => {
                    NProgress.done();
                    if (!error.response || error.response.status == 401) {
                    } else {
                        commit("SET_MEMBERSHIP_PACKAGES_BY_ID", error.response.data);
                    }
                }
            );
        },

        async addMembershipPackage({ commit }, data) {
            NProgress.start();
            await axios.post("membership-packages", data).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_MEMBERSHIP_PACKAGES", res.data.response);
                        commit("SET_ADD_MEMBERSHIP_PACKAGE_RESPONSE", res.data);
                    }
                },
                (error) => {
                    NProgress.done();
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_ADD_MEMBERSHIP_PACKAGE_RESPONSE", error.response.data);
                    }
                }
            );
        },

        async updateMembershipPackage({ commit }, data) {
            NProgress.start();
            await axios.put(`membership-packages/${data.id}`, data).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_MEMBERSHIP_PACKAGES", res.data.response);
                        commit("SET_UPDATE_MEMBERSHIP_PACKAGE_RESPONSE", res.data);
                    }
                },
                (error) => {
                    NProgress.done();
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_UPDATE_MEMBERSHIP_PACKAGE_RESPONSE", error.response.data);
                    }
                }
            );
        },

        async deleteMembershipPackage({ commit }, id) {
            NProgress.start();
            await axios.delete(`membership-packages/${id}`).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_MEMBERSHIP_PACKAGES", res.data.response);
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