// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});


// Timestamp Microservice
app.get("/api/timestamp/:date_string", (req, res) => {
  const { date_string } = req.params;
  let date = new Date(date_string);
  
  // Try converting from unix
  if(date.toString() === 'Invalid Date' ) {
    date = new Date(parseInt(date_string))
  }
  
  // If date is invalid, return error
  if(date.toString() === 'Invalid Date' ) {
    return res.json({
      error: 'Invalid Date' 
    })
  } 
  else { // If date is valid, the api returns a JSON including unix and utc values
    return res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    })
  }
});

// If date is empty, the api returns the current date 
app.get('/api/timestamp', (req, res) => {
  const date = new Date();
  
  return res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  })
});


// listen for requests :)
var listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});