import { createStore } from 'vuex'
import config from './modules/config'
import auth from './modules/auth'
import branches from './modules/branches';
import discounts from './modules/discounts';
import generals from './modules/generals';
import packagees from './modules/packagees';
import package_types from './modules/package_types';
import locker_types from './modules/locker_types';
import membership_types from './modules/membership_types';
import lesson_types from './modules/lesson_types';
import service_types from './modules/service_types';
import lockers from './modules/lockers';
import item_groups from './modules/item_groups';
import item_types from './modules/item_types';
import items from './modules/items';
import locker_packages from './modules/locker_packages';
import lesson_packages from './modules/lesson_packages';
import lesson_configurations from './modules/lesson_configurations';
import service_packages from './modules/service_packages';
import roles from './modules/roles';
import users from './modules/users';
import trainers from './modules/trainers';
import role_permissions from './modules/role_permissions';
import membership_packages from './modules/membership_packages';
import members from './modules/members';
import subscriptions from './modules/subscriptions';
import locker_dashboard from './modules/locker_dashboard';
import trainer_attendance from './modules/trainer_attendance';
import item_sales from './modules/item_sales';
import notifications from './modules/notifications';
import invoices from './modules/invoices';
import stocks from './modules/stocks';
import reports from './modules/reports';
import activityLogs from './modules/activityLogs'
import dashboard from './modules/dashboard'
import areas from './modules/areas';
import banners from './modules/banners';

export default createStore({
    namespaced: true,
    modules: {
        config,
        auth,
        areas,
        branches,
        discounts,
        generals,
        locker_types,
        membership_types,
        lesson_types,
        service_types,
        lockers,
        item_types,
        item_groups,
        items,
        locker_packages,
        lesson_packages,
        lesson_configurations,
        service_packages,
        membership_packages,
        packagees,
        roles,
        users,
        trainers,
        role_permissions,
        package_types,
        members,
        subscriptions,
        locker_dashboard,
        trainer_attendance,
        item_sales,
        notifications,
        invoices,
        stocks,
        reports,
        activityLogs,
        dashboard,
        banners
    },
});