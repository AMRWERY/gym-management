import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import "@/styles/app.css";
import "@purge-icons/generated";
import "@vueform/multiselect/themes/default.css";
import CustomDataTable from "./components/CustomDataTable.vue";
import store from "./store";
import Toaster from "@meforma/vue-toaster";
import VueHtmlToPaper from "./utils/vue-html-to-paper";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import JsonCSV from "vue-json-csv";
import "tw-elements";
import "pusher-js";
import Multiselect from "@vueform/multiselect";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { createI18n } from "vue-i18n";
import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";
import en from "@/locales/en.json";
import ar from "@/locales/ar.json";

const app = createApp(App);

const i18n = createI18n({
  locale: localStorage.getItem("currentLang") ?? "en",
  messages: {
    en,
    ar,
  },
});

app.component("date-picker", Datepicker);
app.component("downloadCsv", JsonCSV);
app.component("Multiselect", Multiselect);
app.use(Toaster, { position: "top-right", maxToasts: 1 });
app.use("custom-data-table", CustomDataTable);
app.use(VueSweetalert2);
app.use(VueHtmlToPaper);
app.use(store);
app.use(router);
app.use(i18n);
app.use(VueAwesomePaginate);
app.mount("#app");
