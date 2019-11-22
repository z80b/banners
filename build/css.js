const stylus       = require('stylus');
const axis         = require('axis');
const autoprefixer = require('autoprefixer-stylus');
const cwd          = process.cwd();
const args         = require('yargs').argv;
const fs           = require('fs');

const styl = fs.readFileSync(cwd + '/src/css/index.styl', 'utf8');
const sourceMap = args.mode != 'production' ? { inline: true } : false;

function build() {
  console.log('Start stylus builder...');
  return stylus(styl)
    .set('paths', [`${cwd}/src/css`, `${cwd}/src/css/copmonents`])
    .set('filename', `${cwd}/${args.output}`)
    .set('compress', (args.mode == 'production'))
    .set('include css', true)
    // .set('sourcemap', (args.mode != 'production') ? {inline: true} : false)
    .set('sourcemap', sourceMap)
    .define('inline-image', stylus.url())
    .use(axis())
    .use(autoprefixer())
    .render((err, css) => {
      fs.writeFile(`${cwd}/tmp/index.css`, css, (fsError) => {
        if (fsError) console.log(fsError);
        console.log('Finish stylus builder.');
      })
    });
}

module.exports = { build };