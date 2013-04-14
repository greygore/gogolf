$(function(Kinvey, GoGolf) {
    var templateData = {};

    var homeCourses = ["Alpharetta Athletic Club", "Heritage Golf Links", "Bentwater Golf Club"];
    var homeCourse = homeCourses[Math.floor(Math.random()*homeCourses.length)];

    var companies = ["Trautman Sanders", "Coca Cola", "MailChimp"];
    var company = companies[Math.floor(Math.random()*companies.length)];


    // Let's assume we're logged in...
    var user = new Kinvey.User();
    user.login('gwood', 'greygore', {
        success: function(user) {
            console.log('Login successful');
            templateData = {
                "user": {
                    "name": {
                        "first": user.get('first_name'),
                        "last": user.get('last_name'),
                        "full": user.get('first_name')+' '+user.get('last_name')
                    },
                    "handicap": user.get('handicap'),
                    "course": homeCourse,
                    "company": company
                },
                "menu": {
                    "new_round": true
                }
            };
            // Now let's display the actual logged in template
            var output = Mustache.render($('#template2').html(), templateData);
            $('body').html(output);
        },
        error: function(e) {
            console.log('Login failure');
        }
    });

    $('body').on('click', '#logout', function(e) {
        var user = Kinvey.getCurrentUser();

        if (null !== user) {
            user.logout({
                success: function() {
                    $('body').html('');
                },
                error: function(e) {
                    console.log('Logout failure');
                }
            });
        }
    });





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
                console.log('Unable to retrieve round participants');
            }
        });
    });

    $('#getGolfGroups').click(function(e) {
        var TestRounds = new GoGolf.GolfGroups();
        var myQuery = new Kinvey.Query();


        var user = Kinvey.getCurrentUser();

        if (null !== user) {

        myQuery.on('Private').equal('Y')     ;
        myQuery.on('Owner').equal(user.get('_id'));
        TestRounds.setQuery(myQuery)   ;

        TestRounds.fetch({
            success: function(list) {
                $('#showGolfGroups').html('');

                $('#showGolfGroups').append("<br/> Private Groups: <br/>");
                $.each(list, function(key, val) {
                    console.log($('#privategolfgroup').html());
                    console.log(val);
                    var output = Mustache.render($('#privategolfgroup').html(), val);
                    console.log(output);
                    $('#showGolfGroups').append(output);
                });
            },
            error: function(e) {
                console.log('Unable to retrieve private golf groups');
            }
        });
        }


        TestRounds = new GoGolf.GolfGroups();
        var myQuery = new Kinvey.Query();
        myQuery.on('Private').equal('N')     ;
        TestRounds.setQuery(myQuery)   ;
        TestRounds.fetch({
            success: function(list) {

                $('#showGolfGroups').append("<br/> Public Groups: <br/>");
                $.each(list, function(key, val) {
                    console.log($('#publicgolfgroup').html());
                    console.log(val);
                    var output = Mustache.render($('#publicgolfgroup').html(), val);
                    console.log(output);
                    $('#showGolfGroups').append(output);
                });
            },
            error: function(e) {
                console.log('Unable to retrieve public golf groups');
            }
        });
    });

    $('#switchTemplate2').click(function(e) {
        var output = Mustache.render($('#template2').html(), {});
        $('body').html(output);
    });

}(window.Kinvey, window.GoGolf));