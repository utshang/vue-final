<template>
  <div class="nav">
    <router-link to="/">回到前台</router-link>
    |
    <router-link to="/admin/products">後台產品列表</router-link>

    <!-- <router-link to="/admin/coupon">後台優惠卷</router-link> -->

    <!-- <router-link to="/admin/orders">後台訂單</router-link> -->
    |
    <a href="" @click.prevent="signOut">登出</a>
  </div>
</template>

<script>
export default {
  methods: {
    signOut() {
      document.cookie = "TheFloristToken=;expires=;";
      alert("token已清除");
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss" scoped>
.nav {
  list-style: none;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
}

.nav a {
  color: black;
}

.nav a:focus {
  color: #42b983;
}
</style>
