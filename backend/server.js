var express = require('express');
var fs = require('fs');

var app = express();
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies

let solutions = {};


app.post('/level/:levelNumber', function (req, resp) {
  let levelNumber = req.params.levelNumber;
  let password = req.body.password;

  //resp.send(`You requested Level ${levelNumber} with password ${password}`);

  if (solutions[`level_${levelNumber}`] && solutions[`level_${levelNumber}`].indexOf(password) > -1) {
    fs.readFile(`level/level${levelNumber}.html`, 'utf8', function (err, contents) {
      if (err) { console.log(err); }
      let answer = { status: "success", html: contents };

      resp.send(contents);
    });
  }
  else {
    let answer = { status: "denied" };
    resp.send(answer);
  }

});

fs.readFile(`backend/solutions.json`, 'utf8', function (err, contents) {
  if (err) { console.log(err); }
  solutions = JSON.parse(contents);

  //Start Server
  app.listen(2345, function () {
    console.log('Curly-Potato Solution Server listening on port 2345!');
  });

});

