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