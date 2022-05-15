<template>
  <div>
    <swiper
      :modules="modules"
      :space-between="50"
      autoplay
      :breakpoints="swiper.breakpoints"
    >
      <swiper-slide
        v-for="item in randomProducts"
        :key="item.id"
        class="swiper-slide"
      >
        <div class="card border-width h-100">
          <RouterLink :to="`/product/${item.id}`">
            <div
              class="swiper-slide-inner"
              style="
                height: 18rem;
                background-position: center center;
                background-size: cover;
              "
              :style="{ backgroundImage: `url(${item.imageUrl})` }"
            ></div>
          </RouterLink>
          <div class="card-body d-flex justify-content-between">
            <h2 class="product-title fw-bold">{{ item.title }}</h2>
            <p class="product-price fw-bold text-primary">
              NT$ {{ $filters.currency(item.price) }}
            </p>
          </div>
        </div>
      </swiper-slide>
    </swiper>
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
      randomProducts: [],
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
            slidesPerView: 4,
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
          this.getRandomProducts();
        })
        .catch((error) => {
          this.$httpMessageState(error.response, "錯誤訊息");
        });
    },
    //Fisher-Yates Shuffle
    getRandomProducts() {
      //將 products 賦予到 randomProducts，用 randomProducts 隨機排序
      this.randomProducts = this.products;
      for (let i = this.randomProducts.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [this.randomProducts[i], this.randomProducts[j]] = [
          this.randomProducts[j],
          this.randomProducts[i],
        ];
      }
      //從索引值0開始刪除後面10個元素，並把刪除的元素通通傳回來
      this.randomProducts = this.randomProducts.splice(0, 10);
    },
  },
  mounted() {
    this.getProductsList();
  },
};
</script>

<style lang="scss" scoped>
.swiper-slide {
  height: 21rem;
  .card {
    background-color: #ffffff;
    border-radius: 1rem;
    .swiper-slide-inner {
      border-top-left-radius: 1em;
      border-top-right-radius: 1em;
      &:hover {
        opacity: 0.7;
      }
    }
  }
}
.product-title {
  font-size: 0.75rem;
}
@media screen and (min-width: 1200px) {
  .product-title {
    font-size: 0.875rem;
  }
}
.product-price {
  font-size: 0.875rem;
}
@media screen and (min-width: 1200px) {
  .product-price {
    font-size: 1rem;
  }
}
</style>
