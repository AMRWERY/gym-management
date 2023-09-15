import axios from '../../axios'
import NProgress from "nprogress";

export default {
    state: {
        members: [],
        memberDetails: [],
        membersToast: [],
        addMemberResponse: [],
        updateMemberResponse: []
    },
    getters: {
        members: (state) => state.members,
        memberDetails: (state) => state.memberDetails,
        membersToast: (state) => state.membersToast,
        addMemberResponse: (state) => state.addMemberResponse,
        updateMemberResponse: (state) => state.updateMemberResponse
    },
    mutations: {
        SET_MEMBERS(state, data) {
            state.members = data;
        },
        SET_MEMBER_DETAILS(state, data) {
            state.memberDetails = data;
        },
        SET_TOAST(state, data) {
            state.membersToast = data;
        },
        SET_ADD_MEMBER_RESPONSE(state, data) {
            state.addMemberResponse = data;
        },
        SET_UPDATE_MEMBER_RESPONSE(state, data) {
            state.updateMemberResponse = data;
        }
    },
    actions: {
        async getMembers({ commit }, data) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`members`, { params: data }).then(
                (res) => {
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_MEMBERS", res.data.response);
                    }
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    this.dispatch('updateLoaderStatus', false)
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_MEMBERS", error.response.data);
                    }
                }
            );
        },

        async getMemberDetails({ commit }, id) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`members/${id}`).then(
                (res) => {
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_MEMBER_DETAILS", res.data.response);
                    }
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    this.dispatch('updateLoaderStatus', false)
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_MEMBER_DETAILS", error.response.data);
                    }
                }
            );
        },

        async addMember({ commit }, data) {
            NProgress.start();
            let form = new FormData();
            form.append("image", data.image)
            form.append("civil_id", data.civil_id)
            form.append("passport", data.passport)
            form.append("mobile", data.mobile)
            form.append("alt_mobile", data.alt_mobile)
            form.append("civil_id_expiry", data.civil_id_expiry)
            form.append("code", data.code)
            form.append("ref_code", data.ref_code)
            form.append("name_en", data.name_en)
            form.append("name_ar", data.name_ar)
            form.append("gender", data.gender)
            form.append("birth_date", data.birth_date)
            form.append("age", data.age)
            form.append("email", data.email)
            form.append("address", data.address)
            form.append("area_id", data.area_id)
            form.append("country_id", data.country_id)
            form.append("blacklisted", data.blacklisted ? 1 : 0)
            form.append("black_listed_till", data.black_listed_till)
            form.append("company_name", data.company_name)
            form.append("company_type", data.company_type)
            form.append("remark", data.remark)

            await axios.post("members", form).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_MEMBERS", res.data.response);
                        commit("SET_ADD_MEMBER_RESPONSE", res.data);
                    }
                },
                (error) => {
                    NProgress.done();
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_ADD_MEMBER_RESPONSE", error.response.data);
                    }
                }
            );
        },

        async updateMember({ commit }, data) {
            NProgress.start();
            let form = new FormData();
            if(data.image){
                form.append("image", data.image)
            }
            form.append("civil_id", data.civil_id)
            form.append("passport", data.passport)
            form.append("mobile", data.mobile)
            form.append("alt_mobile", data.alt_mobile)
            form.append("civil_id_expiry", data.civil_id_expiry)
            form.append("code", data.code)
            form.append("ref_code", data.ref_code)
            form.append("name_en", data.name_en)
            form.append("name_ar", data.name_ar)
            form.append("gender", data.gender)
            form.append("birth_date", data.birth_date)
            form.append("age", data.age)
            form.append("email", data.email)
            form.append("address", data.address)
            form.append("area_id", data.area_id)
            form.append("country_id", data.country_id)
            form.append("blacklisted", data.blacklisted ? 1 : 0)
            form.append("black_listed_till", data.black_listed_till)
            form.append("company_name", data.company_name)
            form.append("company_type", data.company_type)
            form.append("remark", data.remark)
            form.append("_method", 'put')

            await axios.post(`members/${data.id}`, form).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_MEMBERS", res.data.response);
                        commit("SET_UPDATE_MEMBER_RESPONSE", res.data);
                    }
                },
                (error) => {
                    NProgress.done();
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_UPDATE_MEMBER_RESPONSE", error.response.data);
                    }
                }
            );
        },

        async deleteMember({ commit }, id) {
            NProgress.start();
            await axios.delete(`members/${id}`).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_MEMBERS", res.data.response);
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