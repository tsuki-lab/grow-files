import { build } from 'esbuild';
import { nodeExternalsPlugin } from 'esbuild-node-externals';

void build({
  entryPoints: ['src/index.ts'],
  outfile: 'dist/bundle.js',
  platform: 'node',
  bundle: true,
  minify: true,
  plugins: [nodeExternalsPlugin()]
});
