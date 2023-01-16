const { json } = require('body-parser');
var express = require('express');
var router = express.Router();
var Reservation = require('../models/reservation');



router.post('/api/customers/:customer_id/reservations', function(req, res, next){

    var customerId = req.params.customer_id;
    var newReservation = new Reservation(req.body);
    newReservation.customer = customerId;

    newReservation.save(function (err, newReservation){
        if(err) { return next(err);}
        res.status(201).json(newReservation);
    });


});

/**
 * Sends all reservations for a given customer
 */

router.get('/api/customers/:customer_id/reservations', function(req, res, next){

    var customerId = req.params.customer_id;

    Reservation.find({customer: customerId}).populate('restaurant').populate('customer').populate('table').exec(function(err, reservations){
        if (err) {return next(err)};
        res.status(200).json({'reservations' : reservations});
    });
});

/**
 * Sends the reservations corresponding to the given parameter id. 
 */

router.get('/api/customers/:customer_id/reservations/:reservation_id', function(req, res, next){
    
    var id = req.params.reservation_id;
    
    Reservation.findById(id, function(err, reservation){
        if (err) {return next(err);}
        if (reservation === null){
            return res.status(404).json({
                "message" : "reservation not found"
            }); 
        }    
            res.status(200).json(reservation); 
    })
});

/**
 * Update the reservation corresponding to the given parameter id.
 * Allows updating of seats.
 */

router.patch('/api/customers/:customer_id/reservations/:reservation_id', function(req, res, next){
    
    var id = req.params.reservation_id;

    Reservation.findById(id, function(err, reservation){
        if(err) {return next(err)}
        if (reservation === null){
            return res.status(404).json({
                "message" : "reservation not found"
            })  
        }
        reservation.seats = (req.body.seats||reservation.seats);
        reservation.save(); 
        res.status(200).json(reservation);
    });
        
});


/**
 * Deletes the reservation corresponding to the given parameter id.
 */

router.delete('/api/customers/:customer_id/reservations/:reservation_id', function(req, res, next){

    var id = req.params.reservation_id;

    Reservation.findOneAndDelete({"_id" : id}, function(err, reservation){
        if (err) {return next(err)}
        if (reservation === null) {
            return res.status(404).json({'message' : 'Reservation not found'})
        }
        res.status(200).json(reservation);
    });
});

/**
 * Deletes all the reservations for a given customer.
 */
router.delete('/api/customers/:customer_id/reservations', function(req, res, next) {

    var customerId = req.params.customer_id

    Reservation.deleteMany({customer: customerId}, function(err, reservation) {
        if (err) { return next(err) }
        res.status(200).json({reservation})
    })
})


module.exports = router;