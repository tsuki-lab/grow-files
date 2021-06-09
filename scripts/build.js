const { build } = require('esbuild');
const { nodeExternalsPlugin } = require('esbuild-node-externals');

build({
  entryPoints: ['src/index.ts'],
  outfile: 'dist/bundle.js',
  platform: 'node',
  bundle: true,
  minify: true,
  plugins: [nodeExternalsPlugin()]
});