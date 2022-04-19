<template>
  <div class="footer text-white">
    <div
      class="footer_body bg-success pt-5 pb-3 fs-6 d-sm-flex justify-content-sm-between"
    >
      <div class="menu ps-4">
        <ul>
          <li class="mb-3 mb-sm-4 fs-7">
            <RouterLink class="text-white text-decoration-none" to="/products">
              全部產品</RouterLink
            >
          </li>

          <li class="mb-3 mb-sm-4 fs-7">
            <RouterLink class="text-white text-decoration-none" to="/about"
              >關於我們</RouterLink
            >
          </li>
          <li class="mb-3 mb-sm-4 fs-7">
            <RouterLink class="text-white text-decoration-none" to="/faq"
              >常見問答</RouterLink
            >
          </li>
        </ul>
      </div>
      <div class="contact ps-4 ps-md-0">
        <ul>
          <li class="mb-3 mb-sm-4 fs-7">service@theflorist.com.tw</li>
          <li class="mb-3 mb-sm-4 fs-7">MON.-FRI. 09:00-12:00 / 13:00-18:00</li>
          <li class="mb-3 mb-sm-4 fs-7">台北市信義區松壽路1號</li>
        </ul>
      </div>
    </div>

    <p class="fs-7 bg-success text-center text-white pb-2">
      本網站僅供個人作品使用，不做任何商業用途
    </p>
    <p class="slogan bg-success text-center text-white">
      Beauty, Romance, and Everything Nice.
    </p>
    <p class="footer_end-p bg-success text-center text-white pb-3 pt-2">
      © The Florist
    </p>
  </div>
</template>

<style lang="scss" scoped>
@media screen and (min-width: 576px) {
  .footer_body {
    padding-left: 10rem;
    padding-right: 10rem;
  }
}
ul {
  padding-left: 0;
}
.slogan {
  font-family: "Sansita Swashed", cursive;
}
.footer_end-p {
  font-size: 0.8rem;
  font-family: "Sansita Swashed", cursive;
}
</style>
