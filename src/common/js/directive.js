import Vue from 'vue'

Vue.directive('focus', {
    inserted: function (el,{value}) {
    	if(value) {
       	 	el.focus()
    	}
    }
});