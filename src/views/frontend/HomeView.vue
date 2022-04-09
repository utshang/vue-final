<template>
  <!-- banner -->
  <VeeLoading :active="isLoading"></VeeLoading>
  <div
    class="banner"
    :style="{
      backgroundImage:
        'url(' + require('@/assets/images/front/banner.jpg') + ')',
    }"
  >
    <h1
      class="title text-white position-absolute top-50 start-50 translate-middle"
    >
      The Florist
    </h1>
    <p
      class="slogan text-white mt-3 position-absolute start-50 translate-middle"
    >
      希望你的生活，有 The Florist 花閣的陪伴
    </p>
  </div>

  <!-- 商品分類 -->
  <div class="container">
    <div class="row row-cols-1 row-cols-md-2 align-items-center">
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

      <div class="h-100">
        <div
          class="category-img mb-5 mt-md-5"
          :style="{
            backgroundImage:
              'url(' + require('@/assets/images/front/bouquet.jpg') + ')',
          }"
        ></div>
      </div>

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
    <div>
      <h2 class="fs-2 text-secondary fw-bold my-5">
        精選商品 <span class="fs-5">Selected</span>
      </h2>

      <swiper
        :modules="modules"
        :slides-per-view="3"
        :space-between="50"
        autoplay
        :breakpoints="swiper.breakpoints"
      >
        <swiper-slide v-for="item in products" :key="item.id">
          <div
            class="swiper-slide-inner"
            style="
              height: 30rem;
              background-position: center center;
              background-size: cover;
            "
            :style="{ backgroundImage: `url(${item.imageUrl})` }"
          ></div>
        </swiper-slide>
      </swiper>
    </div>
    <div class="text-center mt-4 my-sm-5">
      <router-link
        class="see-more fs-6 bg-secondary text-white d-inline-block py-3 rounded-3"
        to="/products"
        >查看更多</router-link
      >
    </div>
  </div>

  <!-- 關於我們-->
  <div class="container mb-4 mb-sm-5">
    <div class="row align-items-center g-3">
      <div
        class="about-des col-md-6 col-xl-7 d-flex justify-content-center align-items-center flex-column"
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
        class="about-img col-md-6 col-xl-5"
        :style="{
          backgroundImage:
            'url(' + require('@/assets/images/front/about.jpg') + ')',
        }"
      ></div>
    </div>
  </div>
</template>

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default {
  components: { Swiper, SwiperSlide },

  data() {
    return {
      loadingStatus: {
        loadingItem: "",
      },
      isLoading: false,
      products: [],
      modules: [Navigation, Pagination, Autoplay, EffectCoverflow],
      swiper: {
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        breakpoints: {
          0: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        },
      },
    };
  },
  methods: {
    getProductsList() {
      this.$http
        .get(
          `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/products/all`
        )
        .then((res) => {
          this.products = res.data.products;
        })
        .catch((error) => {
          this.$httpMessageState(error.response, "錯誤訊息");
        });
    },
  },
  mounted() {
    this.getProductsList();
  },
};
</script>

<style lang="scss" scoped>
.banner {
  height: calc(100vh - 72px);
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}

h2 {
  text-shadow: 1px 1px #f9d4ba;
  span {
    font-family: "Sansita Swashed", cursive;
  }
}

.title {
  font-size: 60px;
  font-family: "Sansita Swashed", cursive;
  text-align: center;
  font-weight: 600;
}

@media screen and (min-width: 768px) {
  .title {
    font-size: 78px;
  }
}

.slogan {
  top: 60%;
  width: 300px;
  text-shadow: 1px 1px 5px #696969;
}

@media screen and (min-width: 568px) {
  .slogan {
    top: 57%;
  }
}

.swiper-slide-inner {
  box-shadow: 1px 1px 10px #696969;
  border-radius: 1rem;
  &:hover {
    opacity: 0.7;
  }
}

.see-more {
  letter-spacing: 5px;
  padding-left: 30px;
  padding-right: 30px;
}
.see-more:hover {
  -webkit-animation: pulse 1s;
  animation: pulse 1s;
  color: #ad795d;
  background-color: #fffafa;
  border: #ad795d 3px solid;
}

.category-img {
  height: 25rem;
  border-radius: 1rem;
  // background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  box-shadow: 1px 1px 10px #696969;
}

.about-img {
  height: 35rem;
  border-radius: 1rem;
  // background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  box-shadow: 1px 1px 10px #696969;
}

@media screen and (min-width: 768px) {
  .category-img {
    height: 30rem;
  }
}

.about-img img {
  border-radius: 1rem;
}
</style>
