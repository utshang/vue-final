"use strict";(self["webpackChunkvue_final"]=self["webpackChunkvue_final"]||[]).push([[872],{872:function(t,e,s){s.r(e),s.d(e,{default:function(){return L}});var n=s(6252);function o(t,e,s,o,a,c){const i=(0,n.up)("DashboardNav"),r=(0,n.up)("RouterView"),u=(0,n.up)("DashboardFooter");return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n.Wm)(i),a.checkSuccess?((0,n.wg)(),(0,n.j4)(r,{key:0})):(0,n.kq)("",!0),(0,n.Wm)(u)],64)}var a=s(9963);const c={class:"bg-primary position-sticky top-0"},i={class:"container py-3"},r={class:"d-flex justify-content-between"},u=(0,n.Uk)("The Florist"),l={class:"container mt-4 d-flex justify-content-end"},d=(0,n.Uk)("產品列表"),h=(0,n.Uk)("|文章列表"),p=(0,n.Uk)("| 優惠卷列表 |"),m=(0,n.Uk)("訂單列表");function k(t,e,s,o,k,f){const _=(0,n.up)("RouterLink");return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n._)("div",c,[(0,n._)("div",i,[(0,n._)("div",r,[(0,n.Wm)(_,{class:"home text-white fs-3 mt-1",to:"/"},{default:(0,n.w5)((()=>[u])),_:1}),(0,n._)("button",{class:"btn text-primary bg-white fw-bold px-3",type:"button",onClick:e[0]||(e[0]=(0,a.iM)(((...t)=>f.signOut&&f.signOut(...t)),["prevent"]))}," 登出 ")])])]),(0,n._)("div",l,[(0,n.Wm)(_,{to:"/admin/products"},{default:(0,n.w5)((()=>[d])),_:1}),(0,n.Wm)(_,{to:"/admin/articles"},{default:(0,n.w5)((()=>[h])),_:1}),(0,n.Wm)(_,{to:"/admin/coupon"},{default:(0,n.w5)((()=>[p])),_:1}),(0,n.Wm)(_,{to:"/admin/order"},{default:(0,n.w5)((()=>[m])),_:1})])],64)}var f={methods:{signOut(){document.cookie="TheFloristToken=;expires=;",alert("token已清除"),this.$router.push("/login")}}},_=s(3744);const v=(0,_.Z)(f,[["render",k],["__scopeId","data-v-fc7baa5c"]]);var b=v;const g=t=>((0,n.dD)("data-v-3b3d2d90"),t=t(),(0,n.Cn)(),t),w={class:"footer text-muted text-center lh-base mt-5"},y=(0,n.Uk)(" 本網站僅供個人作品使用，不做任何商業用途 "),$=g((()=>(0,n._)("br",null,null,-1))),x=g((()=>(0,n._)("span",{class:"slogan"},"Beauty, Romance, and Everything Nice.",-1))),D=g((()=>(0,n._)("br",null,null,-1))),W=g((()=>(0,n._)("span",{class:"footer_end-p"},"© The Florist",-1))),F=[y,$,x,D,W];function T(t,e){return(0,n.wg)(),(0,n.iD)("p",w,F)}const U={},j=(0,_.Z)(U,[["render",T],["__scopeId","data-v-3b3d2d90"]]);var C=j,I={inject:["emitter"],components:{DashboardNav:b,DashboardFooter:C},data(){return{checkSuccess:!1}},methods:{checkLogIn(){const t=document.cookie.replace(/(?:(?:^|.*;\s*)TheFloristToken\s*=\s*([^;]*).*$)|^.*$/,"$1");t?(this.$http.defaults.headers.common["Authorization"]=`${t}`,this.$http.post("https://vue3-course-api.hexschool.io/v2/api/user/check",{api_token:this.token}).then((()=>{this.checkSuccess=!0})).catch((t=>{this.$httpMessageState(t.response,"錯誤訊息"),this.$router.push("/login")}))):(this.emitter.emit("push-message",{style:"danger",title:"登入失敗，請重新登入！"}),this.$router.push("/login"))}},mounted(){this.checkLogIn()}};const S=(0,_.Z)(I,[["render",o]]);var L=S}}]);
//# sourceMappingURL=872.a2be8586.js.map