import axios from "axios"
import {getStore} from '@/common/js/savaLocal'
export const checkExsit = checkNumber, type) => fetch('/v1/users/exists', {
	[type]: checkNumber,
	type
});

