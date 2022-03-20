<template>
  <div class="footer text-white">
    <div
      class="footer_body bg-success pt-5 pb-3 fs-6 d-sm-flex justify-content-sm-between"
    >
      <div class="menu ps-4">
        <ul>
          <li class="mb-3 mb-sm-4">
            <router-link class="text-white text-decoration-none" to="/products">
              全部產品</router-link
            >
          </li>

          <li class="mb-3 mb-sm-4">
            <router-link class="text-white text-decoration-none" to="/products"
              >關於我們</router-link
            >
          </li>
          <li class="mb-3 mb-sm-4">
            <router-link class="text-white text-decoration-none" to="/products"
              >聯絡我們</router-link
            >
          </li>
        </ul>
      </div>
      <div class="contact ps-4 ps-md-0">
        <ul>
          <li class="mb-3 mb-sm-4">service@theflorist.com.tw</li>
          <li class="mb-3 mb-sm-4">MON.-FRI. 09:00-12:00 / 13:00-18:00</li>
          <li class="mb-3 mb-sm-4">台北市信義區松壽路1號</li>
        </ul>
      </div>
    </div>

    <p class="slogan bg-success text-center text-white">
      Beauty, Romance, and Everything nice.
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
// @media screen and (min-width: 769px) {
//   .footer_body {
//     padding-left: 13rem;
//     padding-right: 13rem;
//   }
// }

.footer_body li {
  font-size: 0.875rem;
}
.footer_end-p {
  font-size: 0.8rem;
  font-family: "Sansita Swashed", cursive;
}
.slogan {
  font-family: "Sansita Swashed", cursive;
}
ul {
  padding-left: 0;
}
</style>
