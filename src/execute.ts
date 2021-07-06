import * as path from 'path';
import { prompt, QuestionCollection } from 'inquirer';
import { colors } from './colors';
import { Options } from './interface';
import { Utils } from './utils';

export default async (options: Options): Promise<void> => {
  const templates = Utils.getDirInnerContentNames(options.templatesDir, 'dir');

  if (templates.length < 1) {
    console.error(
      colors.red('Error: Template does not exist from', options.templatesDir)
    );
    process.exit(1);
  }

  const questions = [
    {
      type: 'list',
      name: 'template',
      message: 'Choose a template.',
      choices: templates
    }
  ].filter(Boolean);

  // 対話式質問の実行
  const resultOpts = await inquiry(options, questions);

  const templateDirPath = path.join(options.templatesDir, resultOpts.template);

  const convertList = Utils.getConvertData(
    templateDirPath,
    resultOpts.outputDir,
    resultOpts.outputFileName
  );

  Utils.createDir(convertList[0].path);

  const existFiles = convertList
    .map((v) => Utils.existsContent(v.path))
    .filter(Boolean) as string[];
  const isExistFiles = 0 < existFiles.length;
  if (isExistFiles) {
    const files = existFiles.filter(Boolean);
    const filesStr = files.join(' and ');
    const errorMsg = `Error: The file already exists. Please remove ${filesStr}.`;
    console.error(colors.red(errorMsg));
    process.exit(1);
  }

  Utils.createFiles(convertList);
};

/**
 * 対話式質問
 *
 * @param {Options} options
 * @param {QuestionCollection} questions
 * @return {*}
 */
async function inquiry(
  options: Options,
  questions: QuestionCollection
): Promise<Options> {
  const clone = JSON.parse(JSON.stringify(options)) as Options;

  await prompt(questions).then((answers) => {
    clone.template = answers.template as string;
  });

  return clone;
}
