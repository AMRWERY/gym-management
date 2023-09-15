import axios from '../../axios'
import NProgress from "nprogress";

export default {
    state: {
        items: [],
        itemInvoiceDetails: [],
        itemById: null,
        itemsToast: [],
        addItemResponse: [],
        updateItemResponse: []
    },
    getters: {
        items: (state) => state.items,
        itemInvoiceDetails: (state) => state.itemInvoiceDetails,
        itemById: (state) => state.itemById,
        itemsToast: (state) => state.itemsToast,
        addItemResponse: (state) => state.addItemResponse,
        updateItemResponse: (state) => state.updateItemResponse
    },
    mutations: {
        SET_ITEMS(state, data) {
            state.items = data;
        },
        SET_ITEM_INVOICE_DETAILS(state, data) {
            state.itemInvoiceDetails = data;
        },
        SET_ITEM_BY_ID(state, data) {
            state.itemById = data;
          },
        SET_TOAST(state, data) {
            state.itemsToast = data;
        },
        SET_ADD_ITEM_RESPONSE(state, data) {
            state.addItemResponse = data;
        },
        SET_UPDATE_ITEM_RESPONSE(state, data) {
            state.updateItemResponse = data;
        }
    },
    actions: {
        async getItems({ commit }, data) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`items`, { params: data }).then(
                (res) => {
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_ITEMS", res.data.response);
                    }
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    this.dispatch('updateLoaderStatus', false)
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_ITEMS", error.response.data);
                    }
                }
            );
        },

        async getItemById({ commit }, id) {
            let url = "items/" + id;
            await axios.get(url).then(
                (res) => {
                    if (!res.data || res.data.code == 401) {
                      // this.dispatch('logout');
                    }  else {
                        commit("SET_ITEM_BY_ID", res.data.response);
                    }
                    this.dispatch("updateLoaderStatus", false);
                  },
                (error) => {
                    NProgress.done();
                    if (!error.response || error.response.status == 401) {
                    } else {
                        commit("SET_ITEM_BY_ID", error.response.data);
                    }
                }
            );
        },

        async addItem({ commit }, data) {
            NProgress.start();

            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                if (key == 'branch_ids') {
                    value.forEach((branch_id) => {
                        formData.append("branch_ids[]", branch_id);
                    });
                } else {
                    formData.append(key, value);
                }
            });

            for (var pair of formData.entries()) {
              console.log(pair[0] + ": " + pair[1]);
            }

            await axios.post("items", formData).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_ITEMS", res.data.response);
                        commit("SET_ADD_ITEM_RESPONSE", res.data);
                    }
                },
                (error) => {
                    NProgress.done();
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_ADD_ITEM_RESPONSE", error.response.data);
                    }
                }
            );
        },

        async updateItem({ commit }, data) {
            NProgress.start();
            
            const formData = new FormData();
            Object.entries(data.item).forEach(([key, value]) => {
                if (key == "branch_ids") {
                    value.forEach((branch_id) => {
                        formData.append("branch_ids[]", branch_id);
                    });
                } else {
                    formData.append(key, value);
                }
            });
            formData.append("_method", 'put');

            await axios.post(`items/${data.id}`, formData).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_ITEMS", res.data.response);
                        commit("SET_UPDATE_ITEM_RESPONSE", res.data);
                    }
                },
                (error) => {
                    NProgress.done();
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_UPDATE_ITEM_RESPONSE", error.response.data);
                    }
                }
            );
        },

        async deleteItem({ commit }, id) {
            NProgress.start();
            await axios.delete(`items/${id}`).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_ITEMS", res.data.response);
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

        async getItemInvoiceDetails({ commit }, id) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`item-sales/${id}`).then(
                (res) => {
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_ITEM_INVOICE_DETAILS", res.data.response);
                    }
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    this.dispatch('updateLoaderStatus', false)
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_ITEM_INVOICE_DETAILS", error.response.data);
                    }
                }
            );
        },
    }
}