const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/ToDo');
var Schema=mongoose.Schema;

module.exports={
	mongoose,
	Schema
};