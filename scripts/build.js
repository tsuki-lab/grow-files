/* eslint-disable @typescript-eslint/no-var-requires */
const { build } = require('esbuild');
const { nodeExternalsPlugin } = require('esbuild-node-externals');

void build({
  entryPoints: ['src/index.ts'],
  outfile: 'dist/bundle.js',
  platform: 'node',
  bundle: true,
  minify: true,
  plugins: [nodeExternalsPlugin()]
});
