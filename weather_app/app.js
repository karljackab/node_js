const yargs=require('yargs');
const geocode=require('./geocode/geocode.js')
const weather=require('./weather/weather.js')

var argv=yargs.options({
		a:{
			demand:true,
			alias:'address',
			describe:'address you want to fetch weather for',
			string:true
		}
	})
	.help()
	.alias('help','h')
	.argv;

var address=encodeURIComponent(argv.a);

geocode.searchAddr(address,function(err,res){
	if(err)
		console.log(err);
	else
	{
		console.log(JSON.stringify(res,undefined,2));
		weather.getWeather(res.latitude,res.longitude,function(err,res){
			if(err)
				console.log(err);
			else
				console.log(JSON.stringify(res,undefined,2));
		});
	}
});