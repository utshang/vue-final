<template>
  <div class="container">
    <div class="row my-5">
      <div class="col-md-6">
        <div class="cart-list rounded-3 shadow p-5">
          <div
            class="d-flex justify-content-between align-items-end fs-7 border-bottom border-2 border-primary pb-3"
          >
            <h3 class="fs-4 fw-bold">購物清單</h3>
            <button
              class="text-muted d-block border-0"
              type="button"
              @click="delAllProduct"
              :disabled="cartData.carts?.length === 0"
            >
              清除購物清單
            </button>
          </div>
          <template v-if="cartData.carts?.length">
            <div v-for="item in cartData.carts" :key="item.id">
              <div class="cart-list-body mt-4 d-flex">
                <div class="d-flex flex-grow-1">
                  <router-link :to="`/product/${item.product.id}`">
                    <img
                      class="cart-img rounded-3"
                      :src="item.product.imageUrl"
                      alt="item.title"
                    />
                  </router-link>

                  <div
                    class="d-flex flex-column justify-content-start ms-3 mt-2"
                  >
                    <router-link
                      :to="`/product/${item.product.id}`"
                      class="mb-3"
                    >
                      <p class="fs-5 fw-bold text-black">
                        {{ item.product.title }}
                      </p>
                    </router-link>
                    <div class="select-num">
                      <select
                        id=""
                        class="form-select border border-1"
                        v-model="item.qty"
                        @change="updateCartItem(item)"
                        :disabled="loadingStatus.loadingItem === item.id"
                      >
                        <option
                          :value="num"
                          v-for="num in 5"
                          :key="`${num}${item.id}`"
                        >
                          {{ num }}
                        </option>
                      </select>
                    </div>
                    <div class="d-sm-none d-flex align-items-end">
                      <p class="fw-bold fs-7 mt-3">
                        NT$ {{ item.product.price * item.qty }}
                      </p>
                      <del class="fs-8 text-muted ms-2">
                        NT$ {{ item.product.origin_price * item.qty }}
                      </del>
                    </div>
                  </div>
                </div>
                <div
                  class="d-sm-flex flex-sm-column justify-content-sm-between mt-1"
                >
                  <a
                    type="button"
                    class="text-muted flex-shrink-1"
                    @click="delProduct(item.id)"
                  >
                    <span class="material-icons-outlined text-end d-block">
                      delete
                    </span>
                  </a>
                  <div class="d-none d-sm-block">
                    <p class="mb-2 fw-bold fs-5">
                      NT$ {{ item.product.price * item.qty }}
                    </p>
                    <del
                      class="fs-7 text-muted d-flex flex-column align-items-end"
                    >
                      NT$ {{ item.product.origin_price * item.qty }}
                    </del>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="cartData.carts?.length">
              <p class="text-end fw-bold text-secondary fs-4 mt-5">
                總金額 NT$ {{ cartData.final_total }}
              </p>
            </div>
          </template>
          <template v-else>
            <div class="text-center pt-4">
              <span
                class="material-icons-outlined add_shopping_cart text-primary pb-3"
              >
                add_shopping_cart
              </span>
              <p class="text-muted mb-4">購物車空空的唷！</p>

              <router-link
                to="/products"
                class="bg-secondary text-white py-2 px-5 rounded-3"
                >來去挑選商品！</router-link
              >
            </div>
          </template>
        </div>
      </div>

      <div class="mb-5 justify-content-center col-md-6">
        <VeeForm
          class="rounded-3 shadow p-5"
          ref="form"
          v-slot="{ errors }"
          @submit="createOrder"
        >
          <div>
            <h3 class="border-bottom border-2 border-primary fs-4 fw-bold pb-3">
              填寫資料
            </h3>
          </div>

          <div class="form-floating form-downline mt-4 mb-3">
            <VeeField
              id="name"
              name="姓名"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['姓名'] }"
              rules="required"
              v-model="form.user.name"
              placeholder="請輸入姓名"
            ></VeeField>
            <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
            <label for="name" class="form-label">姓名</label>
          </div>

          <div class="form-floating form-downline mb-3">
            <VeeField
              id="tel"
              name="電話"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['電話'] }"
              rules="required|min:8|max:10"
              v-model="form.user.tel"
              placeholder="請輸入電話"
            ></VeeField>
            <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
            <label for="tel" class="form-label">聯絡電話</label>
          </div>

          <div class="form-floating form-downline mb-3">
            <VeeField
              id="address"
              name="地址"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['地址'] }"
              rules="required"
              v-model="form.user.address"
              placeholder="請輸入地址"
            ></VeeField>
            <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
            <label for="address" class="form-label">寄送地址</label>
          </div>

          <div class="form-floating form-downline">
            <VeeField
              id="email"
              name="email"
              type="email"
              class="form-control"
              :class="{ 'is-invalid': errors['email'] }"
              rules="email|required"
              v-model="form.user.email"
              placeholder="請輸入Email"
            ></VeeField>
            <label for="email" class="form-label">Email</label>
            <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
          </div>

          <div class="mt-3">
            <label for="message" class="form-label ps-2">備註</label>
            <textarea
              id="message"
              class="form-control border border-1"
              cols="20"
              rows="5"
              v-model="form.message"
            ></textarea>
          </div>
          <button
            type="submit"
            class="btn btn-secondary text-white py3 mt-4 w-100 fs-5"
            :disabled="
              Object.keys(errors).length > 0 || cartData.carts?.length === 0
            "
          >
            前往付款
          </button>
        </VeeForm>
      </div>
    </div>
  </div>
  <VeeLoading :active="isLoading"></VeeLoading>
