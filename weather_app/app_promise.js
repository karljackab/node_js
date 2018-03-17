const yargs=require('yargs');
const axios=require('axios');

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
var geoUrl=`https://maps.googleapis.com/maps/api/geocode/json?address=${address}`;
var weatherUrl='https://api.forecast.io/forecast/4a04d1c42fd9d32c97a2c291a32d5e2d/';

axios.get(geoUrl)
	.then(function(res){
		if(res.status===200)
		{
			if(res.data.status==='OVER_QUERY_LIMIT')
				throw new Error('over query, please try again later');
			var add=res.data.results[0].formatted_address;
			var lat=res.data.results[0].geometry.location.lat;
			var lng=res.data.results[0].geometry.location.lng;
			console.log(`Address: ${add}`);
			console.log(`latitude: ${lat}`);
			console.log(`longitude: ${lng}`);
			console.log('= = = = =');
			return axios.get(`${weatherUrl}${lat},${lng}`);
		}
		else
			throw new Error('unknown address');
	}).then(function(res){
		if(res.status===200)
		{
			console.log(`now temperature: ${res.data.currently.temperature} F`);
			console.log(`feel temperature: ${res.data.currently.apparentTemperature} F`);
			console.log(`description: ${res.data.currently.icon}`);
		}
		else
			throw new Error('can\'t fetch weather');
	}).catch(function(e){
		if(e)
			throw e;
	});