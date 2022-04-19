<template>
  <!-- banner -->
  <div
    class="banner"
    :style="{
      backgroundImage: `url(${require('@/assets/images/front/banner.jpg')} )`,
    }"
  >
    <h1 class="title text-white position-absolute start-50 translate-middle">
      The Florist
    </h1>
    <p
      class="slogan text-white mt-3 position-absolute start-50 translate-middle"
    >
      希望你的生活，有 The Florist 花閣的陪伴
    </p>
    <RouterLink to="/products">
      <button
        type="button"
        class="cta-btn btn fs-5 text-white position-absolute start-50 translate-middle border-white border-3 rounded-3 px-4"
      >
        來去逛逛吧！
      </button>
    </RouterLink>
  </div>
  <div class="container">
    <div class="row row-cols-1 row-cols-md-2 align-items-center mx-1">
      <!-- 花束 -->
      <div class="category-des mb-3 p-md-3 ps-md-6 my-5">
        <h2 class="fs-2 text-secondary fw-bold mb-3">
          花束 <span class="fs-5">Bouquet</span>
        </h2>
        <p class="text-light lh-lg">
          為想傳遞愛的你，
          <br />無論是特殊節日，抑或是平常日，<br />送給愛的人或是自己一束精心搭配好的花吧！
        </p>
      </div>
      <div
        class="category-img mb-5 mt-md-5"
        :style="{
          backgroundImage:
            'url(' + require('@/assets/images/front/bouquet.jpg') + ')',
        }"
      ></div>
      <!-- 花籃 -->
      <div
        class="category-img d-none d-md-block"
        :style="{
          backgroundImage:
            'url(' + require('@/assets/images/front/basket.jpg') + ')',
        }"
      ></div>
      <div class="category-des p-md-3 ps-md-6 d-md-block d-lg-none">
        <h2 class="fs-2 text-secondary fw-bold mb-3">
          花籃 <span class="fs-5">Flower Basket</span>
        </h2>
        <p class="text-light lh-lg">
          在聚會或派對時，<br />除了美食佳餚填滿我們的胃，<br />滂薄的花籃與瀰漫的香氣也滿足了視覺與嗅覺！
        </p>
      </div>
      <div
        class="category-img d-md-none d-block"
        :style="{
          backgroundImage:
            'url(' + require('@/assets/images/front/basket.jpg') + ')',
        }"
      ></div>
      <div class="category-des mt-4 p-md-3 ps-md-6 d-none d-lg-block">
        <h2 class="fs-2 text-secondary fw-bold mb-3">
          花籃 <span class="fs-5">Flower Basket</span>
        </h2>
        <p class="text-light lh-lg">
          在聚會或派對時，<br />除了美食佳餚填滿我們的胃，<br />滂薄的花籃與瀰漫的香氣也滿足了視覺與嗅覺！
        </p>
      </div>
      <!-- 花材 -->
      <div class="category-des mb-3 p-md-3 ps-md-6 my-5">
        <h2 class="fs-2 text-secondary fw-bold mb-3">
          花材 <span class="fs-5">Materials</span>
        </h2>
        <p class="text-light lh-lg">
          為想創造生活儀式感的你，<br />準備了精選的花材，從經典到獨有<br />讓你親自挑選、親自搭配、親自包裝、親自享受！<br />
        </p>
      </div>
      <div
        class="category-img mb-5 mt-md-5"
        :style="{
          backgroundImage:
            'url(' + require('@/assets/images/front/material.jpg') + ')',
        }"
      ></div>
      <!-- 器皿 -->
      <div
        class="category-img d-none d-md-block"
        :style="{
          backgroundImage:
            'url(' + require('@/assets/images/front/vase.jpg') + ')',
        }"
      ></div>
      <div class="category-des p-md-3 ps-md-6 d-md-block d-lg-none">
        <h2 class="fs-2 text-secondary fw-bold mb-3">
          器皿 <span class="fs-5">Vase</span>
        </h2>
        <p class="text-light lh-lg">
          在室內空間中的一隅，<br />需要器皿去襯托花的美好<br />讓花朵的美，更容易讓人看見！
        </p>
      </div>
      <div
        class="category-img d-md-none d-block"
        :style="{
          backgroundImage:
            'url(' + require('@/assets/images/front/vase.jpg') + ')',
        }"
      ></div>
      <div class="category-des mt-4 p-md-3 ps-md-6 d-none d-lg-block">
        <h2 class="fs-2 text-secondary fw-bold mb-3">
          器皿 <span class="fs-5">Vase</span>
        </h2>
        <p class="text-light lh-lg">
          在室內空間中的一隅，<br />需要器皿去襯托花的美好<br />讓花朵的美，更容易讓人看見！
        </p>
      </div>
    </div>
  </div>

  <!-- 精選商品 輪播 -->

  <div class="container my-6">
    <h2 class="fs-2 text-secondary fw-bold my-5">
      精選商品 <span class="fs-5">Selected</span>
    </h2>
    <RandomSwiper />
    <div class="text-center mt-4 my-sm-5">
      <RouterLink
        class="see-more fs-6 bg-secondary text-white d-inline-block py-3 rounded-3"
        to="/products"
        >查看更多</RouterLink
      >
    </div>
  </div>

  <!-- 關於我們-->
  <div class="container mb-4 mb-sm-5 d-none d-md-block">
    <div class="row align-items-center g-2">
      <div
        class="about-des col-md-6 d-flex justify-content-center align-items-center flex-column"
      >
        <h2 class="fs-2 text-secondary fw-bold mb-5">
          關於我們 <span class="fs-5">About us</span>
        </h2>
        <p class="text-light lh-lg">
          The florist 花閣 讓花成為你生活中的陪伴<br />
          花，除了可以為生活帶來氛圍，也是一種傳遞愛的媒介，<br />
          希望可以透過花朵，創造生活的儀式感，激發你的浪漫因子，<br />
          希望你的生活，有The Florist 花閣的相伴。
        </p>
      </div>
      <div
        class="about-img col-md-6 ms-xl-5"
        :style="{
          backgroundImage: `url(${require('@/assets/images/front/about.jpg')} )`,
        }"
      ></div>
    </div>
  </div>
