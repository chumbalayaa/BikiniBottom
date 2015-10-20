var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.send("Sup bitches");
});

module.exports = {
  router: router
};
