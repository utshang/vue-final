<template>
  <ul class="d-flex justify-content-around mt-5">
    <li
      class="progress-li d-flex flex-column align-items-center"
      :class="{ 'progress-li-active': step > '0' }"
    >
      <div
        class="progress mb-4 d-flex align-items-center justify-content-center circle rounded-circle"
        :class="{ 'progress-active': step > '0' }"
      >
        1
      </div>
      <p class="font fs-7" :class="{ 'font-active': step > '0' }">購物清單</p>
    </li>

    <li
      class="progress-li d-flex flex-column align-items-center"
      :class="{ 'progress-li-active': step > '1' }"
    >
      <div
        class="progress mb-4 d-flex align-items-center justify-content-center circle rounded-circle"
        :class="{ 'progress-active': step > '1' }"
      >
        2
      </div>
      <p class="font fs-7" :class="{ 'font-active': step > '1' }">填寫資料</p>
    </li>
    <li
      class="progress-li d-flex flex-column align-items-center"
      :class="{ 'progress-li-active': step > '2' }"
    >
      <div
        class="progress mb-4 d-flex align-items-center justify-content-center circle rounded-circle"
        :class="{ 'progress-active': step > '2' }"
      >
        3
      </div>
      <p class="font fs-7" :class="{ 'font-active': step > '2' }">確認訂單</p>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    step: String,
  },
};
</script>

<style lang="scss" scoped>
$white: #fffafa;
$gray-600: #6c757d;
$secondary: #ad795d;

.circle {
  width: 30px;
  height: 30px;
  position: relative;
}

.progress-li {
  float: left;
  width: 33.33%;
  position: relative;
  text-align: center;
}
.progress-li:after {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: #ddd;
  top: 15px;
  left: -50%;
  z-index: -1;
}

.progress-li-active + .progress-li-active:after {
  background-color: $secondary;
}

.progress-li:first-child:after {
  content: none;
}

.progress {
  border: 1px solid #ddd;
  background-color: $white;
  color: $gray-600;
}

.progress-active {
  background-color: $secondary;
  color: #fff;
  position: relative;
  border: 1px solid $secondary;
}

.font {
  color: $gray-600;
}
.font-active {
  color: #000000;
}
</style>
