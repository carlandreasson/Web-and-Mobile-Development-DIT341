var express = require('express');
var router = express.Router();
var Restaurant = require('../models/restaurant');
var mongoose = require('mongoose');
const { collection } = require('../models/restaurant');
var Table = require('../models/table');
var Reservation = require('../models/reservation');



// (a) POST /camels
router.post('/api/restaurants', function(req, res, next) {
    var restaurant = new Restaurant(req.body);
    restaurant.save(function(err, restaurant){
        if (err) { return next(err); }
        res.status(201).json(restaurant);
    });
});

// (b) GET /camels
router.get('/api/restaurants', function(req, res, next) {
    Restaurant.find().populate('tables').exec(function(err, restaurants){
        if (err) { return next(err)};
        res.status(200).json({'restaurants': restaurants});
    });
});

// (c) DELETE /camels
router.delete('/api/restaurants', function(req, res, next) {
    Restaurant.deleteMany( function(err, restaurant) {
        if (err) { return next(err) }
        res.json({restaurant});
    });
});

// (d) GET /camels/:id
router.get('/api/restaurants/:id', function(req, res, next) {
    var id = req.params.id;

    Restaurant.findById(id).populate('tables').exec(function(err, restaurant){
        if (err){ return next(err);}
        if (restaurant == null) {
            return res.status(404).json({
                "message" : "restaurant not found"
            });
        }
        res.status(200).json(restaurant);
    });
});

// (e) PUT /camels/:id
router.put('/api/restaurants/:id', function(req, res, next) {
    var id = req.params.id;
    var updated_restaurant = {
        "_id": id,
        "name": req.body.name,
        "location": {
            "street" : req.body.location.street,
            "number" : req.body.location.number,
            "city": req.body.location.city
        },
        "tables": []
    }
    Restaurant.replaceOne(
        {_id : id },
        updated_restaurant,
        (err, restaurantAfterUpdate) => {
            if (err) {
                return next(err)
            }
            if (restaurantAfterUpdate == null) {
                return res.status(404).json({'message' : 'Restaurant not found'})
            }
            res.status(200).json(updated_restaurant);
        })
});

// (f) PATCH /camels/:id
router.patch('/api/restaurants/:id', function(req, res, next){
    var id = req.params.id;
    Restaurant.findById(id, function(err, restaurant){
        if (err) {return next(err)}
        if (restaurant == null) {
            return res.status(404).json({'message' : 'Restaurant not found'})
        }
        restaurant.name = (req.body.name || restaurant.name);
        restaurant.location = (req.body.location || restaurant.name);
        restaurant.save();
        res.status(200).json(restaurant);
    });
});


// (g) DELETE /camels/:id
router.delete('/api/restaurants/:id', function(req, res, next){
    var id = req.params.id;

    Table.deleteMany({restaurant: id}).exec()
    Reservation.deleteMany({restaurant: id}).exec()


    Restaurant.findOneAndDelete({"_id":id}, function(err, restaurant){
        if (err) { return next(err);}
        if (restaurant == null) {
            return res.status(404).json({'message' : 'Restaurant not found'});
        }
        res.status(200).json(restaurant);
    });
});

/**
 * (a) POST /cars/:car_id/drivers
 * (b) GET /cars/:car_id/drivers
 * (c) GET /cars/:car_id/drivers/:driver_id
 * (d) DELETE /cars/:car_id/drivers/:driver_id
 */

module.exports = router;