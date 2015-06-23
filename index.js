'use strict';

var autonomy = require('ardrone-autonomy'),
	mission = autonomy.createMission(),
	client = mission.client;

mission.takeoff()
	.zero()
	.altitude(0.3)
	.forward(0.3)
	.right(0.3)
	.backward(0.3)
	.left(0.3)
	.hover(1000)
	.land();

mission.run(function(err, result) {
	if (err) {
		console.trace("An error occurred when running the mission: " + err);
		client.stop();
		client.land();
	} else {
		console.log("Mission success");
		process.exit(0)
	}
});

process.on('uncaughtException', function(err) {
	console.log("Unhandled error: " + err);

	client.stop();
	client.land();
	client.after(2000, process.exit);
});
