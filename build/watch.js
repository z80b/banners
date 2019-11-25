const watch = require('watch');

function watching() {
  async watch.watchTree(`${cwd}/src`, function (f, curr, prev) {
    console.info('\x1b[34m', 'Changed:', '\x1b[35m', f, '\x1b[0m');
    const css = require('./css.js');
    const html = require('./html.js');
    const cwd   = process.cwd();

    if (f && typeof(f) == 'string' && f.match(/\.styl$/)) {
      await css.build();
      html.build();
    }
    if (f && typeof(f) == 'string' && f.match(/\.html$/)) html.build();
    if (f && typeof(f) == 'string' && f.match(/\.js$/)) html.build();
  });
}

watching();