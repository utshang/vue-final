<template>
  <div
    class="main-nav px-4 pt-2 pb-1 px-md-5 py-md-3 bg-white position-sticky top-0"
  >
    <div class="nav justify-content-between">
      <router-link class="home text-secondary fs-3 mt-1" to="/"
        >The Florist</router-link
      >
      <div class="naverbar">
        <div class="naverbar-item">
          <ul class="d-flex align-items-center">
            <li>
              <router-link class="home text-secondary" to="/">
                <span class="material-icons px-3 text-secondary">
                  favorite
                </span>
                <span
                  class="favorite-num rounded-pill bg-danger position-absolute"
                ></span>
              </router-link>
            </li>
            <li>
              <router-link class="home text-secondary" to="/cart">
                <span class="material-icons px-3 text-secondary">
                  shopping_cart
                </span>
                <span
                  class="cart-num rounded-pill bg-danger position-absolute"
                  >{{ cartData.carts.length }}</span
                ></router-link
              >
            </li>
            <li>
              <div class="dropdown">
                <a
                  class="home btn text-secondary p-0"
                  id="dropdownMenuLink"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span class="material-icons mt-1 px-3 text-secondary">
                    menu
                  </span></a
                >
                <ul
                  class="dropdown-menu border-0 shadow rounded p-3 ps-2"
                  aria-labelledby="dropdownMenuLink"
                >
                  <li class="pb-3">
                    <router-link class="dropdown-item" to="/products">
                      全部產品</router-link
                    >
                  </li>

                  <li class="pb-3">
                    <router-link class="dropdown-item" to="/about"
                      >關於我們</router-link
                    >
                  </li>
                  <li>
                    <router-link class="dropdown-item" to="/faq"
                      >常見問答</router-link
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
.main-nav {
  z-index: 1000;
}

.home {
  font-family: "Sansita Swashed", cursive;
  font-weight: 600;
}
.material-icons {
  font-size: 1.8rem;
}

.dropdown-item.active,
.dropdown-item:active {
  color: #ad795d;
}

.cart-num {
  font-size: 0.75rem;
  color: #fffafa;
  padding: 0.1rem 0.5rem 0.2rem;
  top: 6px;
  right: 88px;
}

@media screen and (min-width: 769px) {
  .cart-num {
    font-size: 0.75rem;
    color: #fffafa;
    padding: 0.1rem 0.4rem 0.2rem;
    top: 12px;
    right: 114px;
  }
}
</style>
