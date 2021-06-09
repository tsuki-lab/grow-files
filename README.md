# Grow Files

## How to use

```shell
grow-files <name>
# options
# -t templatesDir (default: ./templates)
```

### ready template
```shell
# execute <projectRootDir>
mkdir templates
cd templates
mkdir test
echo 'console.log("Hello $FILE_NAME");' > <templateName>/'$FILE_NAME'.js
```

## development

### install package
```shell
yarn install
```

### build for prod
```shell
yarn build
```