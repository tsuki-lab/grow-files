import * as fs from 'fs';
import * as path from 'path';
import { colors } from './colors';
import { OutputFile } from './interface';

export class Utils {
  /**
   * 引数の階層を作成する
   *
   * @static
   * @param {string} path
   * @memberof Utils
   */
  public static createDir(path: string): void {
    const outputDirPath = path
      .split('/')
      .filter((_, i, arr) => i !== arr.length - 1)
      .join('/');
    if (outputDirPath) {
      fs.mkdirSync(outputDirPath, { recursive: true });
    }
  }

  /**
   * 引数に渡されたファイルを作成する
   *
   * @static
   * @param {OutputFile[]} list
   * @memberof Utils
   */
  public static createFiles(list: OutputFile[]): void {
    list.forEach((file) => {
      fs.writeFileSync(file.path, file.data, 'utf-8');
      console.info(colors.green('✨  Create file', file.path));
    });
  }

  /**
   * 引数のディレクトリpath内部に存在するディレクトリ一覧を返す
   *
   * @static
   * @param {string} dir
   * @return {*}  {string[]}
   * @memberof Utils
   */
  public static getDirInnerContentNames(
    dir: string,
    type: 'dir' | 'file'
  ): string[] {
    return fs.readdirSync(dir).filter((filename) => {
      const fullPath = path.join(dir, filename);
      const stats = fs.statSync(fullPath);
      switch (type) {
        case 'dir':
          return stats.isDirectory();
        case 'file':
          return stats.isFile();
      }
    });
  }

  /**
   * ファイルの存在確認
   *
   * @static
   * @param {string} path
   * @return {*}  {string|false}
   * @memberof Utils
   */
  public static existsContent(path: string): string | false {
    return fs.existsSync(path) && path;
  }

  /**
   * 引数の情報からoutputするための配列を作成する
   *
   * @static
   * @param {string} templateDir
   * @param {string} outputDir
   * @param {string} fileName
   * @return {*}  {OutputFile[]}
   * @memberof Utils
   */
  public static getConvertData(
    templateDir: string,
    outputDir: string,
    fileName: string
  ): OutputFile[] {
    // テンプレートファイルの名前一覧を取得する。
    const templateNames = this.getDirInnerContentNames(templateDir, 'file');

    return templateNames.reduce((acc, currentName) => {
      const templatePath = path.join(templateDir, currentName);

      // templateのファイル名取得
      const templatePathArr = templatePath.split('/');
      const templateFileName = templatePathArr[templatePathArr.length - 1];

      // 拡張子の取得
      const index = templateFileName.indexOf('.');
      const ext = templateFileName.substring(index);

      // テンプレート情報を抽出する
      const data = fs.readFileSync(templatePath, 'utf-8');

      // 配列にoutput情報を追加する
      acc.push({
        path: path.join(outputDir, fileName + ext),
        data: data.replace(/\$FILE_NAME/g, fileName)
      });

      return acc;
    }, [] as OutputFile[]);
  }
}
