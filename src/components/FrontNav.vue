<template>
  <div class="nav">
    <router-link to="/">首頁</router-link>
    |
    <router-link to="/products">前台產品列表</router-link>
    |
    <router-link to="/cart">前台購物車</router-link>
    |
    <router-link to="/admin">回到後台</router-link>
    <router-link to="/cart" type="button" class="btn btn-warning">
      結帳<span class="badge rounded-pill bg-danger">{{
        cartData.carts.length
      }}</span>
    </router-link>
    |
    <router-link to="/login">登入</router-link>
  </div>
</template>

<script>
import emitter from "@/libs/emitter.js";
export default {
  data() {
    return {
      cartData: {
        carts: [],
      },
    };
  },
  methods: {
    getCart() {
      this.$http
        .get(
          `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/cart`
        )
        .then((res) => {
          // console.log(res);
          this.cartData = res.data.data;
          // console.log(this.cartData);
          // console.log(this.cartData.carts.length);
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
  mounted() {
    this.getCart();
    emitter.on("get-cart", () => {
      this.getCart();
    });
  },
};
</script>

<style lang="scss" scoped>
.nav {
  list-style: none;
}

.nav a {
  color: black;
}

.nav a:focus {
  color: #42b983;
}

.btn {
  position: absolute;
  right: 0;
}
</style>
