import App from '../App'
const index = r => require.ensure([], () => r(require('../page/index/index')), 'index')
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')
const user = r => require.ensure([], () => r(require('../page/user/user')), 'user')
const orderDescription = r => require.ensure([], () => r(require('../page/order/children/orderDescription')), 'orderList')
const orderList = r => require.ensure([], () => r(require('../page/order/orderList')), 'orderList')
const wallet = r => require.ensure([], () => r(require('../page/wallet/wallet')), 'wallet')
const discount = r => require.ensure([], () => r(require('../page/discount/discount')), 'discount')
const score = r => require.ensure([], () => r(require('../page/score/score')), 'score')
const systemSetup = r => require.ensure([], () => r(require('../page/systemSetup/systemSetup')), 'systemSetup')
const collection = r => require.ensure([], () => r(require('../page/collection/collection')), 'collection')
const seller = r => require.ensure([], () => r(require('../page/seller/seller')), 'seller')
const receiveAddress = r => require.ensure([], () => r(require('../page/receiveAddress/receiveAddress')), 'receiveAddress')
const goods = r => require.ensure([], () => r(require('../page/seller/children/goods/goods')), 'goods')
const description = r => require.ensure([], () => r(require('../page/seller/children/seller/seller')), 'seller')
const ratings = r => require.ensure([], () => r(require('../page/seller/children/ratings/ratings')), 'ratings')
const addressSearch = r => require.ensure([], () => r(require('../page/addressSearch/addressSearch')), 'addressSearch')
const searchShop = r => require.ensure([], () => r(require('../page/searchShop/searchShop')), 'searchShop')
const shop = r => require.ensure([], () => r(require('../page/shop/shop')), 'shop')
const confirmOrder = r => require.ensure([], () => r(require('../page/confirmOrder/confirmOrder')), 'confirmOrder')
const payMent = r => require.ensure([], () => r(require('../page/payMent/payMent')), 'payMent')

//import amap from 'page/amap/amap'

export default [
    { path: '/',
      component: App,
      children: [
     	{	
          path: '/',
          component:index
        },
//      {	
//        path: '/amap',
//        component:amap
//      },
		{
          path: '/login',
          name: 'login',
          component:login
        },
        {
          path: '/user/:userId',
          name: 'user',
          component:user,
          meta: {
          	pageTitle: "个人中心"
          }
        },
        {
        	path: '/index',
        	name: 'index',
            component: index,
            meta: {
	          pageTitle: "首页"
	        }
        },
        {
        	path: '/orderList',
        	name: 'orderList',
        	component: orderList,
        	meta: {
	          pageTitle: "订单"
	        }
        },
        {
        	path: '/wallet',
        	name: 'wallet',
        	component: wallet
        },
        {
        	path: '/discount',
        	name: 'discount',
        	component: discount
        },
        {
        	path: '/score',
        	name: 'score',
        	component: score
        },
        {
        	path: '/systemSetup',
        	name: 'systemSetup',
        	component: systemSetup
        },
        {
        	path: '/collection',
        	name: 'collection',
        	component: collection
        },
        {
        	path: '/seller',
        	name: 'seller',
        	component: seller,
        	children: [
	        	{
	        		path: 'goods',
	        		name:'goods',
	        		component: goods
	        	},
	        	{
	        		path: 'description',
	        		component: description
	        	},
	        	{
	        		path: 'ratings',
	        		component: ratings
	        	}
        	]
        },
        {
        	path: '/address',
        	name:'receiveAddress',
        	component: receiveAddress,
        	meta: {
        		pageTitle: "收货地址"
        	}
        },
        {
        	path: '/addressSearch',
        	name:'addressSearch',
        	component: addressSearch,
        	meta: {
        		pageTitle: "地址"
        	}
        },
        {
        	path: '/searchShop',
        	name:'searchShop',
        	component: searchShop,
        	meta: {
        		pageTitle: "搜索"
        	}
        },
        {
        	path: '/shop',
        	name:'shop',
        	component: shop,
        	meta:{ keepAlive: true }
        },
        {
        	path: '/confirmOrder',
        	name:'confirmOrder',
        	component: confirmOrder,
        	meta:{ pageTitle: '确认订单' }
        },
        {
        	path: '/payMent',
        	name:'payMent',
        	component: payMent,
        	meta:{ pageTitle: '选择付款方式' }
        }
      ]
    }
//	{
//		path: '/seller',
//		component:seller
//	},
//	{
//		path: '/ratings',
//		component:ratings
//	},
//	{
//		path: '/goods',
//		component:goods
//	}
]