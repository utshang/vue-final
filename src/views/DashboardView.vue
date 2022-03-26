<template>
  <h1>你現在在後台頁面</h1>
  <DashboardNav />
  <router-view v-if="checkSuccess"></router-view>
</template>

<style lang="scss" scoped>
h1 {
  text-align: center;
}
</style>

<script>
import DashboardNav from "@/components/DashboardNav.vue";

export default {
  components: {
    DashboardNav,
  },
  data() {
    return {
      checkSuccess: false,
    };
  },
  mounted() {
    this.checkLogIn();
  },
  methods: {
    checkLogIn() {
      //取出token
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)TheFloristToken\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      //有token才做以下這件事情
      if (token) {
        this.$http.defaults.headers.common["Authorization"] = `${token}`;
        this.$http
          .post(`${process.env.VUE_APP_API}/v2/api/user/check`, {
            api_token: this.token,
          })
          .then(() => {
            //token沒過期，有身份進到後台，此時router-view將會出現
            this.checkSuccess = true;
          })
          .catch((err) => {
            alert(err);
            this.$router.push("/login");
          });
      } else {
        alert("登入失敗，請重新登入！");
        this.$router.push("/login");
      }
    },
  },
};
</script>
