var express = require('express');
var router = express.Router();

var dataService = require('../../services/dataService');
var dbService = require('../../services/mysqlService');

router.get('/customer', function(req, res, next) {
    // var callback = function(result){
    //     res.send(result);
    // }
    // dbService.getCustomers(callback);
    dbService.getPromiseCustomers().then(
        function(result){
          console.log("promise resoled");
          res.send(result);
         }
    );
});

router.get('/customer/:id', function(req, res, next) {
	var callback = function(data){
		res.send(data);
	}
  	dbService.getCustomerById(req.params.id,callback);
});

//add
router.post('/customer', function(req, res, next) {
	var callback = function (){
		res.send({msg:"customer added ok.", result:'success'});
	}
	dbService.addCustomer(req.body,callback);
});

// router.get('/customer/:id', function(req, res, next) {
//     res.send(dataService.getCustomerById(req.params.id));
// });

// router.post('/customer', function(req, res, next) {
// 	dataService.addCustomer(req.body);
// 	res.send({msg:"customer added ok.", result:'success'});
// });

// router.put('/customer', function(req, res, next) {
// 	dataService.updateCustomer(req.body);
// 	res.send({msg:"customer updated ok.", result:'success'});
// });

//update
router.put('/customer', function(req, res, next) {
	var callback = function(){
		res.send({msg:"customer updated ok.", result:'success'});
	}
	dbService.updateCustomer(req.body,callback);	
});

//delete
// router.delete('/customer/:id', function(req, res, next) {
// 	dataService.deleteCustomer(req.params.id);
// 	res.send({msg:"customer deleted ok.", result:'success'});
// });

router.delete('/customer/:id', function(req, res, next) {
	var callback= function() {
		res.send({msg:"customer deleted ok.", result:'success'});
	};
	dbService.deleteCustomer(req.params.id,callback);	
});

module.exports = router;