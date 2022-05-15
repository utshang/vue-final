<template>
  <div>
    <Swiper
      :modules="modules"
      :space-between="50"
      :breakpoints="swiper.breakpoints"
      autoplay
    >
      <SwiperSlide v-for="item in products" :key="item.id" class="swiper-slide">
        <div class="card h-100">
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
            <div>
              <h2 class="product-title fw-bold mb-2">{{ item.title }}</h2>
              <p class="product-price fw-bold text-primary">
                NT$ {{ $filters.currency(item.price) }}
              </p>
            </div>
            <div class="align-self-end">
              <a
                class="cart-icon bg-primary pt-3 pb-1 px-2 rounded-circle"
                @click="addCart(item.id)"
              >
                <span class="material-icons-outlined"> add_shopping_cart </span>
              </a>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
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
  props: {
    products: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  emits: ["get-cart"],
  components: { Swiper, SwiperSlide },
  inject: ["emitter"],
  data() {
    return {
      loadingStatus: {
        loadingItem: "",
      },
      isLoading: false,

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
    addCart(id, qty = 1) {
      this.isLoading = true;
      this.$http
        .post(
          `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/cart`,
          {
            data: { product_id: id, qty },
          }
        )
        .then(() => {
          this.isLoading = false;
          this.emitter.emit("get-cart");
          this.emitter.emit("add-cart");
          this.emitter.emit("push-message", {
            style: "success",
            title: "成功加入購物車囉！",
          });
        })
        .catch(() => {
          this.emitter.emit("push-message", {
            style: "success",
            title: "加入購物車失敗囉，請重新加入！",
          });
        });
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.swiper-slide {
  height: 22rem;
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
    .cart-icon {
      height: 2rem;
      width: 2rem;
      color: #fffafa;
      cursor: pointer;
      &:hover {
        color: #ad795d;
        background-color: #fffafa !important;
        border: 3px solid #ad795d;
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
