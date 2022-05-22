<template>
  <div class="bg-primary">
    <div class="container py-3">
      <div class="d-flex justify-content-between">
        <RouterLink class="home text-white fs-3 mt-1" to="/"
          >The Florist</RouterLink
        >
        <button
          class="btn text-primary bg-white fw-bold px-3"
          @click.prevent="signOut"
        >
          登出
        </button>
      </div>
    </div>
  </div>
  <div class="container mt-4 d-flex justify-content-end">
    <RouterLink to="/admin/products">後台產品列表 | </RouterLink>

    <RouterLink to="/admin/coupon"> 後台優惠卷 | </RouterLink>

    <RouterLink to="/admin/order"> 後台訂單</RouterLink>
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
$primary: #ad795d;
$gray-600: #6c757d;

.container {
  .home {
    font-family: "Sansita Swashed", cursive;
    font-weight: 600;
  }
  a {
    color: $gray-600;
  }
  a:focus {
    color: $primary;
  }
}
</style>
