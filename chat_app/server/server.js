const express=require('express');
const http=require('http');
const path=require('path');
const socketIO=require('socket.io');

const {generateMessage,generateGeoMessage}=require('./utils/message.js');
const {isRealString}=require('./utils/validation.js');
const {Users}=require('./utils/users.js');
const publicPath=path.join(__dirname,'../public');
const port=process.env.PORT || 3000;
var app=express();
var server=http.createServer(app);
var io=socketIO(server);
var users=new Users();

app.use(express.static(publicPath));

io.on('connection',function(socket){
	console.log('new user connected');
	
	socket.on('join',function(m,callback){
		if(!isRealString(m.name) || !isRealString(m.room))
			return callback('Error: Name is required.');
		socket.join(m.room);
		users.removeUser(socket.id);
		users.addUser(socket.id,m.name,m.room);

		io.to(m.room).emit('updateUserList',users.getUserList(m.room));
		socket.emit('newMessage',generateMessage('Admin','Welcome!!'));
		socket.broadcast.to(m.room).emit('newMessage',generateMessage('Admin',`${m.name} has join.`));
		callback();
	});

	socket.on('createMessage',function(m){
		var user=users.getUser(socket.id);
		if(user && isRealString(m.text))
			io.to(user.room).emit('newMessage',generateMessage(user.name,m.text));
	});

	socket.on('sendGeolocation',function(m){
		var user=users.getUser(socket.id);
		if(user)
			io.to(user.room).emit('newGeoMessage',generateGeoMessage(user.name,m.lat,m.long));
	});

	socket.on('disconnect',function(){
		var user=users.removeUser(socket.id);
		if(user){
			io.to(user.room).emit('updateUserList',users.getUserList(user.room));
			io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left.`));
		}
	});	
});

server.listen(port,function(){
	console.log(`server is run on port ${port}`);
})