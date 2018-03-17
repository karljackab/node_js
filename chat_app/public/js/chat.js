var socket=io();
var message_text=jQuery('[name=message]');
var content=jQuery('#messages');

function scrollToBottom(){
	var newMessage=content.children('li:last-child');
	var clientHeight=content.prop('clientHeight');
	var scrollTop=content.prop('scrollTop');
	var scrollHeight=content.prop('scrollHeight');
	var newMessageHeight=newMessage.innerHeight();
	var lastMessageHeight=newMessage.prev().innerHeight();
	if(clientHeight+scrollTop+newMessageHeight+lastMessageHeight+20>= scrollHeight)
		content.scrollTop(scrollHeight);
}

socket.on('connect',function(){
	var params=jQuery.deparam(window.location.search);
	if(params.room==='')
		params.room='Chat Room';
	socket.emit('join',params,function(err){
		if(err){
			alert(err);
			window.location.href='/';
		}
		else{
			document.title=`${params.room} | ChatApp`;
		}
	});
});

socket.on('disconnect',function(){
	
});

socket.on('updateUserList',function(users){
	var ul=jQuery('<ul></ul>');
	console.log(users);
	users.forEach(function(user){
		ul.append(jQuery('<li></li>').text(user));
	});
	jQuery('#users').html(ul);
});

socket.on('newMessage',function(m){
	var time=moment(m.createdAt).format('M/D h:m a');
	var template=jQuery('#message-template').html();
	var html=Mustache.render(template,{
		text:m.text,
		from:m.from,
		createdAt:time
	});
	jQuery('#messages').append(html);
	message_text.val("");
	scrollToBottom();
});

socket.on('newGeoMessage',function(m){
	var time=moment(m.createdAt).format('M/D h:m a');
	var template=jQuery('#geo-template').html();
	var html=Mustache.render(template,{
		from:m.from,
		createdAt:time,
		lat:m.lat,
		long:m.long,
		url:m.url
	});
	jQuery('#messages').append(html);
	scrollToBottom();
});

jQuery('#message-form').on('submit',function(e){
	e.preventDefault();
	socket.emit('createMessage',{
		text:message_text.val()
	});
});

var locationButton=jQuery('#send-location');
locationButton.on('click',function(){
	if(!navigator.geolocation){
		return alert('Geolocation not support by your browser.');
	}
	locationButton.attr('disabled','disabled').text('Sending location');
	navigator.geolocation.getCurrentPosition(function(pos){
		locationButton.removeAttr('disabled').text('Send Location~');
		socket.emit('sendGeolocation',{
			lat:pos.coords.latitude,
			long:pos.coords.longitude
		});
	},function(){
		alert('Unable to fetch location.');
		locationButton.removeAttr('disabled').text('Send Location~');
	});
});