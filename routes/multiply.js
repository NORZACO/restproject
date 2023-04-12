// // routes/multiply.js:
// var express = require('express');
// var router = express.Router();

// router.get('/:number1/:number2', function(req, res, next) {
//   res.status(200).json(parseInt(req.params.number1) * parseInt(req.params.number2));
// });

// module.exports = router;

var express = require('express');
var router = express.Router();

// Route for multiplying two numbers
router.get('/:multiplicand/:multiplier', function(req, res, next) {
  // Parse the values of the parameters and handle errors
  var multiplicand = parseInt(req.params.multiplicand);
  var multiplier = parseInt(req.params.multiplier);
  if (isNaN(multiplicand) || isNaN(multiplier)) {
    res.status(400).json({ error: 'Invalid parameters' });
    return;
  }

  // Multiply the values and send the result as a JSON response
  var result = multiplicand * multiplier;
  res.status(200).json({ result : result });
});

module.exports = router;
