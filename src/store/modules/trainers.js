import axios from '../../axios'
import NProgress from "nprogress";

export default {
    state: {
        trainers: [],
        trainersToast: [],
        addTrainerResponse: [],
        updateTrainerResponse: []
    },
    getters: {
        trainers: (state) => state.trainers,
        trainersToast: (state) => state.trainersToast,
        addTrainerResponse: (state) => state.addTrainerResponse,
        updateTrainerResponse: (state) => state.updateTrainerResponse
    },
    mutations: {
        SET_TRAINERS(state, data) {
            state.trainers = data;
        },
        SET_TOAST(state, data) {
            state.trainersToast = data;
        },
        SET_ADD_TRAINER_RESPONSE(state, data) {
            state.addTrainerResponse = data;
        },
        SET_UPDATE_TRAINER_RESPONSE(state, data) {
            state.updateTrainerResponse = data;
        }
    },
    actions: {
        async getTrainers({ commit }, data) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`trainers`, { params: data }).then(
                (res) => {
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_TRAINERS", res.data.response);
                    }
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    this.dispatch('updateLoaderStatus', false)
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_TRAINERS", error.response.data);
                    }
                }
            );
        },

        async addTrainer({ commit }, data) {
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
            await axios.post("trainers", formData).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_TRAINERS", res.data.response);
                        commit("SET_ADD_TRAINER_RESPONSE", res.data);
                    }
                },
                (error) => {
                    NProgress.done();
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_ADD_TRAINER_RESPONSE", error.response.data);
                    }
                }
            );
        },

        async updateTrainer({ commit }, data) {
            NProgress.start();
            const formData = new FormData();
            Object.entries(data.trainer).forEach(([key, value]) => {
                if (key == "branch_ids") {
                    value.forEach((branch_id) => {
                        formData.append("branch_ids[]", branch_id);
                    });
                } else {
                    formData.append(key, value);
                }
            });
            formData.append("_method", 'put');
            await axios.post(`trainers/${data.id}`, formData).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_TRAINERS", res.data.response);
                        commit("SET_UPDATE_TRAINER_RESPONSE", res.data);
                    }
                },
                (error) => {
                    NProgress.done();
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_UPDATE_TRAINER_RESPONSE", error.response.data);
                    }
                }
            );
        },

        async deleteTrainer({ commit }, id) {
            NProgress.start();
            await axios.delete(`trainers/${id}`).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_TRAINERS", res.data.response);
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