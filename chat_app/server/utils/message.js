var moment=require('moment');

var generateMessage=function(from,text){
	return {
		from,text,
		createdAt:moment().valueOf()
	};
};

var generateGeoMessage=function(from,lat,long){
	return {
		from,
		lat,
		long,
		url:`https://www.google.com/maps?q=${lat},${long}`,
		createdAt:moment().valueOf()
	};
};

module.exports={
	generateMessage,
	generateGeoMessage
};