</template>

<script>
import RandomSwiper from "@/components/RandomSwiper.vue";
export default {
  data() {
    return {
      products: [],
      pagination: {},
      category: "",
    };
  },
  components: { RandomSwiper },
  mounted() {
    document.documentElement.scrollTop = 0;
  },
};
</script>

<style lang="scss" scoped>
.banner {
  height: calc(100vh - 200px);
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  .title {
    font-size: 60px;
    font-family: "Sansita Swashed", cursive;
    text-align: center;
    font-weight: 600;
    top: 40%;
  }
  .slogan {
    top: 52%;
    width: 300px;
    text-shadow: 1px 1px 5px #696969;
  }
  .cta-btn {
    top: 62%;
    text-shadow: 1px 1px 5px #696969;
  }
}
@media screen and (min-width: 769px) {
  .title {
    font-size: 78px;
  }
}
@media screen and (min-width: 576px) {
  .slogan {
    top: 48%;
  }
}
@media screen and (min-width: 576px) {
  .cta-btn {
    top: 60%;
  }
}
@media screen and (min-width: 992px) {
  .cta-btn {
    top: 58%;
  }
}
h2 {
  text-shadow: 1px 1px #f9d4ba;
  span {
    font-family: "Sansita Swashed", cursive;
  }
}
.category-img {
  height: 25rem;
  border-radius: 1rem;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  box-shadow: 1px 1px 10px #696969;
}
@media screen and (min-width: 769px) {
  .category-img {
    height: 30rem;
  }
}
.see-more {
  letter-spacing: 5px;
  padding-left: 30px;
  padding-right: 30px;
}
.about-img {
  height: 28rem;
  width: 33rem;
  border-radius: 1rem;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  box-shadow: 1px 1px 10px #696969;
  img {
    border-radius: 1rem;
  }
}
@media screen and (min-width: 769px) {
  .about-img {
    height: 24rem;
    width: 29rem;
  }
}
</style>
