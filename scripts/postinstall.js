var fs = require('fs'),
    path = require('path');

const VENDORS = './src/scss/vendors';
const CONFIG = './config';
const DEV_CONFIG = CONFIG + '/gulp-dev-config';
const JSON = '.json';
const JS = '.js';


function createLink(link, name, isNotNode) {
  var prefix = isNotNode ? '.' : './node_modules';
  return {
    source: prefix + '/' + link,
    target: (isNotNode ? './node_modules' : VENDORS) + '/' + name,
    type: 'dir',
    name: name,
  };
}

const LINKS = [
  createLink('src/js', 'example', true),
  createLink('react-dd-menu/src/scss', 'react-dd-menu'),
  createLink('react-buttons/src/scss', 'react-buttons'),
  createLink('font-awesome/scss', 'font-awesome'),
  createLink('bootstrap-sass/assets/stylesheets', 'bootstrap'),
];

console.log('Creating symlinks for:\n%s\n', LINKS.map(function(link) { return link.name; }).join(', '));
LINKS.forEach(function(link) {
  var source = path.resolve(link.source);
  var target = path.resolve(link.target);

  if(fs.existsSync(target) && fs.lstatSync(target).isSymbolicLink()) {
    fs.unlinkSync(target);
  }

  try {
    fs.symlinkSync(source, target, link.type);
  } catch(e) {
    if(e.code == 'EPERM') {
      console.error('SYMLINK ERR! You must run this as administrator in Windows to create symlinks.');
      console.error('SYMLINK ERR! Run \'npm install\' again once you open an admin terminal');
      this.process.exit(1);
    } else {
      throw e;
    }
  }
});
console.log('Symlinks have been create successfully.');


/**
 * Attempts to copy a src file to a dest file. If the file already exists,
 * it does not copy.
 *
 * The file naming scheme was 'SomeFile.js.example', so if this changes, this function
 * needs to be updated
 *
 * @param file the file
 * @param fileEnding the file ending
 * @param completedMsg the message to display when completed. Optional
 */
function attemptFileCopy(file, fileEnding, completedMsg) {
  var srcFile = file + fileEnding + '.example';
  var destFile = file + fileEnding;
  if(fs.existsSync(destFile)) {
    return;
  }

  fs.createReadStream(path.resolve(srcFile))
    .pipe(fs.createWriteStream(destFile))
    .on('error', function(err) {
      console.error(err.message);
      throw err;
    });
  completedMsg && console.log(completedMsg);
}


attemptFileCopy(DEV_CONFIG, JSON, "Your configuration file has been copied with the defaults as '" + DEV_CONFIG + JSON + "'");
