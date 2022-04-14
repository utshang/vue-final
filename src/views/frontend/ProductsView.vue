<template>
  <div class="main container">
    <!-- 麵包屑導航 -->

    <ol class="breadcrumb mb-5">
      <li class="breadcrumb-item"><router-link to="/">首頁</router-link></li>
      <li class="breadcrumb-item active" aria-current="page">
        <router-link to="/products" @click="getProductsList('')"
          >全部產品</router-link
        >
      </li>
    </ol>

    <!-- 產品 -->

    <div class="menu row">
      <div class="category ps-md-5 col-md-6 col-lg-3">
        <h3
          class="mb-4 fs-4 fw-bold text-secondary d-flex align-items-center"
          @click="getProductsList('')"
        >
          全部商品<span class="ms-2 material-icons-outlined">
            local_florist
          </span>
        </h3>

        <ul class="category d-flex d-md-block justify-content-evenly mt-3">
          <li class="mb-4" @click="getProductsList('花束')">
            <a><span>花束</span></a>
          </li>
          <li class="mb-4" @click="getProductsList('花籃')">
            <a><span>花籃</span></a>
          </li>
          <li class="mb-4" @click="getProductsList('花材')">
            <a><span>花材</span></a>
          </li>
          <li class="mb-4" @click="getProductsList('器皿')">
            <a><span>器皿</span></a>
          </li>
        </ul>
      </div>
      <div class="col-md-6 col-lg-9">
        <div class="row row-cols-1 row-cols-sm-2 row-cols-xl-3 g-4">
          <div class="col" v-for="item in products" :key="item.id">
            <div class="card border-width h-100">
              <div
                class="fav-icon position-absolute"
                @click="toggleFav(item.id)"
              >
                <span
                  class="material-icons-outlined favorite position-absolute text-white"
                  v-if="favorite.includes(item.id)"
                >
                  favorite
                </span>
                <span
                  class="material-icons-outlined favorite position-absolute text-white"
                  v-else
                >
                  favorite_border
                </span>
              </div>
              <router-link :to="`/product/${item.id}`">
                <div
                  class="card-img"
                  :style="{ backgroundImage: `url(${item.imageUrl})` }"
                ></div
              ></router-link>
              <div
                class="card-body d-flex align-items-end justify-content-between"
              >
                <div class="card-body-content">
                  <router-link
                    class="card-title fs-5 fw-bold lh-base mb-2"
                    :to="`/product/${item.id}`"
                  >
                    {{ item.title }}
                  </router-link>
                  <div
                    class="price fs-6 fw-bold text-secondary mt-3"
                    v-if="item.origin_price === item.price"
                  >
                    NT$ {{ item.price }} 元
                  </div>
                  <div class="origin-price d-flex align-items-end mt-3" v-else>
                    <p class="fs-6 pe-2 text-secondary fs-5 fw-bold">
                      NT$ {{ item.price }} 元
                    </p>
                    <del class="fs-7 text-muted">
                      NT$ {{ item.origin_price }} 元</del
                    >
                  </div>
                </div>
                <div>
                  <a
                    class="cart-icon bg-secondary pt-3 pb-1 px-2 rounded-circle"
                    @click="addCart(item.id), pushMessageState"
                  >
                    <span class="material-icons-outlined">
                      add_shopping_cart
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <PaginationCom
      class="d-flex justify-content-md-end justify-content-center mt-5"
      :pages="pagination"
      @emit-pages="getProductsList()"
    ></PaginationCom>
  </div>

  <VeeLoading :active="isLoading"></VeeLoading>
</template>

<script>
import PaginationCom from "@/components/PaginationCom.vue";

import FavoriteMixin from "@/mixins/FavoriteMixin";
export default {
  data() {
    return {
      product: {},
      products: [],
      pagination: {},
      cartData: {},
      loadingStatus: {
        loadingItem: "",
      },
      isLoading: false,
      currentPage: 1,
    };
  },
  mixins: [FavoriteMixin],
  inject: ["emitter"],
  components: {
    PaginationCom,
  },

  methods: {
    getProductsList(category, page = 1) {
      document.documentElement.scrollTop = 0;
      this.currentPage = page;
      let url = `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/products/?page=${page}`;
      if (category) {
        url = `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/products?category=${category}&page=${page}`;
      }
      this.isLoading = true;

      this.$http
        .get(url)
        .then((res) => {
          this.products = res.data.products;
          this.pagination = res.data.pagination;
          this.isLoading = false;
        })
        .catch((error) => {
          this.$httpMessageState(error.response, "錯誤訊息");
        });
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
.main {
  margin-top: 60px;
  margin-bottom: 60px;
}

.breadcrumb {
  padding-left: 0rem;
}

@media screen and (min-width: 769px) {
  .breadcrumb {
    padding-left: 2.2rem;
  }
}

h1 {
  text-align: center;
}

.router-link-active {
  color: #6c757d;
  &:hover {
    color: #c6cace;
  }
}

.router-link-exact-active {
  color: #ad795d;
  font-weight: bold;
  &:hover {
    color: #e6ccab;
  }
}

.category li a {
  color: #6c757d;
  width: 200px;
  transition: all 0.5s;
}

.category li a span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

.category li a span:after {
  content: "\00bb";
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}

.category li a:hover span {
  color: #c6cace;
  padding-right: 25px;
}

.category li a:hover span:after {
  opacity: 1;
  right: 0;
}

@media screen and (min-width: 769px) {
  .category {
    position: sticky;
    top: 118px;
    height: calc(100vh - 118px);
  }
}

.card {
  box-shadow: 0 2px 15px -2px rgb(0 0 0 / 12%), 0 2px 6px -2px rgb(0 0 0 / 5%);
  border-radius: 1rem;
  transition-duration: 0.3s;
  &:hover {
    transform: translateY(-6px);
    .fav-icon {
      display: block;
      animation: fav-animation;
      animation-duration: 0.5s;
      transition: all 0.3s ease;
    }
  }
  .card-img {
    height: 22rem;
    background-size: cover;
    background-position: center;
    border-top-left-radius: 1em;
    border-top-right-radius: 1em;
  }
  .card-title {
    color: #000000;
  }
  .cart-icon {
    height: 2rem;
    width: 2rem;
    color: #fffafa;
    cursor: pointer;

    &:hover {
      color: #ad795d;
      background-color: #fffafa !important;
      border: 3px solid #ad795d;
    }
  }
  .fav-icon {
    top: 3%;
    right: 3%;
    height: 2.5rem;
    width: 2.5rem;
    background-color: rgba(0, 0, 0, 0.25);
    border-radius: 50%;
    cursor: pointer;
    display: none;

    .favorite {
      top: 21%;
      left: 20%;
      transition: all 0.3s ease;
      // color: #fffafa;
    }
  }
}

.menu {
  h3 {
    cursor: pointer;
  }
  &-bar {
    padding-right: 1rem;
  }
}

@keyframes fav-animation {
  from {
    top: 0;
  }
  to {
    top: 3%;
  }
}
</style>
