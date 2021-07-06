import * as fs from 'fs';
import cac from 'cac';
import execute from './execute';
import { colors } from './colors';
import { Options } from './interface';
import { Utils } from './utils';

const cli = cac();

cli
  .command('<path>', 'required <path>')
  .option('-t, --templates-dir <path>', 'Selected templates dir', {
    default: `${process.env.HOME as string}/.grow-files/templates`
  })
  .action(async (path: string, _options: Record<string, string>) => {
    const outputDir = path.split('/');
    const name = outputDir.pop();

    const options: Options = {
      templatesDir: _options.templatesDir,
      template: '',
      outputDir: outputDir.join('/') || '/',
      outputFileName: name || 'index'
    };

    console.info(colors.cyan('Options:'));
    console.info(colors.cyan('- templatesDir:', options.templatesDir));

    // templatesフォルダの存在確認なければ作成
    mkdirSyncTemplateDir(options);

    console.info(colors.cyan('- outputDir:', options.outputDir));
    console.info(
      colors.cyan('- outputFileName:', options.outputFileName, '\n')
    );

    await execute(options);
  });

cli.help();

cli.version('0.2.1');

cli.parse();

/**
 * templatesフォルダの存在確認なければ作成
 *
 * @param {Options} options
 */
function mkdirSyncTemplateDir(options: Options): void {
  const existsRes = Utils.existsContent(options.templatesDir);
  if (!existsRes) {
    fs.mkdirSync(options.templatesDir, { recursive: true });

    console.info(
      colors.green(
        "\n✨  Created TemplatesDir!! Let's create a template in the created directory. -",
        options.templatesDir
      )
    );
    process.exit(0);
  }
}
