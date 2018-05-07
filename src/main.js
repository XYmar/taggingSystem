import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control

// add by me
/* import * as filters from './filters' // global filters */
// add

/* eslint-disable */
Vue.prototype.GLOBAL = global

Vue.prototype.getIP = function() {
  let ip = 'http://' + this.getCookie('ip') + ':' + this.getCookie('port') + '/'
  return ip
}

// 设置cookie
Vue.prototype.setCookie = (c_name, value, expiredays) => {
  let exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toUTCString());
};

//获取cookie、
function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return (arr[2]);
  else
    return null;
}
export function getCookies(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return (arr[2]);
  else
    return null;
}
Vue.prototype.getCookie = getCookie;
//删除cookie
Vue.prototype.delCookie =(name) => {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

function setCookieArr(searchWord, val){
  var value = val;
  var arr = document.cookie.match(new RegExp('(^| )' + searchWord + '=([^;]*)(;|$)'));
  var expiryday = new Date();
  expiryday.setTime(expiryday.getTime() + 60 * 60 * 24 * 30 *6 *1000);
  if (arr) {
    var cookieContext=unescape(arr[2]);
    cookieContext+="&"+escape(value); //escape() 编码 　　　　
    document.cookie = searchWord + '=' + escape(cookieContext) + '; expires=' + expiryday.toGMTString() + ";path=/";
  } else {
    document.cookie = searchWord + '=' + escape(value) + '; expires=' + expiryday.toGMTString() + ";path=/";
  }
}

function getCookieArr(searchWord) {
  var arr = document.cookie.match(new RegExp("(^| )" + searchWord + "=([^;]*)(;|$)"));
  if (arr != null) {
    var cookieContext=unescape(arr[2]);
    var cookieArr=cookieContext.split('&');
    var tmp = [];
    for(var i in cookieArr){
      if(tmp.indexOf(cookieArr[i])==-1) {
        tmp.push(cookieArr[i]);
      }
    }
  }
  return tmp;
}

Vue.prototype.setCookieArr = setCookieArr;
Vue.prototype.getCookieArr = getCookieArr;

// add by me end
import countTo from 'vue-count-to'
Vue.component('countTo', countTo)

Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
