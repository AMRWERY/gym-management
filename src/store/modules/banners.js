import axios from '../../axios'
import NProgress from "nprogress";

export default {
    state: {
        bannersResponse: [],
        bannersToast: {},
    },
    getters: {
        bannersResponse: (state) => state.bannersResponse,
        bannersToast: (state) => state.bannersToast,
    },
    mutations: {
        SET_BANNERS(state, data) {
            state.bannersResponse = data;
        },
        SET_TOAST(state, data) {
            state.bannersToast = data;
        }
    },
    actions: {
        async getBanners({ commit }, data) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`banners`, { params: data })
            .then(
                (res) => {
                    // if (res?.data?.code == 401) this.dispatch('logout');
                    if (res?.data?.response) commit("SET_BANNERS", res.data.response);
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    // if (error?.response?.status == 401) this.dispatch('logout');
                    commit("SET_BANNERS", []);
                    this.dispatch('updateLoaderStatus', false)
                }
            );
        },

        async addBanner({ commit }, data) {

            NProgress.start();
            let form = new FormData();
            form.append("image", data.image);
            form.append("is_active", data.is_active);
            
            await axios
              .post("banners", form, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
              .then(
                (res) => {
                  // if (res?.data?.code == 401) this.dispatch("logout");
                  if (res?.data?.response)
                    commit("SET_BANNERS", res.data.response);
                  if (res?.data) commit("SET_TOAST", res.data);
                  NProgress.done();
                },
                (error) => {
                  // if (error?.response?.status == 401) this.dispatch("logout");
                  commit("SET_BANNERS", []);
                  commit("SET_TOAST", {});
                  NProgress.done();
                }
              );
        },

        async updateBanner({ commit }, data) {

            console.log(data);
            NProgress.start();
            let form = new FormData();
            if (data.form_data.image) { form.append("image", data.form_data.image); }
            form.append("is_active", data.form_data.is_active);
            form.append("_method", "PUT");
            await axios
              .post(`banners/${data.id}`, form, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
              .then(
                (res) => {
                  // if (res?.data?.code == 401) this.dispatch("logout");
                  if (res?.data?.response)
                    commit("SET_BANNERS", res.data.response);
                  if (res?.data) commit("SET_TOAST", res.data);
                  NProgress.done();
                },
                (error) => {
                  NProgress.done();
                  // if (error?.response?.status == 401) this.dispatch("logout");
                  commit("SET_BANNERS", []);
                  commit("SET_TOAST", {});
                  NProgress.done();
                }
              );
        },

        async deleteBanner({ commit }, id) {
            NProgress.start();
            await axios.delete(`banners/${id}`)
            .then(
                (res) => {
                    // if (res?.data?.code == 401) this.dispatch('logout');
                    if (res?.data?.response) commit("SET_BANNERS", res.data.response);
                    if (res?.data) commit("SET_TOAST", res.data);
                    NProgress.done();
                },
                (error) => {
                    // if (error?.response?.status == 401) this.dispatch('logout');
                    commit("SET_BANNERS", []);
                    commit("SET_TOAST", {}); 
                    NProgress.done();
                }
            );
        }
    }
}