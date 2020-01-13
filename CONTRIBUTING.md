# Contributing

## Building
The project can be build using the command:
```
npm run build
```
the files will be outputed to the `lib\` directory.
You can also test to see if the build will work with the command (no outputed files)
```
npm run build:check
```

## Running Locally
You will need an existing react-native application in order to test locally. You will also want to install `wml` (https://www.npmjs.com/package/wml) in order to copy your changes over to your app (npm link does not work with the metro bundler)

After creating one, the easiest way to test your changes is:
1. `cd react-native-fundamental-components`
1. `npm run build`
1. `wml add /path/to/react-native-fundamental-components/lib /path/to/your/app/node_modules/@evenset/react-native-fundamentals/lib`
1. `wml start`
1. Make any changes you want to this library and then run `npm run build`
1. Refresh your app using the built-in react-native refresh menu

### Troubleshooting
wml may run into issues with capital letters inside the specified paths. If so, try renaming your path to only contain lowercase.
