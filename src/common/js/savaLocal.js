/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
	if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
	if (!name) return;
	return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
	if (!name) return;
	window.localStorage.removeItem(name);
}



export function savaLocal( id, key, value) {
	let seller = window.localStorage.__all__;
	if(!seller){
		seller = {};
		seller[id] = {};
	}else{
		seller = JSON.parse(seller);
		if(!seller[id]){
			seller[id] = {};
		}
	}
	seller[id][key] = value;
	window.localStorage.__all__ = JSON.stringify(seller);
};

export function loadLocal( id, key, def) {
	let seller = window.localStorage.__all__;
	if(!seller) {
		return def;
	}
	seller = JSON.parse(window.localStorage.__all__)[id];
	if(!seller){
		return def;
	}
	return seller[key] || def;
};