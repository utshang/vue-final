<template>
  <h1>單一產品列表</h1>
  {{ product }}
</template>

<script>
export default {
  data() {
    return {
      product: [],
    };
  },
  methods: {
    getProduct() {
      // console.log(this.$route);
      const { id } = this.$route.params;
      this.$http
        .get(
          `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/product/${id}`
        )
        .then((res) => {
          this.product = res.data.product;
          // console.log(res);
        })
        .catch(() => {
          // console.log(err);
        });
    },
  },
  mounted() {
    this.getProduct();
  },
};
</script>
