import App from '../App'
import index from 'page/index/index'
import login from 'page/login/login'
import user from 'page/user/user'
import orderDescription from 'page/order/children/orderDescription'
import orderList from 'page/order/orderList'
import wallet from 'page/wallet/wallet'
import discount from 'page/discount/discount'
import score from 'page/score/score'
import systemSetup from 'page/systemSetup/systemSetup'
import collection from 'page/collection/collection'
import seller from 'page/seller/seller'
import receiveAddress from 'page/receiveAddress/receiveAddress'
import goods from 'page/seller/children/goods/goods'
import ratings from 'page/seller/children/ratings/ratings'
import description from 'page/seller/children/seller/seller'
import addressSearch from 'page/addressSearch/addressSearch'
import searchShop from 'page/searchShop/searchShop'
import sellerPage from 'page/sellerPage/sellerPage'
import shop from 'page/shop/shop'

export default [
    { path: '/',
      component: App,
      children: [
//    	{
//      	path: '/home',
//        name: 'home',
//        component:home
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
        	path: '/sellerPage',
        	name:'sellerPage',
        	component: sellerPage,
        	meta: {
        		pageTitle: "商家"
        	}
        },
        {
        	path: '/shop',
        	name:'shop',
        	component: shop,
        	meta:{ keepAlive: true }
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