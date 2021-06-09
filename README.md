# Grow Files

## How to use

### Ready template
```shell
# execute <projectRootDir>
mkdir templates
cd templates
mkdir <templateName>
echo 'console.log("Hello $FILE_NAME");' > <templateName>/'$FILE_NAME'.js
```

### Use Glow Files
```shell
npx grow-files <name>
# options
# -o outputDir (default: ./)
# -t templatesDir (default: ./templates)
```

## Development

### Install package
```shell
yarn install
```

### Debug
```shell
yarn debug
```

### Build for prod
```shell
yarn build
```

### Builded Debug
```shell
yarn execute
```