<template>
  <div class="main container">
    <!-- 麵包屑導航 -->
    <div class="d-sm-flex justify-content-sm-between mb-5">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><RouterLink to="/">首頁</RouterLink></li>
        <li class="breadcrumb-item active" aria-current="page">
          <RouterLink
            class="text-standard"
            to="/products"
            @click="getProductsList"
            >全部產品</RouterLink
          >
        </li>
      </ol>
      <div>
        <div class="d-flex">
          <input
            type="search"
            v-model.trim="search"
            placeholder="請輸入關鍵字"
            class="fs-7 px-2 rounded-0 border border-1 border-muted w-100"
          />
          <button
            type="submit"
            class="btn bg-primary d-flex align-items-center rounded-0"
            @click="searchProducts"
          >
            <span class="material-icons-outlined text-white"> search </span>
          </button>
        </div>

        <ul
          class="search-list bg-pure shadow mt-2 position-absolute"
          :class="searchComplete ? '' : 'd-none'"
        >
          <li
            class="search-result p-3"
            v-for="item in matchWord"
            :key="item.title"
          >
            <RouterLink :to="`/product/${item.id}`"
              >{{ item.title }}
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
    <!-- 產品 -->
    <div class="menu row mt-5">
      <div class="category ps-md-5 col-md-6 col-lg-3">
        <h3
          class="mb-4 fs-4 fw-bold text-primary d-flex align-items-center justify-content-center justify-content-md-start"
          @click="getCategory('')"
        >
          全部商品<span class="ms-2 material-icons-outlined">
            local_florist
          </span>
        </h3>
        <ul class="d-flex d-md-block justify-content-evenly mt-3">
          <li
            class="mb-4"
            v-for="item in categories"
            :key="`類別_${item}`"
            @click="getCategory(item)"
          >
            <a
              ><span>{{ item }}</span></a
            >
          </li>
        </ul>
      </div>

      <div class="col-md-6 col-lg-9">
        <div class="row row-cols-1 row-cols-sm-2 row-cols-xl-3 g-4">
          <div class="col" v-for="item in products" :key="item.id">
            <div class="card border-width h-100 shadow">
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
              <RouterLink :to="`/product/${item.id}`">
                <div
                  class="card-img"
                  :style="{ backgroundImage: `url(${item.imageUrl})` }"
                ></div
              ></RouterLink>
              <div
                class="card-body d-flex align-items-end justify-content-between"
              >
                <div class="card-body-content">
                  <RouterLink
                    class="card-title fs-5 text-black fw-bold lh-base mb-2"
                    :to="`/product/${item.id}`"
                  >
                    {{ item.title }}
                  </RouterLink>
                  <div
                    class="price fs-6 fw-bold text-primary mt-3"
                    v-if="item.origin_price === item.price"
                  >
                    NT$ {{ $filters.currency(item.price) }} 元
                  </div>
                  <div class="origin-price d-flex align-items-end mt-3" v-else>
                    <p class="fs-6 pe-2 text-primary fs-5 fw-bold">
                      NT$ {{ $filters.currency(item.price) }} 元
                    </p>
                    <del class="fs-7 text-muted">
                      NT$
                      {{ $filters.currency(item.origin_price) }} 元</del
                    >
                  </div>
                </div>

                <div @click="addCart(item.id)">
                  <div class="loader" title="1" v-if="loadingItem === item.id">
                    <svg
                      version="1.1"
                      id="loader-1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      width="24px"
                      height="24px"
                      viewBox="0 0 50 50"
                      style="enable-background: new 0 0 50 50"
                      xml:space="preserve"
                    >
                      <path
                        fill="#000"
                        d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z"
                      >
                        <animateTransform
                          attributeType="xml"
                          attributeName="transform"
                          type="rotate"
                          from="0 25 25"
                          to="360 25 25"
                          dur="0.6s"
                          repeatCount="indefinite"
                        />
                      </path>
                    </svg>
                  </div>
                  <a class="cart-icon text-primary" v-else>
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
      @emit-pages="getProductsList"
    />
  </div>
  <VeeLoading :active="isLoading" />
</template>

<script>
import PaginationCom from "@/components/PaginationCom.vue";
import FavoriteMixin from "@/mixins/FavoriteMixin";

export default {
  data() {
    return {
      product: {},
      products: [],
      allProducts: [],
      pagination: {},
      category: "",
      categories: [],
      cartData: {},
      loadingItem: "",
      isLoading: false,
      currentPage: 1,
      search: "",
      searchComplete: false,
    };
  },
  mixins: [FavoriteMixin],
  inject: ["emitter"],
  components: {
    PaginationCom,
  },
  methods: {
    getProductsList(page = 1) {
      document.documentElement.scrollTop = 0;
      let url = `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/products/?page=${page}&category=${this.category}`;
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
      this.loadingItem = id;
      this.$http
        .post(
          `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/cart`,
          {
            data: { product_id: id, qty },
          }
        )
        .then(() => {
          //讀取完後清空
          this.loadingItem = "";
          this.emitter.emit("push-message", {
            style: "success",
            title: "成功加入購物車囉！",
          });
          this.emitter.emit("get-cart");
        })
        .catch(() => {
          this.emitter.emit("push-message", {
            style: "danger",
            title: "加入購物車失敗囉，請重新加入！",
          });
        });
    },
    getAllProducts() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http
        .get(url)
        .then((res) => {
          this.allProducts = res.data.products;
          this.isLoading = false;
          this.getCategories();
        })
        .catch((err) => {
          this.$httpMessageState(err.response, "錯誤訊息");
        });
    },
    getCategories() {
      //取出 allProducts 所有產品的 category
      const MapCategories = this.allProducts.map((item) => item.category);
      //使用 set 過濾重複的元素，並轉成陣列
      this.categories = new Set(MapCategories);
    },
    getCategory(category) {
      this.category = category;
    },
    searchProducts() {
      this.products = this.filterProducts;
      this.searchComplete = false;
    },
  },
  watch: {
    category() {
      this.getProductsList();
    },
    search() {
      if (this.search) {
        this.searchComplete = true;
      } else {
        this.searchComplete = false;
      }
    },
  },
  computed: {
    matchWord() {
      const strArr = this.search.split(" ");
      const arr = [];

      strArr.forEach((str) => {
        this.allProducts.forEach((item) => {
          if (item.title.includes(str)) {
            arr.push(item);
          }
        });
      });

      return [...new Set(arr)];
    },
  },
  mounted() {
    this.getProductsList();
    this.getAllProducts();
    this.emitter.emit("get-fav", this.favorite);
  },
};
</script>

<style lang="scss" scoped>
$primary: #ad795d;
$secondary: #e6ccab;
$gray-300: #dee2e6;
$gray-600: #6c757d;
$black: #000;
$white: #fffafa;

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
  color: $gray-600;
  &:hover {
    color: #c6cace;
  }
}
.router-link-exact-active {
  color: $primary;
  font-weight: bold;
  &:hover {
    color: $secondary;
  }
}
.category li a {
  color: $gray-600;
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
  .cart-icon {
    height: 2rem;
    width: 2rem;
    cursor: pointer;
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
    }
  }
}

.search-list {
  width: 100%;
  .search-result {
    letter-spacing: 1px;
    &:hover {
      background-color: $gray-300;
      cursor: pointer;
    }
    a {
      color: $black;
    }
  }
}

@media screen and (min-width: 576px) {
  .search-list {
    width: 222px;
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

.loader {
  text-align: center;
  display: inline-block;
  vertical-align: top;
}

svg path,
svg rect {
  fill: $primary;
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
