var wav = require('wav');
var Speaker = require('speaker');
var reader = new wav.Reader();
var fs = require('fs');
var gpio = require('pi-gpio');
var gpioPin = 16;
var on = 1;
var off = 0;

module.exports = {


  playAudioFile: function (option, done) {

    console.log("Alert sounded");

    // find the machine passed in with the option var, this is called from the alert controller POST
    var fileName = Machines.findOne({
      machine: option
    }).exec(function (err, audioFile) {
      console.log('Playing ' + audioFile.fileName);

      var reader = new wav.Reader();
      reader.on('format', function (format) {
        playAudio(reader, format);
      });


      // pipe the WAVE file to the Reader instance 
      var file = fs.createReadStream(audioFile.fileName);
      file.pipe(reader);

    });

    // async function playAudio(reader,format) {
    //   reader.pipe(new Speaker(format));
    //   await console.log('Finished');
    // }   

    function playAudio(reader, format) {
      audioFilesService.turnOnGPIO();
      var speakerpipe = reader.pipe(new Speaker(format));

      speakerpipe.on('finish', function () {
        console.log('Finished speakerpipe');
        audioFilesService.turnOffGPIO();
      });
    }


  },
  turnOnGPIO: function (option, done) {
    gpio.open(gpioPin, "output", function (err) {
      gpio.write(gpioPin, on, function () {
          console.log("GPIO on");
      })
    })
  },
  turnOffGPIO: function (option, done) {
    gpio.write(gpioPin, off, function () {
      console.log("GPIO off");      
    })
  }
}
