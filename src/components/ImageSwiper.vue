<template>
  <swiper
    :spaceBetween="10"
    :navigation="false"
    :thumbs="{ swiper: swiper.thumbsSwiper }"
    :modules="modules"
    class="mySwiper2"
  >
    <swiper-slide>
      <div
        class="swiper-slide-inner"
        style="
          height: 30rem;
          background-position: center center;
          background-size: cover;
        "
        :style="{ backgroundImage: `url(${product.imageUrl})` }"
      ></div>
    </swiper-slide>
    <swiper-slide
      v-for="(img, index) in product.imagesUrl"
      :key="`swiperImage_${index}`"
    >
      <div
        style="
          height: 30rem;
          background-position: center center;
          background-size: cover;
        "
        :style="{ backgroundImage: `url(${img})` }"
      ></div>
    </swiper-slide>
  </swiper>

  <swiper
    @swiper="setThumbsSwiper"
    :spaceBetween="10"
    :slidesPerView="4"
    :freeMode="true"
    :watchSlidesProgress="true"
    :watchSlidesVisibility="true"
    :modules="modules"
    class="mySwiper mt-3"
  >
    <swiper-slide>
      <div
        class="swiper-slide-inner"
        style="
          height: 8rem;
          width: 8rem;
          background-position: center center;
          background-size: cover;
        "
        :style="{ backgroundImage: `url(${product.imageUrl})` }"
      ></div>
    </swiper-slide>
    <swiper-slide
      v-for="(img, index) in product.imagesUrl"
      :key="`swiperImage_${index}`"
    >
      <div
        style="
          height: 8rem;
          width: 8rem;
          background-position: center center;
          background-size: cover;
        "
        :style="{ backgroundImage: `url(${img})` }"
      ></div>
    </swiper-slide>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
  Thumbs,
} from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
export default {
  props: {
    product: Object,
  },
  components: { Swiper, SwiperSlide },
  data() {
    return {
      modules: [Navigation, Pagination, Autoplay, EffectCoverflow, Thumbs],
      swiper: {
        thumbsSwiper: null,
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
    setThumbsSwiper(swiper) {
      this.swiper.thumbsSwiper = swiper;
    },
  },
};
</script>

<style lang="scss" scoped>
.swiper-slide-visible {
  margin-right: 3.75rem !important;
}
@media screen and (min-width: 425px) {
  .swiper-slide-visible {
    margin-right: 3.125rem !important;
  }
}
@media screen and (min-width: 768px) {
  .swiper-slide-visible {
    margin-right: 1.2rem !important;
  }
}
@media screen and (min-width: 1024px) {
  .swiper-slide-visible {
    margin-right: 1rem !important;
  }
}
@media screen and (min-width: 1440px) {
  .swiper-slide-visible {
    margin-right: -1.5rem !important;
  }
}
</style>
