import axios from'axios';
import {baseUrl} from './env';

export default async(url = '', data = {}, type = 'GET', method = 'axios') => {
	url = baseUrl + url;
	type = type.toLowerCase();
	console.log(data)
	if (type == 'get') {
		data = {
			params: data
		}
	}	
	let res={};
	console.log(data)
	await axios[type](url, data)
	  .then(function (response) {
	  	res = response;
	  })
	  .catch(function (error) {
	    throw new Error(error);
	  });
	return res;	
}