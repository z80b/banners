const cwd     = process.cwd();
const args    = require('yargs').argv;
const fs      = require('fs');

console.log('Start build html...');

function build() {
  const banner = fs.readFileSync(cwd + '/src/html/banner.html', 'utf8');
  const styles = fs.readFileSync(cwd + '/tmp/index.css', 'utf8');
  const script = fs.readFileSync(cwd + '/tmp/index.js', 'utf8');
  const output = args.output || 'dest/banner.html';
  const result = `<style>\n${styles}\n</style>\n${banner}\n<script>\n${script}\n</script>`;


  fs.writeFile(`${cwd}/${output}`, result, {
    encoding: "utf8",
  }, (fsError) => {
    if (fsError) console.log('fsError:', fsError);
    console.log('Finish build html...');
  })
}

module.exports = { build };