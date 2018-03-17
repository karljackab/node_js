const MongoClient=require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost',function(err,client){
	if(err)
		throw err;
	console.log('connected to mongodb');
	const db=client.db('ToDoAPP');
	// db.collection('ToDos').insertOne({
	// 	text:'Something',
	// 	done:false
	// },function(err,res){
	// 	if(err)
	// 		throw err;
	// 	console.log(JSON.stringify(res.ops,undefined,2));
	// 	//res.ops means all of the docs that we insert this times
	// });

	db.collection('Users').insertOne({
		name:'AAA',
		age:8,
		location:'your heart <3'
	},function(err,res){
		if(err)
			throw err;
		console.log(JSON.stringify(res.ops,undefined,2));
	});
	client.close();
});