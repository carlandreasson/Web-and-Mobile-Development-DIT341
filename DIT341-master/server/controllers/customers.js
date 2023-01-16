var express = require('express');
var router = express.Router();
var Customer = require('../models/customer');
var Reservation = require('../models/reservation');


/**
 * create a new customer on the given path
 */
router.post('/api/customers', function(req, res, next){

    var newCustomer = new Customer(req.body);

    newCustomer.save(function (err, newCustomer){
        if(err) { return next(err);}
        res.status(201).json(newCustomer);
    });
    
});

/**
 * Sends all registered customers
 */
router.get('/api/customers', function(req, res, next){
    Customer.find(function(err, customers){
        if (err) {return next(err)};
        res.status(200).json({"customers": customers});
    })
})

/**
 * Sends the registered customer corresponding to the given parameter id. 
 */
router.get('/api/customers/:id', function(req, res, next){

    var id = req.params.id;

    Customer.findById(id, function(err, customer){
        if (err) {return next(err)}
        if (customer == null) {
            return res.status(404).json({'message' : 'Customer not found'})
        }
        res.status(200).json(customer);
    });
});

/**
 * Deletes the registered customer corresponding to the given parameter id.
 */
router.delete('/api/customers/:id', function(req, res, next){

    var id = req.params.id;

    Reservation.deleteMany({restaurant: id}).exec() 

    Customer.findOneAndDelete({"_id" : id}, function(err, customer){
        if (err) {return next(err)}
        if (customer == null) {
            return res.status(404).json({'message' : 'Customer not found'})
        }
        res.status(200).json(customer);
    });
});

/**
 * Delete all customers
 */
router.delete('/api/customers', function(req, res, next) {
    Customer.deleteMany( function(err, customer) {
        if (err) { return next(err) }
        res.status(200).json({customer});
    })
});

/**
 * Update the registered customer corresponding to the given parameter id.
 * Allows updating one or several attributes at the time.
 */
router.patch('/api/customers/:id', function(req, res, next){
    var id = req.params.id;

    Customer.findById(id, function(err, customer){
        if (err) {return next(err)}
        if (customer == null) {
            return res.status(404).json({'message' : 'Customer not found'})
        }
        customer.name = (req.body.name||customer.name);
        customer.phone = (req.body.phone||customer.phone);
        customer.save();
        res.status(200).json(customer);
    });

});

module.exports = router;