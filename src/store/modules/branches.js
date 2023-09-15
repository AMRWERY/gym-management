import axios from "../../axios";
import NProgress from "nprogress";

export default {
  state: {
    branches: [],
    branchById: null,
    branchesToast: [],
    addBranchResponse: [],
    updateBranchResponse: [],
  },
  getters: {
    branches: (state) => state.branches,
    branchById: (state) => state.branchById,
    branchesToast: (state) => state.branchesToast,
    addBranchResponse: (state) => state.addBranchResponse,
    updateBranchResponse: (state) => state.updateBranchResponse,
  },
  mutations: {
    SET_BRANCHES(state, data) {
      state.branches = data;
    },
    SET_BRANCH_BY_ID(state, data) {
      state.branchById = data;
    },
    SET_TOAST(state, data) {
      state.branchesToast = data;
    },
    SET_ADD_BRANCH_RESPONSE(state, data) {
      state.addBranchResponse = data;
    },
    SET_UPDATE_BRANCH_RESPONSE(state, data) {
      state.updateBranchResponse = data;
    },
  },
  actions: {
    async getBranches({ commit }, data) {
      this.dispatch("updateLoaderStatus", true);
      await axios.get(`branches`, { params: data }).then(
        (res) => {
          if (!res.data || res.data.code == 401) {
            // this.dispatch('logout');
          } else {
            commit("SET_BRANCHES", res.data.response);
          }
          this.dispatch("updateLoaderStatus", false);
        },
        (error) => {
          this.dispatch("updateLoaderStatus", false);
          if (!error.response || error.response.status == 401) {
            // this.dispatch('logout');
          } else {
            commit("SET_BRANCHES", error.response.data);
          }
        }
      );
    },
    async getBranchById({ commit }, id) {
        let url = "branches/" + id;
        await axios.get(url).then(
            (res) => {
                if (!res.data || res.data.code == 401) {
                  // this.dispatch('logout');
                }  else {
                    commit("SET_BRANCH_BY_ID", res.data.response);
                }
                this.dispatch("updateLoaderStatus", false);
              },
            (error) => {
                NProgress.done();
                if (!error.response || error.response.status == 401) {
                } else {
                    commit("SET_BRANCH_BY_ID", error.response.data);
                }
            }
        );
    },

    async addBranch({ commit }, data) {
      NProgress.start();
      let form = new FormData();
      form.append("logo_url", data.logo_url);
      form.append("suprema_group_id", data.suprema_group_id);
      form.append("name_en", data.name_en);
      form.append("name_ar", data.name_ar);
      form.append("address_en", data.address_en);
      form.append("address_ar", data.address_ar);
      form.append("invoice_type", data.invoice_type);
      form.append("invoice_prefix", data.invoice_prefix);
      form.append("branch_manager_name", data.branch_manager_name);
      form.append("contact_no", data.contact_no);
      form.append("terms_condition_en", data.terms_condition_en);
      form.append("terms_condition_ar", data.terms_condition_ar);
      form.append("remark", data.remark);
      form.append("is_active", data.is_active ? 1 : 0);

      await axios.post("branches", form).then(
        (res) => {
          NProgress.done();
          if (!res.data || res.data.code == 401) {
            // this.dispatch('logout');
          } else {
            let existingToken = JSON.parse(
              localStorage.getItem("userInfo")
            )?.token;
            res.data.response.token = existingToken;
            localStorage.setItem("userInfo", JSON.stringify(res.data.response));
            if (res.data.response.user.branches.length > 0) {
              localStorage.setItem(
                "selectedBranch",
                JSON.stringify(res.data.response.user.branches[0])
              );
            }
            commit("SET_BRANCHES", res.data.response);
            commit("SET_ADD_BRANCH_RESPONSE", res.data);
          }
        },
        (error) => {
          NProgress.done();
          if (!error.response || error.response.status == 401) {
            // this.dispatch('logout');
          } else {
            commit("SET_ADD_BRANCH_RESPONSE", error.response.data);
          }
        }
      );
    },

    async updateBranch({ commit }, data) {
      NProgress.start();
      let form = new FormData();

      if (data.logo_url) {
        form.append("logo_url", data.logo_url);
      }
      form.append("_method", "put");
      form.append("suprema_group_id", data.suprema_group_id);
      form.append("name_en", data.name_en);
      form.append("name_ar", data.name_ar);
      form.append("address_en", data.address_en);
      form.append("address_ar", data.address_ar);
      form.append("invoice_type", data.invoice_type);
      form.append("invoice_prefix", data.invoice_prefix);
      form.append("branch_manager_name", data.branch_manager_name);
      form.append("contact_no", data.contact_no);
      form.append("terms_condition_en", data.terms_condition_en);
      form.append("terms_condition_ar", data.terms_condition_ar);
      form.append("remark", data.remark);
      form.append("is_active", data.is_active ? 1 : 0);

      await axios.post(`branches/${data.id}`, form).then(
        (res) => {
          NProgress.done();
          if (!res.data || res.data.code == 401) {
            // this.dispatch('logout');
          } else {
            let existingToken = JSON.parse(
              localStorage.getItem("userInfo")
            )?.token;
            res.data.response.token = existingToken;
            localStorage.setItem("userInfo", JSON.stringify(res.data.response));
            if (res.data.response.user.branches.length > 0) {
              localStorage.setItem(
                "selectedBranch",
                JSON.stringify(res.data.response.user.branches[0])
              );
            }
            commit("SET_BRANCHES", res.data.response);
            commit("SET_UPDATE_BRANCH_RESPONSE", res.data);
          }
        },
        (error) => {
          NProgress.done();
          if (!error.response || error.response.status == 401) {
            // this.dispatch('logout');
          } else {
            commit("SET_UPDATE_BRANCH_RESPONSE", error.response.data);
          }
        }
      );
    },

    async deleteBranch({ commit }, id) {
      NProgress.start();
      await axios.delete(`branches/${id}`).then(
        (res) => {
          NProgress.done();
          if (!res.data || res.data.code == 401) {
            // this.dispatch('logout');
          } else {
            let existingToken = JSON.parse(
              localStorage.getItem("userInfo")
            )?.token;
            res.data.response.token = existingToken;
            localStorage.setItem("userInfo", JSON.stringify(res.data.response));
            if (res.data.response.user.branches.length > 0) {
              localStorage.setItem(
                "selectedBranch",
                JSON.stringify(res.data.response.user.branches[0])
              );
            }
            commit("SET_BRANCHES", res.data.response);
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
    },
  },
};
