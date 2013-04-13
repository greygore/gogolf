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
                    console.log($('#round').html());
                    console.log(val);
                    var output = Mustache.render($('#round').html(), val);
                    console.log(output);
                    $('#showRounds').append(output);
                });
            },
            error: function(e) {
                console.log('Unable to retrieve rounds');
            }
        });
    });


    $('#getGolfGroups').click(function(e) {
        var TestRounds = new GoGolf.GolfGroups();
        TestRounds.fetch({
            success: function(list) {
                $('#showGolfGroups').html('');

                $.each(list, function(key, val) {
                    console.log($('#golfgroup').html());
                    console.log(val);
                    var output = Mustache.render($('#golfgroup').html(), val);
                    console.log(output);
                    $('#showGolfGroups').append(output);
                });
            },
            error: function(e) {
                console.log('Unable to retrieve golf groups');
            }
        });
    });

}(window.Kinvey, window.GoGolf));