<template>
  <div class="container pt-3 pb-2">
    <div class="nav justify-content-between">
      <router-link class="home text-secondary fs-3 mt-2" to="/"
        >The Florist</router-link
      >
      <div class="naverbar">
        <div class="naverbar-item">
          <ul class="d-flex align-items-center">
            <li>
              <router-link class="home text-secondary" to="/">
                <span class="material-icons-outlined px-3 text-secondary">
                  favorite_border
                </span></router-link
              >
            </li>
            <li>
              <router-link class="home text-secondary" to="/cart">
                <span class="material-icons-outlined px-3 text-secondary">
                  shopping_cart
                </span></router-link
              >
            </li>
            <li>
              <div class="dropdown">
                <a
                  class="home btn text-secondary px-0"
                  id="dropdownMenuLink"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span class="material-icons-outlined px-3 text-secondary">
                    menu
                  </span></a
                >
                <ul
                  class="dropdown-menu border-0 shadow rounded p-3 ps-2"
                  aria-labelledby="dropdownMenuLink"
                >
                  <li class="pb-3">
                    <router-link
                      class="dropdown-item text-light"
                      to="/products"
                    >
                      全部產品</router-link
                    >
                  </li>

                  <li class="pb-3">
                    <router-link class="dropdown-item text-light" to="/products"
                      >關於我們</router-link
                    >
                  </li>
                  <li>
                    <router-link class="dropdown-item text-light" to="/products"
                      >聯絡我們</router-link
                    >
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
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
$secondary: #ad795d;
.home {
  font-family: "Sansita Swashed", cursive;
}
.material-icons-outlined {
  font-size: 1.8rem;
}

.dropdown-item {
  color: $secondary;
}
</style>
