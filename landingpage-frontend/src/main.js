// src/main.js
import { createApp } from "vue";
import App from "./App.vue";
import "./assets/base.css";
import router from "./router";


// (opsional) import global CSS kalau kamu punya
import "./assets/main.css"; // atau bisa saja './style.css'

const app = createApp(App).use(router);

app.mount("#app");
