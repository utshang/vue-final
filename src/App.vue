<template>
  <ToastMessages></ToastMessages>
  <router-view />
</template>

<script>
import emitter from "@/libs/emitter";
import ToastMessages from "@/components/ToastMessages.vue";
export default {
  components: {
    ToastMessages,
  },
  //提供emitter 可以在其他地方用inject注入(在app.vue提供，前後台都可以使用emitter)
  provide() {
    return {
      emitter,
    };
  },
};
</script>

<style lang="scss">
@import "./assets/stylesheets/all";
@import url("https://fonts.googleapis.com/css2?family=Sansita+Swashed:wght@400;600&display=swap");
</style>
