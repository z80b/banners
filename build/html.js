const cwd     = process.cwd();
const args    = require('yargs').argv;
const cheerio = require('cheerio');
const fs      = require('fs');

console.log('Start build html...');

const html = fs.readFileSync(cwd + '/src/index.html', 'utf8');
const banner = fs.readFileSync(cwd + '/src/banner.html', 'utf8');
const $ = cheerio.load(html);
const output = args.output || 'dist/banner.html';

$('.page__banner-slot').append(banner);

fs.writeFile(`${cwd}/${output}`, $.html(), {
  encoding: "utf8",
  flag: "a"
}, (fsError) => {
  if (fsError) console.log(fsError);
  console.log('Finish build html...');
})