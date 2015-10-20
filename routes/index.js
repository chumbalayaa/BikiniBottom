var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  console.log("hi");
	res.sendFile('index.ejs');
});

module.exports = router;
