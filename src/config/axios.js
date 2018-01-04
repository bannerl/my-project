import axios from'axios';
import {baseUrl} from './env';

export default async(url = '', data = {}, type = 'GET', method = 'axios') => {
	url = baseUrl + url;
	type = type.toLowerCase();
	
	if (type == 'get') {
		data = {
			params: data
		}
	}	
	let res={};
	
	await axios[type](url, data)
	  .then(function (response) {
	  	res = response;
	  })
	  .catch(function (error) {
	    throw new Error(error);
	  });
	return res;	
}