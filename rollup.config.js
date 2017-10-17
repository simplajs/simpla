// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import replace from 'rollup-plugin-replace';
import ownPackage from './package.json';

const debugging = process.argv.includes('--debug');

let plugins = [
  babel(),
  resolve(),
  replace({
    VERSION: JSON.stringify(ownPackage.version)
  })
];

if (!debugging) {
  plugins.push(uglify());
}

export default [{
  input: 'src/index.js',
  output: {
    file: 'simpla.min.js',
    format: 'umd',
    name: 'Simpla'
  },
  plugins
}, {
  input: 'src/adapters/netlify.js',
  output: {
    file: './adapters/netlify.js',
    format: 'umd',
    name: 'SimplaNetlify'
  },
  plugins
}];
