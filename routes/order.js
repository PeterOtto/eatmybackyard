var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('order', { title: 'Order my backyard' });
});

router.post('/', function(req, res) {

	var firstName = req.body.firstName;
	var lastName = req.body.lastName;
	var fullName = firstName + " " + lastName;
	var addressLine1 = req.body.addressLine1;
	var addressLine2 = req.body.addressLine2;
	var city = req.body.city;
	var postcode = req.body.postcode;
	var country = req.body.country;
	var email = req.body.email;
	var phone = req.body.phone;

	var postBody = {
		    "shipping_address": {
			    "recipient_name": fullName,
			    "address_line_1": addressLine1,
			    "address_line_2": addressLine2,
			    "city": city,
			    "postcode": postcode,
			    "country_code": country
		    },
		    "customer_email": email,
		    "customer_phone": phone,
		    "jobs": [{
		    	"assets": ["http://psps.s3.amazonaws.com/sdk_static/1.jpg"],
		    	"template_id": "a2_poster"
		    }]
		  };
 	sendPost(postBody,res);
});

function sendPost(postBody,routerRes) {
   	request.post({
   	url:'https://api.kite.ly/v4.0/print/',
	headers: {"Authorization":"ApiKey xxxx"},
	body: JSON.stringify(postBody)
	}, function(err, res, body){
		if (err) {} //TODO: handle err
		else console.log(body);
		routerRes.render('order', { status: body });
	});
}

module.exports = router;
