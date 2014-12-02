/**
 * Created by ma-li on 11.10.14.
 */

describe('Service: ForgedditDataService', function() {

    var ForgedditDataService;
    var $httpBackend;

    // load the application module
    beforeEach(module('forgedditApp'));

    // get a reference to all used services
    beforeEach(inject(function (_ForgedditDataService_, _$httpBackend_) {
        ForgedditDataService = _ForgedditDataService_;
        $httpBackend = _$httpBackend_;
    }));

    // define trained responses
    beforeEach(function () {

        $httpBackend.when(
            'GET', '/api/links'
        ).respond(testLinks);

        $httpBackend.when(
            'POST', '/api/links'
        ).respond(true);

        $httpBackend.when(
            'PUT', '/api/links/' + testLink._id + '/vote'
        ).respond(true);

    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('Public API', function () {

        it('should include a getLinks() function', function () {
            expect(ForgedditDataService.getLinks).toBeDefined();
        });

        it('should include a voteLink() function', function () {
            expect(ForgedditDataService.voteLink).toBeDefined();
        });

        it('should include a Links() function', function () {
            expect(ForgedditDataService.addLink).toBeDefined();
        });

    });

    describe('Public API usage', function () {

        describe('getLinks()', function () {

            it('should return a proper array of link objects', function () {
                $httpBackend.expectGET('/api/links');

                var links;
                ForgedditDataService.getLinks().then(function (res) {
                    links = res.data;
                });
                $httpBackend.flush();
                expect(links.length).toBe(testLinks.length);
            });

        });

        describe('addLink()', function() {

            it('should properly store the passed link object', function() {
                $httpBackend.expectPOST('/api/links', newLink);
                ForgedditDataService.addLink(newLink);
                $httpBackend.flush();
            });
        });

        describe('voteLink()', function() {

            it('should properly vote the passed link object', function() {
                var id = testLink._id;
                $httpBackend.expectPUT('/api/links/' + id + '/vote', {userName:1});
                ForgedditDataService.voteLink(id, 1);
                $httpBackend.flush();
            });
        })
    });

    var testLinks = [
        {
            _id: '1',
            title : "Sony streamt Spiele auf Fernseher",
            url : "http://www.heise.de/newsticker/meldung/E3-Sony-streamt-Spiele-auf-Fernseher-zeigt-neue-PS4-Titel-2218073.html",
            user : "MaLiMaster",
            group : "fun",
            rate : 432,
            time : 1308774240669,
            comments: [
                {user : "tinMan", time: 1308774240669, text: "Hallo"},
                {user : "MaLiMaster", time: 1308774240669, text: "Comment"}]
        },
        {
            _id: '2',
            title : "Kurios gesammelt",
            url : "http://www.heise.de/newsticker/meldung/Messesplitter-Kurioses-und-Bemerkenswertes-von-der-Computex-2217665.html",
            user : "MaLiMaster",
            group : "fun",
            rate : 15,
            time : 1308124245826,
            comments: []
        },
        {
            _id: '3',
            title : "Giraffes in love",
            url : "http://www.freemake.com/blog/wp-content/uploads/2013/07/animated-gifs-giraffes-51.gif",
            user : "MaLiMaster",
            group : "fun",
            rate : 578,
            time : 1308124245826,
            comments: []
        },
        {
            _id: '4',
            title : "Möchtegern Hausbauer",
            url : "http://i.imgur.com/RJqRpbM.jpg",
            user : "MaLiMaster",
            group : "fun",
            rate : 22,
            time : 1308124245826,
            comments: [
                {user : "tinMan", time: 1308774240669, text: "Hallo"}]
        }
    ];

    var testLink = testLinks[0];

    var newLink = {
        _id: '5',
        title : "Sony streamt Spiele auf Fernseher",
             url : "http://www.heise.de/newsticker/meldung/E3-Sony-streamt-Spiele-auf-Fernseher-zeigt-neue-PS4-Titel-2218073.html",
        user : "MaLiMaster",
        group : "fun",
        rate : 432,
        time : 1308774240669,
        comments: [
        {user : "tinMan", time: 1308774240669, text: "Hallo"},
        {user : "MaLiMaster", time: 1308774240669, text: "Comment"}]
    };

});