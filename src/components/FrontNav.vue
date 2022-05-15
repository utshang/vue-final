<template>
  <div
    class="main-nav px-4 pt-2 pb-1 px-md-5 py-md-3 bg-white position-sticky top-0"
  >
    <div class="nav justify-content-between">
      <div class="d-flex">
        <RouterLink class="home text-secondary fs-3 mt-1" to="/"
          >The Florist</RouterLink
        >
        <div class="d-md-block d-none">
          <div class="d-flex mt-3">
            <li>
              <RouterLink class="link pb-3 ms-4 fs-7 fw-bold" to="/products">
                全部產品</RouterLink
              >
            </li>
            <li>
              <RouterLink class="link pb-3 ms-3 fs-7 fw-bold" to="/about"
                >關於我們</RouterLink
              >
            </li>
            <li>
              <RouterLink class="link pb-3 ms-3 fs-7 fw-bold" to="/contact"
                >聯絡我們</RouterLink
              >
            </li>
            <li>
              <RouterLink class="link ms-3 fs-7 fw-bold" to="/faq"
                >常見問答</RouterLink
              >
            </li>
          </div>
        </div>
      </div>

      <div class="naverbar d-flex align-items-end">
        <div class="naverbar-item">
          <ul class="d-flex align-items-center">
            <li>
              <RouterLink class="home text-secondary" to="/favorite">
                <span class="material-icons px-3 text-secondary">
                  favorite
                </span>
                <span
                  class="favorite-num rounded-pill bg-danger position-absolute"
                >
                  {{ product.length }}</span
                >
              </RouterLink>
            </li>

            <li>
              <a
                class="home text-secondary"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight"
                aria-controls="offcanvasRight"
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
              id="offcanvasRight"
              aria-labelledby="offcanvasRightLabel"
              ref="offcanvas"
            >
              <div class="offcanvas-header p-4">
                <h5
                  class="offcanvas-title fs-4 fw-bold"
                  id="offcanvasRightLabel"
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
                      class="material-icons-outlined align-self-center text-muted del-icon"
                      @click="delProduct(item.id)"
                    >
                      highlight_off
                    </span>
                    <div class="mx-3">
                      <img
                        class="cart-img rounded-3"
                        :src="item.product.imageUrl"
                        :alt="item.title"
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
                          NT$
                          {{ $filters.currency(item.product.price * item.qty) }}
                        </p>
                        <del class="fw-bold fs-7 ms-2 text-muted">
                          NT$
                          {{
                            $filters.currency(
                              item.product.origin_price * item.qty
                            )
                          }}
                        </del>
                      </div>
                      <p class="fs-7">
                        數量：{{ item.qty }} {{ item.product.unit }}
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  class="btn btn-secondary text-white mt-4 w-100"
                  data-bs-dismiss="offcanvas"
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
                    type="button"
                    class="btn btn-secondary text-white mt-4 w-100"
                    data-bs-dismiss="offcanvas"
                    @click="goToProducts"
                  >
                    來去逛逛！
                  </button>
                </div>
              </template>
            </div>
            <li class="d-md-none d-block">
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
                    <RouterLink class="dropdown-item link" to="/products">
                      全部產品</RouterLink
                    >
                  </li>
                  <li class="pb-3">
                    <RouterLink class="dropdown-item link" to="/about"
                      >關於我們</RouterLink
                    >
                  </li>
                  <li class="pb-3">
                    <RouterLink class="dropdown-item link" to="/contact"
                      >聯絡我們</RouterLink
                    >
                  </li>
                  <li>
                    <RouterLink class="dropdown-item link" to="/faq"
                      >常見問答</RouterLink
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
// import Offcanvas from "bootstrap/js/dist/offcanvas";
import FavoriteMixin from "@/mixins/FavoriteMixin";

export default {
  mixins: [FavoriteMixin],
  inject: ["emitter"],
  data() {
    return {
      products: [],
      product: [],
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
          this.cartData = res.data.data;
        })
        .catch((error) => {
          this.$httpMessageState(error.response, "錯誤訊息");
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
          this.getCart();
          this.emitter.emit("get-cart");
          this.emitter.emit("push-message", {
            style: "success",
            title: "成功刪除商品囉！",
          });
        })
        .catch(() => {
          this.emitter.emit("push-message", {
            style: "danger",
            title: "刪除商品失敗囉！",
          });
        });
    },
    goToCart() {
      this.$router.push("/cart");
    },
    goToProducts() {
      this.$router.push("/products");
    },

    getProductsList() {
      this.isLoading = true;
      this.$http
        .get(
          `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/products/all`
        )
        .then((res) => {
          this.products = res.data.products;
          this.isLoading = false;
          this.getFavoriteProducts();
        })
        .catch((error) => {
          this.$httpMessageState(error.response, "錯誤訊息");
        });
    },
    getFavoriteProducts() {
      this.product = this.products.filter((item) =>
        this.favorite.includes(item.id)
      );
    },
  },
  computed: {
    mobile() {
      return this.$vuetify.breakpoint.sm;
    },
  },
  mounted() {
    this.getProductsList();
    // this.offcanvas = new Offcanvas(this.$refs.offcanvas);
    this.getCart();
    this.emitter.on("get-cart", () => {
      this.getCart();
    });
    this.emitter.on("get-fav", (favorite) => {
      this.getFavoriteProducts();
      this.favorite = favorite;
    });
  },
};
</script>
<style lang="scss" scoped>
$secondary: #ad795d;
$black: #000;
$gray-600: #6c757d;
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
.cart-num {
  font-size: 0.75rem;
  color: #fffafa;
  padding: 0.1rem 0.4rem 0.3rem;
  top: 6px;
  right: 92px;
}
@media screen and (min-width: 769px) {
  .cart-num {
    font-size: 0.75rem;
    color: #fffafa;
    padding: 0.1rem 0.4rem 0.3rem;
    top: 9px;
    right: 55px;
  }
}
.favorite-num {
  font-size: 0.75rem;
  color: #fffafa;
  padding: 0.1rem 0.4rem 0.3rem;
  top: 6px;
  right: 152px;
}
@media screen and (min-width: 769px) {
  .favorite-num {
    font-size: 0.75rem;
    color: #fffafa;
    padding: 0.1rem 0.4rem 0.3rem;
    top: 9px;
    right: 114px;
  }
}
.cart-img {
  height: 7.5rem;
  width: 7.5rem;
  object-fit: cover;
}
.sentiment_dissatisfied {
  font-size: 3rem;
}
.del-icon {
  cursor: pointer;
}
.link {
  color: $secondary;
}
.link:active {
  color: $gray-600;
}
</style>
