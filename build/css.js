const stylus       = require('stylus');
const axis         = require('axis');
const autoprefixer = require('autoprefixer-stylus');
const cwd          = process.cwd();
const args         = require('yargs').argv;
const fs           = require('fs');

const styl = fs.readFileSync(cwd + '/' + args.input, 'utf8');
const sourceMap = args.mode != 'production' ? { inline: true } : false;

console.log('Start stylus builder...');

stylus(styl)
  .set('paths', [`${cwd}/src/css`, `${cwd}/src/css/copmonents`])
  .set('filename', `${cwd}/${args.output}`)
  .set('compress', (args.mode == 'production'))
  .set('include css', true)
  // .set('sourcemap', (args.mode != 'production') ? {inline: true} : false)
  .set('sourcemap', sourceMap)
  .define('inline-image', stylus.url())
  .use(axis())
  .use(autoprefixer())
  .watch()
  .render((err, css) => {
    fs.writeFile(`${cwd}/${args.output}`, css, (fsError) => {
      if (fsError) console.log(fsError);
      console.log('Finish css create');
    })
  });