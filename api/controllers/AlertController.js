/**
 * AlertController
 *
 * @description :: Server-side logic for managing Alerts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	create: function(req,res) {
        //post override

        var params = req.body;
        Alert.create(params)
        .exec(function(err, alert) {
            //pass the machine attribute of the payload 
            audioFilesService.playAudioFile(alert.machine);

        });

    },
    delete: function(req,res) {
        //delete override
        var params = req.body;
        Alert.delete(params)
        .exec(function(err, alert) {
        //do stuff here
            console.log(alert);
        });

    },
    find: function(req,res) {
        //GET override
        Alert.find()
        .exec(function(err, alert) {
        //do stuff here
            res.send(alert);
        });

    },
    findone: function(req,res) {
        // this is an override to the findone route. 
        //on the client, send a post to Alert/findone route. and send {"id":"5"} as a payload
        var params = req.body;
        Alert.findOne(params.id)
        .exec(function(err, alert) {
        //do stuff here
            console.log(alert);
        });

    }

};

