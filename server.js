const express = require('express');
const path =  require('path');
const cheerio = require('cheerio');
const fs = require('fs');

const router = express.Router();
const app = express();

// app.use(require('webpack-dev-middleware')(compiler, {
//   publicPath: __dirname,
//   historyApiFallback: true,
//   mode: 'development'
// }));

router.get('/',function(req,res){
  const html = fs.readFileSync(__dirname + '/src/index.html', 'utf8');
  const banner = fs.readFileSync(__dirname + '/src/banner.html', 'utf8');
  const $ = cheerio.load(html);
  $('.page__banner-slot').append(banner);
  res.send($.html());

});

app.get('/dist/:file', function(req, res) {
  res.sendFile(path.join(__dirname + req.url));
});
//router.get('/dist', express.static(__dirname + '/dist'));
router.get('/static', express.static(__dirname + '/public'));

// app.use('/static', express.static(__dirname + '/public'));
app.use('/', router);
app.listen(3000, function(err) {
  if (err) {
    return console.error(err);
  }

  console.log('Listening at http://localhost:3000/');
});