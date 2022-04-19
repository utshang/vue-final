<template>
  <ToastMessages />
  <RouterView />
</template>

<script>
import emitter from "@/libs/emitter";
import ToastMessages from "@/components/ToastMessages.vue";
export default {
  components: {
    ToastMessages,
  },
  //提供 emitter 可以在其他地方用 inject注入(在 app.vue 提供，前後台都可以使用 emitter)
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
