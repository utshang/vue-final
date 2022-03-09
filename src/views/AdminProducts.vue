<template>
  <div>
    這裡是 後台 產品列表
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-end">
            {{ item.origin_price }}
          </td>
          <td class="text-end">
            {{ item.price }}
          </td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
        </tr>
      </tbody>
    </table>
    <PaginationCom
      :pages="pagination"
      @emit-pages="getProductsList"
    ></PaginationCom>
  </div>
</template>

<script>
import PaginationCom from "@/components/PaginationCom.vue";
export default {
  components: {
    PaginationCom,
  },
  props: ["token"],
  data() {
    return {
      products: [],
      pagination: {},
    };
  },

  methods: {
    getProductsList(page = 1) {
      this.$http
        .get(
          `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/admin/products/?page=${page}`
        )
        .then((response) => {
          this.products = response.data.products;
          this.pagination = response.data.pagination;
        })
        .catch((err) => {
          console.dir(err);
        });
    },
  },
  mounted() {
    this.getProductsList();
  },
};
</script>
