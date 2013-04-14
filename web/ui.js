$(function(Kinvey, GoGolf) {
    var loginBody = $('#main').html();

    var templateData = {};

    var homeCourses = ["Alpharetta Athletic Club", "Heritage Golf Links", "Bentwater Golf Club"];
    var homeCourse = homeCourses[Math.floor(Math.random()*homeCourses.length)];

    var companies = ["Trautman Sanders", "Coca Cola", "MailChimp"];
    var company = companies[Math.floor(Math.random()*companies.length)];


    $('body').on('click', '#logout', function(e) {
        var user = Kinvey.getCurrentUser();

        if (null !== user) {
            user.logout({
                success: function() {
                    console.log('User logged out');
                    $('#main').html(loginBody);
                },
                error: function(e) {
                    console.log('Logout failure');
                }
            });
        }
    });

    $('body').on('submit', '#login', function(e) {
        e.preventDefault();

        var user = new Kinvey.User();
    
        user.login($('#email').val(), $('#password').val(), {
            success: function(user) {
                console.log('User logged in');
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
                        "info": true
                    }
                };
                // Now let's display the actual logged in template
                var output = Mustache.render($('#template2').html(), templateData);
                if (output) {
                    $('#main').html(output);
                }
                getRounds();
            },
            error: function(e) {
                console.log('Login failure');
            }
        });
    });

    $(window).on('hashchange', function() {
        // This is an embarassing hack, but... yeah
        var user = Kinvey.getCurrentUser();
        var menu = window.location.hash.substring(1);

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
            menu: {}
        };
        console.log(menu);
        templateData.menu[menu] = true;
        console.log(templateData);
        // Now let's display the actual logged in template
        var output = Mustache.render($('#template2').html(), templateData);
        if (output) {
            $('#main').html(output);
        }

        if ('info' === menu) {
            getRounds();
        }

    });

    function getRounds() {
        var user = Kinvey.getCurrentUser();

        var myQuery = new Kinvey.Query();
        myQuery.on('Owner').equal(user.get('_id'));

        var InfoRounds = new GoGolf.Rounds();
//        InfoRounds.setQuery(myQuery);
        InfoRounds.fetch({
            success: function(list) {
                console.log(list);
                $('#infoRounds').html('');

                var i = 0;
                $.each(list, function(key, val) {
                    // Hardcoding values is fun!
                    if (0 === i) {
                        val['participant1'] = true;
                    } else if (1 === i) {
                        val['participant2'] = true;
                        val['participant3'] = true;
                    }
                    var output = Mustache.render($('#roundTemplate').html(), val);
                    $('#infoRounds').append(output);
                    i++;
                });
            },
            error: function(e) {
                console.log('Unable to retrieve rounds');
            }
        });

    }

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

}(window.Kinvey, window.GoGolf));