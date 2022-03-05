<template>
  <div class="container">
    <FrontNav />

    <router-view></router-view>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  text-align: center;
}
</style>

<script>
import FrontNav from "@/components/FrontNav.vue";
export default {
  components: {
    FrontNav,
  },
};
</script>
