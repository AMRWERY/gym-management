import authenticateUser from "../auth/authenticateUser";
import checkUserSession from "@/auth/checkUserSession";
import Signin from "@/pages/auth/Signin.vue";
import ForgotPassword from "@/pages/auth/ForgotPassword.vue";
import ResetPassword from "@/pages/auth/ResetPassword.vue";

import DefaultLayout from "@/layouts/DefaultLayout.vue";
import Dashboard from "@/pages/dashboard/Home.vue";
import LockerDashboard from "@/pages/dashboard/Lockers.vue";

import Branches from "@/pages/masters/Branches.vue";
import Areas from "@/pages/masters/Areas.vue";
import Banners from "@/pages/masters/Banners.vue";

import Discounts from "@/pages/masters/Discounts.vue";
import Generals from "@/pages/masters/Generals.vue";
import LockerTypes from "@/pages/masters/LockerTypes.vue";
import MembershipTypes from "@/pages/masters/MembershipTypes.vue";
import ServiceTypes from "@/pages/masters/ServiceTypes.vue";
import LessonTypes from "@/pages/masters/LessonTypes.vue";
import Lockers from "@/pages/masters/Lockers.vue";
import ItemTypes from "@/pages/masters/ItemTypes.vue";
import ItemGroups from "@/pages/masters/ItemGroups.vue";
import Items from "@/pages/masters/Items.vue";

import LockerPackages from "@/pages/packages/LockerPackages.vue";
import MembershipPackages from "@/pages/packages/MembershipPackages.vue";
import LessonPackages from "@/pages/packages/LessonPackages.vue";
import ServicePackages from "@/pages/packages/ServicePackages.vue";

import Roles from "@/pages/users/Roles.vue";
import Users from "@/pages/users/Users.vue";
import RolePermissions from "@/pages/users/RolePermissions.vue";
import Trainers from "@/pages/users/Trainers.vue";
import LessonConfigurations from "@/pages/users/LessonConfigurations.vue";

import Members from "@/pages/transactions/Members.vue";
import MemberSubscriptions from "@/pages/transactions/MemberSubscriptions.vue";
import MemberSubscriptionCreateForm from "@/pages/transactions/MemberSubscriptionCreateForm.vue";
import MemberSubscriptionRenewForm from "@/pages/transactions/MemberSubscriptionRenewForm.vue";
import MemberSubscriptionInvoice from "@/pages/transactions/MemberSubscriptionInvoice.vue";
import TrainerAttendance from "@/pages/transactions/TrainerAttendance.vue";
import TrainerAttendanceDetails from "@/pages/transactions/TrainerAttendanceDetails.vue";
import ItemSales from "@/pages/transactions/ItemSales.vue";
import ItemSalesInvoice from "@/pages/transactions/ItemSalesInvoice.vue";
import RefundInvoices from "@/pages/transactions/RefundInvoices.vue";
import RefundInvoiceDetails from "@/pages/transactions/RefundInvoiceDetails.vue";
import FreezedInvoices from "@/pages/transactions/FreezedInvoices.vue";
import FreezedInvoiceDetails from "@/pages/transactions/FreezedInvoiceDetails.vue";

import Notifications from "@/pages/notifications/Notifications.vue";
import SendNotifications from "@/pages/notifications/SendNotifications.vue";
import StockAdjustments from "@/pages/stock_adjustments/StockAdjustments.vue";
import StockAdjustmentDetails from "@/pages/stock_adjustments/StockAdjustmentDetails.vue";
import AddStock from "@/pages/stock_adjustments/AddStock.vue";
import SalesSummary from "@/pages/reports/SalesSummary.vue";
import PaymentSummary from "@/pages/reports/PaymentSummary.vue";
import LockerRefundSummary from "@/pages/reports/LockerRefundSummary.vue";
import TrainerCommissionReport from "@/pages/reports/TrainerCommissionReport.vue";
import ItemSalesReport from "@/pages/reports/ItemSalesReport.vue";
import ActivityLogs from "@/pages/activity-logs/Index.vue";
import ActivityLogDetails from "@/pages/activity-logs/ActivityLogDetails.vue";
import FreezeMemberReport from "@/pages/reports/FreezeMember.vue";
import MembershipSummary from "@/pages/reports/MembershipSummary.vue";
import UserTransaction from "@/pages/reports/UserTransaction.vue";
import MemberExpiryReport from "@/pages/reports/MemberExpiryReport.vue";
import TrainerAttendanceReport from "@/pages/reports/TrainerAttendance.vue";
import MemberLessonReport from "@/pages/reports/MemberLesson.vue";
import DailyMonthlyReport from "@/pages/reports/DailyMonthlyReport.vue";
import AgeWiseReport from "@/pages/reports/AgeWiseReport.vue";
import ItemInvoiceReprint from "@/pages/reports/ItemInvoiceReprint.vue";
import PackageWiseReport from "@/pages/reports/PackageWiseReport.vue";
import ModuleWiseReport from "@/pages/reports/ModuleWiseReport.vue";
import AreaWiseReport from "@/pages/reports/AreaWiseReport.vue";

