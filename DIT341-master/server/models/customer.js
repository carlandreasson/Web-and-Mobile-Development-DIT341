var mongoose = require('mongoose');
var schema = mongoose.Schema;

var customerSchema = new schema({

    name: {type:String, required: 'Name is required'},
    phone: {type:String, unique: true, required: 'person needs phone number'} 

});

module.exports = mongoose.model('customers', customerSchema);