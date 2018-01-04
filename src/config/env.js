/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * 
 */

let baseUrl = ''; 


if (process.env.NODE_ENV == 'development') {
    baseUrl = 'http://localhost:8080';

}else if(process.env.NODE_ENV == 'production'){
	baseUrl = 'http://localhost:8080';
	//baseUrl = 'http://122.112.239.212:8080';
}

export {
	baseUrl,
}