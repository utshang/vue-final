<template>
  <ProgressBar step="2" />
  <div class="container">
    <div class="row my-5">
      <div class="col-md-6">
        <div class="cart-list rounded-3 shadow p-5">
          <div
            class="d-flex justify-content-between align-items-end fs-7 border-bottom border-2 border-primary pb-3"
          >
            <h3 class="fs-4 fw-bold">購物清單</h3>
          </div>
          <div v-for="item in cartData.carts" :key="item.id">
            <div class="cart-list-body mt-4 d-flex">
              <div class="d-flex flex-grow-1">
                <RouterLink :to="`/product/${item.product.id}`">
                  <img
                    class="cart-img rounded-3"
                    :src="item.product.imageUrl"
                    :alt="item.title"
                  />
                </RouterLink>
                <div class="d-flex flex-column justify-content-start ms-3 mt-2">
                  <RouterLink :to="`/product/${item.product.id}`" class="mb-3">
                    <p class="fs-5 fw-bold text-black">
                      {{ item.product.title }}
                    </p>
                  </RouterLink>
                  <p>數量：{{ item.qty }} {{ item.product.unit }}</p>
                  <div class="d-sm-none d-flex align-items-end">
                    <p class="fw-bold fs-7 mt-3">
                      NT$
                      {{ $filters.currency(item.product.price * item.qty) }}
                    </p>
                    <del class="fs-8 text-muted ms-2">
                      NT$
                      {{
                        $filters.currency(item.product.origin_price * item.qty)
                      }}
                    </del>
                  </div>
                </div>
              </div>
              <div class="d-sm-flex flex-sm-column mt-1">
                <div class="d-none d-sm-block">
                  <p class="mb-2 fw-bold fs-5">
                    NT$
                    {{ $filters.currency(item.product.price * item.qty) }}
                  </p>
                  <del
                    class="fs-7 text-muted d-flex flex-column align-items-end"
                  >
                    NT$
                    {{
                      $filters.currency(item.product.origin_price * item.qty)
                    }}
                  </del>
                </div>
              </div>
            </div>
          </div>
          <div v-if="cartData.carts?.length">
            <p class="text-end fw-bold text-primary fs-4 mt-5">
              總金額 NT$ {{ $filters.currency(cartData.final_total) }}
            </p>
          </div>
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
            />
            <ErrorMessage name="姓名" class="invalid-feedback" />
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
            />
            <ErrorMessage name="電話" class="invalid-feedback" />
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
            />
            <ErrorMessage name="地址" class="invalid-feedback" />
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
            />
            <label for="email" class="form-label">Email</label>
            <ErrorMessage name="email" class="invalid-feedback" />
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
          <div class="d-flex justify-content-around p-0 mt-4">
            <button
              type="button"
              class="btn text-muted w-50 fs-5 border border-2 me-3"
              @click="goToPreviousPage()"
            >
              返回
            </button>
            <button
              type="submit"
              class="btn btn-primary text-white w-50 fs-5"
              :disabled="Object.keys(errors).length > 0"
            >
              前往付款
            </button>
          </div>
        </VeeForm>
      </div>
    </div>
  </div>
  <VeeLoading :active="isLoading" />
</template>

<script>
import ProgressBar from "@/components/ProgressBar.vue";

export default {
  components: { ProgressBar },
  inject: ["emitter"],
  data() {
    return {
      loadingStatus: {
        loadingItem: "",
      },
      isLoading: false,
      cartPrice: {},
      cartData: {},
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
        },
        message: "",
      },
    };
  },
  methods: {
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
        })
        .catch((error) => {
          this.$httpMessageState(error.response, "錯誤訊息");
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
    goToPreviousPage() {
      this.$router.push("/cart");
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
@media screen and (min-width: 769px) {
  form {
    position: sticky;
    top: 118px;
  }
}
.form-control {
  border-bottom: 1px solid #dee2e6;
}
</style>
