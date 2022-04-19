<template>
  <div class="container my-5">
    <div class="product mb-5">
      <div class="row">
        <div class="product-img text-xl-end col-md-7">
          <div
            class="product-img-img"
            v-if="!product.imagesUrl"
            style="
              height: 45rem;
              background-position: center center;
              background-size: cover;
            "
            :style="{ backgroundImage: `url(${product.imageUrl})` }"
          ></div>
          <ProductSwiper v-else :product="product" />
        </div>
        <div class="product-body col-md-5 mt-4 mt-md-0">
          <div class="d-flex justify-content-between">
            <ol class="breadcrumb mb-4 mt-1">
              <li class="breadcrumb-item">
                <RouterLink to="/">首頁</RouterLink>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                <RouterLink to="/products">全部產品</RouterLink>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                {{ product.category }}
              </li>
            </ol>
            <div class="fav-icon" @click="toggleFav(product.id)">
              <span
                class="material-icons-outlined favorite text-primary"
                v-if="favorite.includes(product.id)"
              >
                favorite
              </span>
              <span
                class="material-icons-outlined favorite text-primary"
                v-else
              >
                favorite_border
              </span>
            </div>
          </div>
          <h2 class="product-title fw-bold mb-4">
            {{ product.title }}
          </h2>
          <div
            class="price fw-bold text-secondary mt-3"
            v-if="product.origin_price === product.price"
          >
            NT$ {{ product.price }} 元
          </div>
          <div v-else class="origin-price d-flex align-items-end">
            <div class="pe-2 text-secondary fw-bold">
              NT$ {{ product.price }} 元
            </div>
            <del class="text-decoration-line-through ps-2">
              NT$ {{ product.origin_price }} 元</del
            >
          </div>
          <p class="product-description lh-lg mt-4 p-3 rounded-3">
            {{ product.description }}
          </p>
          <!-- 產品詳細說明 -->
          <div
            class="accordion rounded-3 shadow mt-4"
            id="accordionPanelsStayOpenExample"
          >
            <div class="accordion-item">
              <div
                class="accordion-button text-standard"
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapseOne"
                aria-expanded="true"
                aria-controls="panelsStayOpen-collapseOne"
              >
                產品詳細說明
              </div>
              <div
                id="panelsStayOpen-collapseOne"
                class="accordion-collapse collapse show"
                aria-labelledby="panelsStayOpen-headingOne"
              >
                <div
                  class="accordion-body lh-lg border-top border-1 border-primary"
                >
                  <ul>
                    <li class="fs-7" v-if="product.specification">
                      <p class="text-standard">規格：</p>
                      {{ product.specification }}
                    </li>
                    <li class="fs-7 mt-3" v-if="product.color">
                      <p class="text-standard">花朵色系：</p>
                      {{ product.color }}
                    </li>
                    <li class="fs-7 mt-3" v-if="product.notice">
                      <p class="text-standard">注意事項：</p>
                      {{ product.notice }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <input
            type="number"
            class="form-control mt-4"
            min="1"
            max="5"
            v-model.number="qty"
          />
          <button
            type="button"
            class="btn btn-success text-white w-100 mt-4"
            @click="addCart(product.id, qty)"
          >
            加入購物車
          </button>
        </div>
      </div>
    </div>

    <!-- Nav tabs -->
    <ul
      class="nav nav-tabs d-flex justify-content-around mb-3"
      id="myTab"
      role="tablist"
    >
      <li class="nav-item" role="presentation">
        <button
          class="nav-link active"
          id="home-tab"
          data-bs-toggle="tab"
          data-bs-target="#home"
          type="button"
          role="tab"
          aria-controls="home"
          aria-selected="true"
        >
          付款/取貨
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          id="profile-tab"
          data-bs-toggle="tab"
          data-bs-target="#profile"
          type="button"
          role="tab"
          aria-controls="profile"
          aria-selected="false"
        >
          購物須知
        </button>
      </li>
    </ul>

    <!-- Tab panes -->
    <div class="tab-content">
      <div
        class="tab-pane active lh-lg"
        id="home"
        role="tabpanel"
        aria-labelledby="home-tab"
      >
        ∙ 付款方式：現金付款、信用卡<br />
        ∙ 取/送貨方式：店面自取、黑貓-常溫（送貨需要2-3日）
      </div>
      <div
        class="tab-pane lh-lg"
        id="profile"
        role="tabpanel"
        aria-labelledby="profile-tab"
      >
        ∙
        品項有限，每款商品最多限購5個，如需大量訂購請與我們聯繫，將提供報價單！<br />
        ∙
        測量尺寸與實際尺寸可能會有些微誤差，螢幕亮度等可能會有色差，請以實品為主！<br />
        ∙
        有任何問題都可以【聯繫我們】，我們會在看到你的來訊/來信的時候盡快回覆你的訊息！
      </div>
    </div>
    <!-- 精選商品 輪播 -->
    <div class="mt-6">
      <h2 class="fs-3 text-secondary fw-bold mb-4">
        推薦商品 <span class="fs-5">Recommend</span>
      </h2>
      <RandomSwiper />
    </div>
  </div>

  <VeeLoading :active="isLoading" />
</template>

<script>
import RandomSwiper from "@/components/RandomSwiper.vue";
import ProductSwiper from "@/components/ImageSwiper.vue";
import FavoriteMixin from "@/mixins/FavoriteMixin";

export default {
  components: { ProductSwiper, RandomSwiper },
  mixins: [FavoriteMixin],
  inject: ["emitter"],
  data() {
    return {
      product: {
        imageUrl: "",
      },
      productId: "",
      qty: 1,
      loadingStatus: {
        loadingItem: "",
      },
      isLoading: false,
    };
  },
  methods: {
    getProduct() {
      document.documentElement.scrollTop = 0;
      this.isLoading = true;
      const { id } = this.$route.params;
      this.$http
        .get(
          `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/product/${id}`
        )
        .then((res) => {
          this.product = res.data.product;
          this.isLoading = false;
        })
        .catch((error) => {
          this.$httpMessageState(error.response, "錯誤訊息");
        });
    },
    updateCartItem(item) {
      this.$http
        .put(
          `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/cart/${item.id}`,
          {
            data: { product_id: item.id, qty: item.qty },
          }
        )
        .then(() => {
          this.getCart();
        })
        .catch((error) => {
          this.$httpMessageState(error.response, "錯誤訊息");
        });
    },
    addCart(id, qty = 1) {
      this.$http
        .post(
          `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/cart`,
          {
            data: { product_id: id, qty },
          }
        )
        .then(() => {
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
  //因為不會再重新跑一次 mounted，需要監聽 $route，當路徑改變，前往該頁面
  watch: {
    $route(to) {
      if (this.$route.name === "product") {
        this.getProduct(`${to.params.id}`);
      }
    },
  },
  mounted() {
    this.getProduct();
    this.emitter.emit("get-fav", this.favorite);
  },
};
</script>

<style lang="scss" scoped>
$secondary: #ad795d;

.breadcrumb-item {
  font-size: 0.75rem;
}
@media screen and (min-width: 769px) {
  .breadcrumb-item {
    font-size: 1rem;
  }
}
.product-title {
  font-size: 1.5rem;
}
@media screen and (min-width: 769px) {
  .product-title {
    font-size: 2rem;
  }
}
.origin-price {
  font-size: 1.2rem;
}
@media screen and (min-width: 769px) {
  .origin-price {
    font-size: 1.5rem;
  }
}
del {
  color: #6c757d;
  font-size: 0.75rem;
}
@media screen and (min-width: 769px) {
  del {
    font-size: 1rem;
  }
}
.product-img {
  object-fit: cover;
}
@media screen and (min-width: 1200px) {
  .product-img {
    object-fit: cover;
    padding-right: 4rem;
  }
}
.product-description {
  background-color: #e6ccab57;
  border-left: 3px solid #e6ccab;
}
.form-control {
  border: 3px solid #e6ccab;
}
@media screen and (min-width: 769px) {
  .accordion-body ul li,
  p {
    font-size: 1rem;
  }
}
@media screen and (min-width: 769px) {
  .product-body {
    position: sticky;
    top: 118px;
    height: calc(100vh - 118px);
  }
}
.nav-tabs .nav-link.active,
.nav-tabs .nav-item.show .nav-link {
  color: $secondary;
}
.nav-tabs {
  border-bottom: 1px solid #ced4da;
}
.nav-link {
  color: #495057;
}
.nav .active {
  border-bottom: 2px solid #e6ccab;
}
h2 {
  span {
    font-family: "Sansita Swashed", cursive;
  }
}
.accordion-button {
  color: $secondary;
}
</style>
