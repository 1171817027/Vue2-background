//Vue全局数据 (跨级组件用,没有全局的话要引入,很麻烦,子父爷,没有全局的话,儿子的数据想穿给爷,就需要子->父亲->爷,有全局就可以直接子->爷)
import Vue from "vue";
import Vuex from 'vuex';
Vue.use(Vuex)


//引入了页面头的数据
import tab from'./tab.js'



//加载tab.js的export成为全局
export default  new Vuex.Store({
    modules: {
        tab
        
    }
})