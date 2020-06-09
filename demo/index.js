// import '@babel/polyfill';
import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI, { size: 'small' });
import store from './store';

new Vue({
    render: r => r(App),
    store
}).$mount('#app');