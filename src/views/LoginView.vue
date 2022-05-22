<template>
  <div class="container">
    <div class="row justify-content-center align-items-center">
      <h1 class="h3 mt-6 mb-5 fs-3 text-center text-primary fw-bold">
        登入後台
      </h1>
      <div class="col-8">
        <!-- @submit.prevent 阻止表單送出 加上 @submit.prevent 後畫面不會重新載入 -->
        <form id="form" class="form-signin" @submit.prevent="signIn">
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              id="username"
              placeholder="請輸入管理者帳號"
              v-model="user.username"
              required
              autofocus
            />
            <label for="username">帳號</label>
          </div>
          <div class="form-floating">
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="請輸入密碼"
              v-model="user.password"
              required
            />
            <label for="password">密碼</label>
          </div>
          <button
            class="btn btn-lg btn-primary text-white w-100 mt-3"
            type="submit"
          >
            登入
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  inject: ["emitter"],
  methods: {
    signIn() {
      this.$http
        .post(`${process.env.VUE_APP_API}/v2/admin/signin`, this.user)
        .then((res) => {
          const { token, expired } = res.data;
          //把 token 存到 cookie 中後，畫面導向 /admin/products
          document.cookie = `TheFloristToken=${token}; expires=${new Date(
            expired
          )};`;
          this.$router.push("/admin/products");
        })
        .catch(() => {
          this.emitter.emit("push-message", {
            style: "success",
            title: "登入失敗，請重新登入！",
          });
          this.$router.push("/login");
        });
    },
  },
};
</script>
