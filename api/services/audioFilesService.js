var wav = require('wav');
var Speaker = require('speaker');
var reader = new wav.Reader();
var fs = require('fs');


module.exports = {


  playAudioFile: function (option, done) {

    console.log("Alert sounded");

    // find the machine passed in with the option var, this is called from the alert controller POST
    var fileName = Machines.findOne({
      machine: option
    }).exec(function (err, audioFile) {
      console.log('Playing ' +audioFile.fileName);

      var reader = new wav.Reader();
      reader.on('format', function (format) {
        reader.pipe(new Speaker(format));
      });

      // pipe the WAVE file to the Reader instance 
      var file = fs.createReadStream(audioFile.fileName);
      file.pipe(reader);
    });

  }

}
