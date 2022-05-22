<template>
  <DashboardNav />
  <RouterView v-if="checkSuccess" />
  <DashboardFooter />
</template>

<script>
import DashboardNav from "@/components/backend/DashboardNav.vue";
import DashboardFooter from "@/components/backend/DashboardFooter.vue";

export default {
  inject: ["emitter"],
  components: {
    DashboardNav,
    DashboardFooter,
  },
  data() {
    return {
      checkSuccess: false,
    };
  },
  methods: {
    checkLogIn() {
      //取出 token
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)TheFloristToken\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      //有 token 才做以下這件事情
      if (token) {
        this.$http.defaults.headers.common["Authorization"] = `${token}`;
        this.$http
          .post(`${process.env.VUE_APP_API}/v2/api/user/check`, {
            api_token: this.token,
          })
          .then(() => {
            //token 沒過期，有身份進到後台，此時 router-view 將會出現
            this.checkSuccess = true;
          })
          .catch((error) => {
            this.$httpMessageState(error.response, "錯誤訊息");
            this.$router.push("/login");
          });
      } else {
        this.emitter.emit("push-message", {
          style: "danger",
          title: "登入失敗，請重新登入！",
        });
        this.$router.push("/login");
      }
    },
  },
  mounted() {
    this.checkLogIn();
  },
};
</script>
