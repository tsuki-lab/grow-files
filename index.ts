import cac from 'cac'
import execute from './execute';

const cli = cac();

// TODO: 動的にoutputPathを変更できるように調整した時のオプション
// cli.option('-o, --output-dir <path>', 'converted file output path', { default: './' });

cli
  .command('execute [name]', 'Create file for template')
  .action(async (name, options) => {
    await execute(name, options)
  });

cli.help();

cli.version('0.0.1');

cli.parse();
