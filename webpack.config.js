module.exports = {
  "entry": "./src/es6/main.js",
  "output": {
    "path": "./src/js",
    "filename": "noddypoints.js"
  },
  "module": {
    "loaders": [
      {
        "es6": "src/es6",
        "loader": "babel-loader"
      }
    ]
  },
  "resolve": {
    "extensions": ["", ".js", ".min.js"],
    "modulesDirectories": ["./src/dist/js", "./node_modules"],
  }
};
