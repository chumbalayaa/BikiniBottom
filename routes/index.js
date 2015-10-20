var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  console.log("hi");
	res.render('../views/home.ejs');
});

module.exports = router;
