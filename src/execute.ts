import * as fs from 'fs';
import * as path from 'path';
import { prompt, QuestionCollection } from 'inquirer';
import { colors } from './colors';

export type Options = {
  templatesDir: string;
  template: string;
  outputDir: string;
  outputFileName: string;
};

type OutputFile = {
  path: string;
  data: string;
};

export default async (options: Options) => {
  const templates = getReadDirs(options.templatesDir);

  const questions = [
    !options.outputFileName && {
      type: 'input',
      message: "What's outputFileName.",
      name: 'outputFileName',
      default: 'index'
    },
    {
      type: 'list',
      name: 'template',
      message: 'Choose a template.',
      choices: templates
    }
  ].filter(Boolean);

  const resultOpts = await inquiry(options, questions);

  const templateDirPath = path.join(options.templatesDir, resultOpts.template);

  const convertList = getConvertData(
    templateDirPath,
    resultOpts.outputDir,
    resultOpts.outputFileName
  );

  createDir(convertList);

  console.log(''); // 空間開け

  const existFiles = getExistFiles(convertList);
  const isExistFiles = 0 < existFiles.length;
  if (isExistFiles) {
    const errorMsg = `Error: The file already exists. Please remove ${existFiles.reduce(
      (acc, crr) => (acc ? `${acc} and "${crr}"` : `"${crr}"`),
      ''
    )}.`;
    console.error(colors.red(errorMsg));
    process.exit(1);
  }

  createFiles(convertList);
};

async function inquiry(options: Options, questions: QuestionCollection) {
  const clone: Options = JSON.parse(JSON.stringify(options));

  await prompt(questions).then((answers: any) => {
    if (answers.outputFileName) clone.outputFileName = answers.outputFileName;
    clone.template = answers.template;
  });

  return clone;
}

function getReadDirs(dir: string) {
  return fs.readdirSync(dir).filter((filename) => {
    const fullPath = path.join(dir, filename);
    const stats = fs.statSync(fullPath);
    return stats.isDirectory();
  });
}

function getConvertData(
  templateDir: string,
  outputDir: string,
  fileName: string
) {
  const templateNames = fs.readdirSync(templateDir).filter((filename) => {
    const fullPath = path.join(templateDir, filename);
    const stats = fs.statSync(fullPath);
    return stats.isFile();
  });

  return templateNames.reduce((acc, currentName) => {
    const templatePath = path.join(templateDir, currentName);

    const templatePathArr = templatePath.split('/');
    const templateFileName = templatePathArr[templatePathArr.length - 1];
    const index = templateFileName.indexOf('.');
    const ext = templateFileName.substring(index);

    const data = fs.readFileSync(templatePath, 'utf-8');

    acc.push({
      path: path.join(outputDir, fileName + ext),
      data: data.replace(/\$FILE_NAME/g, fileName)
    });

    return acc;
  }, [] as OutputFile[]);
}

function createDir(list: OutputFile[]) {
  const outputDirPath = list[0].path
    .split('/')
    .filter((_, i, arr) => i !== arr.length - 1)
    .join('/');
  if (outputDirPath) {
    fs.mkdirSync(outputDirPath, { recursive: true });
  }
}

function getExistFiles(list: OutputFile[]) {
  return list
    .map((v) => v.path)
    .map((path) => fs.existsSync(path) && path)
    .filter((v) => v);
}

function createFiles(list: OutputFile[]) {
  list.forEach((file) => {
    fs.writeFileSync(file.path, file.data, 'utf-8');
    console.log(colors.green('✨  Create file', file.path));
  });
}
