const express = require('express');
const path =  require('path');
const cheerio = require('cheerio');
const fs = require('fs');
const curl = new (require( 'curl-request' ))();

const router = express.Router();
const app = express();

router.get('/',function(req,res){
  const html = fs.readFileSync(__dirname + '/src/index.html', 'utf8');
  const banner = fs.readFileSync(__dirname + '/dist/banner.html', 'utf8');
  const $ = cheerio.load(html);
  $('.page__banner-slot').append(banner);
  res.send($.html());
});

app.get('/dist/:file', function(req, res) {
  res.sendFile(path.join(__dirname + req.url));
});

app.all('/blackfriday/preparequestions/', function(req, res) {
  res.send({
    "status": "OK",
    "products": {
      "DO005EWHBEA1": {
        "images": [
          "\/D\/O\/DO005EWHBEA1_9684193_1_v1_2x.jpg",
          "\/D\/O\/DO005EWHBEA1_9684194_2_v1_2x.jpg",
          "\/D\/O\/DO005EWHBEA1_9684195_3_v1_2x.jpg",
          "\/D\/O\/DO005EWHBEA1_9684196_4_v1_2x.jpg"
        ],
        "discount": 589.0,
        "price": 5210.0,
        "purchase_count": 15
      },
      "MP002XW0E0EB": {
        "images": [
          "\/M\/P\/MP002XW0E0EB_9801030_1_v1_2x.jpg",
          "\/M\/P\/MP002XW0E0EB_9801031_2_v1_2x.jpg",
          "\/M\/P\/MP002XW0E0EB_9801032_3_v1_2x.jpg"
        ],
        "discount": 0,
        "price": 3599.0,
        "purchase_count": 8
      }
    }
  });
});

router.get('/static', express.static(__dirname + '/public'));

app.use('/', router);
app.listen(3000, function(err) {
  if (err) {
    return console.error(err);
  }
  console.log('Listening at http://localhost:3000/');
});