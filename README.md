<br>
<p align="center">
<b>Node.js CLI convert and generate tool for template file 🥂</b>
</p>

# grow-files

Node.js CLI convert and generate tool for template file

## Usage

### Set up

```bash
npm install -g grow-files
grow-files <path>

# Create if not
# ✨  Created TemplatesDir!! Let's create a template in the created directory. - <HomeDir>/.grow-files/templates
```

Create `template` _HomeDir_/.grow-files/templates

```
<HomeDir>
┗ .grow-files
  ┗ templates
    ┗ module
      ┗ $FILE_NAME.spec.ts
      ┗ $FILE_NAME.ts
```

```ts
// HomeDir/.grow-files/templates/module/$FILE_NAME.spec.ts

import { $FILE_NAME } from './$FILE_NAME';

describe('Test the $FILE_NAME.', () => {
  test('Test the example method response to undefined.', () => {
    const resp = $FILE_NAME.example();
    expect(resp).toBe(undefined);
  });
});
```

```ts
// HomeDir/.grow-files/templates/module/$FILE_NAME.ts

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
  public static example() {}
}
```

### Execute

```bash
grow-files ./src/modules/StringModule
# grow-files <path>

# templates/ 配下に配置したディレクトリの名前一覧が表示されます。
# そのうちの一つを選択します。
? Choose a template.
```

```ts
// src/modules/StringModule.spec.ts

import { StringModule } from './StringModule';

describe('Test the StringModule.', () => {
  test('Test the example method response to undefined.', () => {
    const resp = StringModule.example();
    expect(resp).toBe(undefined);
  });
});
```

```ts
// src/modules/StringModule.ts

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
  public static example() {}
}
```

## License

MIT License © 2021 hanetsuki
