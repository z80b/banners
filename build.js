export default function (options = {}) {
  const compiledCache = {};
  
  return {
    name: 'rollup-plugin-banner',
    /** Kind: async, first */
    resolveId(importee, importer) {
      if (compiledCache[importee]) return importee
    },
    /** Kind: async, first */
    load(id) {
      if (compiledCache[id]) return compiledCache[id]
    },
    /** Kind: async, sequential */
    transform(code, id) {
      console.log('Builder:', this);
    }
  }
}