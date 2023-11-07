# Creating a boilerplate

### Usage
Clone the react-18-boilerplate repository to the specified directory.
If no directory is provided, it will clone the repository to the current working directory.
```
$ create-react-ank [directory]
```



Creating a clone of ankith's react boiler plate

```
$ npm init
--------------------------------------------------------------------------
{
  "name": "create-react-ank",
  "version": "1.0.1",
  "description": "Creating a clone of ankith's react boiler plate",
  "main": "create-react-ank.js",
  "bin": {
    "create-react-ank": "create-react-ank.js"
  },
  "scripts": {
    "test": "test"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/ankithg03/create-react-ank.git"
  },
  "keywords": [
    "react",
    "create",
    "app",
    "react-v18"
  ],
  "author": "Ankith G",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/ankithg03/create-react-ank/issues"
  },
  "homepage": "https://github.com/ankithg03/create-react-ank#readme"
}

```

## Publishing the package

```
$ npm publish
```
**Note:** Once there is any changes we have to update the package.json with the new version and also push the changes