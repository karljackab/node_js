const express=require('express');
const bodyParser=require('body-parser');

var app=express();
app.use(bodyParser.json());

app.post('/todos',function(req,res){
	var newToDo=new ToDo({
		text: req.body.text,
		completed: req.body.completed,
		createdAt: req.body.createdAt,
		completedAt: req.body.completedAt
	});
	newToDo.save().then(function(doc){
		res.send(doc);
	}).catch(function(err){
		res.status(400).send();
	});
});

app.get('/todos',function(req,res){
	ToDo.find().then(function(todos){
		res.send({todos});
	}).catch(function(err){
		res.status(400).send();
	});
});

app.get('/todos/:id',function(req,res){
	var id=req.params.id;
	if(!ObjectID.isValid(id))
		return res.status(404).send();
	ToDo.findById(id).then(function(todo){
		res.send(todo);
	}).catch(function(err){
		res.status(400).send();
	});
});

app.delete('/todos/:id',function(req,res){
	var id=req.params.id;
	if(!ObjectID.isValid(id))
		return res.status(404).send();
	ToDo.deleteOne({_id:id}).then(function(todo){
		if(!todo)
			return res.status(404).send();
		res.send(todo);
	}).catch(function(err){
		res.status(400).send();
	});
});

app.patch('/todos/:id',function(req,res){
	var id=req.params.id;
	var body=_.pick(req.body,['text','completed']);
	if(!ObjectID.isValid(id))
		return res.status(404).send();
	if(_.isBoolean(body.completed)&&body.completed)
		body.completedAt=Date.now();
	else
		body.completed=false;
	ToDo.findOneAndUpdate({_id:id},{$set:body},{new:true}).then(function(todo){
		if(!todo)
			return res.status(404).send();
		res.send(todo);
	}).catch(function(err){
		console.log(err);
		res.status(400).send();
	});
});

app.post('/users',function(req,res){
	var body=_.pick(req.body,['email','password']);
	var newUser=new User(body);
	newUser.save().then(function(doc){
		res.send(doc);
	}).catch(function(err){
		res.status(400).send();
	});
});

app.listen(3000,function(){
	console.log("server run");
});