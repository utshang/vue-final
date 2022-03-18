/* eslint-disable */
<template>
  <div class="container">
    <h2>前台購物車</h2>
    <div class="text-end">
      <button
        class="btn btn-outline-danger"
        type="button"
        @click="delAllProduct"
        :disabled="cartData.carts?.length === 0"
      >
        清空購物車
      </button>
    </div>
    <table class="table align-middle">
      <thead>
        <tr>
          <th></th>
          <th>品名</th>
          <th style="width: 150px">數量/單位</th>
          <th>單價</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="cartData.carts">
          <tr v-for="item in cartData.carts" :key="item.id">
            <td>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="delProduct(item.id)"
                :disabled="loadingStatus.loadingItem === item.id"
              >
                <i
                  class="fas fa-spinner fa-pulse"
                  v-if="loadingStatus.loadingItem === item.id"
                ></i>
                x
              </button>
            </td>
            <td>
              {{ item.product.title }}
              <!-- <div class="text-success">已套用優惠券</div> -->
            </td>
            <td>
              <div class="input-group input-group-sm">
                <div class="input-group mb-3">
                  <!-- <input
                    min="1"
                    type="number"
                    class="form-control"
                    v-model.number="item.qty"
                  /> -->

                  <!-- 最多20 -->
                  <!-- item.qty當前的值 -->
                  <select
                    id=""
                    class="form-select"
                    v-model="item.qty"
                    @change="updateCartItem(item)"
                    :disabled="loadingStatus.loadingItem === item.id"
                  >
                    <option
                      :value="num"
                      v-for="num in 20"
                      :key="`${num}${item.id}`"
                    >
                      {{ num }}
                    </option>
                  </select>
                  <span class="input-group-text" id="basic-addon2">{{
                    item.product.unit
                  }}</span>
                </div>
              </div>
            </td>
            <td class="text-end">
              <!-- <small class="text-success">折扣價：</small> -->
              {{ item.product.price }}
            </td>
          </tr>
        </template>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3" class="text-end">總計</td>
          <td class="text-end">{{ cartData.final_total }}</td>
        </tr>
        <!-- <tr>
                <td colspan="3" class="text-end text-success">折扣價</td>
                <td class="text-end text-success">{{ }}</td>
              </tr> -->
      </tfoot>
    </table>

    <div class="my-5 row justify-content-center">
      <VeeForm
        ref="form"
        class="col-md-6"
        v-slot="{ errors }"
        @submit="createOrder"
      >
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <VeeField
            id="email"
            name="email"
            type="email"
            class="form-control"
            :class="{ 'is-invalid': errors['email'] }"
            placeholder="請輸入 Email"
            rules="email|required"
            v-model="form.user.email"
          ></VeeField>
          <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="mb-3">
          <label for="name" class="form-label">收件人姓名</label>
          <VeeField
            id="name"
            name="姓名"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['姓名'] }"
            placeholder="請輸入姓名"
            rules="required"
            v-model="form.user.name"
          ></VeeField>
          <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="mb-3">
          <label for="tel" class="form-label">收件人電話</label>
          <VeeField
            id="tel"
            name="電話"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['電話'] }"
            placeholder="請輸入電話"
            rules="required|min:8|max:10"
            v-model="form.user.tel"
          ></VeeField>
          <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="mb-3">
          <label for="address" class="form-label">收件人地址</label>
          <VeeField
            id="address"
            name="地址"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['地址'] }"
            placeholder="請輸入地址"
            rules="required"
            v-model="form.user.address"
          ></VeeField>
          <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="mb-3">
          <label for="message" class="form-label">留言</label>
          <textarea
            id="message"
            class="form-control"
            cols="30"
            rows="10"
            v-model="form.message"
          ></textarea>
        </div>
        <div class="text-end">
          <button
            type="submit"
            class="btn btn-danger"
            :disabled="
              Object.keys(errors).length > 0 || cartData.carts?.length === 0
            "
          >
            送出訂單
          </button>
        </div>
      </VeeForm>
    </div>
  </div>
  <VeeLoading :active="isLoading"></VeeLoading>
</template>

<script>
import emitter from "@/libs/emitter";
export default {
  data() {
    return {
      loadingStatus: {
        loadingItem: "",
      },
      isLoading: false,
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
          // console.log(res);

          this.getCart();
          //讀取完後清空
          this.loadingStatus.loadingItem = "";
          this.isLoading = false;
        })
        .catch((err) => {
          alert(err);
        });
    },
    getCart() {
      this.$http
        .get(
          `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/cart`
        )
        .then((res) => {
          // console.log(res);
          this.cartData = res.data.data;
        })
        .catch(() => {
          // alert(err);
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
          // console.log(res);
          this.getCart();
          this.loadingStatus.loadingItem = "";
          this.isLoading = false;
          emitter.emit("get-cart");
        })
        .catch(() => {
          // alert(err);
        });
    },
    delAllProduct() {
      this.isLoading = true;
      this.$http
        .delete(
          `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/carts`
        )
        .then(() => {
          // console.log(res);
          this.getCart();
          emitter.emit("get-cart");
          this.isLoading = false;
        })
        .catch((err) => {
          alert(err);
        });
    },
    createOrder() {
      const order = this.form;
      this.$http
        .post(
          `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/order`,
          { data: order }
        )
        .then(() => {
          // console.log(res);
          this.$refs.form.resetForm();
          this.getCart();
          emitter.emit("get-cart");
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
  mounted() {
    this.getCart();
  },
};
</script>
