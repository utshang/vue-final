<template>
  <h1>這是前台產品列表</h1>

  <!-- row決定內層的數量 -->
  <div class="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-3">
    <div class="col" v-for="item in products" :key="item.id">
      <div class="card h-100">
        <div
          :style="{ backgroundImage: `url(${item.imageUrl})` }"
          style="
            height: 23.5rem;
            background-size: cover;
            background-position: center;
          "
        ></div>
        <div class="card-body">
          <h5 class="card-title">{{ item.title }}</h5>
          <p class="card-text">
            {{ item.price }}
          </p>
          <button
            type="button"
            class="btn btn-outline-danger"
            :disabled="loadingStatus.loadingItem === item.id"
            @click="getProduct(item.id)"
          >
            <i
              class="fas fa-spinner fa-pulse"
              v-if="loadingStatus.loadingItem === item.id"
            ></i>
            查看更多
          </button>

          <button
            type="button"
            class="btn btn-outline-danger"
            @click="addCart(item.id)"
            :disabled="loadingStatus.loadingItem === item.id"
          >
            <i
              class="fas fa-spinner fa-pulse"
              v-if="loadingStatus.loadingItem === item.id"
            ></i>
            加到購物車
          </button>
        </div>
      </div>
    </div>
  </div>

  <VeeLoading :active="isLoading"></VeeLoading>

  <UserProductModal
    ref="userProductModal"
    :product="product"
    @add-cart="addCart"
  ></UserProductModal>
</template>

<script>
import UserProductModal from "@/components/UserProductModal.vue";
import emitter from "@/libs/emitter";

export default {
  data() {
    return {
      product: {},
      products: [],
      cartData: {},
      loadingStatus: {
        loadingItem: "",
      },
      isLoading: false,
    };
  },
  components: {
    UserProductModal,
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
          // console.log(this.products);
        });
    },
    // getCart() {
    //   this.$http
    //     .get(
    //       `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/cart`
    //     )
    //     .then((res) => {
    //       // console.log(res);
    //       this.cartData = res.data.data;
    //     })
    //     .catch((err) => {
    //       alert(err);
    //     });
    // },
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
          // console.log(res);

          //讀取完後清空
          this.loadingStatus.loadingItem = "";
          this.$refs.userProductModal.hideModal();
          this.isLoading = false;
          emitter.emit("get-cart");
        })
        .catch(() => {
          // console.log(err);
        });
    },
    getProduct(id) {
      this.isLoading = true;
      this.loadingStatus.loadingItem = id;

      this.$http
        .get(
          `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/product/${id}`
        )
        .then((response) => {
          this.loadingStatus.loadingItem = "";
          this.product = response.data.product;
          this.isLoading = false;
          this.$refs.userProductModal.openModal();
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
  },

  mounted() {
    this.getProductsList();
    // emitter.on("get-cart", () => {
    //   this.getCart();
    // });
  },
};
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
}
</style>
