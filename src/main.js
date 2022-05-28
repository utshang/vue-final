import { createApp } from "vue";
import "bootstrap";
import axios from "axios";

import VueAxios from "vue-axios";
import Loading from "vue3-loading-overlay";
import "vue3-loading-overlay/dist/vue3-loading-overlay.css";

import { Form, Field, ErrorMessage, defineRule, configure } from "vee-validate";
import AllRules from "@vee-validate/rules";
import { localize, setLocale } from "@vee-validate/i18n";
import zhTW from "@vee-validate/i18n/dist/locale/zh_TW.json";

import $httpMessageState from "@/libs/PushMessageState";
import "material-icons/iconfont/material-icons.css";
import "animate.css";

import CKEditor from "@ckeditor/ckeditor5-vue";

import App from "./App.vue";
import router from "./router";
import { date, currency } from "./libs/filters";

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});

configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  //   validateOnInput: true, // 當輸入任何內容直接進行驗證
});
// 設定預設語系
setLocale("zh_TW");

const app = createApp(App);
app.config.globalProperties.$filters = {
  date,
  currency,
};

app.config.globalProperties.$httpMessageState = $httpMessageState;

app.use(router);
app.use(VueAxios, axios);
app.use(CKEditor);

app.component("VeeLoading", Loading);
app.component("VeeForm", Form);
app.component("VeeField", Field);
app.component("ErrorMessage", ErrorMessage);

app.mount("#app");
