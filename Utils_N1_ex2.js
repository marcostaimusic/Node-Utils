var writingFunction = require('fs');

writingFunction.appendFile('archivo.txt', ' Mi nombre es writingFunction', function (err) {
  if (err) throw err;
});