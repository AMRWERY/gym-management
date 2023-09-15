import { mapActions, mapGetters } from "vuex";
import useValidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";

export default {
  data() {
    return {
      v$: useValidate(),
      subscription_id: this.$route.params.id,
      subscription_details: [],
      health_detail: {
        id: "",
        name: "",
        value: "",
        as_on_date: new Date().toLocaleDateString("fr-CA"),
      },
      locker_detail: {
        locker_type_id: "",
        locker_package_id: "",
        locker_id: "",
        locker_amount: "",
        locker_insurance_amount: "",
        duration: "",
        start_date: new Date().toLocaleDateString("fr-CA"),
        end_date: "",
      },
      service_detail: {
        service_type_id: "",
        service_package_id: "",
        Service_amount: "",
        duration: "",
        start_date: new Date().toLocaleDateString("fr-CA"),
        end_date: "",
      },
      lesson_detail: {
        lesson_type_id: "",
        lesson_package_id: "",
        lesson_amount: "",
        no_of_classes: "",
        lesson_trainer_id: "",
        duration: "",
        start_date: new Date().toLocaleDateString("fr-CA"),
        end_date: "",
      },
      payment_detail: {
        payment_type_id: "",
        amount: "",
        remark: "",
      },

      selected_health_details: [],
      selected_locker_details: [],
      selected_service_details: [],
      selected_lesson_details: [],
      selected_payment_details: [],

      subscription: {
        id: "",
        member_id: "",
        health_parameter_ids: [],
        values: [],
        as_on_dates: [],

        membership_type_id: "",
        membership_package_id: "",
        start_date: new Date().toLocaleDateString("fr-CA"),
        end_date: "",
        duration: "",

        locker_type_ids: [],
        locker_package_ids: [],
        locker_ids: [],
        locker_start_date: [],
        locker_end_date: [],

        service_type_ids: [],
        service_package_ids: [],
        service_start_date: [],
        service_end_date: [],

        lesson_type_ids: [],
        lesson_package_ids: [],
        user_ids: [],
        lesson_start_date: [],
        lesson_end_date: [],

        payment_ids: [],
        payment_amount: [],
        remarks: [],

        discount_id: "",
        general_id: "",
        discount_amount: 0,
        total_membership_amount: 0,
        total_locker_amount: 0,
        total_insurance_amount: 0,
        total_service_amount: 0,
        total_lesson_amount: 0,
      },

      sub_total_amount: 0,
      total_amount: 0,
      total_amount_paid: 0,
      total_remaining_amount: 0,

      member: [],
      health_parameters: [],
      payment_types: [],
      trainers: [],
      discounts: [],

      membership_types: [],
      locker_types: [],
      service_types: [],
      lesson_types: [],

      membership_packages: [],
      locker_packages: [],
      lockers: [],
      service_packages: [],
      lesson_packages: [],

      membership_packages_list: [],
      locker_packages_list: [],
      lockers_list: [],
      service_packages_list: [],
      lesson_packages_list: [],

      has_add_permission: false,
      has_edit_permission: false,
      has_delete_permission: false,
    };
  },
  validations() {
    return {
      subscription: {
        membership_type_id: {
          required: helpers.withMessage(
            this.$root.getErrorMessage("required", "Membership Type"),
            required
          ),
        },
        membership_package_id: {
          required: helpers.withMessage(
            this.$root.getErrorMessage("required", "Membership Package"),
            required
          ),
        },
        start_date: {
          required: helpers.withMessage(
            this.$root.getErrorMessage("required", "Start Date"),
            required
          ),
        },
      },
      health_detail: {
        id: {
          required: helpers.withMessage(
            this.$root.getErrorMessage("required", "Health Parameter"),
            required
          ),
        },
        value: {
          required: helpers.withMessage(
            this.$root.getErrorMessage("required", "Value"),
            required
          ),
        },
        as_on_date: {
          required: helpers.withMessage(
            this.$root.getErrorMessage("required", "As On Date"),
            required
          ),
        },
      },
      locker_detail: {
        locker_type_id: {
          required: helpers.withMessage(
            this.$root.getErrorMessage("required", "Locker Type"),
            required
          ),
        },
        locker_package_id: {
          required: helpers.withMessage(
            this.$root.getErrorMessage("required", "Locker Package"),
            required
          ),
        },
        locker_id: {
          required: helpers.withMessage(
            this.$root.getErrorMessage("required", "Locker"),
            required
          ),
        },
        start_date: {
          required: helpers.withMessage(
            this.$root.getErrorMessage("required", "Start Date"),
            required
          ),
        },
      },
      service_detail: {
        service_type_id: {
          required: helpers.withMessage(
            this.$root.getErrorMessage("required", "Service Type"),
            required
          ),
        },
        service_package_id: {
          required: helpers.withMessage(
            this.$root.getErrorMessage("required", "Service Package"),
            required
          ),
        },
        start_date: {
          required: helpers.withMessage(
            this.$root.getErrorMessage("required", "Start Date"),
            required
          ),
        },
      },
      lesson_detail: {
        lesson_type_id: {
          required: helpers.withMessage(
            this.$root.getErrorMessage("required", "Lesson Type"),
            required
          ),
        },
        lesson_package_id: {
          required: helpers.withMessage(
            this.$root.getErrorMessage("required", "Lesson Package"),
            required
          ),
        },
        lesson_trainer_id: {
          required: helpers.withMessage(
            this.$root.getErrorMessage("required", "Trainer"),
            required
          ),
        },
        start_date: {
          required: helpers.withMessage(
            this.$root.getErrorMessage("required", "Start Date"),
            required
          ),
        },
      },
      payment_detail: {
        payment_type_id: {
          required: helpers.withMessage(
            this.$root.getErrorMessage("required", "Payment Type"),
            required
          ),
        },
        amount: {
          required: helpers.withMessage(
            this.$root.getErrorMessage("required", "Amount"),
            required
          ),
        },
      },
    };
  },
  computed: {
    ...mapGetters([
      "subscriptions",
      "subscriptionsToast",
      "addSubscriptionResponse",
    ]),
  },
  methods: {
    ...mapActions(["getSubscriptionDetails", "addSubscription"]),

    updateTotals() {
      this.sub_total_amount =
        parseFloat(this.subscription.total_membership_amount) +
        parseFloat(this.subscription.total_lesson_amount) +
        parseFloat(this.subscription.total_locker_amount) +
        parseFloat(this.subscription.total_insurance_amount) +
        parseFloat(this.subscription.total_service_amount);

      let discount_id = this.subscription.discount_id;
      this.discounts.forEach((discount) => {
        if (discount.id == discount_id) {
          if (discount.discount_type == "percentage") {
            this.subscription.discount_amount =
              this.sub_total_amount *
              (parseFloat(discount.discount_value) / 100);
          } else {
            this.subscription.discount_amount =
              this.sub_total_amount - parseFloat(discount.discount_value);
          }
        }
      });

      this.total_amount =
        this.sub_total_amount - this.subscription.discount_amount;
      this.total_remaining_amount = this.total_amount - this.total_amount_paid;
    },

    removeHealthDetail(index) {
      this.selected_health_details.splice(index, 1);
      this.updateSubscriptionHealthDetails();
    },
    removeLockerDetail(index) {
      this.selected_locker_details.splice(index, 1);
      this.updateSubscriptionLockerDetails();
    },
    removeServiceDetail(index) {
      this.selected_service_details.splice(index, 1);
      this.updateSubscriptionServiceDetails();
    },
    removeLessonDetail(index) {
      this.selected_lesson_details.splice(index, 1);
      this.updateSubscriptionLessonDetails();
    },
    removePaymentDetail(index) {
      this.selected_payment_details.splice(index, 1);
      this.updateSubscriptionPaymentDetails();
    },

    clearHealthDetail() {
      this.health_detail.id = "";
      this.health_detail.name = "";
      this.health_detail.value = "";
      this.health_detail.as_on_date = new Date().toLocaleDateString("fr-CA");
      this.v$.health_detail.$reset();
    },
    clearPaymentDetail() {
      this.payment_detail.payment_type_id = "";
      this.payment_detail.amount = "";
      this.payment_detail.remark = "";
      this.v$.payment_detail.$reset();
    },
    clearLockerDetail() {
      this.locker_packages_list = [];
      this.lockers_list = [];

      this.locker_detail.locker_type_id = "";
      this.locker_detail.locker_package_id = "";
      this.locker_detail.locker_id = "";
      this.locker_detail.locker_amount = "";
      this.locker_detail.locker_insurance_amount = "";
      this.locker_detail.duration = "";
      this.locker_detail.start_date = new Date().toLocaleDateString("fr-CA");
      this.locker_detail.end_date = "";
      this.v$.locker_detail.$reset();
    },
    clearServiceDetail() {
      this.service_packages_list = [];

      this.service_detail.service_type_id = "";
      this.service_detail.service_package_id = "";
      this.service_detail.service_amount = "";
      this.service_detail.duration = "";
      this.service_detail.start_date = new Date().toLocaleDateString("fr-CA");
      this.service_detail.end_date = "";
      this.v$.service_detail.$reset();
    },
    clearLessonDetail() {
      this.lesson_packages_list = [];

      this.lesson_detail.lesson_type_id = "";
      this.lesson_detail.lesson_package_id = "";
      this.lesson_detail.lesson_trainer_id = "";
      this.lesson_detail.lesson_amount = "";
      this.lesson_detail.no_of_classes = "";
      this.lesson_detail.duration = "";
      this.lesson_detail.start_date = new Date().toLocaleDateString("fr-CA");
      this.lesson_detail.end_date = "";
      this.v$.lesson_detail.$reset();
    },

    addNewHealthDetail() {
      this.v$.health_detail.$validate();
      if (!this.v$.health_detail.$error) {
        this.health_parameters.forEach((health_parameter) => {
          if (this.health_detail.id == health_parameter.id) {
            this.selected_health_details.push({
              id: this.health_detail.id,
              name: health_parameter.name_en,
              value: this.health_detail.value,
              as_on_date: this.health_detail.as_on_date,
            });
          }
        });
        this.clearHealthDetail();
        this.updateSubscriptionHealthDetails();
      }
    },
    addNewLockerDetail() {
      this.v$.locker_detail.$validate();
      if (!this.v$.locker_detail.$error) {
        let selected_locker_obj = [];

        this.locker_types.forEach((locker_type) => {
          if (this.locker_detail.locker_type_id == locker_type.id) {
            selected_locker_obj.locker_type_id =
              this.locker_detail.locker_type_id;
            selected_locker_obj.locker_type_name = locker_type.name_en;
          }
        });

        this.locker_packages.forEach((locker_package) => {
          if (this.locker_detail.locker_package_id == locker_package.id) {
            selected_locker_obj.locker_package_id =
              this.locker_detail.locker_package_id;
            selected_locker_obj.locker_package_name = locker_package.name_en;
            selected_locker_obj.locker_amount = locker_package.amount;
            selected_locker_obj.locker_insurance_amount =
              locker_package.insurance_amount;
            selected_locker_obj.start_date = this.locker_detail.start_date;
            selected_locker_obj.end_date = this.locker_detail.end_date;
          }
        });

        this.lockers.forEach((locker) => {
          if (this.locker_detail.locker_id == locker.id) {
            selected_locker_obj.locker_id = this.locker_detail.locker_id;
            selected_locker_obj.locker_name = locker.name_en;
          }
        });

        this.selected_locker_details.push(selected_locker_obj);
        this.clearLockerDetail();
        this.updateSubscriptionLockerDetails();
      }
    },
    addNewServiceDetail() {
      this.v$.service_detail.$validate();
      if (!this.v$.service_detail.$error) {
        let selected_service_obj = [];

        this.service_types.forEach((service_type) => {
          if (this.service_detail.service_type_id == service_type.id) {
            selected_service_obj.service_type_id =
              this.service_detail.service_type_id;
            selected_service_obj.service_type_name = service_type.name_en;
          }
        });

        this.service_packages.forEach((service_package) => {
          if (this.service_detail.service_package_id == service_package.id) {
            selected_service_obj.service_package_id =
              this.service_detail.service_package_id;
            selected_service_obj.service_package_name = service_package.name_en;
            selected_service_obj.service_amount = service_package.amount;
            selected_service_obj.start_date = this.service_detail.start_date;
            selected_service_obj.end_date = this.service_detail.end_date;
          }
        });

        this.selected_service_details.push(selected_service_obj);
        this.clearServiceDetail();
        this.updateSubscriptionServiceDetails();
      }
    },
    addNewLessonDetail() {
      this.v$.lesson_detail.$validate();
      if (!this.v$.lesson_detail.$error) {
        let selected_lesson_obj = [];

        this.lesson_types.forEach((lesson_type) => {
          if (this.lesson_detail.lesson_type_id == lesson_type.id) {
            selected_lesson_obj.lesson_type_id =
              this.lesson_detail.lesson_type_id;
            selected_lesson_obj.lesson_type_name = lesson_type.name_en;
          }
        });

        this.lesson_packages.forEach((lesson_package) => {
          if (this.lesson_detail.lesson_package_id == lesson_package.id) {
            selected_lesson_obj.lesson_package_id =
              this.lesson_detail.lesson_package_id;
            selected_lesson_obj.lesson_package_name = lesson_package.name_en;
            selected_lesson_obj.lesson_amount = lesson_package.amount;
            selected_lesson_obj.no_of_classes = lesson_package.no_of_classes;
            selected_lesson_obj.start_date = this.lesson_detail.start_date;
            selected_lesson_obj.end_date = this.lesson_detail.end_date;
            selected_lesson_obj.lesson_trainer_id =
              this.lesson_detail.lesson_trainer_id;
          }
        });

        this.selected_lesson_details.push(selected_lesson_obj);
        this.clearLessonDetail();
        this.updateSubscriptionLessonDetails();
      }
    },
    addNewPaymentDetail() {
      this.v$.payment_detail.$validate();
      if (!this.v$.payment_detail.$error) {
        this.payment_types.forEach((payment_type) => {
          if (this.payment_detail.payment_type_id == payment_type.id) {
            this.selected_payment_details.push({
              payment_type_id: this.payment_detail.payment_type_id,
              payment_type_name: payment_type.name_en,
              amount: this.payment_detail.amount,
              remark: this.payment_detail.remark,
            });
          }
        });
        this.clearPaymentDetail();
        this.updateSubscriptionPaymentDetails();
      }
    },

    updateSubscriptionHealthDetails() {
      this.subscription.health_parameter_ids = [];
      this.subscription.values = [];
      this.subscription.as_on_dates = [];
      this.selected_health_details.forEach((selected_health_detail) => {
        let as_on_date = this.$root.formatDateAPI(
          selected_health_detail.as_on_date
        );

        this.subscription.health_parameter_ids.push(selected_health_detail.id);
        this.subscription.values.push(selected_health_detail.value);
        this.subscription.as_on_dates.push(as_on_date);
      });
    },
    updateSubscriptionPaymentDetails() {
      this.subscription.payment_ids = [];
      this.subscription.payment_amount = [];
      this.subscription.remarks = [];
      this.total_amount_paid = 0;

      this.selected_payment_details.forEach((selected_payment_detail) => {
        this.total_amount_paid += parseFloat(selected_payment_detail.amount);

        this.subscription.payment_ids.push(
          selected_payment_detail.payment_type_id
        );
        this.subscription.payment_amount.push(selected_payment_detail.amount);
        this.subscription.remarks.push(selected_payment_detail.remark);
      });
      this.updateTotals();
    },
    updateSubscriptionLockerDetails() {
      this.subscription.locker_type_ids = [];
      this.subscription.locker_package_ids = [];
      this.subscription.locker_ids = [];
      this.subscription.locker_start_date = [];
      this.subscription.locker_end_date = [];
      this.subscription.total_locker_amount = 0;
      this.subscription.total_insurance_amount = 0;

      this.selected_locker_details.forEach((selected_locker_detail) => {
        let locker_start_date = this.$root.formatDateAPI(
          selected_locker_detail.start_date
        );
        let locker_end_date = this.$root.formatDateAPI(
          selected_locker_detail.end_date
        );

        this.subscription.locker_type_ids.push(
          selected_locker_detail.locker_type_id
        );
        this.subscription.locker_package_ids.push(
          selected_locker_detail.locker_package_id
        );
        this.subscription.locker_ids.push(selected_locker_detail.locker_id);
        this.subscription.locker_start_date.push(locker_start_date);
        this.subscription.locker_end_date.push(locker_end_date);

        this.subscription.total_locker_amount += parseFloat(
          selected_locker_detail.locker_amount
        );
        this.subscription.total_insurance_amount += parseFloat(
          selected_locker_detail.locker_insurance_amount
        );
      });
      this.updateTotals();
    },
    updateSubscriptionServiceDetails() {
      this.subscription.service_type_ids = [];
      this.subscription.service_package_ids = [];
      this.subscription.service_start_date = [];
      this.subscription.service_end_date = [];
      this.subscription.total_service_amount = 0;

      this.selected_service_details.forEach((selected_service_detail) => {
        let service_start_date = this.$root.formatDateAPI(
          selected_service_detail.start_date
        );
        let service_end_date = this.$root.formatDateAPI(
          selected_service_detail.end_date
        );

        this.subscription.service_type_ids.push(
          selected_service_detail.service_type_id
        );
        this.subscription.service_package_ids.push(
          selected_service_detail.service_package_id
        );
        this.subscription.service_start_date.push(service_start_date);
        this.subscription.service_end_date.push(service_end_date);
        this.subscription.total_service_amount += parseFloat(
          selected_service_detail.service_amount
        );
      });
      this.updateTotals();
    },
    updateSubscriptionLessonDetails() {
      this.subscription.lesson_type_ids = [];
      this.subscription.lesson_package_ids = [];
      this.subscription.user_ids = [];
      this.subscription.lesson_start_date = [];
      this.subscription.lesson_end_date = [];
      this.subscription.total_lesson_amount = 0;

      this.selected_lesson_details.forEach((selected_lesson_detail) => {
        let lesson_start_date = this.$root.formatDateAPI(
          selected_lesson_detail.start_date
        );
        let lesson_end_date = this.$root.formatDateAPI(
          selected_lesson_detail.end_date
        );

        this.subscription.lesson_type_ids.push(
          selected_lesson_detail.lesson_type_id
        );
        this.subscription.lesson_package_ids.push(
          selected_lesson_detail.lesson_package_id
        );
        this.subscription.user_ids.push(
          selected_lesson_detail.lesson_trainer_id
        );
        this.subscription.lesson_start_date.push(lesson_start_date);
        this.subscription.lesson_end_date.push(lesson_end_date);
        this.subscription.total_lesson_amount += parseFloat(
          selected_lesson_detail.lesson_amount
        );
      });
      this.updateTotals();
    },
    updateDiscount(e) {
      this.updateTotals();
    },

    setMembershipPackageEndDate() {
      this.subscription.end_date = this.$root.addDays(
        this.subscription.start_date,
        this.subscription.duration-1
      );
    },
    setLockerPackageEndDate() {
      this.locker_detail.end_date = this.$root.addDays(
        this.locker_detail.start_date,
        this.locker_detail.duration-1
      );
    },
    setServicePackageEndDate() {
      this.service_detail.end_date = this.$root.addDays(
        this.service_detail.start_date,
        this.service_detail.duration-1
      );
    },
    setLessonPackageEndDate() {
      this.lesson_detail.end_date = this.$root.addDays(
        this.lesson_detail.start_date,
        this.lesson_detail.duration-1
      );
    },

    getMembershipPackages(e) {
      let membership_type_id = e.target.value;
      this.membership_packages_list = [];

      this.membership_packages.forEach((membership_package) => {
        if (membership_type_id == membership_package.membership_type_id) {
          this.membership_packages_list.push(membership_package);
        }
      });
    },
    getLockerPackages(e) {
      let locker_type_id = e.target.value;
      this.locker_packages_list = [];
      this.lockers_list = [];

      this.locker_packages.forEach((locker_package) => {
        if (locker_type_id == locker_package.locker_type_id) {
          this.locker_packages_list.push(locker_package);
        }
      });

      this.lockers.forEach((locker) => {
        if (locker_type_id == locker.locker_type_id) {
          this.lockers_list.push(locker);
        }
      });
    },
    getServicePackages(e) {
      let service_type_id = e.target.value;
      this.service_packages_list = [];

      this.service_packages.forEach((service_package) => {
        if (service_type_id == service_package.service_type_id) {
          this.service_packages_list.push(service_package);
        }
      });
    },
    getLessonPackages(e) {
      let lesson_type_id = e.target.value;
      this.lesson_packages_list = [];

      this.lesson_packages.forEach((lesson_package) => {
        if (lesson_type_id == lesson_package.lesson_type_id) {
          this.lesson_packages_list.push(lesson_package);
        }
      });
    },

    setLockerPackageAmount(e) {
      let locker_package_id = e.target.value;

      this.locker_packages.forEach((locker_package) => {
        if (locker_package_id == locker_package.id) {
          this.locker_detail.locker_amount = locker_package.amount;
          this.locker_detail.locker_insurance_amount =
            locker_package.insurance_amount;
          this.locker_detail.duration = locker_package.duration;
          this.setLockerPackageEndDate();
        }
      });
    },
    setServicePackageAmount(e) {
      let service_package_id = e.target.value;

      this.service_packages.forEach((service_package) => {
        if (service_package_id == service_package.id) {
          this.service_detail.service_amount = service_package.amount;
          this.service_detail.duration = service_package.duration;
          this.setServicePackageEndDate();
        }
      });
    },
    setMembershipPackageAmount(e) {
      let membership_package_id = this.subscription.membership_package_id;

      this.membership_packages.forEach((membership_package) => {
        if (membership_package_id == membership_package.id) {
          this.subscription.membership_package_amount =
            membership_package.amount;
          this.subscription.total_membership_amount = membership_package.amount;
          this.subscription.duration = membership_package.duration;
          this.setMembershipPackageEndDate();
        }
      });
      this.updateTotals();
    },
    setLessonPackageAmount(e) {
      let lesson_package_id = e.target.value;

      this.lesson_packages.forEach((lesson_package) => {
        if (lesson_package_id == lesson_package.id) {
          this.lesson_detail.lesson_amount = lesson_package.amount;
          this.lesson_detail.duration = lesson_package.duration;
          this.lesson_detail.no_of_classes = lesson_package.no_of_classes;
          this.setLessonPackageEndDate();
        }
      });
    },

    addNewSubscription() {
      if (this.total_remaining_amount < 0) {
        return this.$toast.error(this.$t("error.please_check_your_payments"));
      }

      if (this.total_remaining_amount > 0) {
        return this.$toast.error(
          this.$t("error.please_complete_your_payment_in_full")
        );
      }

      this.v$.subscription.$validate();
      if (!this.v$.subscription.$error) {
        let start_date = this.$root.formatDateAPI(this.subscription.start_date);
        let end_date = this.$root.formatDateAPI(this.subscription.end_date);

        this.addSubscription({
          discount_id: this.subscription.discount_id,
          member_id: this.subscription.member_id,

          health_parameter_ids: this.subscription.health_parameter_ids,
          values: this.subscription.values,
          as_on_dates: this.subscription.as_on_dates,

          membership_type_id: this.subscription.membership_type_id,
          membership_package_id: this.subscription.membership_package_id,
          start_date: start_date,
          end_date: end_date,

          lesson_type_ids: this.subscription.lesson_type_ids,
          lesson_package_ids: this.subscription.lesson_package_ids,
          user_ids: this.subscription.user_ids,
          lesson_start_date: this.subscription.lesson_start_date,
          lesson_end_date: this.subscription.lesson_end_date,

          locker_type_ids: this.subscription.locker_type_ids,
          locker_package_ids: this.subscription.locker_package_ids,
          locker_ids: this.subscription.locker_ids,
          locker_start_date: this.subscription.locker_start_date,
          locker_end_date: this.subscription.locker_end_date,

          service_type_ids: this.subscription.service_type_ids,
          service_package_ids: this.subscription.service_package_ids,
          service_start_date: this.subscription.service_start_date,
          service_end_date: this.subscription.service_end_date,

          payment_ids: this.subscription.payment_ids,
          payment_amount: this.subscription.payment_amount,
          remarks: this.subscription.remarks,
        });
      } else {
        this.$toast.error(
          "Required info is missing, please review the form and try again"
        );
      }
    },

    checkPermissions() {
      let page_permissions = this.$root.getScreenPermissions("Members");
      this.has_add_permission = this.$root.getPermissionStatus(
        page_permissions?.permissions,
        "add_member_subscription"
      );
      this.has_edit_permission = this.$root.getPermissionStatus(
        page_permissions?.permissions,
        "edit_subscription"
      );
      this.has_delete_permission = this.$root.getPermissionStatus(
        page_permissions?.permissions,
        "delete_subscription"
      );
    },

    setExistingValues() {
      this.subscription.member_id = this.subscription_details.member_id;
      this.subscription.membership_type_id =
        this.subscription_details.membership_type_id;
      this.subscription.membership_package_id =
        this.subscription_details.membership_package_id;
      this.subscription.membership_package_amount =
        this.subscription_details.membership_package_amount;
      this.subscription.duration =
        this.subscription_details.membership_package.duration;
      this.subscription.start_date = new Date().toLocaleDateString("fr-CA");
      this.setMembershipPackageEndDate();
      this.setMembershipPackageAmount();

      this.subscription_details.subscription_locker.forEach(
        (subscription_locker) => {
          let selected_locker_obj = [];
          selected_locker_obj.locker_type_id =
            subscription_locker.locker_type_id;
          selected_locker_obj.locker_type_name =
            subscription_locker.locker_type.name_en;
          selected_locker_obj.locker_package_id =
            subscription_locker.locker_package_id;
          selected_locker_obj.locker_package_name =
            subscription_locker.locker_package.name_en;
          selected_locker_obj.locker_amount = subscription_locker.amount;
          selected_locker_obj.locker_insurance_amount =
            subscription_locker.insurance_amount;
          selected_locker_obj.start_date = this.$root.formatDateUI(
            subscription_locker.start_date
          );
          selected_locker_obj.end_date = this.$root.formatDateUI(
            subscription_locker.end_date
          );
          selected_locker_obj.locker_id = subscription_locker.locker_id;
          selected_locker_obj.locker_name = subscription_locker.locker.name_en;
          this.selected_locker_details.push(selected_locker_obj);
        }
      );
      this.updateSubscriptionLockerDetails();

      this.subscription_details.subscription_service.forEach(
        (subscription_service) => {
          let selected_service_obj = [];
          selected_service_obj.service_type_id =
            subscription_service.service_type_id;
          selected_service_obj.service_type_name =
            subscription_service.service_type.name_en;
          selected_service_obj.service_package_id =
            subscription_service.service_package_id;
          selected_service_obj.service_package_name =
            subscription_service.service_package.name_en;
          selected_service_obj.service_amount = subscription_service.amount;
          selected_service_obj.start_date = this.$root.formatDateUI(
            subscription_service.start_date
          );
          selected_service_obj.end_date = this.$root.formatDateUI(
            subscription_service.end_date
          );
          this.selected_service_details.push(selected_service_obj);
        }
      );
      this.updateSubscriptionServiceDetails();

      this.subscription_details.subscription_lesson.forEach(
        (subscription_lesson) => {
          let selected_lesson_obj = [];
          selected_lesson_obj.lesson_type_id =
            subscription_lesson.lesson_type_id;
          selected_lesson_obj.lesson_type_name =
            subscription_lesson.lesson_type.name_en;
          selected_lesson_obj.lesson_package_id =
            subscription_lesson.lesson_package_id;
          selected_lesson_obj.lesson_package_name =
            subscription_lesson.lesson_package.name_en;
          selected_lesson_obj.lesson_amount = subscription_lesson.amount;
          selected_lesson_obj.no_of_classes = subscription_lesson.classes;
          selected_lesson_obj.start_date = this.$root.formatDateUI(
            subscription_lesson.start_date
          );
          selected_lesson_obj.end_date = this.$root.formatDateUI(
            subscription_lesson.end_date
          );
          selected_lesson_obj.lesson_trainer_id = subscription_lesson.user_id;
          this.selected_lesson_details.push(selected_lesson_obj);
        }
      );
      this.updateSubscriptionLessonDetails();

      this.updateTotals();
    },
  },
  watch: {
    subscriptions(data) {
      if (data != null) {
        this.subscription_details = data.subscription;
        this.member = data.member;
        this.health_parameters = data.health_parameters;
        this.payment_types = data.payment_types;
        this.membership_types = data.membership_types;
        this.membership_packages_list = data.membership_packages;
        this.membership_packages = data.membership_packages;
        this.locker_types = data.locker_types;
        this.locker_packages = data.locker_packages;
        this.lockers = data.lockers;
        this.service_types = data.service_types;
        this.service_packages = data.service_packages;
        this.trainers = data.trainers;
        this.lesson_types = data.lesson_types;
        this.lesson_packages = data.lesson_packages;
        this.discounts = data.discounts;

        this.setExistingValues();
      }
    },
    subscriptionsToast(data) {
      if (data.status) {
        this.$toast.success(data.message);
      } else {
        this.$toast.error(data.message);
      }
    },
    addSubscriptionResponse(data) {
      if (data.status) {
        this.$router.push('/member-subscription-invoice/' + data.response.id)
        this.$toast.success(data.message);
      } else {
        this.$toast.error(data.message);
      }
    },
  },
  mounted() {
    this.checkPermissions();
    this.getSubscriptionDetails(this.subscription_id);
  },
};
