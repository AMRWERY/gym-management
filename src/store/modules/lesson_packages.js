import axios from '../../axios'
import NProgress from "nprogress";

export default {
    state: {
        lessonPackages: [],
        lessonPackageById: null,
        lessonPackagesToast: [],
        addLessonPackageResponse: [],
        updateLessonPackageResponse: []
    },
    getters: {
        lessonPackages: (state) => state.lessonPackages,
        lessonPackageById: (state) => state.lessonPackageById,
        lessonPackagesToast: (state) => state.lessonPackagesToast,
        addLessonPackageResponse: (state) => state.addLessonPackageResponse,
        updateLessonPackageResponse: (state) => state.updateLessonPackageResponse
    },
    mutations: {
        SET_LESSON_PACKAGES(state, data) {
            state.lessonPackages = data;
        },
        SET_LESSON_PACKAGE_BY_ID(state, data) {
            state.lessonPackageById = data;
        },
        SET_TOAST(state, data) {
            state.lessonPackagesToast = data;
        },
        SET_ADD_LESSON_PACKAGE_RESPONSE(state, data) {
            state.addLessonPackageResponse = data;
        },
        SET_UPDATE_LESSON_PACKAGE_RESPONSE(state, data) {
            state.updateLessonPackageResponse = data;
        }
    },
    actions: {
        async getLessonPackages({ commit }, data) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`lesson-packages`, { params: data }).then(
                (res) => {
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_LESSON_PACKAGES", res.data.response);
                    }
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    this.dispatch('updateLoaderStatus', false)
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_LESSON_PACKAGES", error.response.data);
                    }
                }
            );
        },

        async getLessonPackageById({ commit }, id) {
            let url = "lesson-packages/" + id;
            await axios.get(url).then(
                (res) => {
                    if (!res.data || res.data.code == 401) {
                      // this.dispatch('logout');
                    }  else {
                        commit("SET_LESSON_PACKAGE_BY_ID", res.data.response);
                    }
                    this.dispatch("updateLoaderStatus", false);
                  },
                (error) => {
                    NProgress.done();
                    if (!error.response || error.response.status == 401) {
                    } else {
                        commit("SET_LESSON_PACKAGE_BY_ID", error.response.data);
                    }
                }
            );
        },

        async addLessonPackage({ commit }, data) {
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
            await axios.post("lesson-packages", formData).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_LESSON_PACKAGES", res.data.response);
                        commit("SET_ADD_LESSON_PACKAGE_RESPONSE", res.data);
                    }
                },
                (error) => {
                    NProgress.done();
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_ADD_LESSON_PACKAGE_RESPONSE", error.response.data);
                    }
                }
            );
        },

        async updateLessonPackage({ commit }, data) {
            NProgress.start();
            const formData = new FormData();
            Object.entries(data.lesson_package).forEach(([key, value]) => {
                if (key == "branch_ids") {
                    value.forEach((branch_id) => {
                        formData.append("branch_ids[]", branch_id);
                    });
                } else {
                    formData.append(key, value);
                }
            });
            formData.append("_method", 'put');
            await axios.post(`lesson-packages/${data.id}`, formData).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_LESSON_PACKAGES", res.data.response);
                        commit("SET_UPDATE_LESSON_PACKAGE_RESPONSE", res.data);
                    }
                },
                (error) => {
                    NProgress.done();
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_UPDATE_LESSON_PACKAGE_RESPONSE", error.response.data);
                    }
                }
            );
        },

        async deleteLessonPackage({ commit }, id) {
            NProgress.start();
            await axios.delete(`lesson-packages/${id}`).then(
                (res) => {
                    NProgress.done();
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_LESSON_PACKAGES", res.data.response);
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