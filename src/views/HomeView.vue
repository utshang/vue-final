<template>
  <swiper
    :slides-per-view="3"
    :space-between="50"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide>Slide 1</swiper-slide>
    <swiper-slide>Slide 2</swiper-slide>
    <swiper-slide>Slide 3</swiper-slide>
    ...
  </swiper>
</template>

<script>
// Import Swiper Vue.js components
// import { Swiper, SwiperSlide } from "swiper/vue/swiper-vue";
// import { Navigation, Pagination } from "swiper";

// // Import Swiper styles
// import "swiper/swiper.scss";
// import "swiper/modules/navigation/navigation.min.css";
// import "swiper/modules/pagination/pagination.min.css";

export default {
  // components: {
  //   Swiper,
  //   SwiperSlide,
  // },
  data() {
    return {
      // modules: [Navigation, Pagination],
    };
  },
};
</script>
