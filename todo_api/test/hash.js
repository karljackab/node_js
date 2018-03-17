const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');

var rounds=13;
var password='abc123';
var hh="aa";

bcrypt.genSalt(rounds,function(err,salt){
	bcrypt.hash(password,salt,function(err,hash){
		console.log(hash);
		hh=hash;
		bcrypt.compare(password,hh,function(err,res){
			console.log(res);
		});
	});
});



// var ps='abtfw3t3wt2';
// var token=jwt.sign(ps,'abc');
// console.log(token);
// var cover=jwt.verify(token,'abc');
// console.log(cover);