</template>

<script>
// import emitter from "@/libs/emitter";
export default {
  inject: ["emitter"],
  data() {
    return {
      loadingStatus: {
        loadingItem: "",
      },
      isLoading: false,
      cartPrice: {},
      cartData: {},
      productId: "",
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
        },
        message: "",
      },
      coupon_code: "",
    };
  },
  methods: {
    updateCartItem(item) {
      this.loadingStatus.loadingItem = item.id;
      this.$http
        .put(
          `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/cart/${item.id}`,
          {
            data: { product_id: item.id, qty: item.qty },
          }
        )
        .then(() => {
          this.getCart();
          //讀取完後清空
          this.loadingStatus.loadingItem = "";
          this.isLoading = false;
          this.emitter.emit("push-message", {
            style: "success",
            title: "成功更新商品囉！",
          });
        })
        .catch(() => {
          this.emitter.emit("push-message", {
            style: "danger",
            title: "更新商品失敗囉！",
          });
        });
    },
    getCart() {
      document.documentElement.scrollTop = 0;
      this.isLoading = true;
      this.$http
        .get(
          `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/cart`
        )
        .then((res) => {
          this.cartData = res.data.data;
          this.isLoading = false;
          if (this.cartData.carts.length === 0) {
            this.$router.push("/products");
          }
        })
        .catch((error) => {
          this.$httpMessageState(error.response, "錯誤訊息");
        });
    },
    delProduct(id) {
      this.isLoading = true;
      this.loadingStatus.loadingItem = id;
      this.$http
        .delete(
          `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/cart/${id}`
        )
        .then(() => {
          this.getCart();
          this.loadingStatus.loadingItem = "";
          this.isLoading = false;

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
    delAllProduct() {
      this.isLoading = true;
      this.$http
        .delete(
          `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/carts`
        )
        .then(() => {
          this.getCart();
          this.emitter.emit("push-message", {
            style: "success",
            title: "成功刪除所有商品囉！",
          });
          this.emitter.emit("get-cart");
          this.isLoading = false;
        })
        .catch(() => {
          this.emitter.emit("push-message", {
            style: "danger",
            title: "刪除所有商品失敗囉！",
          });
        });
    },
    createOrder() {
      this.isLoading = true;
      const order = this.form;
      this.$http
        .post(
          `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/order`,
          { data: order }
        )
        .then((res) => {
          const { orderId } = res.data;
          this.$refs.form.resetForm();
          this.$router.push(`/checkout/${orderId}`);
          this.isLoading = false;
          this.goToTop();
        })
        .catch((error) => {
          this.$httpMessageState(error.response, "錯誤訊息");
        });
    },
    goToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
  mounted() {
    this.getCart();
  },
};
</script>

<style lang="scss" scoped>
.cart-img {
  height: 7.5rem;
  width: 7.5rem;
  object-fit: cover;
}

.add_shopping_cart {
  font-size: 3rem;
}

.select-num {
  width: 120px;
}

@media screen and (min-width: 769px) {
  form {
    position: sticky;
    top: 118px;
  }
}
.form-control {
  border-bottom: 1px solid #dee2e6;
}

.disabled {
  cursor: not-allowed;
}
</style>
