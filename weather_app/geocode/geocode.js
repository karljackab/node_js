const request=require('request');

var searchAddr=function(address,callback)
{
	request({
			url:`https://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
			json:true		
		},function(err,res,body){
			if(err)
				callback('can\'t connect to google server');
			else if(body.status==='OK')
			{
				callback(undefined,{
					Address:body.results[0].formatted_address,
					latitude:body.results[0].geometry.location.lat,
					longitude:body.results[0].geometry.location.lng
				});
			}
			else if(body.status=='OVER_QUERY_LIMIT')
				callback('you have exceeded your daily request quotafor this API');
			else
				callback('unknown address');
		});
}

module.exports.searchAddr=searchAddr;