
const css = require('./css.js');
const html = require('./html.js');
const watch = require('watch');
const cwd   = process.cwd();

watch.watchTree(`${cwd}/src`, function (f, curr, prev) {
  if (typeof f == "object" && prev === null && curr === null) {
    // Finished walking the tree
  } else if (prev === null) {
    // f is a new file
  } else if (curr.nlink === 0) {
    // f was removed
  } else {
    // f was changed
    console.info('\x1b[34m', 'Changed:', '\x1b[35m', f, '\x1b[0m');
    if (f.match(/\.styl$/)) css.build();
    if (f.match(/\.html$/)) html.build();
  }
})