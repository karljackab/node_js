const {mongoose,Schema}=require('./mongoose.js')

var toDoSchema=Schema({
	text:{
		type:String,
		unique:true,
		trim:true,
		min:1
	},
	completed:{
		type:Boolean,
		default:false
	},
	createdAt:{
		type:Date,
		default:Date.now
	},
	completedAt:{
		type:Date,
		default:null
	}
})

var ToDo=mongoose.model('ToDo',toDoSchema);

module.exports={
	ToDo
};