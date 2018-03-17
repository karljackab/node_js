const request=require('request');

var getWeather=function(lat,lon,callback){
	request({
		url:`https://api.forecast.io/forecast/4a04d1c42fd9d32c97a2c291a32d5e2d/${lat},${lon}`,
		json:true
	},function(err,res,body){
		if(!err&&res.statusCode===200)
			callback(undefined,{
				'now temperature':`${body.currently.temperature} F`,
				'feel temperature':`${body.currently.apparentTemperature} F`,
				'descript':body.currently.icon
			})
		else
			callback('can\'t not find the data');
	});
};

module.exports.getWeather=getWeather;