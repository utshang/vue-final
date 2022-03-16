<template>
  <FrontNav></FrontNav>
  <router-view></router-view>
  <FrontFooter></FrontFooter>
</template>

<script>
import FrontNav from "@/components/FrontNav.vue";
import FrontFooter from "@/components/FrontFooter.vue";
export default {
  components: {
    FrontNav,
    FrontFooter,
  },
};
</script>
