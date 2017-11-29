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
import goods from 'page/seller/children/goods/goods'
import ratings from 'page/seller/children/ratings/ratings'
import description from 'page/seller/children/seller/seller'


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