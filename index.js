'use strict';

var autonomy = require('ardrone-autonomy'),
	mission = autonomy.createMission(),
	client = mission.client;

mission.takeoff()
	.altitude(0.5)
	.wait(2000)
	.left(1)
	.zero()
	.wait(2000)
	.right(1)
	.zero()
	.wait(2000)
	.cw(1)
	.zero()
	.wait(2000)
	.land();

mission.run(function(err, result) {
	if (err) {
		handleErr(err);
	} else {
		console.log("Mission success");
		process.exit(0);
	}
});

var handleErr = function(err) {
	console.log("Unhandled error while running mission: " + err);

	client.stop();
	client.land();
	client.after(2000, process.exit);
}

process.on('uncaughtException', handleErr);
