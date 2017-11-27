/**
 * 解析url参数
 * @example '?id=1234&collect=true'
 * @return object id:1234,collect:true
 */
export function loadUrl() {
	let url = window.location.search;
	let obj = {};
	let reg = /[?&][^?&]+=[^?&]+/g;
	let arr = url.match(reg);
	let i = 0;
	if(arr){
		for(;i<arr.length;i++){
			let str = arr[i].substring(1);
			let tempArr = str.split('=');
			let key = tempArr[0];
			let value = tempArr[1];
			obj[key] = value
		}
	}	
	return obj;
}