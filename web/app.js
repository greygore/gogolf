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

	App.Round = Kinvey.Entity.extend({
		constructor: function(attributes) {
			Kinvey.Entity.prototype.constructor.call(this, attributes, 'Round');
		},

		getCourseName: function() {
			return this.get('CourseName');
		}

	});

  App.Rounds = Kinvey.Collection.extend({
  	entity: App.Round,

		constructor: function(options) {
			Kinvey.Collection.prototype.constructor.call(this, 'Round', options);
		}
  });

    App.GolfGroup = Kinvey.Entity.extend({
        constructor: function(attributes) {
            Kinvey.Entity.prototype.constructor.call(this, attributes, 'GolfGroup');
        },

        getGolfGroupName: function() {
            return this.get('Name');
        }

    });

    App.GolfGroups = Kinvey.Collection.extend({
        entity: App.GolfGroup,

        constructor: function(options) {
            Kinvey.Collection.prototype.constructor.call(this, 'GolfGroup', options);
        }
    });


}(window, window.Kinvey));