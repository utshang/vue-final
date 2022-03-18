<template>
  <div>
    這裡是 後台 產品列表
    <div class="text-end mt-4">
      <button class="btn btn-primary" type="button" @click="openModal(true)">
        建立新的產品
      </button>
    </div>
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
          <td>
            <div class="btn-group">
              <button
                class="btn btn-outline-primary btn-sm"
                type="button"
                @click="openModal(false, item)"
              >
                編輯
              </button>
              <button
                class="btn btn-outline-danger btn-sm"
                type="button"
                @click="openDelProductModal(item)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <VeeLoading :active="isLoading"></VeeLoading>
    <PaginationCom
      :pages="pagination"
      @emit-pages="getProductsList"
    ></PaginationCom>
    <!-- ProductModal -->
    <ProductModal
      @update-product="updateProduct"
      :product="tempProduct"
      :isNew="isNew"
      ref="productModal"
    />
    <!-- DelModal -->
    <DelModal
      :item="tempProduct"
      ref="delModal"
      @del-item="delProduct"
    ></DelModal>
  </div>
</template>

<script>
import ProductModal from "@/components/ProductModal.vue";
import DelModal from "@/components/DelModal.vue";
import PaginationCom from "@/components/PaginationCom.vue";

export default {
  components: {
    ProductModal,
    DelModal,
    PaginationCom,
  },
  props: ["token"],
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      isLoading: false,
      status: {
        fileUploading: false,
      },
      modal: {
        editModal: "",
        delModal: "",
      },
      currentPage: 1,
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
        .catch(() => {
          // console.dir(err);
        });
    },

    openModal(isNew, item) {
      if (isNew) {
        this.tempProduct = {};
        this.isNew = true;
      } else {
        this.tempProduct = { ...item };
        this.isNew = false;
      }
      const productComponent = this.$refs.productModal;
      productComponent.openModal();
    },

    updateProduct(item) {
      this.tempProduct = item;
      let api = `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/admin/product`;
      this.isLoading = true;
      let httpMethod = "post";
      let status = "新增產品";
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`;
        httpMethod = "put";
        status = "更新產品";
      }
      const productComponent = this.$refs.productModal;
      this.$http[httpMethod](api, { data: this.tempProduct })
        .then((response) => {
          this.isLoading = false;
          //$httpMessageState已經import在全域main.js中，不需要再import，在任何地方都可以使用
          this.$httpMessageState(response, status);
          productComponent.hideModal();
          this.getProductsList(this.currentPage);
        })
        .catch((error) => {
          this.isLoading = false;
          this.$httpMessageState(error.response, status);
        });
    },

    openDelProductModal(item) {
      this.tempProduct = { ...item };
      const delComponent = this.$refs.delModal;
      delComponent.openModal();
    },

    delProduct() {
      const url = `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`;
      this.isLoading = true;
      this.$http
        .delete(url)
        .then((response) => {
          this.isLoading = false;
          this.$httpMessageState(response, "刪除產品");
          const delComponent = this.$refs.delModal;
          delComponent.hideModal();
          this.getProductsList(this.currentPage);
        })
        .catch((error) => {
          this.isLoading = false;
          this.$httpMessageState(error.response, "刪除產品");
        });
    },
  },
  mounted() {
    this.getProductsList();
  },
};
</script>
