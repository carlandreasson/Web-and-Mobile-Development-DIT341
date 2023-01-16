const { json } = require('body-parser');
var express = require('express');
var router = express.Router();
var Table = require('../models/table');
var Restaurant = require('../models/restaurant')
var Reservation = require('../models/reservation');


/**
 * create a new table on the given path for the given restaurant
 */
router.post('/api/restaurants/:restaurant_id/tables', function(req, res, next){
       var restaurantId = req.params.restaurant_id;
       var newTable = new Table(req.body);
       newTable.restaurant = restaurantId;
       newTable.save(function(err, newTable){
        if (err) { return next(err); }
        Restaurant.findById(restaurantId, function(err, restaurant){
            if (err) {return next(err)}
            if (restaurant == null) {
                return res.status(404).json({'message' : 'Restaurant not found'})
            }
            restaurant.tables.push(newTable._id)
            restaurant.save();
        })
        res.status(201).json(newTable);
    });
});

/**
 * Sends all registered tables for a given restaurant
 */
router.get('/api/restaurants/:restaurant_id/tables', function(req, res, next){

    var restaurantId = req.params.restaurant_id;
    const sort = req.query.sort
    Table.find({restaurant: restaurantId}).sort(sort).populate('restaurant').exec(function(err, tables){
        if (err) {return next(err)};
        res.status(200).json({'tables' : tables})
    })
})


/**
 * Sends the registered table corresponding to the given parameter id. 
 */
router.get('/api/restaurants/:restaurant_id/tables/:table_id', function(req, res, next){
    
    var id = req.params.table_id;

    Reservation.deleteMany({restaurant: id}).exec() 
    
    Table.findById(id).populate('restaurant').exec(function(err, table){
        if (err) {return next(err);}
        if (table == null){
            return res.status(404).json({
                "message" : "table not found"
            });     
        }
        res.status(200).json(table);  
    })
});

/**
 * Deletes the registered table corresponding to the given parameter id.
 */
 router.delete('/api/restaurants/:restaurant_id/tables/:id', function(req, res, next){

    var id = req.params.id;

    Table.findOneAndDelete({"_id" : id}, function(err, table){
        if (err) {return next(err)}
        if (table == null) {
            return res.status(404).json({'message' : 'Table not found'})
        }
        res.status(200).json(table);
    });
});

/**
 * Delete all tables for a given restaurant
 */
 router.delete('/api/restaurants/:restaurant_id/tables', function(req, res, next) {

    var restaurantId = req.params.restaurant_id;

    Table.deleteMany({restaurant: restaurantId}, function(err, table) {
        if (err) { return next(err) }
        res.status(200).json({table});
    })
});

/**
 * Update the registered table corresponding to the given parameter id.
 * Allows updating one or several attributes at the time.
 */
router.patch('/api/restaurants/:restaurant_id/tables/:table_id', function(req, res, next){
    var id = req.params.table_id;

    Table.findById(id, function(err, table){
        if (err) {return next(err)}
        if (table == null) {
            return res.status(404).json({'message' : 'Table not found'})
        }
        table.seats = (req.body.seats||table.seats);
        table.number = (req.body.number||table.number);
        table.available = (req.body.available||table.available);
        table.save();
        res.status(200).json(table);
    });

});

router.put('/api/restaurants/:restaurant_id/tables/:table_id', function(req, res, next){
    var id = req.params.table_id;
    var updated_table = {
        "_id": id,
        "number" : req.body.number,
        "seats" : req.body.seats,
        "available" : req.body.available,
        "restaurant" : req.params.restaurant_id
    }
    Table.replaceOne(
        {_id : id },
        updated_table,
        (err, AfterUpdate) => {
            if (err) {
                return next(err)
            }
            if (AfterUpdate == null) {
                return res.status(404).json({'message' : 'Table not found'})
            }
            res.status(200).json(updated_table);
        })
});

module.exports = router;