export function formatTime(time,fmt){
	if(/(y+)/.test(fmt)){
		fmt = fmt.replace(RegExp.$1,(time.getFullYear()+'').substr(4-RegExp.$1.length))
	}
	let o = {
		'M+':time.getMonth() + 1,
		'd+':time.getDate(),
		'h+':time.getHours(),
		'm+':time.getMinutes()
	}
	for(let k in o){
		let str = `${k}`
		if(new RegExp(`(${k})`).test(fmt)){
		   let str = o[k] + ''
		   fmt = fmt.replace(RegExp.$1,(RegExp.$1.length===1)?str:padLeftZero(str))
		}
	}
	return fmt
}

function padLeftZero(str){
	return ('00'+str).substr(str.length)
}
