# gulpfile-example
Gives an example Gulpfile for a frontend project using ReactJS, BrowserSync, and others.

This will also automatically bundle all libs into a separate js from your main.js for faster dev recompilations.

Most useful tasks included:

1. clean - ... cleans the dist folder.. Who'da thought?
2. dist - distributes all the static files, compiles sass files and bundles javascript files
3. serve (default) - runs the dist command and then starts up browser sync with the files from the dist directory. Starts watching the files and auto compiles/redistributes the files and reloads browser.

# Setup
```bash
npm install
```

This will download all the depedencies, copy the default developer config file and create the symlinks for any scss vendors for the project.

> View/edit **scripts/postinstall.js** for any scss vendors.

##### Source Files
By default, the location of all your src files is initially set to `./src/app`. This can be changed at ~line 20.

##### Main
The default main file is `main.js`.

##### Statics
On line 27, you can define the file endings you want to consider for static files.

##### External Modules
Starting around line 33, you can define the list of external modules that should be included in your `3rdparty.js` file.

# Examples
To distribute all the files and start browsersync for development mode, you can just run `gulp`.

To distribute all the files for production, add `--production` to your command.

```bash
gulp dist --production
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
|--- app/
|    |--- index.html
|    |--- js/
|    |     |--- main.js        // Entry point for browserify
|    |--- scss/
|    |    |--- main.scss       // Entry point for scss
|    |    |--- components/
|    |    |    |--- _buttons.scss
|    |    |--- helpers/
|    |    |    |--- _animations.scss
|    |    |    |--- _mixins.scss
|    |    |    |--- _variables.scss
|    |    |--- layout/
|    |    |    |--- _content.scss
|    |    |    |--- _footer.scss
|    |    |    |--- _header.scss
|    |    |--- pages/
|    |    |    |--- _home.scss
|    |    |--- vendors/        // Contains symlinks to any external css/scss folder
|    |    |    |--- bootstrap/
|    |    |    |--- font-awesome/
|    |    |    |--- normalize-scss-vanilla/
```
