const express = require('express');
const request = require('request');
const app = express();
const port = process.env.PORT || 3000;

require('dotenv').config();

app.set('view engine', 'ejs');
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.render('index');
})

// Result route
app.get('/results', (req, res) => {
    let cityId = req.query.id;
    let url = 'http://api.openweathermap.org/data/2.5/forecast?id=' + cityId + '&APPID=' + process.env.API_KEY;
    request(url, (error, response, body) => {
      if(!error && response.statusCode == 200) {
        let data = JSON.parse(body);
        res.render('results', {data: data});
      } else {
          res.send("Something went wrong.");
      }
    })
  }
);

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});