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


### Using WML
After creating one, the easiest way to test your changes is:
1. `cd react-native-fundamental-components`
1. `npm run build`
1. `wml add /path/to/react-native-fundamental-components/lib /path/to/your/app/node_modules/@evenset/react-native-fundamentals/lib`
1. `wml start`
1. Make any changes you want to this library and then run `npm run build`
1. Refresh your app using the built-in react-native refresh menu

### Using build scripts:
1. In the `package.json` add or update path to `react-native-fundamental-components/lib` and path to `app/node_modules/@evenset/react-native-fundamentals/lib` for scripts `move-lib` and `rm-lib`
2. Run `npm install` in your `app/`
3. `npm run build-lib`


### Troubleshooting
- wml may run into issues with capital letters inside the specified paths. If so, try renaming your path to only contain lowercase.

- wml occasionally crashes and/or caches wrongly, to reset:
```
# remove all wml links
wml rm all

# reset watchman
watchman watch-del-all

# clean up node_modules and reinstall dependencies
rm -rf ./node_modules
npm install

# now re-add your wml links
```
