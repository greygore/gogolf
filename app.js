(function(window, Kinvey) {
  var App = window.GoGolf = {};

	Kinvey.init({
		'appKey': 'kid_VPf52bDYWJ',
		'appSecret': 'b5986292f3d244eab8b2f91124340506'
	});

	Kinvey.ping({
		success: function(response) {
			console.log('Kinvey Ping Success. Kinvey Service is alive, version: ' + response.version + ', response: ' + response.kinvey);
		},
		error: function(error) {
			console.log('Kinvey Ping Failed. Response: ' + error.description);
		}
	});

}(window, window.Kinvey));