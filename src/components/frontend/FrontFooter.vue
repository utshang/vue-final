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
            <RouterLink class="text-white text-decoration-none" to="/contact"
              >聯絡我們</RouterLink
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
    <p class="footer bg-success text-center text-white lh-base">
      本網站僅供個人作品使用，不做任何商業用途 <br />
      <span class="slogan">Beauty, Romance, and Everything Nice.</span
      ><br /><span class="footer_end-p">&copy; The Florist</span>
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

.footer {
  font-size: 0.8rem;
  .slogan,
  .footer_end-p {
    font-family: "Sansita Swashed", cursive;
  }
}
</style>
