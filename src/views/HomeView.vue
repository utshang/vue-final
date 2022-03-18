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

  <div class="container d-md-flex my-5">
    <div class="category-des">
      <h2 class="fs-3 text-secondary fw-bold mb-3">
        花束 <span class="fs-5">Bouquet</span>
      </h2>
      <p class="text-light lh-lg">
        為想傳遞愛的你，<br />無論是特殊節日，或只是平凡到不行的平常日，<br />送給愛的人或是自己一束
        The Florist 精心搭配好的浪漫花束吧！
      </p>
    </div>
    <div
      class="category-img"
      :style="{
        backgroundImage:
          'url(' + require('@/assets/images/front/bouquet.jpg') + ')',
      }"
    >
      <!-- <img :src="require('@/assets/images/front/bouquet.jpg')" alt="" /> -->
    </div>
  </div>

  <!-- 精選商品 輪播 -->
  <div class="container">
    <h2 class="fs-3 text-secondary fw-bold my-4">
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

          console.log(this.products);
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
  font-size: 80px;
  font-family: "Sansita Swashed", cursive;

  font-weight: 600;
}

@media screen and (min-width: 375px) {
  .title {
    font-size: 60px;
    text-align: center;
  }
}

@media screen and (min-width: 768px) {
  .title {
    font-size: 70px;
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
  box-shadow: 0 3px 12px 0 rgb(0 0 0 / 12%);
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
  height: 50rem;
  // background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}
</style>
