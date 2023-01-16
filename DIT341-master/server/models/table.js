var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var tableSchema = new Schema({

    number: {type: Number},
    seats: {type: Number},
    available: {type: Boolean},
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: "restaurants"
    }
    
});

module.exports = mongoose.model("tables", tableSchema);