$(function(Kinvey, GoGolf) {
    $('#login').submit(function(e) {
        e.preventDefault();

        var user = new Kinvey.User();
    
        user.login($('#username').val(), $('#password').val(), {
            success: function(user) {
                console.log('User logged in');
                $('#userGivenName').text(user.get('first_name'));
                $('#login').hide();
                $('#loggedIn').show();
            },
            error: function(e) {
                console.log('Login failure');
            }
        });
    });

    $('#logout').click(function(e) {
        var user = Kinvey.getCurrentUser();

        if (null !== user) {
            user.logout({
                success: function() {
                    $('#loggedIn').hide();
                    $('#login').show();
                },
                error: function(e) {
                    console.log('Logout failure');
                }
            });
        }
    });

    $('#getRounds').click(function(e) {
        var TestRounds = new GoGolf.Rounds();
        TestRounds.fetch({
            success: function(list) {
                $('#showRounds').html('');

                $.each(list, function(key, val) {
                    var output = Mustache.render($('#round').html(), val);
                    $('#showRounds').append(output);
                });
            },
            error: function(e) {
                console.log('Unable to retrieve rounds');
            }
        });
    });

    $('#getRoundParticipants').click(function(e) {
        var TestParticipants = new GoGolf.RoundParticipants();
        TestParticipants.fetch({
            resolve: ['Round', 'User'],
            success: function(list) {
                $('#showRoundParticipants').html('');

                $.each(list, function(key, val) {
                    console.log(val);
                    var output = Mustache.render($('#roundParticipants').html(), val);
                    console.log(output);
                    $('#showRoundParticipants').append(output);
                });
            },
            error: function(e) {

            }
        });
    });

}(window.Kinvey, window.GoGolf));