<br>
<p align="center">
<b>Node.js CLI convert and generate tool for template file 🥂</b>
</p>

# grow-files

Node.js CLI convert and generate tool for template file

# Usage

## Introduction

```shell
yarn add -D grow-files
```

package.json の scripts にコマンドを記載します。

```
"scripts": {
  "grow-files": "grow-files -t ./templates"
}
```

## Prepare the template

プロジェクトルートに`templates`ディレクトリを作成します。
（-t オプションの値を変更することでフォルダを指定可能）

今回は、サンプルに`$FILE_NAME.spec.ts`と`$FILE_NAME.ts`を用意しました。

```
<projectRootDir>
┗ templates/
   ┗ module/
      ┗ $FILE_NAME.spec.ts
      ┗ $FILE_NAME.ts
```

```$FILE_NAME.spec.ts
import { $FILE_NAME } from './$FILE_NAME';

describe('Test the $FILE_NAME.', () => {
  test('Test the example method response to undefined.', () => {
    const resp = $FILE_NAME.example();
    expect(resp).toBe(undefined);
  });
})
```

```$FILE_NAME.ts
/**
 * class methods name: $FILE_NAME
 *
 * @export
 * @class $FILE_NAME
 */
export class $FILE_NAME {
  /**
   * example class method
   *
   * @static
   * @memberof $FILE_NAME
   */
  public static example() {

  };
}
```

## Execute

```shell
yarn grow-files -o ./src/modules/ StringModule

# templates/ 配下に配置したディレクトリの名前一覧が表示されます。
# そのうちの一つを選択します。
? Choose a template.
```

```src/modules/StringModule.spec.ts
import { StringModule } from './StringModule';

describe('Test the StringModule.', () => {
  test('Test the example method response to undefined.', () => {
    const resp = StringModule.example();
    expect(resp).toBe(undefined);
  });
})
```

```src/modules/StringModule.ts
/**
 * class methods name: StringModule
 *
 * @export
 * @class StringModule
 */
export class StringModule {
  /**
   * example class method
   *
   * @static
   * @memberof StringModule
   */
  public static example() {

  };
}
```

# Development Commands

## Install package

```shell
yarn install
```

## Debug for TypeScript

```shell
yarn debug
```

## Bundle for prod

```shell
yarn build
```

## Debug for Bundled

```shell
yarn execute
```

## License

MIT License © 2021 hanetsuki
