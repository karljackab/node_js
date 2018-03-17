const {mongoose,Schema}=require('./mongoose.js');
const validator=require('validator');

var userSchema=Schema({
	email:{
		type:String,
		require:true,
		trim:true,
		minlength:1,
		unique:true,
		validate:{
			validator:validator.isEmail,
			message:'{VALUE} is not a valid email'
		}
	},
	password:{
		type:String,
		require:true,
		minlength:6
	},
	tokens:[{
		access:{
			type:String,
			required:true
		},
		token:{
			type:String,
			required:true
		}
	}]
});

var User=mongoose.model('User',userSchema);

module.exports={User};