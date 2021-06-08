import * as fs from 'fs';
import * as path from 'path';
import cac from 'cac'
import { prompt } from 'inquirer'
import { QUESTIONS } from './constant';

(async() => {
  const cli = cac()

  cli.help()

  cli
    .option('-o, --output-path [path]', 'converted file output path', {
      default: './'
    });

  const parsed = cli.parse();

  const options = {
    fileName: parsed.args[0],
    ...parsed.options
  };

  await inquirer(options);

  console.log(options);
  console.log(path.join(__dirname));

  const data = fs.readFileSync('./templates/static-page/sample.html', 'utf-8');
  const result = data.replace(/\$FILE_NAME/g, options.fileName);

  fs.writeFileSync(`./${options.fileName}.html`, result, 'utf-8');
})();

async function inquirer(options: any) {
  if (options.fileName === undefined) {
    await prompt(QUESTIONS.FILE_NAME).then((answers: any) => {
      options.fileName = (answers.fileName as string).replace(' ', '');
    })
  }
};
