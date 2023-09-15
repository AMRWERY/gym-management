<template>
  <form class="rounded px-8 pt-8 mb-2 bg-white">
    <div class="bg-white px-4 pt-4 pb-2 sm:p-0">
      <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
        <h2 class="text-2xl text-left color-primary leading-6 font-medium text-gray-900 mb-8" id="modal-title">
          {{ $t('master.add_new_item') }}
        </h2>
        <input type="hidden" :value="item.id" id="item_id" />
        <div class="mt-3" id="modal-form-data">
          <div class="grid grid-cols-6 gap-4">
            <div class="col-span-3">
              <label class="block text-gray-700 text-sm font-bold">
                {{ $t('notification.image') }}
              </label>

              <div class="my-1 px-1 w-full overflow-hidden">
                <input class="text-80" type="file" @change="handleFileUpload($event)" accept="image/*" />
              </div>
              <div class="flex flex-col">
                <small class="italic text-gray-500">Allowed file format: .jpg, .jpeg, .png</small>
                <span class="text-sm text-red-400" v-if="v$.item.image.$error"> {{ v$.item.image.$errors[0].$message
                }}</span>
                <span class="text-sm text-red-400" v-if="image_size_error"> {{ image_size_error }}</span>
              </div>
            </div>

            <div class="col-span-3">
              <label class="block text-gray-700 text-sm font-bold" for="branch_ids">
                {{ $t('notification.branch_hint') }} *
              </label>
              <Multiselect mode="tags" :searchable="true" :createTag="true" v-model="item.branch_ids" :multiple="true"
                label="name_en" valueProp="id" placeholder="Select Branches"
                class="shadow border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                :options="branches_list" />
              <span class="text-sm text-red-400" v-if="v$.item.branch_ids.$error">
                {{ v$.item.branch_ids.$errors[0].$message }}</span>
            </div>

            <div class="col-span-3">
              <label class="block text-gray-700 text-sm font-bold" for="item_group_id">
                {{ $t('master.item_group') }} *
              </label>
              <select name="item_group_id" id="item_group_id" v-model="item.item_group_id"
                class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                <option value="">Select Item Group</option>
                <option v-for="(item_group, index) in item_groups_list" :key="index" :value="item_group.id">
                  {{ item_group.name_en }}
                </option>
              </select>
              <span class="text-sm text-red-400" v-if="v$.item.item_group_id.$error">
                {{ v$.item.item_group_id.$errors[0].$message }}</span>
            </div>

            <div class="col-span-3">
              <label class="block text-gray-700 text-sm font-bold" for="general_id">
                {{ $t('master.unit') }} *
              </label>
              <select name="general_id" id="general_id" v-model="item.general_id"
                class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                <option value="">Select Unit</option>
                <option v-for="(general, index) in generals_list" :key="index" :value="general.id">
                  {{ general.name_en }}
                </option>
              </select>
              <span class="text-sm text-red-400" v-if="v$.item.general_id.$error">
                {{ v$.item.general_id.$errors[0].$message }}</span>
            </div>

            <div class="col-span-3">
              <label class="block text-gray-700 text-sm font-bold" for="name_en">
                {{ $t('packages.name_en') }} *
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name_en" type="text" v-model="item.name_en" placeholder="Name (English)" />
              <span class="text-sm text-red-400" v-if="v$.item.name_en.$error">
                {{ v$.item.name_en.$errors[0].$message }}</span>
            </div>

            <div class="col-span-3">
              <label class="block text-gray-700 text-sm font-bold" for="name_ar">
                {{ $t('packages.name_ar') }} *
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name_ar" type="text" v-model="item.name_ar" placeholder="Name (Arabic)" />
              <span class="text-sm text-red-400" v-if="v$.item.name_ar.$error">
                {{ v$.item.name_ar.$errors[0].$message }}</span>
            </div>

            <div class="col-span-3">
              <label class="block text-gray-700 text-sm font-bold" for="description_en">
                {{ $t('datatable.description_en') }}
              </label>
              <textarea
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="description_en" rows="2" v-model="item.description_en" placeholder="Description (English)" />
            </div>

            <div class="col-span-3">
              <label class="block text-gray-700 text-sm font-bold" for="description_ar">
                {{ $t('datatable.description_ar') }}
              </label>
              <textarea
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="description_ar" rows="2" v-model="item.description_ar" placeholder="Description (Arabic)" />
            </div>

            <div class="col-span-3 grid grid-cols-3 gap-4">
              <div class="col-span-1">
                <label class="block text-gray-700 text-sm font-bold" for="amount">
                  {{ $t('datatable.amount') }}
                </label>
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="amount" type="number" v-model="item.amount" placeholder="Amount" min="0" />
              </div>
              <div class="col-span-1">
                <label class="block text-gray-700 text-sm font-bold" for="sales_amount">
                  {{ $t('master.sales_amount') }} *
                </label>
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="sales_amount" type="number" v-model="item.sales_amount" placeholder="Sales Amount" min="0" />
                <span class="text-sm text-red-400" v-if="v$.item.sales_amount.$error">
                  {{ v$.item.sales_amount.$errors[0].$message }}</span>
              </div>

              <div class="col-span-1">
                <label class="block text-gray-700 text-sm font-bold" for="discount_id">
                  {{ $t('master.discount_code') }}
                </label>
                <select name="discount_id" id="discount_id" v-model="item.discount_id"
                  class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <option value="">Select Code</option>
                  <option v-for="(discount, index) in discounts" :key="index" :value="discount.id">
                    {{ discount.code }}
                  </option>
                </select>
              </div>
            </div>

            <div class="col-span-1">
              <label class="block text-gray-700 text-sm font-bold" for="min_level">
                {{ $t('master.min_level') }}
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="min_level" type="number" v-model="item.min_level" placeholder="Min. Level" min="0" />
            </div>

            <div class="col-span-1">
              <label class="block text-gray-700 text-sm font-bold" for="max_level">
                {{ $t('master.max_level') }}
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="max_level" type="number" v-model="item.max_level" placeholder="Max. Level" min="0" />
            </div>

            <div class="col-span-1">
              <label class="block text-gray-700 text-sm font-bold" for="reorder_level">
                {{ $t('master.re_order_level') }}
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="reorder_level" type="number" v-model="item.reorder_level" placeholder="Re-Order Level" min="0" />
            </div>

            <div class="col-span-2">
              <label class="block text-gray-700 text-sm font-bold" for="remark">
                {{ $t('packages.remark') }}
              </label>
              <textarea
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="remark" rows="2" v-model="item.remark" placeholder="Remark" />
            </div>

            <div class="col-span-1 my-auto text-center">
              <label class="block text-gray-700 text-sm font-bold" for="is_active">
                {{ $t('packages.is_active') }}
              </label>
              <label class="switch">
                <input type="checkbox" id="is_active" v-model="item.is_active" :checked="item.is_active" />
                <span class="slider round"></span>
              </label>
            </div>

            <div class="col-span-3 sm:flex sm:flex-row-reverse">
              <button v-if="!is_edit_item" type="button" @click="addNewItem()"
                class="w-full inline-flex justify-center border-2 border-color-primary shadow-sm px-6 py-2 font-semibold text-base btn-outline-primary focus:outline-none sm:ml-3 sm:w-auto sm:text-sm h-10 my-auto">
                {{ $t('button.create') }}
              </button>
              <button v-if="is_edit_item" type="button" @click="updateSelectedItem"
                class="w-full inline-flex justify-center border-2 border-color-primary shadow-sm px-6 py-2 font-semibold text-base btn-outline-primary focus:outline-none sm:ml-3 sm:w-auto sm:text-sm h-10 my-auto">
                {{ $t('button.update') }}
              </button>
              <button v-if="!is_edit_item" type="button" @click="addNewItem(true)"
                class="w-full inline-flex justify-center border-2 border-color-primary shadow-sm px-6 py-2 font-semibold text-base btn-outline-primary focus:outline-none sm:ml-3 sm:w-auto sm:text-sm h-10 my-auto">
                Create &amp; Add new
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Buttons -->
  </form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import useValidate from "@vuelidate/core";
