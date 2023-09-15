<template>
  <div>
    <p class="text-3xl">{{ $t('master.items') }}</p>
    <hr class="mb-5" />

    <div class="mt-8">
      <custom-data-table :enableHeader="true" :searchBox="true" :searchFields="search_fields"
        :isAddNew="has_add_permission" :addBtnText="'Add New'" :onAddBtnClicked="onAddNewItem" :columns="columns"
        :view="true" :edit="has_edit_permission" :onView="viewItemInfo" :onEdit="editItem"
        :quickAction="has_edit_permission" :onQuickActionPerformed="onCheck" :rows="items_list">
      </custom-data-table>
    </div>

    <ItemDetailsModal v-if="show_details_form" :item="item_info" @close-modal="show_details_form = false" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ItemDetailsModal from "./ItemDetailsModal.vue";

export default {
  components: { ItemDetailsModal },
  data() {
    return {
      show_item_form: false,
      show_details_form: false,
      search_fields: ["name_en", "name_ar", "remark"],
      columns: [
        { name: "#", attribute: "#", sortable: false },
        {
          name: this.$t("notification.image"),
          attribute: "image",
          field: "image",
          sortable: false,
        },
        {
          name: this.$t("datatable.title_en"),
          attribute: "name_en",
          sortable: false,
        },
        {
          name: this.$t("datatable.title_ar"),
          attribute: "name_ar",
          sortable: false,
        },
        {
          name: this.$t("datatable.remark"),
          attribute: "remark",
          sortable: false,
        },
        {
          name: this.$t("datatable.is_active"),
          attribute: "is_active",
          sortable: false,
        },
        {
          name: this.$t("datatable.action"),
          attribute: "action",
          sortable: false,
        },
      ],
      items_list: [],
      has_add_permission: false,
      has_edit_permission: false,
      has_delete_permission: false,
    };
  },
  computed: {
    ...mapGetters(["items", "itemsToast", "updateItemResponse"]),
  },
  methods: {
    ...mapActions(["getItems", "updateItem", "deleteItem"]),
    viewItemInfo(id, data) {
      this.item_info = data;
      this.show_details_form = true;
    },
    onAddNewItem() {
      this.$router.push('/items/add')
    },
    editItem(id, data) {
      this.$router.push({ name: 'ItemFormModal', params: { id: id } });
    },
    deleteItems(id) {
      if (confirm("Are you sure?")) {
        this.deleteItem(id);
      }
    },
    onCheck(event, id, data) {
      this.updateItem({
        id: id,
        item: {
          is_active: event.target.checked ? 1 : 0,
          type: "status",
        },
      });
    },
    checkPermissions() {
      let page_permissions = this.$root.getScreenPermissions("Items");
      this.has_add_permission = this.$root.getPermissionStatus(
        page_permissions?.permissions,
        "add_item"
      );
      this.has_edit_permission = this.$root.getPermissionStatus(
        page_permissions?.permissions,
        "edit_item"
      );
      this.has_delete_permission = this.$root.getPermissionStatus(
        page_permissions?.permissions,
        "delete_item"
      );
    },
  },
  watch: {
    items(data) {
      if (data != null) {
        this.items_list = data.items;
        this.items_list.forEach((item) => {
          item.is_active = item.is_active == 0 ? false : true;
        });
      }
    },
    itemsToast(data) {
      if (data.status) {
        this.$toast.success(data.message);
      } else {
        this.$toast.error(data.message);
      }
    },
    updateItemResponse(data) {
      if (data.status) {
        this.$toast.success(data.message);
      } else {
        this.$toast.error(data.message);
      }
    },
  },
  mounted() {
    this.checkPermissions();
    this.getItems();
  },
};
</script>