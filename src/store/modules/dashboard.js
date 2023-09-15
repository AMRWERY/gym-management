import axios from '../../axios'

export default {
    state: {
        dashboardStats: []
    },
    getters: {
        dashboardStats: (state) => state.dashboardStats
    },
    mutations: {
        SET_DASHBOARD_STATS(state, data) {
            state.dashboardStats = data;
        }
    },
    actions: {
        async getDashboardStats({ commit }, data) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`dashboard`, { params: data }).then(
                (res) => {
                    if(!res.data || res.data.code == 401) {
                        this.dispatch('logout');
                    } else {
                        commit("SET_DASHBOARD_STATS", res.data.response);
                    }
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    this.dispatch('updateLoaderStatus', false)
                    if (!error.response || error.response.status == 401) {
                        this.dispatch('logout');
                    } else {
                        commit("SET_DASHBOARD_STATS", error.response.data);
                    }
                }
            );
        }

    }
}