// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
import buble from 'rollup-plugin-buble';
import uglify from 'rollup-plugin-uglify';
import replace from 'rollup-plugin-replace';
import ownPackage from './package.json';

const debugging = process.argv.includes('--debug');
const entries = [{
  input: 'src/index.js',
  output: 'simpla.min.js',
  name: 'Simpla',
}, {
  input: 'src/adapters/netlify.js',
  output: 'adapters/netlify.js',
  name: 'SimplaNetlify'
}, {
  input: 'src/mixins/element.js',
  output: 'mixins/element.js',
  name: 'SimplaElement'
}];

let plugins = [
  buble({
    exclude: [ 'node_modules/**' ]
  }),
  resolve(),
  replace({
    VERSION: JSON.stringify(ownPackage.version)
  })
];

if (!debugging) {
  plugins.push(uglify());
}

export default entries.map(({ input, output: file, name }) => {
  return {
    output: { format: 'umd', file, name },
    input,
    plugins
  };
});