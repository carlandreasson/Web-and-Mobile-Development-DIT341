var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var restaurantSchema = new Schema({

    name: {type: String, required: 'Restaurant name is required'},
    location: {
        street: {type: String},
        number: {type: Number},
        city: {type: String},
    },
    tables: [{ type: Schema.Types.ObjectId, ref: 'tables'}]
});

module.exports = mongoose.model("restaurants", restaurantSchema);