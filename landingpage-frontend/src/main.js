// src/main.js
import { createApp } from "vue";
import App from "./App.vue";
import "./assets/base.css";


// (opsional) import global CSS kalau kamu punya
import "./assets/main.css"; // atau bisa saja './style.css'

const app = createApp(App);

app.mount("#app");
