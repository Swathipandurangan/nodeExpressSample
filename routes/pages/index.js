var express = require('express');
var router = express.Router();
var dataService = require("../../services/dataService");
var dbService = require('../../services/mongodbService');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/login');
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.get('/dashboard', function(req, res, next) {
  res.render('dashboard', { title: 'Dashboard' });
});

// router.get('/customer', function(req, res, next) {
//   res.render('customer', { title: 'Customers', data:dataService.getCustomer()});
// });

router.get('/customer', function(req, res, next) {
  var callback = function(data) {
  	res.render('customer', { title: 'Customers', data:data});
  };
  dbService.getCustomers(callback);  
});

router.get('/about', function(req, res, next) {
  res.render('dashboard', { title: 'About' });
});

router.get('/customer/add', function(req, res, next) {
  res.render('add-customer', { title: 'Add Customer'});
});

// router.get('/customer/edit/:id', function(req, res, next) {
//   res.render('edit-customer', { title: 'Update Customer', customer:dataService.getCustomerById(req.params.id)});
// });

router.get('/customer/edit/:id', function(req, res, next) {
	var callback = function(customer){
		res.render('edit-customer', { title: 'Update Customer', customer:customer});
	}
  	dbService.getCustomerById(req.params.id,callback);
});

router.get('/customers/search/:field/', function(req, res, next) {
  res.redirect('/customer');
});

// router.get('/customers/search/:field/:text', function(req, res, next) {
//   var callback = function(data) {
//   	res.render('customer', { title: 'Customer', data:data});
//   };
//   var searchParam = {};
// 	searchParam.field = req.params.field;
// 	searchParam.searchword = req.params.text;
//   dbService.getCustomersBySearch(searchParam,callback);
//   // res.render('customer', { title: 'Customers', data:dataService.getCustomerByField(req.params.field, req.params.text)});
// });

router.get('/customers/search/:field/:searchText', function(req, res, next) {
	if(req.params.searchText == ""){
		res.redirect("/customer");
	}else{
   
   let callback = function(data){
     res.render('customer', { title: 'Customers', user:{name:'Vivek'}, data:data});
  }
  let searchParam = {};
  searchParam.field = req.params.field;
  searchParam.searchText = req.params.searchText;
  dbService.getCustomersBySearch(searchParam,callback);
	}
});

module.exports = router;
