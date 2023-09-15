import axios from '../../axios'
import NProgress from "nprogress";

export default {
    state: {
        lessonTypes: [],
        lessonTypesToast: [],
        addLessonTypeResponse: [],
        updateLessonTypeResponse: []
    },
    getters: {
        lessonTypes: (state) => state.lessonTypes,
        lessonTypesToast: (state) => state.lessonTypesToast,
        addLessonTypeResponse: (state) => state.addLessonTypeResponse,
        updateLessonTypeResponse: (state) => state.updateLessonTypeResponse
    },
    mutations: {
        SET_LESSON_TYPES(state, data) {
            state.lessonTypes = data;
        },
        SET_TOAST(state, data) {
            state.lessonTypesToast = data;
        },
        SET_ADD_LESSON_TYPE_RESPONSE(state, data) {
            state.addLessonTypeResponse = data;
        },
        SET_UPDATE_LESSON_TYPE_RESPONSE(state, data) {
            state.updateLessonTypeResponse = data;
        }
    },
    actions: {
        async getLessonTypes({ commit }, data) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`lesson-types`, { params: data }).then(
                (res) => {
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_LESSON_TYPES", res.data.response);
                    }
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    this.dispatch('updateLoaderStatus', false)
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_LESSON_TYPES", error.response.data);
                    }
                }
            );
        },

        async addLessonType({ commit }, data) {
            NProgress.start();
            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                formData.append(key, value);
            });
            await axios.post("lesson-types", formData).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_LESSON_TYPES", res.data.response);
                        commit("SET_ADD_LESSON_TYPE_RESPONSE", res.data);
                    }
                },
                (error) => {
                    NProgress.done();
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_ADD_LESSON_TYPE_RESPONSE", error.response.data);
                    }
                }
            );
        },

        async updateLessonType({ commit }, data) {
            NProgress.start();
            const formData = new FormData();
            Object.entries(data.lesson_type).forEach(([key, value]) => {
                formData.append(key, value);
            });
            formData.append("_method", 'put');
            await axios.post(`lesson-types/${data.id}`, formData).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');    
                    } else {
                        commit("SET_LESSON_TYPES", res.data.response);
                        commit("SET_UPDATE_LESSON_TYPE_RESPONSE", res.data);
                    }
                },
                (error) => {
                    NProgress.done();
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_UPDATE_LESSON_TYPE_RESPONSE", error.response.data);
                    }
                }
            );
        },

        async deleteLessonType({ commit }, id) {
            NProgress.start();
            await axios.delete(`lesson-types/${id}`).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_LESSON_TYPES", res.data.response);
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