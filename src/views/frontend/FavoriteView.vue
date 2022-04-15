<template>
  <div
    class="banner mt-3 d-md-none d-block"
    :style="{
      backgroundImage:
        'url(' + require('@/assets/images/front/favorite.jpg') + ')',
    }"
  ></div>
  <div class="container">
    <div
      class="banner mt-3 d-md-block d-none"
      :style="{
        backgroundImage:
          'url(' + require('@/assets/images/front/favorite.jpg') + ')',
      }"
    ></div>
    <p class="title text-secondary fw-bold text-center mt-5">我的最愛</p>
    <template v-if="product.length === 0">
      <div class="p-5 text-center">
        <span class="material-icons-outlined heart_broken text-primary mb-3">
          heart_broken
        </span>
        <p class="text-muted mb-4">我的最愛空空的唷！</p>

        <router-link
          to="/products"
          class="bg-secondary text-white py-2 px-5 rounded-3"
          >來去逛逛！</router-link
        >
      </div>
    </template>
    <template v-else>
      <div class="fav-list my-5">
        <div v-for="item in product" :key="item.id">
          <div class="fav-item rounded-3 shadow p-4 mb-4 d-flex row">
            <div class="col-sm-5 col-md-3">
              <router-link :to="`/product/${item.id}`">
                <img
                  class="fav-item-img rounded-3"
                  :src="item.imageUrl"
                  alt="item.title"
                />
              </router-link>
            </div>
            <div
              class="col-sm-7 col-md-9 mt-4 mt-sm-1 d-flex flex-column justify-content-between"
            >
              <div>
                <div class="d-flex justify-content-between">
                  <span
                    class="badge bg-secondary fav-item-tag mb-3 d-flex align-items-center justify-content-center"
                  >
                    {{ item.category }}</span
                  >
                  <div
                    class="fav-icon text-end"
                    @click="toggleFav(item.id), getProductsList()"
                  >
                    <span
                      class="material-icons-outlined text-primary favorite"
                      v-if="favorite.includes(item.id)"
                    >
                      favorite
                    </span>
                    <span
                      class="material-icons-outlined text-primary favorite"
                      v-else
                    >
                      favorite_border
                    </span>
                  </div>
                </div>

                <div class="fav-body mt-sm-1">
                  <router-link :to="`/product/${item.id}`">
                    <h2
                      class="fav-item-title text-secondary fw-bold mb-3 lh-base"
                    >
                      {{ item.title }}
                    </h2>
                  </router-link>
                  <p class="fav-item-description fs-7 text-muted mb-4 lh-base">
                    {{ item.description }}
                  </p>
                  <div class="d-flex align-items-end fw-bold">
                    <p class="fs-5 text-black me-2">NT$ {{ item.price }}</p>
                    <del class="fs-7 text-muted"
                      >NT$ {{ item.origin_price }}</del
                    >
                  </div>
                </div>
              </div>
              <div class="d-md-flex flex-md-column align-self-md-end">
                <button
                  @click="addCart(item.id)"
                  type="button"
                  class="add-cart-btn btn bg-secondary rounded-3 text-white align-self-end mt-3"
                >
                  加入購物車
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
  <VeeLoading :active="isLoading" />
</template>

<script>
import FavoriteMixin from "@/mixins/FavoriteMixin";

export default {
  mixins: [FavoriteMixin],
  inject: ["emitter"],
  data() {
    return {
      products: [],
      product: [],
      loadingStatus: {
        loadingItem: "",
      },
      isLoading: false,
    };
  },
  methods: {
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
    addCart(id, qty = 1) {
      this.isLoading = true;
      this.loadingStatus.loadingItem = id;
      this.$http
        .post(
          `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/cart`,
          {
            data: { product_id: id, qty },
          }
        )
        .then(() => {
          //讀取完後清空
          this.loadingStatus.loadingItem = "";

          this.isLoading = false;
          this.emitter.emit("push-message", {
            style: "success",
            title: "成功加入購物車囉！",
          });
          this.emitter.emit("get-cart");
        })
        .catch(() => {
          this.emitter.emit("push-message", {
            style: "success",
            title: "加入購物車失敗囉，請重新加入！",
          });
        });
    },
  },

  mounted() {
    this.getProductsList();
    this.emitter.emit("get-fav", this.favorite);
  },
};
</script>

<style lang="scss" scoped>
.banner {
  height: calc(100vh - 500px);
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}
.title {
  font-size: 1.875rem;
}

.heart_broken {
  font-size: 5rem;
}

@media screen and (min-width: 769px) {
  .row {
    padding: 0 7.5rem;
  }
}
@media screen and (min-width: 769px) {
  .fav-list {
    padding: 0 7.5rem;
  }
}

.fav-item {
  margin: 0 auto;
  &-img {
    height: 18rem;
    width: 100%;
    object-fit: cover;
  }

  &-title {
    font-size: 1.5rem;
  }
  &-description {
    display: none;
  }
  .add-cart-btn {
    width: 8rem;
  }
  .favorite {
    cursor: pointer;
  }
}

@media screen and (min-width: 576px) {
  .fav-img {
    height: 15rem;
    width: 15rem;
  }
}

.add-cart-btn {
  width: 8rem;
}

@media screen and (min-width: 769px) {
  .fav-item-description {
    display: block;
  }
}
</style>
