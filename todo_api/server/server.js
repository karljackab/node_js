const express=require('express');
const bodyParser=require('body-parser');
const {ObjectID}=require('mongodb');
const _ = require('lodash');

const {ToDo}=require('./db/todo.js');
const {User}=require('./db/user.js');

var app=express();
app.use(bodyParser.json());

require('./router.js');

app.listen(3000,function(){
	console.log("server run");
});