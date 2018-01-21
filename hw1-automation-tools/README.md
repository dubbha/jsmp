# React & Redux starter using Webpack 2

Run dev server with live reload
```
npm run dev
```

Build prod dist
```
npm run build
```

Serve http from prod dist [globally installed static serve required]
```
npm install -g static-server
npm run dist
```

Build prod dist and serve http from it
```
npm run build
npm run dist
```

Run ESLint
```
npm run lint
```

Run ESLint in debug mode
```
npm run lint:debug
```

Run ESLint in watch mode
```
npm run lint:watch
```

Run Jest tests
```
npm run test
```

Run Jest tests in watch mode
```
npm run test:watch
```

Run Jest tests coverage
```
npm run coverage
```

Plugins used
```
 1. CaseSensitivePathsPlugin
 2. BannerPlugin
 3. UglifyJsPlugin
 4. CompressionPlugin
 5. DefinePlugin
 6. CommonsChunkPlugin
 7. HtmlWebpackPlugin
 8. ScriptExtHtmlWebpackPlugin
 9. ExtractTextPlugin
10. ProvidePlugin
```

Loaders used
```
 1. babel-loader
 2. eslint-loader
 3. file-loader
 4. awesome-typescript-loader
 5. style-loader
 6. css-loader
 7. postcss-loader
 8. resolve-url-loader
 9. sass-loader
10. raw-loader
```