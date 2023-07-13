import Cookie from "js-cookie"

//抛出页面头数据
export default {
    state:{
        isCollapse: false,//控制菜单的打开还是收起
        tabsList: [
            {
                path: '/',
                name: "home",
                label: "首页",
                icon: 's-home',
                ur1: 'Home/Home'
            },
        ],//面包屑数据
        menu:[]
    },
    mutations: {
        //修改菜单展开收起的方法
    collapseMenu(state){
        state.isCollapse=!state.isCollapse
        },
        //更新面包屑数据 
        selectMenu(state, val) {
            console.log(val, 'val')
            //判断添加的数据是否为首页
            if (val.name !== 'home') {
                const index=state.tabsList.findIndex(item => item.name === val.name)
                if (index === -1) {
                    state.tabsList.push(val)
                }
            }
        },
        //删除指定tag数据
        closeTag(state,item) {
            console.log(item, 'item')
            const index = state.tabsList.findIndex(val => val.name === item.name)
            state.tabsList.splice(index,1)
        },
        //设置menu的数据
        setMenu(state, val) {
            state.menu = val
            Cookie.set('menu',JSON.stringify(val))
        },
        //动态注册路由
        addMenu(state, router) {
            if (!Cookie.get('menu')) return
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            //组装动态路由数组
            const menuArray = []
            menu.forEach(item => {
                if (item.children) {
                    item.children = item.children.map(item => {
                        item.commponenet = () => import(`../views/${item.ur1}`)
                        return item
                    })
                    menuArray.push(...item.children)
                } else {
                    item.compinent = () => import(`../views/${item.ur1}`)
                    menuArray.push(item)
                }
                
            })
            //路由的动态添加
            menuArray.forEach(item => {
                router.addRoute('Main',item)
            })

        }
    }
}