<template>
  <VeeLoading :active="isLoading" />
  <div class="container mt-4">
    <div class="d-flex justify-content-between">
      <h2 class="fs-2 fw-bold text-primary">優惠卷列表</h2>
      <button
        class="btn btn-primary text-white"
        type="button"
        @click="openCouponModal(true)"
      >
        建立新的優惠券
      </button>
    </div>
    <table class="table mt-4 border border-1 border-muted">
      <thead class="bg-primary text-white fw-bold">
        <tr>
          <th width="150">名稱</th>
          <th width="100">折扣百分比</th>
          <th width="100">到期日</th>
          <th width="100">是否啟用</th>
          <th width="100"></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, key) in coupons"
          :key="key"
          class="border border-1 border-muted"
        >
          <td>{{ item.title }}</td>
          <td>{{ item.percent }}%</td>
          <td>{{ $filters.date(item.due_date) }}</td>
          <td>
            <span v-if="item.is_enabled === 1" class="text-success">啟用</span>
            <span v-else class="text-muted">未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-primary text-white btn-sm me-2 rounded"
                @click="openCouponModal(false, item)"
              >
                編輯
              </button>
              <button
                type="button"
                class="btn btn-danger text-white btn-sm rounded"
                @click="openDelCouponModal(item)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <PaginationCom
      class="d-flex justify-content-end"
      :pages="pagination"
      @emit-pages="getCoupons"
    />
    <CouponModal
      :coupon="tempCoupon"
      :is-new="isNew"
      ref="couponModal"
      @update-coupon="updateCoupon"
    />
    <DelModal :item="tempCoupon" ref="delModal" @del-item="delCoupon" />
  </div>
</template>

<script>
import CouponModal from "@/components/backend/CouponModal.vue";
import DelModal from "@/components/backend/DelModal.vue";
import PaginationCom from "@/components/PaginationCom.vue";

export default {
  components: { CouponModal, DelModal, PaginationCom },
  props: {
    config: Object,
  },
  data() {
    return {
      coupons: {},
      pagination: {},
      tempCoupon: {
        title: "",
        is_enabled: 0,
        percent: 100,
        code: "",
      },
      isLoading: false,
      isNew: false,
    };
  },
  methods: {
    getCoupons() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/admin/coupons`;
      this.$http
        .get(url)
        .then((response) => {
          this.coupons = response.data.coupons;
          this.pagination = response.data.pagination;
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;
          this.$httpMessageState(error.response, "錯誤訊息");
        });
    },
    openCouponModal(isNew, item) {
      this.isNew = isNew;
      if (this.isNew) {
        this.tempCoupon = {
          due_date: new Date().getTime() / 1000,
        };
      } else {
        this.tempCoupon = { ...item };
      }
      this.$refs.couponModal.openModal();
    },
    openDelCouponModal(item) {
      this.tempCoupon = { ...item };
      const delComponent = this.$refs.delModal;
      delComponent.openModal();
    },
    updateCoupon(tempCoupon) {
      this.isLoading = true;
      let url = `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/admin/coupon`;
      let httpMethos = "post";
      let data = tempCoupon;
      let status = "新增優惠券";
      if (!this.isNew) {
        url = `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`;
        httpMethos = "put";
        data = this.tempCoupon;
        status = "更新優惠券";
      }
      this.$http[httpMethos](url, { data })
        .then((response) => {
          this.isLoading = false;
          this.$httpMessageState(response, status);
          this.getCoupons();
          this.$refs.couponModal.hideModal();
        })
        .catch((error) => {
          this.isLoading = false;
          this.$httpMessageState(error.response, "錯誤訊息");
        });
    },
    delCoupon() {
      const url = `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`;
      this.isLoading = true;
      this.$http
        .delete(url)
        .then((response) => {
          this.isLoading = false;
          this.$httpMessageState(response, "刪除優惠券");
          const delComponent = this.$refs.delModal;
          delComponent.hideModal();
          this.getCoupons();
        })
        .catch((error) => {
          this.isLoading = false;
          this.$httpMessageState(error.response, "錯誤訊息");
        });
    },
  },
  created() {
    this.getCoupons();
  },
};
</script>
