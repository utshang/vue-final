export default {
  inject: ["emitter"],
  data() {
    return {
      //從 localStorage 取出資料
      //給預設值[]
      favorite: JSON.parse(localStorage.getItem("favorite")) || [],
    };
  },
  methods: {
    toggleFav(id) {
      //查 favorite 中有沒有這一個 id
      //findIndex() 方法返回陣列中滿足提供的測試函式的第一個元素的索引。若沒有找到對應元素則返回-1。
      const favIDd = this.favorite.findIndex((item) => item === id);

      //如果沒有這一個 id，push 進去 favorite 裡
      if (favIDd === -1) {
        this.favorite.push(id);
        this.emitter.emit("push-message", {
          style: "success",
          title: "已經加入最愛囉！",
        });
        //如果有這一個 id，從 favorite 中將 favIDd 刪掉
      } else {
        this.favorite.splice(favIDd, 1);
        this.emitter.emit("push-message", {
          style: "danger",
          title: "已經移除最愛囉！",
        });
      }
      this.emitter.emit("get-fav", this.favorite);
    },
  },
  watch: {
    favorite: {
      //深層監聽
      deep: true,
      //handler 控制器
      handler() {
        //localStorage 自訂欄位 "favorite"
        //監聽 favorite，favorite 有變動時有變動時就寫入
        localStorage.setItem("favorite", JSON.stringify(this.favorite));
      },
    },
  },
};
