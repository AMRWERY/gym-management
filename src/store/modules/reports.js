import axios from '../../axios'
import NProgress from "nprogress";

export default {
    state: {
        salesSummary: [],
        salesSummaryForm: [],
        paymentSummary: [],
        paymentSummaryForm: [],
        lockerRefundSummary: [],
        lockerRefundSummaryForm: [],
        trainerCommissionReport: [],
        trainerCommissionReportForm: [],
        itemSalesReport: [],
        itemSalesReportForm: [],
        freezeReportFormData: {},
        freezeReportData: {},
        membershipSummaryFormData: {},
        membershipSummaryData: {},
        userTransactionFormData: [],
        userTransactionData: [],
        memberExpiryFormData: [],
        memberExpiryData: {},
        trainerAttendanceFormData: {},
        trainerAttendanceData: {},
        memberLessonFormData: {},
        memberLessonData: {},
        dailyMonthlyFormData: [],
        dailyMonthlyData: {},
        ageWiseFormData: [],
        ageWiseData: {},

        invoiceReprintFormData: [],
        invoiceReprintData: {},
        invoiceReprintDetails: {},

        packageWiseFormData: [],
        packageWiseData: {},

        areaWiseFormData: {},
        areaWiseData: {},

        moduleWiseFormData: [],
        moduleWiseData: {},
    },
    getters: {
        salesSummary: (state) => state.salesSummary,
        salesSummaryForm: (state) => state.salesSummaryForm,
        paymentSummary: (state) => state.paymentSummary,
        paymentSummaryForm: (state) => state.paymentSummaryForm,
        lockerRefundSummary: (state) => state.lockerRefundSummary,
        lockerRefundSummaryForm: (state) => state.lockerRefundSummaryForm,
        trainerCommissionReport: (state) => state.trainerCommissionReport,
        trainerCommissionReportForm: (state) => state.trainerCommissionReportForm,
        itemSalesReport: (state) => state.itemSalesReport,
        itemSalesReportForm: (state) => state.itemSalesReportForm,
        freezeReportFormData: (state) => state.freezeReportFormData,
        freezeReportData: (state) => state.freezeReportData,
        membershipSummaryFormData: (state) => state.membershipSummaryFormData,
        membershipSummaryData: (state) => state.membershipSummaryData,
        userTransactionFormData: (state) => state.userTransactionFormData,
        userTransactionData: (state) => state.userTransactionData,
        memberExpiryFormData: (state) => state.memberExpiryFormData,
        memberExpiryData: (state) => state.memberExpiryData,
        trainerAttendanceFormData: (state) => state.trainerAttendanceFormData,
        trainerAttendanceData: (state) => state.trainerAttendanceData,
        memberLessonFormData: (state) => state.memberLessonFormData,
        memberLessonData: (state) => state.memberLessonData,
        dailyMonthlyFormData: (state) => state.dailyMonthlyFormData,
        dailyMonthlyData: (state) => state.dailyMonthlyData,
        ageWiseFormData: (state) => state.ageWiseFormData,
        ageWiseData: (state) => state.ageWiseData,
        invoiceReprintFormData: (state) => state.invoiceReprintFormData,
        invoiceReprintData: (state) => state.invoiceReprintData,
        invoiceReprintDetails: (state) => state.invoiceReprintDetails,
        packageWiseFormData: (state) => state.packageWiseFormData,
        packageWiseData: (state) => state.packageWiseData,

        moduleWiseFormData: (state) => state.moduleWiseFormData,
        moduleWiseData: (state) => state.moduleWiseData,

        areaWiseFormData: (state) => state.areaWiseFormData,
        areaWiseData: (state) => state.areaWiseData,
    },
    mutations: {
        SET_SALES_SUMMARY(state, data) {
            state.salesSummary = data;
        },
        SET_SALES_SUMMARY_FORM(state, data) {
            state.salesSummaryForm = data;
        },
        SET_PAYMENT_SUMMARY(state, data) {
            state.paymentSummary = data;
        },
        SET_PAYMENT_SUMMARY_FORM(state, data) {
            state.paymentSummaryForm = data;
        },
        SET_LOCKER_REFUND_SUMMARY(state, data) {
            state.lockerRefundSummary = data;
        },
        SET_LOCKER_REFUND_SUMMARY_FORM(state, data) {
            state.lockerRefundSummaryForm = data;
        },
        SET_TRAINER_COMMISSION_REPORT_FORM(state, data) {
            state.trainerCommissionReportForm = data;
        },
        SET_TRAINER_COMMISSION_REPORT(state, data) {
            state.trainerCommissionReport = data;
        },
        SET_ITEM_SALES_REPORT_FORM(state, data) {
            state.itemSalesReportForm = data;
        },
        SET_ITEM_SALES_REPORT(state, data) {
            state.itemSalesReport = data;
        },
        SET_FREEZE_REPORT_FORM_DATA(state, data) {
            state.freezeReportFormData = data;
        },
        SET_FREEZE_REPORT_DATA(state, data) {
            state.freezeReportData = data;
        },
        SET_MEMBERSHIP_SUMMARY_FORM_DATA(state, data) {
            state.membershipSummaryFormData = data;
        },
        SET_MEMBERSHIP_SUMMARY_DATA(state, data) {
            state.membershipSummaryData = data;
        },
        SET_USER_TRANSACTION_FORM_DATA(state, data) {
            state.userTransactionFormData = data;
        },
        SET_USER_TRANSACTION_DATA(state, data) {
            state.userTransactionData = data;
        },
        SET_MEMBER_EXPIRY_FORM_DATA(state, data) {
            state.memberExpiryFormData = data;
        },
        SET_MEMBER_EXPIRY_DATA(state, data) {
            state.memberExpiryData = data;
        },
        SET_TRAINER_ATTENDANCE_FORM_DATA(state, data) {
            state.trainerAttendanceFormData = data;
        },
        SET_TRAINER_ATTENDANCE_DATA(state, data) {
            state.trainerAttendanceData = data;
        },
        SET_MEMBER_LESSON_FORM_DATA(state, data) {
            state.memberLessonFormData = data;
        },
        SET_MEMBER_LESSON_DATA(state, data) {
            state.memberLessonData = data;
        },
        SET_DAILY_MONTHLY_FORM_DATA(state, data) {
            state.dailyMonthlyFormData = data;
        },
        SET_DAILY_MONTHLY_DATA(state, data) {
            state.dailyMonthlyData = data;
        },
        SET_AGE_WISE_FORM_DATA(state, data) {
            state.ageWiseFormData = data;
        },
        SET_AGE_WISE_DATA(state, data) {
            state.ageWiseData = data;
        },
        SET_INVOICE_REPRINT_FORM_DATA(state, data) {
            state.invoiceReprintFormData = data;
        },
        SET_INVOICE_REPRINT_DATA(state, data) {
            state.invoiceReprintData = data;
        },
        SET_INVOICE_REPRINT_DETAILS(state, data) {
            state.invoiceReprintDetails = data;
        },
        SET_PACKAGE_WISE_FORM_DATA(state, data) {
            state.packageWiseFormData = data;
        },
        SET_PACKAGE_WISE_DATA(state, data) {
            state.packageWiseData = data;
        },
        SET_AREA_WISE_FORM_DATA(state, data) {
            state.areaWiseFormData = data;
        },
        SET_AREA_WISE_DATA(state, data) {
            state.areaWiseData = data;
        },

        SET_MODULE_WISE_FORM_DATA(state, data) {
            state.moduleWiseFormData = data;
        },
        SET_MODULE_WISE_DATA(state, data) {
            state.moduleWiseData = data;
        },
    },
    actions: {

        checkLoginStatus(StatusCode) {
            if (StatusCode == 401) this.dispatch('logout');
        },

        async getSalesSummaryForm({ commit }, data) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`sales-summary`, { params: data }).then(
                (res) => {
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_SALES_SUMMARY_FORM", res.data.response);
                    }
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    this.dispatch('updateLoaderStatus', false)
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_SALES_SUMMARY_FORM", error.response.data);
                    }
                }
            );
        },

        async getSalesSummary({ commit }, data) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`sales-summary`, { params: data }).then(
                (res) => {
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_SALES_SUMMARY", res.data.response);
                    }
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    this.dispatch('updateLoaderStatus', false)
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_SALES_SUMMARY", error.response.data);
                    }
                }
            );
        },

        async getPaymentSummaryForm({ commit }, data) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`payment-summary`, { params: data }).then(
                (res) => {
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_PAYMENT_SUMMARY_FORM", res.data.response);
                    }
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    this.dispatch('updateLoaderStatus', false)
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_PAYMENT_SUMMARY_FORM", error.response.data);
                    }
                }
            );
        },

        async getPaymentSummary({ commit }, data) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`payment-summary`, { params: data }).then(
                (res) => {
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_PAYMENT_SUMMARY", res.data.response);
                    }
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    this.dispatch('updateLoaderStatus', false)
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_PAYMENT_SUMMARY", error.response.data);
                    }
                }
            );
        },

        async getLockerRefundSummaryForm({ commit }, data) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`locker-refund`, { params: data }).then(
                (res) => {
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_LOCKER_REFUND_SUMMARY_FORM", res.data.response);
                    }
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    this.dispatch('updateLoaderStatus', false)
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_LOCKER_REFUND_SUMMARY_FORM", error.response.data);
                    }
                }
            );
        },

        async getLockerRefundSummary({ commit }, data) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`locker-refund`, { params: data }).then(
                (res) => {
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_LOCKER_REFUND_SUMMARY", res.data.response);
                    }
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    this.dispatch('updateLoaderStatus', false)
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_LOCKER_REFUND_SUMMARY", error.response.data);
                    }
                }
            );
        },

        async getTrainerCommissionReportForm({ commit }, data) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`trainer-commission-report`, { params: data }).then(
                (res) => {
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_TRAINER_COMMISSION_REPORT_FORM", res.data.response);
                    }
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    this.dispatch('updateLoaderStatus', false)
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_TRAINER_COMMISSION_REPORT_FORM", error.response.data);
                    }
                }
            );
        },

        async getTrainerCommissionReport({ commit }, data) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`trainer-commission-report`, { params: data }).then(
                (res) => {
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_TRAINER_COMMISSION_REPORT", res.data.response);
                    }
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    this.dispatch('updateLoaderStatus', false)
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_TRAINER_COMMISSION_REPORT", error.response.data);
                    }
                }
            );
        },

        async getItemSalesReportForm({ commit }, data) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`item-sales-report`, { params: data }).then(
                (res) => {
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_ITEM_SALES_REPORT_FORM", res.data.response);
                    }
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    this.dispatch('updateLoaderStatus', false)
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_ITEM_SALES_REPORT_FORM", error.response.data);
                    }
                }
            );
        },

        async getItemSalesReport({ commit }, data) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`item-sales-report`, { params: data }).then(
                (res) => {
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_ITEM_SALES_REPORT", res.data.response);
                    }
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    this.dispatch('updateLoaderStatus', false)
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_ITEM_SALES_REPORT", error.response.data);
                    }
                }
            );
        },

        async getFreezeReportFormData({ commit }) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`freeze-report`).then(
                (res) => {
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_FREEZE_REPORT_FORM_DATA", res.data.response);
                    }
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    this.dispatch('updateLoaderStatus', false)
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_FREEZE_REPORT_FORM_DATA", error.response.data);
                    }
                }
            );
        },

        async getFreezeReportData({ commit }, data) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`freeze-report`, { params: data }).then(
                (res) => {
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_FREEZE_REPORT_DATA", res.data.response);
                    }
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    this.dispatch('updateLoaderStatus', false)
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_FREEZE_REPORT_DATA", error.response.data);
                    }
                }
            );
        },


        async getMembershipSummaryFormData({ commit }) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`membership-summary`).then(
                (res) => {
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_MEMBERSHIP_SUMMARY_FORM_DATA", res.data.response);
                    }
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    this.dispatch('updateLoaderStatus', false)
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_MEMBERSHIP_SUMMARY_FORM_DATA", error.response.data);
                    }
                }
            );
        },

        async getMembershipSummaryData({ commit }, data) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`membership-summary`, { params: data }).then(
                (res) => {
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_MEMBERSHIP_SUMMARY_DATA", res.data.response);
                    }
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    this.dispatch('updateLoaderStatus', false)
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_MEMBERSHIP_SUMMARY_DATA", error.response.data);
                    }
                }
            );
        },

        async getUserTransactionFormData({ commit }) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`user-transaction-report`).then(
                (res) => {
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_USER_TRANSACTION_FORM_DATA", res.data.response);
                    }
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    this.dispatch('updateLoaderStatus', false)
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_USER_TRANSACTION_FORM_DATA", error.response.data);
                    }
                }
            );
        },

        async getUserTransactionData({ commit }, data) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`user-transaction-report`, { params: data }).then(
                (res) => {
                    if(!res.data || res.data.code == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_USER_TRANSACTION_DATA", res.data.response);
                    }
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    this.dispatch('updateLoaderStatus', false)
                    if (!error.response || error.response.status == 401) {
                        // this.dispatch('logout');
                    } else {
                        commit("SET_USER_TRANSACTION_DATA", error.response.data);
                    }
                }
            );
        },

        async getMemberExpiryFormData({ commit }) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`member-expiring-report`)
            .then(
                (res) => {
                    // if (res?.data?.code == 401) this.dispatch('logout');
                    if (res?.data?.response) commit("SET_MEMBER_EXPIRY_FORM_DATA", res.data.response);
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    // if (error?.response?.status == 401) this.dispatch('logout');
                    commit("SET_MEMBER_EXPIRY_FORM_DATA", []);
                    this.dispatch('updateLoaderStatus', false)
                }
            );
        },

        async getMemberExpiryData({ commit }, data) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`member-expiring-report`, { params: data })
            .then(
                (res) => {
                    // if (res?.data?.code == 401) this.dispatch('logout');
                    if (res?.data?.response) commit("SET_MEMBER_EXPIRY_DATA", res.data.response);
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    // if (error?.response?.status == 401) this.dispatch('logout');
                    commit("SET_MEMBER_EXPIRY_DATA", {});
                    this.dispatch('updateLoaderStatus', false)
                }
            );
        },

        async getTrainerAttendanceFormData({ commit }) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`trainer-attendance-report`)
            .then(
                (res) => {
                    // if (res?.data?.code == 401) this.dispatch('logout');
                    if (res?.data?.response) commit("SET_TRAINER_ATTENDANCE_FORM_DATA", res.data.response);
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    // if (error?.response?.status == 401) this.dispatch('logout');
                    commit("SET_TRAINER_ATTENDANCE_FORM_DATA", []);
                    this.dispatch('updateLoaderStatus', false)
                }
            );
        },

        async getTrainerAttendanceData({ commit }, data) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`trainer-attendance-report`, { params: data })
            .then(
                (res) => {
                    // if (res?.data?.code == 401) this.dispatch('logout');
                    if (res?.data?.response) commit("SET_TRAINER_ATTENDANCE_DATA", res.data.response);
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    // if (error?.response?.status == 401) this.dispatch('logout');
                    commit("SET_TRAINER_ATTENDANCE_DATA", {});
                    this.dispatch('updateLoaderStatus', false)
                }
            );
        },

        async getMemberLessonFormData({ commit }) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`member-lesson-report`)
            .then(
                (res) => {
                    // if (res?.data?.code == 401) this.dispatch('logout');
                    if (res?.data?.response) commit("SET_MEMBER_LESSON_FORM_DATA", res.data.response);
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    // if (error?.response?.status == 401) this.dispatch('logout');
                    commit("SET_MEMBER_LESSON_FORM_DATA", {});
                    this.dispatch('updateLoaderStatus', false)
                }
            );
        },

        async getMemberLessonData({ commit }, data) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`member-lesson-report`, { params: data })
            .then(
                (res) => {
                    // if (res?.data?.code == 401) this.dispatch('logout');
                    if (res?.data?.response) commit("SET_MEMBER_LESSON_DATA", res.data.response);
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    // if (error?.response?.status == 401) this.dispatch('logout');
                    commit("SET_MEMBER_LESSON_DATA", {});
                    this.dispatch('updateLoaderStatus', false)
                }
            );
        },

        async getDailyMonthlyFormData({ commit }) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`daily-monthly-report`)
            .then(
                (res) => {
                    // if (res?.data?.code == 401) this.dispatch('logout');
                    if (res?.data?.response) commit("SET_DAILY_MONTHLY_FORM_DATA", res.data.response);
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    // if (error?.response?.status == 401) this.dispatch('logout');
                    commit("SET_DAILY_MONTHLY_FORM_DATA", {});
                    this.dispatch('updateLoaderStatus', false)
                }
            );
        },

        async getDailyMonthlyData({ commit }, data) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`daily-monthly-report`, { params: data })
            .then(
                (res) => {
                    // if (res?.data?.code == 401) this.dispatch('logout');
                    if (res?.data?.response) commit("SET_DAILY_MONTHLY_DATA", res.data.response);
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    // if (error?.response?.status == 401) this.dispatch('logout');
                    commit("SET_DAILY_MONTHLY_DATA", {});
                    this.dispatch('updateLoaderStatus', false)
                }
            );
        },

        async getAgeWiseFormData({ commit }) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`age-wise-report`)
            .then(
                (res) => {
                    // if (res?.data?.code == 401) this.dispatch('logout');
                    if (res?.data?.response) commit("SET_AGE_WISE_FORM_DATA", res.data.response);
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    // if (error?.response?.status == 401) this.dispatch('logout');
                    commit("SET_AGE_WISE_FORM_DATA", []);
                    this.dispatch('updateLoaderStatus', false)
                }
            );
        },

        async getAgeWiseData({ commit }, data) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`age-wise-report`, { params: data })
            .then(
                (res) => {
                    // if (res?.data?.code == 401) this.dispatch('logout');
                    if (res?.data?.response) commit("SET_AGE_WISE_DATA", res.data.response);
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    // if (error?.response?.status == 401) this.dispatch('logout');
                    commit("SET_AGE_WISE_DATA", {});
                    this.dispatch('updateLoaderStatus', false)
                }
            );
        },
        
        async getInvoiceReprintFormData({ commit }) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`item-invoice-reprint`)
            .then(
                (res) => {
                    // if (res?.data?.code == 401) this.dispatch('logout');
                    if (res?.data?.response) commit("SET_INVOICE_REPRINT_FORM_DATA", res.data.response);
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    // if (error?.response?.status == 401) this.dispatch('logout');
                    commit("SET_INVOICE_REPRINT_FORM_DATA", []);
                    this.dispatch('updateLoaderStatus', false)
                }
            );
        },

        async getInvoiceReprintData({ commit }, data) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`item-invoice-reprint`, { params: data })
            .then(
                (res) => {
                    // if (res?.data?.code == 401) this.dispatch('logout');
                    if (res?.data?.response) commit("SET_INVOICE_REPRINT_DATA", res.data.response);
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    // if (error?.response?.status == 401) this.dispatch('logout');
                    commit("SET_INVOICE_REPRINT_DATA", {});
                    this.dispatch('updateLoaderStatus', false)
                }
            );
        },

        async getInvoiceReprintDetails({ commit }, id) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`item-invoice-reprint/${id}`)
            .then(
                (res) => {
                    // if (res?.data?.code == 401) this.dispatch('logout');
                    if (res?.data?.response) commit("SET_INVOICE_REPRINT_DETAILS", res.data.response);
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    // if (error?.response?.status == 401) this.dispatch('logout');
                    commit("SET_INVOICE_REPRINT_DETAILS", {});
                    this.dispatch('updateLoaderStatus', false)
                }
            );
        },

        async getPackageWiseFormData({ commit }) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`package-wise-report`)
            .then(
                (res) => {
                    // if (res?.data?.code == 401) this.dispatch('logout');
                    if (res?.data?.response) commit("SET_PACKAGE_WISE_FORM_DATA", res.data.response);
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    // if (error?.response?.status == 401) this.dispatch('logout');
                    commit("SET_PACKAGE_WISE_FORM_DATA", []);
                    this.dispatch('updateLoaderStatus', false)
                }
            );
        },

        async getPackageWiseData({ commit }, data) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`package-wise-report`, { params: data })
            .then(
                (res) => {
                    // if (res?.data?.code == 401) this.dispatch('logout');
                    if (res?.data?.response) commit("SET_PACKAGE_WISE_DATA", res.data.response);
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    // if (error?.response?.status == 401) this.dispatch('logout');
                    commit("SET_PACKAGE_WISE_DATA", {});
                    this.dispatch('updateLoaderStatus', false)
                }
            );
        },


        async getAreaWiseFormData({ commit }) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`area-wise-members-registered`)
            .then(
                (res) => {
                    // if (res?.data?.code == 401) this.dispatch('logout');
                    if (res?.data?.response) commit("SET_AREA_WISE_FORM_DATA", res.data.response);
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    // if (error?.response?.status == 401) this.dispatch('logout');
                    commit("SET_AREA_WISE_FORM_DATA", []);
                    this.dispatch('updateLoaderStatus', false)
                }
            );
        },

        async getAreaWiseData({ commit }, data) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`area-wise-members-registered`, { params: data })
            .then(
                (res) => {
                    // if (res?.data?.code == 401) this.dispatch('logout');
                    if (res?.data?.response) commit("SET_AREA_WISE_DATA", res.data.response);
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    // if (error?.response?.status == 401) this.dispatch('logout');
                    commit("SET_AREA_WISE_DATA", {});
                    this.dispatch('updateLoaderStatus', false)
                }
            );
        },


        async getModuleWiseFormData({ commit }) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`module-wise-transaction-report`)
            .then(
                (res) => {
                    // if (res?.data?.code == 401) this.dispatch('logout');
                    if (res?.data?.response) commit("SET_MODULE_WISE_FORM_DATA", res.data.response);
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    // if (error?.response?.status == 401) this.dispatch('logout');
                    commit("SET_MODULE_WISE_FORM_DATA", []);
                    this.dispatch('updateLoaderStatus', false)
                }
            );
        },

        async getModuleWiseData({ commit }, data) {
            this.dispatch('updateLoaderStatus', true)
            await axios.get(`module-wise-transaction-report`, { params: data })
            .then(
                (res) => {
                    // if (res?.data?.code == 401) this.dispatch('logout');
                    if (res?.data?.response) commit("SET_MODULE_WISE_DATA", res.data.response);
                    this.dispatch('updateLoaderStatus', false)
                },
                (error) => {
                    // if (error?.response?.status == 401) this.dispatch('logout');
                    commit("SET_MODULE_WISE_DATA", {});
                    this.dispatch('updateLoaderStatus', false)
                }
            );
        },
    }
}