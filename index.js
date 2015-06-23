'use strict';

var client = require('ar-drone').createClient();
var fs = require('fs');

client.takeoff();

client.after(4000, function() {
		this.stop();
		this.land();
	});
	// .left(1)
	// .zero()
    // .wait(2000)
	// .right(1)
	// .zero()
	// .wait(2000)
	// .cw(1)
	// .zero()
	// .wait(2000)
	//.land();


var index = 0;
var pngStream = client.getPngStream();
pngStream.on('data', function(data) {
	if (index < 50) {
		index++;
		fs.writeFile('images/' + index.toString() + '.png', data);
	}
});


// mission.run(function(err, result) {
// 	if (err) {
// 		handleErr(err);
// 	} else {
// 		console.log("Mission success");
// 		process.exit(0);
// 	}
// });

var handleErr = function(err) {
	console.log("Unhandled error while running mission: " + err);

	client.stop();
	client.land();
	client.after(2000, process.exit);
}

process.on('uncaughtException', handleErr);
