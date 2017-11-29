export function formatTime(time,fmt) {
	if(/(y+)/.test(fmt)){
		fmt = fmt.replace(RegExp.$1,(time.getFullYear()+'').substr(4-RegExp.$1.length))
	}
	let o = {
		'M+':time.getMonth() + 1,
		'd+':time.getDate(),
		'h+':time.getHours(),
		'm+':time.getMinutes()
	}
	for(let k in o) {
		let str = `${k}`
		if(new RegExp(`(${k})`).test(fmt)){
		   let str = o[k] + ''
		   fmt = fmt.replace(RegExp.$1,(RegExp.$1.length===1)?str:padLeftZero(str))
		}
	}
	return fmt
}

function padLeftZero(str) {
	return ('00'+str).substr(str.length)
}

export function setDocumentTitle (title) {
    document.title = title;
    let ua = navigator.userAgent;
    if (/\bMicroMessenger\/([\d\.]+)/.test(ua) && /ip(hone|od|ad)/i.test(ua)) {
        var i = document.createElement('iframe');
        i.src = '/favicon.ico';
        i.style.display = 'none';
        i.onload = function () {
            setTimeout(function () {
                i.remove();
            }, 9);
        };
        document.body.appendChild(i);
    }
};
