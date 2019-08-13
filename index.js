var fs = require('fs');
var path = require('path');
var iconsDir = "./icons/";

//
// Add classnames
//

fs.readdir(iconsDir, function (error, files) {
  if (error) {
    console.error("Could not read icons directory.", error);
    process.exit(1);
  }

  files.forEach(function (file, index) {
    var file = __dirname + '/icons/' + file;

    fs.readFile(file, 'utf8', function (err, data) {
      if (err) {
        return console.log(err);
      }
      var result = data.replace('<svg', '<svg class="bi bi-' + path.basename(file, '.svg') + '"');
      console.log(index + '. ' + path.basename(file, '.svg'));

      fs.writeFile(file, result, 'utf8', function (err) {
         if (err) return console.log(err);
      });
    });
  });
});
