import axios from '../config/axios';
import {getStore} from '../common/js/savaLocal';

/**
 * 获取首页
 */

export const hotFoods = () => axios('/api/index',{},"GET");

/**
 * 获取用户信息
 */

export const userInfo = (userId) => axios('/api/user',{
	userId,
},"GET");

/**
 * 获取用户地址
 */

export const userAddress = (userId) => axios('/api/users/address',{
	userId,
},"GET");

/**
 * 获取商家信息
 */

export const getSellerInfo = (id) => axios('/api/seller',{
	id
},"GET");

/**
 * 获取商家所有商品
 */

export const getSellerGoods = (id) => axios('/api/goods',{
	id
},"GET");

/**
 * 获取商家评价
 */

export const getSellerRatings = (id) => axios('/api/ratings',{
	id
},"GET");

/**
 * 获取商品列表
 */

export const getShops = (max_type) => axios('/api/shops',{
	max_type,
},"GET");