# gulpfile-example
Gives an example Gulpfile for a frontend project using ReactJS, BrowserSync, and others.

This will also automatically bundle all libs into a separate js from your main.js for faster dev recompilations.

Most useful tasks included:

1. clean - ... cleans the dist folder.. Who'da thought?
2. dist - distributes all the static files, compiles sass files and bundles javascript files
3. serve (default) - runs the dist command and then starts up browser sync with the files from the dist directory. Starts watching the files and auto compiles/redistributes the files and reloads browser.

# Setup
```bash
$ npm install
```

This will download all the depedencies, copy the default developer config file and create the symlinks for any scss vendors for the project.

Since we create symlinks in the postinstall.js, you need to run this in an administrator terminal on Windows. Or if you still don't have the ability to create symlinks, copy the vendor folders manually.

> View/edit **scripts/postinstall.js** for any scss vendors.

# Examples
To distribute all the files and start browsersync for development mode, you can just run `gulp`.

To distribute all the files for production, add `--production` to your command.

```bash
$ gulp dist --production
```

> Any command can be _productionified_ by adding `--production`

The production build will also replace all occurences of `.css`, `.js` with `.min.css` and `.min.js` (respectively) in html files.

#Project Layout
```
dist/
|--- index.html
|--- css/
|    |--- main.css
|--- fonts/
|--- imgs/
|--- js/
|    |--- libs.js
|    |--- main.js
src/
|---
|    index.html
|    js/
|     |--- main.js        // Entry point for browserify
|    scss/
|    |--- main.scss       // Entry point for scss
|    |--- components/
|    |    |--- _person.scss
|    |--- helpers/
|    |    |--- _animations.scss
|    |    |--- _mixins.scss
|    |    |--- _variables.scss
|    |--- layout/
|    |    |--- _content.scss
|    |    |--- _footer.scss
|    |    |--- _header.scss
|    |--- pages/
|    |    |--- _home.scss
|    |--- vendors/        // Contains symlinks to any external css/scss folder
|    |    |--- bootstrap/
|    |    |--- font-awesome/
|    |    |--- react-buttons/
|    |    |--- react-dd-menu/
```
