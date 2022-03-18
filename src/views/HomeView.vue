<template>
  <!-- banner -->

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
  <div class="container products">
    <div class="row row-cols-1 row-cols-md-2 align-items-center">
      <!-- 花束 -->
      <div class="category-des mb-3 p-md-3 ps-md-5 my-5">
        <h2 class="fs-2 text-secondary fw-bold mb-3">
          花束 <span class="fs-5">Bouquet</span>
        </h2>
        <p class="text-light lh-lg">
          為想傳遞愛的你，<br />無論是特殊節日，或只是平凡到不行的平常日，<br />送給愛的人或是自己一束
          The Florist 精心搭配好的浪漫花束吧！
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

      <div class="category-des p-md-3 ps-md-5 d-md-block d-lg-none">
        <h2 class="fs-2 text-secondary fw-bold mb-3">
          花籃 <span class="fs-5">Flower Basket</span>
        </h2>
        <p class="text-light lh-lg">聚會或派對時，不可或缺的美麗點綴</p>
      </div>
      <div
        class="category-img d-md-none d-block"
        :style="{
          backgroundImage:
            'url(' + require('@/assets/images/front/basket.jpg') + ')',
        }"
      ></div>

      <div class="category-des mt-4 p-md-3 ps-md-5 d-none d-lg-block">
        <h2 class="fs-2 text-secondary fw-bold mb-3">
          花籃 <span class="fs-5">Flower Basket</span>
        </h2>
        <p class="text-light lh-lg">聚會或派對時，不可或缺的美麗點綴</p>
      </div>
      <!-- 花材 -->
      <div class="category-des mb-3 p-md-3 ps-md-5 my-5">
        <h2 class="fs-2 text-secondary fw-bold mb-3">
          花材 <span class="fs-5">Materials</span>
        </h2>
        <p class="text-light lh-lg">
          為想自己創造生活儀式感的你，精選的經典花材
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

      <div class="category-des p-md-3 ps-md-5 d-md-block d-lg-none">
        <h2 class="fs-2 text-secondary fw-bold mb-3">
          器皿 <span class="fs-5">Vase</span>
        </h2>
        <p class="text-light lh-lg">襯托花朵的質感器皿</p>
      </div>
      <div
        class="category-img d-md-none d-block"
        :style="{
          backgroundImage:
            'url(' + require('@/assets/images/front/vase.jpg') + ')',
        }"
      ></div>

      <div class="category-des mt-4 p-md-3 ps-md-5 d-none d-lg-block">
        <h2 class="fs-2 text-secondary fw-bold mb-3">
          器皿 <span class="fs-5">Vase</span>
        </h2>
        <p class="text-light lh-lg">襯托花朵的質感器皿</p>
      </div>
    </div>
  </div>

  <!-- 精選商品 輪播 -->
  <div class="container">
    <div>
      <h2 class="fs-2 text-secondary fw-bold mt-5 mb-4">
        精選商品 <span class="fs-5">Selected</span>
      </h2>

      <swiper
        :modules="modules"
        :slides-per-view="3"
        :space-between="50"
        navigation
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
    <div class="text-center my-4 my-sm-5">
      <a href="" class="link">
        <router-link
          class="see-more fs-6 bg-secondary text-white d-inline-block py-3 rounded-3"
          to="/products"
          >查看更多</router-link
        >
      </a>
    </div>
  </div>

  <!-- 關於我們-->
  <div class="container d-md-flex">
    <div class="about-des"></div>
    <div class="about-img"></div>
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
      products: [],
      modules: [Navigation, Pagination, Autoplay, EffectCoverflow],
      swiper: {
        pagination: {
          clickable: true,
        },
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

          // console.log(this.products);
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

@media screen and (min-width: 768px) {
  .category-img {
    height: 30rem;
  }
}
</style>
