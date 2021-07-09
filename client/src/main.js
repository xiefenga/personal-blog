import store from "./store";
import App from "./App.vue";
import router from "./router";
import { createApp } from "vue";
import "nprogress/nprogress.css";
import "./index.postcss";

createApp(App)
  .use(store)
  .use(router)
  .mount('#app')
