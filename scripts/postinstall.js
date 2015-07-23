var fs = require('fs'),
    path = require('path');

var VENDORS = 'src/app/scss/vendors';
var CONFIG = '../gulp-dev-config.json';

try {
  require.resolve(CONFIG);
} catch(err) {
  console.log('Copying the example dev config file.\n');
  fs.createReadStream(CONFIG + '.example')
    .pipe(fs.createWriteStream(CONFIG))
    .on('error', function(err) {
      console.error(err.message);
      throw err;
    });
  console.log('Your configuration file has been copied with the defaults as \'%s\'.', CONFIG);
}

/*
 * A list of symlinks to create.
 * @param source - the item to create a symlink of
 * @param target - the the destination of the symlink
 * @param type - the type of the symlink (Used for windows only)
 * @param name - the name of the symlink
 */
var LINKS = [
  {
    source: 'node_modules/bootstrap-sass/assets/stylesheets',
    target: VENDORS + '/bootstrap',
    type: 'dir',
    name: 'bootstrap',
  },
  {
    source: 'node_modules/normalize-scss-vanilla',
    target: VENDORS + '/normalize-scss-vanilla',
    type: 'dir',
    name: 'normalize-scss-vanilla',
  },
  {
    source: 'node_modules/font-awesome/scss',
    target: VENDORS + '/font-awesome',
    type: 'dir',
    name: 'font-awesome',
  },
];

console.log('Creating symlinks for:\n%s\n', LINKS.map(function(link) { return link.name; }).join(', '));
LINKS.forEach(function(link) {
  var source = path.resolve(link.source);
  var target = path.resolve(link.target);

  fs.unlink(target, function(err) {
    if(err && err.code != 'ENOENT') {
      throw err;
    }
  });

  fs.symlink(source, target, link.type, function(err) {
    if(err) {
      if(err.code == 'EPERM') {
        console.error('You must run this as administrator in Windows to create symlinks.');
        console.error('Run \'npm install\' again once you open an admin terminal');
      }
      throw err;
    }
  });
});
console.log('Symlinks have been create successfully.');
