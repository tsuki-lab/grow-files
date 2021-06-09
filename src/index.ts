import cac from 'cac'
import execute, { Options } from './execute';
import { colors } from './colors';

const cli = cac();

cli
  .command('[name]')
  .option('-o, --output-dir <path>', 'selected outputDir', { default: './' })
  .option('-t, --templates-dir <path>', 'Selected templates dir', { default: './templates' })
  .action(async (name, _options) => {

    const options: Options = {
      templatesDir: _options.templatesDir,
      template: '',
      outputDir: _options.outputDir,
      outputFileName: name
    };

    console.log(colors.cyan('Options:'));
    console.log(colors.cyan('- outputDir:', options.outputDir));
    console.log(colors.cyan('- templatesDir:', options.templatesDir));
    if (options.outputFileName) console.log(colors.cyan('- outputFileName:', options.outputFileName));
    console.log('');

    await execute(options);
  });

cli.help();

cli.version('0.1.1');

cli.parse();
