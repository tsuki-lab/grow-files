import cac from 'cac'
import execute from './execute';

const cli = cac();

cli
  .command('[name]', 'Create file for template')
  // TODO: 動的にoutputPathを変更できるように調整した時のオプション
  // .option('-o, --output-dir <path>', 'converted file output path', { default: './' })
  .option('-t, --templates-dir <path>', 'Selected templates dir', { default: './templates' })
  .action(async (name, options) => {
    await execute(name, options)
  });

cli.help();

cli.version('0.0.1');

cli.parse();