import Error403 from "@/pages/error/403.vue";
import Error404 from "@/pages/error/NotFound.vue";

const routes = [
  {
    path: "/",
    component: Signin,
    beforeEnter: checkUserSession,
    redirect: "login",
    children: [
      {
        path: "/login",
        component: Signin,
      },
    ],
  },
  {
    path: "/forgot-password",
    beforeEnter: checkUserSession,
    name: "forgot-password",
    component: ForgotPassword,
  },
  {
    path: "/reset-password",
    beforeEnter: checkUserSession,
    name: "reset-password",
    component: ResetPassword,
  },
  {
    path: "/",
    redirect: "/dashboard",
    /* beforeEnter: authenticateUser, */
    component: DefaultLayout,
    children: [
      {
        path: "dashboard",
        alias: "",
        name: "dashboard",
        meta: {
          screen: "Dashboard",
          permission: "dashboard",
        },
        component: Dashboard,
      },
      {
        path: "locker-dashboard",
        alias: "",
        name: "locker-dashboard",
        meta: {
          screen: "Locker Dashboard",
          permission: "locker_dashbaord",
        },
        component: LockerDashboard,
      },
      {
        path: "banners",
        name: "banners",
        meta: {
          screen: "Banners",
          permission: "banners",
        },
        component: Banners,
      },
      {
        path: "areas",
        name: "areas",
        meta: {
          screen: "Areas",
          permission: "areas",
        },
        component: Areas,
      },
      {
        path: "branches",
        alias: "",
        name: "branches",
        meta: {
          screen: "Branches",
          permission: "branches",
        },
        component: Branches,
      },
      {
        path: "branches/add",
        alias: "",
        name: "BranchFormModal",
        meta: {
          screen: "BranchFormModal",
          permission: "branches",
        },
        component: () => import('../pages/masters/BranchFormModal.vue'),
      },
      {
        path: "branches/:id",
        alias: "",
        name: "BranchFormModal",
        meta: {
          screen: "BranchFormModal",
          permission: "branches",
        },
        component: () => import('../pages/masters/BranchFormModal.vue'),
      },
      {
        path: "discounts",
        alias: "",
        name: "discounts",
        meta: {
          screen: "Discounts",
          permission: "discounts",
        },
        component: Discounts,
      },
      {
        path: "discounts/add",
        alias: "",
        name: "DiscountFormModal",
        meta: {
          screen: "DiscountFormModal",
          permission: "discounts",
        },
        component: () => import('../pages/masters/DiscountFormModal.vue'),
      },
      {
        path: "discounts/:id",
        alias: "",
        name: "DiscountFormModal",
        meta: {
          screen: "DiscountFormModal",
          permission: "discounts",
        },
        component: () => import('../pages/masters/DiscountFormModal.vue'),
      },
      {
        path: "generals",
        alias: "",
        name: "generals",
        meta: {
          screen: "Generals",
          permission: "generals",
        },
        component: Generals,
      },
      {
        path: "locker-types",
        alias: "",
        name: "locker-types",
        meta: {
          screen: "Locker Types",
          permission: "locker_types",
        },
        component: LockerTypes,
      },
      {
        path: "membership-types",
        alias: "",
        name: "membership-types",
        meta: {
          screen: "Membership Types",
          permission: "membership_types",
        },
        component: MembershipTypes,
      },
      {
        path: "service-types",
        alias: "",
        name: "service-types",
        meta: {
          screen: "Service Types",
          permission: "service_types",
        },
        component: ServiceTypes,
      },
      {
        path: "lesson-types",
        alias: "",
        name: "lesson-types",
        meta: {
          screen: "Lesson Types",
          permission: "lesson_types",
        },
        component: LessonTypes,
      },
      {
        path: "lockers",
        alias: "",
        name: "lockers",
        meta: {
          screen: "Lockers",
          permission: "lockers",
        },
        component: Lockers,
      },
      {
        path: "item-types",
        alias: "",
        name: "item-types",
        meta: {
          screen: "Item Types",
          permission: "item_types",
        },
        component: ItemTypes,
      },
      {
        path: "item-groups",
        alias: "",
        name: "item-groups",
        meta: {
          screen: "Item Groups",
          permission: "item_groups",
        },
        component: ItemGroups,
      },
      {
        path: "items",
        alias: "",
        name: "items",
        meta: {
          screen: "Items",
          permission: "items",
        },
        component: Items,
      },
      {
        path: "items/add",
        alias: "",
        name: "ItemFormModal",
        meta: {
          screen: "ItemFormModal",
          permission: "items",
        },
        component: () => import('../pages/masters/ItemFormModal.vue'),
      },
      {
        path: "items/:id",
        alias: "",
        name: "ItemFormModal",
        meta: {
          screen: "ItemFormModal",
          permission: "items",
        },
        component: () => import('../pages/masters/ItemFormModal.vue'),
      },
      {
        path: "package-lockers",
        alias: "",
        name: "package-lockers",
        meta: {
          screen: "Locker",
          permission: "locker_packages",
        },
        component: LockerPackages,
      },
      {
        path: "package-lockers/add",
        alias: "",
        name: "LockerPackageFormModal",
        meta: {
          screen: "LockerPackageFormModal",
          permission: "locker_packages",
        },
        component: () => import('../pages/packages/LockerPackageFormModal.vue'),
      },
      {
        path: "package-lockers/:id",
        alias: "",
        name: "LockerPackageFormModal",
        meta: {
          screen: "LockerPackageFormModal",
          permission: "locker_packages",
        },
        component: () => import('../pages/packages/LockerPackageFormModal.vue'),
      },
      {
        path: "memberships",
        alias: "",
        name: "memberships",
        meta: {
          screen: "Memberships",
          permission: "membership_packages",
        },
        component: MembershipPackages,
      },
      {
        path: "memberships/add",
        alias: "",
        name: "MembershipPackageFormModal",
        meta: {
          screen: "MembershipPackageFormModal",
          permission: "membership_packages",
        },
        component: () => import('../pages/packages/MembershipPackageFormModal.vue'),
      },
      {
        path: "memberships/:id",
        alias: "",
        name: "MembershipPackageFormModal",
        meta: {
          screen: "MembershipPackageFormModal",
          permission: "membership_packages",
        },
        component: () => import('../pages/packages/MembershipPackageFormModal.vue'),
      },
      {
        path: "lessons",
        alias: "",
        name: "lessons",
        meta: {
          screen: "Lessons",
          permission: "lesson_packages",
        },
        component: LessonPackages,
      },
      {
        path: "lessons/add",
        alias: "",
        name: "LessonPackageFormModal",
        meta: {
          screen: "LessonPackageFormModal",
          permission: "lesson_packages",
        },
        component: () => import('../pages/packages/LessonPackageFormModal.vue'),
      },
      {
        path: "lessons/:id",
        alias: "",
        name: "LessonPackageFormModal",
        meta: {
          screen: "LessonPackageFormModal",
          permission: "lesson_packages",
        },
        component: () => import('../pages/packages/LessonPackageFormModal.vue'),
      },
      {
        path: "services",
        alias: "",
        name: "services",
        meta: {
          screen: "Services",
          permission: "service_packages",
        },
        component: ServicePackages,
      },
      {
        path: "services/add",
        alias: "",
        name: "ServicePackageFormModal",
        meta: {
          screen: "ServicePackageFormModal",
          permission: "service_packages",
        },
        component: () => import('../pages/packages/ServicePackageFormModal.vue'),
      },
      {
        path: "services/:id",
        alias: "",
        name: "ServicePackageFormModal",
        meta: {
          screen: "ServicePackageFormModal",
          permission: "service_packages",
        },
        component: () => import('../pages/packages/ServicePackageFormModal.vue'),
      },
      {
        path: "admin-users",
        alias: "",
        name: "admin-users",
        meta: {
          screen: "Admin Users",
          permission: "admin_users",
        },
        component: Users,
      },
      {
        path: "admin-users/add",
        alias: "",
        name: "UserFormModal",
        meta: {
          screen: "UserFormModal",
          permission: "admin_users",
        },
        component: () => import('../pages/users/UserFormModal.vue'),
      },
      {
        path: "roles",
        alias: "",
        name: "roles",
        meta: {
          screen: "Roles",
          permission: "admin_groups",
        },
        component: Roles,
      },
      {
        path: "role-permissions/:id",
        name: "role-permissions",
        meta: {
          screen: "Roles",
          permission: "admin_groups",
        },
        component: RolePermissions,
      },
      {
        path: "trainers",
        alias: "",
        name: "trainers",
        meta: {
          screen: "Trainers",
          permission: "trainers",
        },
        component: Trainers,
      },
      {
        path: "trainers/add",
        alias: "",
        name: "TrainerFormModal",
        meta: {
          screen: "TrainerFormModal",
          permission: "trainers",
        },
        component: () => import('../pages/users/TrainerFormModal.vue'),
      },
      {
        path: "lesson-configurations/:id",
        alias: "",
        name: "lesson-configurations",
        meta: {
          screen: "Trainers",
          permission: "lesson_configurations",
        },
        component: LessonConfigurations,
      },
      {
        path: "members",
        alias: "",
        name: "members",
        meta: {
          screen: "Members",
          permission: "members",
        },
        component: Members,
      },
      {
        path: "members/add",
        alias: "",
        name: "MemberFormModal",
        meta: {
          screen: "MemberFormModal",
          permission: "members",
        },
        component: () => import('../pages/transactions/MemberFormModal.vue'),
      },
      {
        path: "members/:id",
        alias: "",
        name: "MemberFormModal",
        meta: {
          screen: "MemberFormModal",
          permission: "members",
        },
        component: () => import('../pages/transactions/MemberFormModal.vue'),
      },
      {
        path: "refund-invoices",
        alias: "",
        name: "refund-invoices",
        meta: {
          screen: "Refund Invoices",
          permission: "refund_invoices",
        },
        component: RefundInvoices,
      },
      {
        path: "refund-invoices/:id",
        alias: "",
        name: "refund-invoices-details",
        meta: {
          screen: "Refund Invoices",
          permission: "refund_invoice_details",
        },
        component: RefundInvoiceDetails,
      },
      {
        path: "freezed-invoices",
        alias: "",
        name: "freezed-invoices",
        meta: {
          screen: "Freezed Invoices",
          permission: "freezed_invoices",
        },
        component: FreezedInvoices,
      },
      {
        path: "freezed-invoices/:id",
        alias: "",
        name: "freezed-invoices-details",
        meta: {
          screen: "Freezed Invoices",
          permission: "freezed_invoice_details",
        },
        component: FreezedInvoiceDetails,
      },
      {
        path: "member-subscriptions/:id",
        alias: "",
        name: "member-subscriptions",
        meta: {
          screen: "Members",
          permission: "view_member_subscription",
        },
        component: MemberSubscriptions,
      },
      {
        path: "create-member-subscription/:id/:type",
        alias: "",
        name: "create-member-subscription",
        meta: {
          screen: "Members",
          permission: "add_member_subscription",
        },
        component: MemberSubscriptionCreateForm,
      },
      {
        path: "renew-member-subscription/:id",
        alias: "",
        name: "renew-member-subscription",
        meta: {
          screen: "Members",
          permission: "renew_membership",
        },
        component: MemberSubscriptionRenewForm,
      },
      {
        path: "member-subscription-invoice/:id",
        alias: "",
        name: "member-subscription-invoice",
        meta: {
          screen: "Members",
          permission: "issue_invoice",
        },
        component: MemberSubscriptionInvoice,
      },
      {
        path: "trainer-attendance",
        alias: "",
        name: "trainer-attendance",
        meta: {
          screen: "Trainer Attendance",
          permission: "view_trainer_attendance",
        },
        component: TrainerAttendance,
      },
      {
        path: "trainer-attendance/:id",
        alias: "",
        name: "trainer-attendance-details",
        meta: {
          screen: "Trainer Attendance",
          permission: "view_trainer_attendance",
        },
        component: TrainerAttendanceDetails,
      },
      {
        path: "item-sales",
        alias: "",
        name: "item-sales",
        meta: {
          screen: "Item Sales",
          permission: "manage_item_sales",
        },
        component: ItemSales,
      },
      {
        path: "item-sales-invoice/:id",
        alias: "",
        name: "item-sales-invoice",
        meta: {
          screen: "Item Sales",
          permission: "manage_item_sales",
        },
        component: ItemSalesInvoice,
      },
      {
        path: "notifications",
        alias: "",
        name: "notifications",
        meta: {
          screen: "Notifications",
          permission: "view_notifications",
        },
        component: Notifications,
      },
      {
        path: "send-notification",
        name: "send-notification",
        meta: {
          screen: "Notifications",
          permission: "send_notification",
        },
        component: SendNotifications,
      },
      {
        path: "stock-adjustments",
        name: "stock-adjustments",
        meta: {
          screen: "Stock Adjustments",
          permission: "stock_adjustments",
        },
        component: StockAdjustments,
      },
      {
        path: "stock-adjustment-details/:id",
        name: "stock-adjustment-details",
        meta: {
          screen: "Stock Adjustments",
          permission: "view_stock_details",
        },
        component: StockAdjustmentDetails,
      },
      {
        path: "add-stock",
        name: "add-stock",
        meta: {
          screen: "Stock Adjustments",
          permission: "add_stock",
        },
        component: AddStock,
      },
      {
        path: "sales-summary",
        name: "sales-summary",
        meta: {
          screen: "Sales Summary",
          permission: "sales_summary",
        },
        component: SalesSummary,
      },
      {
        path: "payment-summary",
        name: "payment-summary",
        meta: {
          screen: "Payment Summary",
          permission: "payment_summary",
        },
        component: PaymentSummary,
      },
      {
        path: "refund-report",
        name: "refund-report",
        meta: {
          screen: "Refund Report",
          permission: "refund_report",
        },
        component: LockerRefundSummary,
      },
      {
        path: "trainer-commission-report",
        name: "trainer-commission-report",
        meta: {
          screen: "Sales Summary",
          permission: "sales_summary",
        },
        component: TrainerCommissionReport,
      },
      {
        path: "item-sales-report",
        name: "item-sales-report",
        meta: {
          screen: "Item Sales Report",
          permission: "item_sales_report",
        },
        component: ItemSalesReport,
      },
      {
        path: "activity-logs",
        name: "activity-logs",
        meta: {
          screen: "Activity Logs",
          permission: "view_activity_logs",
        },
        component: ActivityLogs,
      },
      {
        path: "activity-logs/:id",
        name: "activity-log-details",
        meta: {
          screen: "Activity Logs",
          permission: "view_activity_logs",
        },
        component: ActivityLogDetails,
      },
      {
        path: "freeze-report",
        name: "freeze-report",
        meta: {
          screen: "Freeze Report",
          permission: "freeze_report",
        },
        component: FreezeMemberReport,
      },
      {
        path: "membership-summary",
        name: "membership-summary",
        meta: {
          screen: "Membership Summary",
          permission: "membership_summary",
        },
        component: MembershipSummary,
      },
      {
        path: "user-transaction-report",
        name: "user-transaction-report",
        meta: {
          screen: "User Transaction Report",
          permission: "user_transaction_report",
        },
        component: UserTransaction,
      },
      {
        path: "member-expiring-report",
        name: "member-expiring-report",
        meta: {
          screen: "Member Expiry Report",
          permission: "member_expiring_report",
        },
        component: MemberExpiryReport,
      },
      {
        path: "trainer-attendance-report",
        name: "trainer-attendance-report",
        meta: {
          screen: "Trainer Attendace Report",
          permission: "trainer_attendance_report",
        },
        component: TrainerAttendanceReport,
      },
      {
        path: "member-lesson-report",
        name: "member-lesson-report",
        meta: {
          screen: "Member Lesson Report",
          permission: "member_lesson_report",
        },
        component: MemberLessonReport,
      },
      {
        path: "daily-monthly-report",
        name: "daily-monthly-report",
        meta: {
          screen: "Daily Monthly Report",
          permission: "daily_monthly_report",
        },
        component: DailyMonthlyReport,
      },
      {
        path: "age-wise-report",
        name: "age-wise-report",
        meta: {
          screen: "Age Wise Report",
          permission: "age_wise_report",
        },
        component: AgeWiseReport,
      },
      {
        path: "item-invoice-reprint-report",
        name: "item-invoice-reprint-report",
        meta: {
          screen: "Item Invoice Reprint Report",
          permission: "item_invoice_reprint_report",
        },
        component: ItemInvoiceReprint,
      },
      {
        path: "package-wise-report",
        name: "package-wise-report",
        meta: {
          screen: "Package Wise Report",
          permission: "package_wise_report",
        },
        component: PackageWiseReport,
      },
      {
        path: "area-wise-member-registered",
        name: "area-wise-member-registered",
        meta: {
          screen: "Area Wise Member Registered",
          permission: "area_wise_member_registered",
        },
        component: AreaWiseReport,
      },
      {
        path: "module-wise-transaction-report",
        name: "module-wise-transaction-report",
        meta: {
          screen: "Module Wise Transaction Report",
          permission: "module_wise_transaction_report",
        },
        component: ModuleWiseReport,
      },
    ],
  },
  {
    path: "/access-forbidden",
    name: "access-forbidden",
    component: Error403,
  },
  {
    path: "/:pathMatch(.*)*",
    component: Error404,
  },
];

export default routes;
