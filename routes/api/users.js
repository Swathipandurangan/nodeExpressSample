var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/authenticate', function(req, res, next) {
  if(typeof(req.body.username)!=undefined && 
  	req.body.username == req.body.password){
  		res.send({result:'success',msg:'login successful'});
	}else{
		res.send({result:'fail',msg:'username or password incorrect.'});
	}
});

module.exports = router;
