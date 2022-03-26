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
              <a
                class="home text-secondary"
                data-bs-toggle="offcanvas"
                href="#offcanvasExample"
                role="button"
                aria-controls="offcanvasExample"
              >
                <span class="material-icons px-3 text-secondary">
                  shopping_cart
                </span>
                <span
                  class="cart-num rounded-pill bg-danger position-absolute"
                  >{{ cartData.carts.length }}</span
                ></a
              >
            </li>

            <!-- offcanvas -->
            <div
              class="offcanvas offcanvas-end"
              tabindex="-1"
              id="offcanvasExample"
              aria-labelledby="offcanvasExampleLabel"
              ref="offcanvas"
            >
              <div class="offcanvas-header p-4">
                <h5
                  class="offcanvas-title fs-4 fw-bold"
                  id="offcanvasExampleLabel"
                >
                  購物車
                </h5>
                <button
                  type="button"
                  class="btn-close text-reset"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div class="offcanvas-body p-4" v-if="cartData.carts?.length">
                <div v-for="item in cartData.carts" :key="item.id">
                  <div
                    class="card-item d-flex mb-3"
                    :to="`/product/${item.product.id}`"
                  >
                    <span
                      class="material-icons-outlined align-self-center text-muted"
                      @click="delProduct(item.id)"
                    >
                      highlight_off
                    </span>

                    <div class="cart-img mx-3">
                      <img
                        class="cart-img rounded-3"
                        :src="item.product.imageUrl"
                        alt="item.title"
                      />
                    </div>
                    <div
                      class="d-flex flex-column justify-content-start pt-2 pb-1"
                    >
                      <h3 class="fw-bold fs-5 mb-3">
                        {{ item.product.title }}
                      </h3>
                      <div class="d-flex align-items-end mb-3">
                        <p class="fw-bold fs-5">
                          NT$ {{ item.product.price * item.qty }}
                        </p>
                        <del class="fw-bold fs-7 ms-2 text-muted">
                          NT$ {{ item.product.origin_price * item.qty }}
                        </del>
                      </div>

                      <p class="fs-7">
                        數量：{{ item.qty }} {{ item.product.unit }}
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  class="btn btn-secondary text-white mt-4 w-100"
                  @click="goToCart"
                >
                  前往購物車
                </button>
              </div>
              <template v-else>
                <div class="p-4 text-center">
                  <span
                    class="material-icons-outlined sentiment_dissatisfied text-primary pb-3"
                  >
                    sentiment_dissatisfied
                  </span>
                  <p>購物車空空的唷！</p>

                  <button
                    class="btn btn-secondary text-white mt-4 w-100"
                    @click="goToProducts"
                  >
                    來去逛逛！
                  </button>
                </div>
              </template>
            </div>

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
import Offcanvas from "bootstrap/js/dist/offcanvas";
export default {
  inject: ["emitter"],
  data() {
    return {
      cartData: {
        carts: [],
      },
      Offcanvas: "",
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
    delProduct(id) {
      this.$http
        .delete(
          `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/cart/${id}`
        )
        .then(() => {
          if (this.cartData.carts.length === 0) {
            this.hideOffcanvas();
          }
          // console.log(res);
          this.getCart();
          this.emitter.emit("get-cart");
          this.emitter.emit("push-message", {
            style: "success",
            title: "成功刪除商品囉！",
          });
        })
        .catch(() => {
          // alert(err);
        });
    },
    goToCart() {
      this.$router.push("/cart");
      this.hideOffcanvas();
    },
    goToProducts() {
      this.$router.push("/products");
      this.hideOffcanvas();
    },
    hideOffcanvas() {
      this.offcanvas.hide();
    },
  },
  mounted() {
    this.offcanvas = new Offcanvas(this.$refs.offcanvas);
    this.getCart();
    this.emitter.on("get-cart", () => {
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
.cart-img {
  height: 120px;
  width: 120px;
  object-fit: cover;
}

.sentiment_dissatisfied {
  font-size: 3rem;
}
</style>
