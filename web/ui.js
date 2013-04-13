$(function(Kinvey) {
    $('#login').submit(function(e) {
        e.preventDefault();

        var goGolfUser = new Kinvey.User();
    
        goGolfUser.login($('#username').val(), $('#password').val(), {
            success: function(user) {
                console.log('User logged in');
                $('#userGivenName').text(user.get('name'));
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
}(window.Kinvey));