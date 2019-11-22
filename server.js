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

app.use('/static', express.static(__dirname + '/public'));

app.use('/', router);

app.listen(3000, function(err) {
  if (err) {
    return console.error(err);
  }
  console.log('Listening at http://localhost:3000/');
});