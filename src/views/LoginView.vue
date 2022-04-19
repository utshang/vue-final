<template>
  <div class="container">
    <div class="row justify-content-center">
      <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
      <div class="col-8">
        <!-- @submit.prevent 阻止表單送出 加上 @submit.prevent 後畫面不會重新載入 -->
        <form id="form" class="form-signin" @submit.prevent="signIn">
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              id="username"
              placeholder="name@example.com"
              v-model="user.username"
              required
              autofocus
            />
            <label for="username">Email address</label>
          </div>
          <div class="form-floating">
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
              v-model="user.password"
              required
            />
            <label for="password">Password</label>
          </div>
          <button class="btn btn-lg btn-primary w-100 mt-3" type="submit">
            登入
          </button>
        </form>
      </div>
    </div>
    <p class="mt-5 mb-3 text-muted">&copy; 2021~∞ - 六角學院</p>
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
          // handle error
        });
    },
  },
};
</script>
