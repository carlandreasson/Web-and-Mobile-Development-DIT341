var mongoose = require('mongoose');
var schema = mongoose.Schema;

var reservationSchema = new schema({
    restaurant: {type: schema.Types.ObjectId, ref: 'restaurants'},
    table: {type: schema.Types.ObjectId, ref: 'tables'},
    customer: {type: schema.Types.ObjectId, ref: 'customers'}
});

module.exports = mongoose.model('reservation', reservationSchema);