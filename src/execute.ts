import * as fs from 'fs';
import * as path from 'path';
import { prompt, QuestionCollection } from 'inquirer'

type Parameter = {
  outputDir: string;
  fileName: string;
  template: string;
  templatesDir: string
};

type OutputFile = {
  path: string;
  data: string
};

async function inquiry(options: any, questions: QuestionCollection) {
  const cloneOpts = JSON.parse(JSON.stringify(options));
  await prompt(questions).then((answers: any) => {
    if (answers.fileName) cloneOpts.fileName = (answers.fileName as string).replace(' ', '');
    cloneOpts.template = answers.template;
  });
  return cloneOpts;
};

function getReadDirs(dir:  string) {
  return fs.readdirSync(dir).filter(filename => {
    const fullPath = path.join(dir, filename);
    const stats = fs.statSync(fullPath);
    return stats.isDirectory();
  });
};

function getConvertData(templateDir: string, outputDir: string, fileName: string) {
  const templateNames = fs.readdirSync(templateDir).filter(filename => {
    const fullPath = path.join(templateDir, filename);
    const stats = fs.statSync(fullPath);
    return stats.isFile();
  });

  return templateNames.reduce((acc, currentName) => {
    const templatePath = path.join(templateDir, currentName);
    const ext = path.extname(templatePath);
    const data = fs.readFileSync(templatePath, 'utf-8');

    acc.push({
      path: path.join(outputDir, fileName + ext),
      data: data.replace(/\$FILE_NAME/g, fileName)
    });

    return acc;
  }, [] as OutputFile[]);
};

function createFiles(list: OutputFile[]) {
  list.forEach((item) => {
    fs.writeFileSync(item.path, item.data, 'utf-8');
  });
};

export default async (name: string, options: any) => {
  options = {
    ...options,
    outputDir: './', // TODO: 動的にoutputPathを変更できるように調整
    fileName: name
  } as Parameter;

  const _templatesDir = path.join(process.cwd(), options.templatesDir);
  const templates = getReadDirs(_templatesDir);

  const questions = [
    options.fileName === undefined && {
      type: 'input',
      message: "What's file name",
      name: 'fileName',
      default: 'index'
    },
    {
      type: 'list',
      name: 'template',
      message: 'Choose A Template.',
      choices: templates
    }
  ].filter(Boolean);

  const resultOpts: Parameter = await inquiry(options, questions);

  const templateDir = path.join(_templatesDir, resultOpts.template);

  const convertList = getConvertData(templateDir, resultOpts.outputDir, resultOpts.fileName);

  createFiles(convertList);
}