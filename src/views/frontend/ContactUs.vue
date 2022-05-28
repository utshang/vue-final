<template>
  <div
    class="banner mt-3 d-md-none d-block"
    :style="{
      backgroundImage: `url(${require('@/assets/images/front/contact.jpg')} )`,
    }"
  ></div>
  <div class="container">
    <div
      class="banner mt-3 d-md-block d-none"
      :style="{
        backgroundImage: `url(${require('@/assets/images/front/contact.jpg')} )`,
      }"
    ></div>
    <div class="body my-5">
      <div class="mb-5">
        <VeeForm
          class="rounded-3 shadow p-5"
          ref="form"
          v-slot="{ errors }"
          @submit="getSubscription"
        >
          <h2 class="slogan text-primary fw-bold text-center">聯絡我們</h2>
          <p class="text-center lh-lg text-muted pt-3 fs-7">
            若有任何問題，歡迎透過表單與我們聯繫，我們將於服務時段儘速聯絡你！<br />你也可以試著在
            <RouterLink class="faq text-decoration-underline" to="/faq"
              >常見問答</RouterLink
            >
            找到相關答案
          </p>

          <div class="form-floating form-downline mt-4 mb-3">
            <VeeField
              id="name"
              name="姓名"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['姓名'] }"
              rules="required"
              placeholder="請輸入姓名"
              v-model="name"
            />
            <label for="name" class="form-label fs-7">
              <span class="text-danger">* </span>姓名</label
            >
            <ErrorMessage name="姓名" class="invalid-feedback" />
          </div>
          <div class="d-md-flex">
            <div class="form-floating form-downline col-md-6 pe-md-3">
              <VeeField
                id="email"
                name="email"
                type="email"
                class="form-control"
                :class="{ 'is-invalid': errors['email'] }"
                rules="email|required"
                placeholder="請輸入Email"
                v-model="mail"
              />
              <label for="email" class="form-label fs-7"
                ><span class="text-danger">* </span>Email</label
              >
              <ErrorMessage name="email" class="invalid-feedback" />
            </div>
            <div class="form-floating form-downline col-md-6">
              <VeeField
                id="tel"
                name="電話"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors['電話'] }"
                rules="required|min:8|max:10"
                placeholder="請輸入電話"
                v-model="phone"
              />
              <label for="tel" class="form-label fs-7"
                ><span class="text-danger">* </span>聯絡電話</label
              >
              <ErrorMessage name="電話" class="invalid-feedback" />
            </div>
          </div>
          <div class="form-floating form-downline my-3">
            <VeeField
              id="message"
              name="訊息"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['訊息'] }"
              rules="required"
              placeholder="請輸入姓名"
              v-model="message"
            />
            <label for="message" class="form-label fs-7"
              ><span class="text-danger">* </span>留下你的訊息</label
            >
            <ErrorMessage name="訊息" class="invalid-feedback" />
          </div>
          <div class="mt-4 d-flex justify-content-between">
            <p class="fs-8 text-muted d-flex align-items-end">
              服務時段：MON.-FRI. 09:00-18:00
            </p>
            <button
              type="submit"
              class="btn btn-primary text-white fs-7"
              :disabled="Object.keys(errors).length > 0"
            >
              送出
            </button>
          </div>
        </VeeForm>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      mail: "",
      phone: "",
      message: "",
    };
  },
  inject: ["emitter"],
  methods: {
    getSubscription() {
      const params = {
        name: this.name,
        mail: this.mail,
        phone: this.phone,
        message: this.message,
      };
      this.$http
        .post(
          "https://script.google.com/macros/s/AKfycbxtzrQ0OtE0CDnNM5zxN03vL4TdZG8Oeix0AZjYC7s9Cu0e1qbx0vN3PM9Ctku4tIr9/exec",
          null,
          { params }
        )
        .then(() => {
          this.emitter.emit("push-message", {
            style: "success",
            title: "成功送出，請耐心等待我們的聯繫！",
          });
          this.$refs.form.resetForm();
        })
        .catch(() => {
          this.emitter.emit("push-message", {
            style: "danger",
            title: "發生錯誤，請稍後再試！",
          });
        });
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
$primary: #ad795d;
$gray-300: #dee2e6;
$gray-600: #6c757d;

.banner {
  height: calc(100vh - 500px);
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}

@media screen and (min-width: 769px) {
  .body {
    padding: 0 8rem;
  }
}

.slogan {
  font-size: 1.125rem;
}
@media screen and (min-width: 769px) {
  .slogan {
    font-size: 1.875rem;
  }
}
.form-control {
  border: 1px solid $gray-300;
}

.faq {
  color: $gray-600;
}

.faq:active {
  color: $primary;
}
</style>
