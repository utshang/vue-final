"use strict";(self["webpackChunkvue_final"]=self["webpackChunkvue_final"]||[]).push([[38],{6038:function(e,t,s){s.r(t),s.d(t,{default:function(){return de}});var a=s(6252),d=s(3577),l=s(9963);const i={class:"container mt-4"},r=(0,a._)("h2",{class:"fs-2 fw-bold text-primary"},"訂單列表",-1),o={class:"table mt-4 border border-1 border-muted"},n=(0,a._)("thead",{class:"bg-primary text-white fw-bold"},[(0,a._)("tr",null,[(0,a._)("th",null,"購買時間"),(0,a._)("th",null,"Email"),(0,a._)("th",{class:"lh-lg"},"購買款項"),(0,a._)("th",null,"應付金額"),(0,a._)("th",null,"是否付款"),(0,a._)("th",null,"編輯")])],-1),p=["textContent"],u={class:"list-unstyled"},c={class:"text-right"},h={class:"form-check form-switch"},m=["id","onUpdate:modelValue","onChange"],_=["for"],g={key:0},b={key:1},w={class:"btn-group"},f=["onClick"],y=["onClick"];function k(e,t,s,k,O,v){const x=(0,a.up)("PaginationCom"),D=(0,a.up)("OrderModal"),M=(0,a.up)("DelModal"),$=(0,a.up)("VeeLoading");return(0,a.wg)(),(0,a.iD)("div",i,[r,(0,a._)("table",o,[n,(0,a._)("tbody",null,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(O.orders,(t=>((0,a.wg)(),(0,a.iD)(a.HY,{key:t.id},[O.orders.length?((0,a.wg)(),(0,a.iD)("tr",{key:0,class:(0,d.C_)([{"text-success":t.is_paid},"border-bottom border-1 border-muted"])},[(0,a._)("td",null,(0,d.zw)(e.$filters.date(t.create_at)),1),(0,a._)("td",null,[t.user?((0,a.wg)(),(0,a.iD)("span",{key:0,textContent:(0,d.zw)(t.user.email)},null,8,p)):(0,a.kq)("",!0)]),(0,a._)("td",null,[(0,a._)("ul",u,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(t.products,(e=>((0,a.wg)(),(0,a.iD)("li",{key:e.product.title},(0,d.zw)(e.product.title)+" 數量："+(0,d.zw)(e.qty)+" "+(0,d.zw)(e.product.unit),1)))),128))])]),(0,a._)("td",c,(0,d.zw)(t.total),1),(0,a._)("td",null,[(0,a._)("div",h,[(0,a.wy)((0,a._)("input",{class:"form-check-input",type:"checkbox",id:`paidSwitch${t.id}`,"onUpdate:modelValue":e=>t.is_paid=e,onChange:e=>v.updatePaid(t)},null,40,m),[[l.e8,t.is_paid]]),(0,a._)("label",{class:"form-check-label",for:`paidSwitch${t.id}`},[t.is_paid?((0,a.wg)(),(0,a.iD)("span",g,"已付款")):((0,a.wg)(),(0,a.iD)("span",b,"未付款"))],8,_)])]),(0,a._)("td",null,[(0,a._)("div",w,[(0,a._)("button",{class:"btn btn-primary text-white btn-sm me-2 rounded",type:"button",onClick:e=>v.openModal(t)}," 檢視 ",8,f),(0,a._)("button",{class:"btn btn-danger text-white btn-sm rounded",type:"button",onClick:e=>v.openDelOrderModal(t)}," 刪除 ",8,y)])])],2)):(0,a.kq)("",!0)],64)))),128))])]),(0,a.Wm)(x,{class:"d-flex justify-content-end",pages:O.pagination,onEmitPages:v.getOrders},null,8,["pages","onEmitPages"]),(0,a.Wm)(D,{order:O.tempOrder,ref:"orderModal",onUpdatePaid:v.updatePaid},null,8,["order","onUpdatePaid"]),(0,a.Wm)(M,{item:O.tempOrder,ref:"delModal",onDelItem:v.delOrder},null,8,["item","onDelItem"]),(0,a.Wm)($,{active:O.isLoading},null,8,["active"])])}var O=s(7607);const v={class:"modal fade",id:"productModal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true",ref:"modal"},x={class:"modal-dialog modal-xl",role:"document"},D={class:"modal-content border-0"},M=(0,a._)("div",{class:"modal-header bg-dark text-white"},[(0,a._)("h5",{class:"modal-title",id:"exampleModalLabel"},[(0,a._)("span",null,"訂單細節")]),(0,a._)("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1),$={class:"modal-body"},z={class:"row"},C={class:"col-md-4"},P=(0,a._)("h3",{class:"fs-5 fw-bold text-primary mb-3"},"用戶資料",-1),L={key:0,class:"lh-lg"},U={class:"col-md-8"},q=(0,a._)("h3",{class:"fs-5 fw-bold text-primary mb-3"},"訂單細節",-1),S={key:0,class:"lh-lg"},Z=(0,a.Uk)(" 付款時間： "),E={key:0},H={key:1},V=(0,a.Uk)(" 付款狀態： "),W={class:"d-flex align-items-center"},Y={key:0,class:"text-success"},K={key:1,class:"text-muted me-2"},j={class:"form-check"},I=(0,a._)("p",{class:"fs-5 fw-bold text-primary mb-3"},"選購商品",-1),N={class:"table"},A=(0,a._)("thead",null,[(0,a._)("tr",null,[(0,a._)("th",{class:"fw-bold p-0"},"品項"),(0,a._)("th",{class:"fw-bold p-0"},"數量")])],-1),B={class:"p-0"},F={class:"modal-footer"},G=(0,a._)("button",{type:"button",class:"btn btn-success text-white","data-bs-dismiss":"modal"}," 取消 ",-1);function J(e,t,s,i,r,o){return(0,a.wg)(),(0,a.iD)("div",v,[(0,a._)("div",x,[(0,a._)("div",D,[M,(0,a._)("div",$,[(0,a._)("div",z,[(0,a._)("div",C,[P,r.tempOrder.user?((0,a.wg)(),(0,a.iD)("div",L,[(0,a._)("p",null,"姓名："+(0,d.zw)(r.tempOrder.user.name),1),(0,a._)("p",null,"Email："+(0,d.zw)(r.tempOrder.user.email),1),(0,a._)("p",null,"電話："+(0,d.zw)(r.tempOrder.user.tel),1),(0,a._)("p",null,"地址："+(0,d.zw)(r.tempOrder.user.address),1)])):(0,a.kq)("",!0)]),(0,a._)("div",U,[q,r.tempOrder.user?((0,a.wg)(),(0,a.iD)("div",S,[(0,a._)("p",null,"訂單編號："+(0,d.zw)(r.tempOrder.id),1),(0,a._)("p",null,"下單時間："+(0,d.zw)(e.$filters.date(r.tempOrder.create_at)),1),(0,a._)("p",null,[Z,r.tempOrder.paid_date?((0,a.wg)(),(0,a.iD)("span",E,(0,d.zw)(e.$filters.date(r.tempOrder.paid_date)),1)):((0,a.wg)(),(0,a.iD)("span",H,"時間不正確"))]),(0,a._)("div",null,[V,(0,a._)("div",W,[(0,a._)("div",null,[r.tempOrder.is_paid?((0,a.wg)(),(0,a.iD)("strong",Y,"已付款")):((0,a.wg)(),(0,a.iD)("span",K,"尚未付款 "))]),(0,a._)("div",j,[(0,a.wy)((0,a._)("input",{class:"form-check-input",type:"checkbox",value:"",id:"flexCheckDefault","onUpdate:modelValue":t[0]||(t[0]=e=>r.tempOrder.is_paid=e)},null,512),[[l.e8,r.tempOrder.is_paid]])])])]),(0,a._)("p",null,"總金額： "+(0,d.zw)(e.$filters.currency(r.tempOrder.total)),1),I,(0,a._)("table",N,[A,(0,a._)("tbody",null,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(r.tempOrder.products,((e,t)=>((0,a.wg)(),(0,a.iD)("tr",{key:`選購商品_${t}`},[(0,a._)("th",B,(0,d.zw)(e.product.title),1),(0,a._)("td",null,(0,d.zw)(e.qty)+" / "+(0,d.zw)(e.product.unit),1)])))),128))])])])):(0,a.kq)("",!0)])])]),(0,a._)("div",F,[G,(0,a._)("button",{type:"button",class:"btn btn-primary text-white",onClick:t[1]||(t[1]=t=>e.$emit("update-paid",r.tempOrder))}," 修改付款狀態 ")])])])],512)}var Q=s(1339),R={props:{order:{type:Object,default(){return{}}}},data(){return{status:{},modal:"",tempOrder:{},isPaid:!1}},emits:["update-paid"],mixins:[Q.Z],watch:{order(){this.tempOrder=this.order}}},T=s(3744);const X=(0,T.Z)(R,[["render",J]]);var ee=X,te=s(5545),se={data(){return{orders:{},isNew:!1,pagination:{},isLoading:!1,tempOrder:{},currentPage:1}},components:{PaginationCom:te.Z,DelModal:O.Z,OrderModal:ee},methods:{getOrders(e=1){this.currentPage=e,this.isLoading=!0,this.$http.get(`https://vue3-course-api.hexschool.io/v2/api/utshang216/admin/orders?page=${e}`,this.tempProduct).then((e=>{this.orders=e.data.orders,this.pagination=e.data.pagination,this.isLoading=!1})).catch((e=>{this.isLoading=!1,this.$httpMessageState(e.response,"錯誤訊息")}))},openModal(e){this.tempOrder={...e},this.isNew=!1;const t=this.$refs.orderModal;t.openModal()},openDelOrderModal(e){this.tempOrder={...e};const t=this.$refs.delModal;t.openModal()},updatePaid(e){this.isLoading=!0;const t={is_paid:e.is_paid};this.$http.put(`https://vue3-course-api.hexschool.io/v2/api/utshang216/admin/order/${e.id}`,{data:t}).then((e=>{this.isLoading=!1;const t=this.$refs.orderModal;t.hideModal(),this.getOrders(this.currentPage),this.$httpMessageState(e,"更新付款狀態")})).catch((e=>{this.isLoading=!1,this.$httpMessageState(e.response,"錯誤訊息")}))},delOrder(){this.isLoading=!0,this.$http.delete(`https://vue3-course-api.hexschool.io/v2/api/utshang216/admin/order/${this.tempOrder.id}`).then((()=>{this.isLoading=!1;const e=this.$refs.delModal;e.hideModal(),this.getOrders(this.currentPage)})).catch((e=>{this.isLoading=!1,this.$httpMessageState(e.response,"錯誤訊息")}))}},created(){this.getOrders()}};const ae=(0,T.Z)(se,[["render",k]]);var de=ae}}]);
//# sourceMappingURL=38.4b13b7ae.js.map