const express = require('express');
const path =  require('path');
const cheerio = require('cheerio');
const fs = require('fs');
const curl = new (require( 'curl-request' ))();

const router = express.Router();
const app = express();

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

app.get('/blackfriday/preparequestions/', function(req, res) {
  const unzip = require('unzip');
  curl
  .setHeaders([
    'Connection: keep-alive',
    'Accept: */*',
    'Origin: https://www.lamoda.ru',
    'X-Requested-With: XMLHttpRequest',
    'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36',
    'DNT: 1',
    'Content-Type: application/x-www-form-urlencoded; charset=UTF-8',
    'Sec-Fetch-Site: same-origin',
    'Sec-Fetch-Mode: cors',
    'Referer: https://www.lamoda.ru/lp/lp_test/',
    'Accept-Encoding: gzip, deflate, br',
    'Accept-Language: ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
    'Cookie: lid=AAAEAF2ffGoaE2TyGY5ZAgA=; csrftoken=oVjeKXuT4r2ExMYAskQM46YAnauQEXuS; _gcl_au=1.1.1112187247.1570743903; _ym_uid=1570743903438652655; _ym_d=1570743903; _ga=GA1.2.1500501399.1570743904; cto_lwid=6e1522ce-4c67-44b5-84f1-194cc9bb779d; _dycnst=dg; _dyid=3463268660479492154; flocktory-uuid=5a7a681c-22c1-47d0-a9ae-fc45726d9c5f-6; _dy_c_att_exps=; modern_es=1; _dy_c_exps=; is_synced=true; LMDA=is_lme=false:currentDeliveryInfoAoid=5300100015500:retina=x2; gd_aoid=5300100015500; gd_aoid_reg=5300000000000; wt_cdbeid=1; wt3_eid=%3B717012440280310%7C2157074390392862970%232157411170689379583; wt3_sid=%3B717012440280310; wt_rla=717012440280310%2C1%2C1574111706891; _gid=GA1.2.1905134558.1574111707; _dc_gtm_UA-20431685-1=1; tmr_detect=1%7C1574111710140; _ym_isad=1; _dy_csc_ses=t; _dy_ses_load_seq=73322%3A1574111711544; _gat_UA-20431685-1=1; _dyjsession=785b196f5b4141f4b701e7f2aa9b962d; _dycst=dk.l.c.ss.; _dy_geo=RU.EU.RU_.RU__; _dy_df_geo=Russia..; _dy_toffset=-2; _dy_soct=391460.663403.1574111711*403865.693618.1574111711*430239.776969.1574111711*432647.762653.1574111711*439391.777991.1574111711*157448.223326.1574111711*437061.772164.1574111711*9285.11496.1574111716; _dy_tabcount=0',
    'Content-Encoding: gzip',
  ])
  .setBody({
    'sku1': 'MA002EWGWBR3',
    'sku2': 'SP014EWGCQH0',
    'bestseller': '1',
  })
  .post('https://www.lamoda.ru/blackfriday/preparequestions/')
  .then(({statusCode, body, headers}) => {
      //res.setHeaders(headers);
      res.send(body);
  })
  .catch((e) => {
      console.log(e);
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