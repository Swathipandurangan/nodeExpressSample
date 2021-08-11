var service = {};

var customers = [
{id:1,name:'Vivek',email:'vivek@gmail.com',address:'India', phone:'9724232350'},
{id:2,name:'Sheryl',email:'vivek@gmail.com',address:'India', phone:'9728832350'},
{id:3,name:'Samridh',email:'vivek@gmail.com',address:'India', phone:'9728232350'},
{id:4,name:'Rajesh',email:'rajesh@gmail.com',address:'India', phone:'89898989898'},
];

service.getCustomer = function(){
	return customers;
}

service.getCustomerById = function(id){
	let customer = {};
	for (var i = 0; i < customers.length; i++) {
		if(id == customers[i].id){
			return customers[i];
		}
	}
	return customer;
}

service.getCustomerByField = function(field, text){
    let customerFilter = [];
    for (var i = 0; i < customers.length; i++) {
		if(customers[i][field].toLowerCase() === text.toLowerCase()){
			customerFilter.push(customers[i]);
		}
	}
	return customerFilter;
}

service.addCustomer = function(customer){
	customer.id = Math.floor(Math.random(9090)*1000000);
	customers.push(customer);
}

service.updateCustomer = function(customer){
	for (var i = 0; i < customers.length; i++) {
		if(customer.id == customers[i].id){
			customers[i] = customer;
			return;
		}
	}
}

service.deleteCustomer = function(id){
	let tempList = [];
	for (var i = 0; i < customers.length; i++) {
		if(id != customers[i].id){
			tempList.push(customers[i]);
		}
	}
	customers = tempList;
}

module.exports = service;