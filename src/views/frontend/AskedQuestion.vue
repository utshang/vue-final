<template>
  <div
    class="banner mt-3 d-md-none d-block"
    :style="{
      backgroundImage: `url(${require('@/assets/images/front/faq.jpg')} )`,
    }"
  ></div>
  <div class="container">
    <div
      class="banner mt-3 d-md-block d-none"
      :style="{
        backgroundImage: `url(${require('@/assets/images/front/faq.jpg')} )`,
      }"
    ></div>
    <div class="body my-5">
      <p class="slogan text-secondary fw-bold">你可能會想問...</p>
      <div
        class="accordion rounded-3 shadow mt-4"
        id="accordionPanelsStayOpenExample"
      >
        <div class="accordion-item">
          <div
            class="accordion-button text-standard"
            data-bs-toggle="collapse"
            data-bs-target="#faq-1"
            aria-expanded="true"
            aria-controls="panelsStayOpen-collapseOne"
          >
            商品都是現貨還是預購呢？
          </div>
          <div
            id="faq-1"
            class="accordion-collapse collapse show"
            aria-labelledby="panelsStayOpen-headingOne"
          >
            <div
              class="accordion-body lh-lg border-top border-1 border-primary"
            >
              器皿進貨數量不多，加上為了保持花朵的新鮮，全館商品若於網頁訂購皆為預購唷，想要快點收到的朋朋歡迎來工作室逛逛！<br />
              地址：台北市信義區松壽路1號 <br />
              營業時間： MON.-FRI. 09:00-12:00 / 13:00-18:00
            </div>
          </div>
        </div>
      </div>
      <div
        class="accordion rounded-3 shadow mt-4"
        id="accordionPanelsStayOpenExample"
      >
        <div class="accordion-item">
          <div
            class="accordion-button text-standard"
            data-bs-toggle="collapse"
            data-bs-target="#faq-2"
            aria-expanded="true"
            aria-controls="panelsStayOpen-collapseOne"
          >
            收到貨後發現花朵受損的話怎麼辦呢？
          </div>
          <div
            id="faq-2"
            class="accordion-collapse collapse"
            aria-labelledby="panelsStayOpen-headingOne"
          >
            <div
              class="accordion-body lh-lg border-top border-1 border-primary"
            >
              請務必拍照存檔並來信至客服信箱向我們反應，小編將於上班時段儘速回覆！
              <br />
              客服信箱：service@theflorist.com.tw
            </div>
          </div>
        </div>
      </div>
      <div
        class="accordion rounded-3 shadow mt-4"
        id="accordionPanelsStayOpenExample"
      >
        <div class="accordion-item">
          <div
            class="accordion-button text-standard"
            data-bs-toggle="collapse"
            data-bs-target="#faq-3"
            aria-expanded="true"
            aria-controls="panelsStayOpen-collapseOne"
          >
            器皿有鑑賞期限嗎？
          </div>
          <div
            id="faq-3"
            class="accordion-collapse collapse"
            aria-labelledby="panelsStayOpen-headingOne"
          >
            <div
              class="accordion-body lh-lg border-top border-1 border-primary"
            >
              有的！為保護消費者權益，器皿的部分享七天鑑賞期，辦理退換時請保持商品的完整性，如商品超過鑑賞期欲辦理退貨者，或是因人為因素造成商品受損，恕不受理，敬請見諒！
            </div>
          </div>
        </div>
      </div>
      <div
        class="accordion rounded-3 shadow mt-4"
        id="accordionPanelsStayOpenExample"
      >
        <div class="accordion-item">
          <div
            class="accordion-button text-standard"
            data-bs-toggle="collapse"
            data-bs-target="#faq-4"
            aria-expanded="true"
            aria-controls="panelsStayOpen-collapseOne"
          >
            如果還有其他問題怎麼聯絡你們呢？
          </div>
          <div
            id="faq-4"
            class="accordion-collapse collapse"
            aria-labelledby="panelsStayOpen-headingOne"
          >
            <div
              class="accordion-body lh-lg border-top border-1 border-primary"
            >
              於上班時段來信至客服信箱或直接前往工作室，我們會竭盡心力的為你解決問題！
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    document.documentElement.scrollTop = 0;
  },
};
</script>

<style lang="scss" scoped>
.banner {
  height: calc(100vh - 500px);
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}
.slogan {
  font-size: 1.125rem;
}
@media screen and (min-width: 769px) {
  .slogan {
    font-size: 1.875rem;
  }
}
</style>