import { required, helpers, requiredIf } from "@vuelidate/validators";
export default {
  data() {
    return {
      v$: useValidate(),
      create_another: false,
      branches_list: [],
      selected_item: [],
      item: {
        id: this.$route.params.id,
        item_group_id: "",
        image: "",
        discount_id: "",
        branch_ids: [],
        name_en: "",
        name_ar: "",
        description_en: "",
        description_ar: "",
        general_id: "",
        amount: "",
        sales_amount: "",
        min_level: "",
        max_level: "",
        reorder_level: "",
        remark: "",
        is_active: true,
        type: "item",
      },
      image_size_error: "",
      modal_title: "Add New Item",
      is_edit_item: false,
    };
  },
  validations() {
    return {
      item: {
        image: { required: helpers.withMessage(this.$root.getErrorMessage('required', this.$t('master.image')), requiredIf(() => { return !this.is_edit_item })) },
        item_group_id: {
          required: helpers.withMessage(
            this.$root.getErrorMessage("required", this.$t('master.item_group')),
            required
          ),
        },
        branch_ids: {
          required: helpers.withMessage(
            this.$root.getErrorMessage("required", this.$t('master.branch')),
            required
          ),
        },
        name_en: {
          required: helpers.withMessage(
            this.$root.getErrorMessage("required", this.$t('master.name_en')),
            required
          ),
        },
        name_ar: {
          required: helpers.withMessage(
            this.$root.getErrorMessage("required", this.$t('master.name_ar')),
            required
          ),
        },
        general_id: {
          required: helpers.withMessage(
            this.$root.getErrorMessage("required", this.$t('master.unit')),
            required
          ),
        },
        sales_amount: {
          required: helpers.withMessage(
            this.$root.getErrorMessage("required", this.$t('master.sales_amount')),
            required
          ),
        },
      },
    };
  },
  computed: {
    ...mapGetters(["items", "itemsToast", "addItemResponse", "updateItemResponse", "itemById"]),
  },
  methods: {
    ...mapActions(["addItem", "updateItem", "getItems", "getItemById"]),

    handleFileUpload(event) {
      this.item.image = event.target.files[0];
      const file = event.target.files[0];
      if (file && file.size > 512000) {
        this.image_size_error = "Image size must be less than 500kb";
      } else {
        this.image_size_error = "";
        this.item.image = file;
      }
    },
    addNewItem(is_create_another = false) {
      this.v$.$validate();
      if (!this.v$.$error) {
        if (this.item.image.size > 512000) {
          this.image_size_error = "Image size must be less than 500kb";
        } else {
          this.item.is_active = this.item.is_active ? 1 : 0;
          this.addItem(this.item);
          this.create_another = is_create_another;
        }

      }
    },
    updateSelectedItem() {
      this.v$.$validate();
      if (!this.v$.$error) {
        if (this.item.image.size > 512000) {
          this.image_size_error = "Image size must be less than 500kb";
        } else {
          this.item.is_active = this.item.is_active ? 1 : 0;
          this.updateItem({
            id: this.selected_item.id,
            item: this.item,
          });
        }
      }
    },
    setSelectedItem() {
      if (this.selected_item) {
        let selected_branch_ids = [];
        for (let i = 0; i < this.selected_item.branches.length; i++) {
          selected_branch_ids.push(this.selected_item.branches[i].id);
        }
        this.modal_title = "Update Item";
        this.is_edit_item = true;
        this.item.item_group_id = this.selected_item.item_group_id;
        this.item.branch_ids = selected_branch_ids;
        this.item.name_en = this.selected_item?.name_en;
        this.item.name_ar = this.selected_item?.name_ar;
        this.item.description_en = this.selected_item?.description_en;
        this.item.description_ar = this.selected_item?.description_ar;
        this.item.general_id = this.selected_item?.general_id;
        this.item.amount = this.selected_item?.amount;
        this.item.sales_amount = this.selected_item?.sales_amount;
        this.item.min_level = this.selected_item?.min_level;
        this.item.max_level = this.selected_item?.max_level;
        this.item.reorder_level = this.selected_item?.reorder_level;
        this.item.remark = this.selected_item?.remark;
        this.item.is_active = this.selected_item?.is_active;
      } else {
        this.modal_title = "Add New Item";
        this.is_edit_item = false;
      }
    },
  },
  watch: {
    itemsToast(data) {
      if (data.status) {
        this.$toast.success(data.message);
      } else {
        this.$toast.error(data.message);
      }
    },
    addItemResponse(data) {
      if (data.status) {
        this.$toast.success(data.message);
        if (!this.create_another) {
          this.$router.push('/items')
        } else {
          this.item.item_group_id = "";
          this.item.branch_ids = null;
          this.item.name_en = "";
          this.item.name_ar = "";
          this.item.description_en = "";
          this.item.description_ar = "";
          this.item.general_id = "";
          this.item.amount = "";
          this.item.sales_amount = "";
          this.item.min_level = "";
          this.item.max_level = "";
          this.item.reorder_level = "";
          this.item.remark = "";
          this.item.is_active = false;
          this.v$.$reset();
        }
      } else {
        this.$toast.error(data.message);
      }
    },
    updateItemResponse(data) {
      if (data.status) {
        this.$router.push('/items')
      } else {
        this.$toast.error(data.message);
      }
    },
    itemById(data) {
      if (data) {
        this.selected_item = data.item_details
        this.branches_list = data.branches
        this.item_groups_list = data.item_groups
        this.discounts = data.discounts
        this.generals_list = data.general
        this.setSelectedItem();
      }
    },
    items(data) {
      if (data != null) {
        this.branches_list = data.branches
        this.item_groups_list = data.item_groups
        this.discounts = data.discounts
        this.generals_list = data.general
      }
    },
  },
  mounted() {
    if (this.item.id && this.item.id != 'add') {
      this.getItemById(this.item.id)
    } else {
      this.getItems()
    }
  },
};
</script>