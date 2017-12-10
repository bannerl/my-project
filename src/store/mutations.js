import {
	OUT_LOGIN,
	RECORD_USERINFO,
	RECORD_ADDRESS
} from './mutation-types.js'

import {setStore, getStore} from '@/common/js/savaLocal'

export default {
	
	// 记录用户信息
	[RECORD_USERINFO](state, info) {
		state.userInfo = info;
		state.loginStatus = true;
		setStore('user_id', info.id);
	},
	[RECORD_ADDRESS](state,info) {
		state.recordAddress = info 
	},
	[OUT_LOGIN](state) {
		state.userInfo = {}
		state.loginStatus = false
	}
}
