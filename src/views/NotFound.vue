<template>
  <div class="error bg-success text-white fw-bold">
    <div class="position-absolute top-40 start-50 translate-middle text-center">
      <h1>
        4<span class="ms-2 material-icons-outlined"> local_florist </span>4
      </h1>
      <p>哎呀！出錯了！請先回到首頁並稍後再試！</p>
      <button class="btn text-primary bg-white fw-bold px-3 mt-4" type="button">
        <RouterLink to="/">回到首頁</RouterLink>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.error {
  height: 100vh;
  h1 {
    font-size: 200px;
    .material-icons-outlined {
      font-size: 150px;
    }
  }
}
</style>
