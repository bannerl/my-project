import App from '../App'
import login from 'page/login/login'
import user from 'page/user/user'
import orderDescription from 'page/order/children/orderDescription'
import orderList from 'page/order/orderList'
import wallet from 'page/wallet/wallet'
import discount from 'page/discount/discount'
import score from 'page/score/score'
import systemSetup from 'page/systemSetup/systemSetup'
import collection from 'page/collection/collection'

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
          component:user
        },
//      {
//      	path: '/description',
//      	name: 'orderDescription',
//          component: orderDescription
//      },
        {
        	path: '/orderList',
        	name: 'orderList',
        	component: orderList
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