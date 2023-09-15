import axios from '../../axios'
import NProgress from "nprogress";

export default {
    state: {
        lessonConfigurations: [],
        lessonConfigurationsToast: [],
        addLessonConfigurationResponse: [],
        updateLessonConfigurationResponse: []
    },
    getters: {
        lessonConfigurations: (state) => state.lessonConfigurations,
        lessonConfigurationsToast: (state) => state.lessonConfigurationsToast,
        addLessonConfigurationResponse: (state) => state.addLessonConfigurationResponse,
        updateLessonConfigurationResponse: (state) => state.updateLessonConfigurationResponse
    },
    mutations: {
        SET_LESSON_CONFIGURATIONS(state, data) {
            state.lessonConfigurations = data;
        },
        SET_TOAST(state, data) {
            state.lessonConfigurationsToast = data;
        },
        SET_ADD_LESSON_CONFIGURATION_RESPONSE(state, data) {
            state.addLessonConfigurationResponse = data;
        },
        SET_UPDATE_LESSON_CONFIGURATION_RESPONSE(state, data) {
            state.updateLessonConfigurationResponse = data;
        }
    },
    actions: {
        async getLessonConfigurations({ commit }, id) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`lesson-configurations/${id}`).then(
                (res) => {
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_LESSON_CONFIGURATIONS", res.data.response);
                    }
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    this.dispatch('updateLoaderStatus', false)
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_LESSON_CONFIGURATIONS", error.response.data);
                    }
                }
            );
        },

        async addLessonConfiguration({ commit }, data) {
            NProgress.start();
            await axios.post("lesson-configurations", data).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_LESSON_CONFIGURATIONS", res.data.response);
                        commit("SET_ADD_LESSON_CONFIGURATION_RESPONSE", res.data);
                    }
                },
                (error) => {
                    NProgress.done();
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_ADD_LESSON_CONFIGURATION_RESPONSE", error.response.data);
                    }
                }
            );
        },

        async updateLessonConfiguration({ commit }, data) {
            NProgress.start();
            await axios.put(`lesson-configurations/${data.id}`, data).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_LESSON_CONFIGURATIONS", res.data.response);
                        commit("SET_UPDATE_LESSON_CONFIGURATION_RESPONSE", res.data);
                    }
                },
                (error) => {
                    NProgress.done();
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_UPDATE_LESSON_CONFIGURATION_RESPONSE", error.response.data);
                    }
                }
            );
        },

        async deleteLessonConfiguration({ commit }, id) {
            NProgress.start();
            await axios.delete(`lesson-configurations/${id}`).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_LESSON_CONFIGURATIONS", res.data.response);
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