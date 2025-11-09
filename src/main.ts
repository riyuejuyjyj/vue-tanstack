import "./main.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import { VueQueryPlugin, QueryClient } from "@tanstack/vue-query";
import PrimeVue from "primevue/config";
import App from "./App.vue";
import router from "./router";
import Aura from "@primeuix/themes/aura";
import ToastService from "primevue/toastservice";
const queryClient = new QueryClient();
const app = createApp(App);
app.use(VueQueryPlugin, { queryClient });
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});
app.use(createPinia());
app.use(router);
app.use(ToastService);
app.mount("#app");
