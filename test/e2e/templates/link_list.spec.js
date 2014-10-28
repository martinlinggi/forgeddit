/**
 * Created by ma-li on 11.10.14.
 */

describe("E2E: Link list view", function() {

    beforeEach(function() {
        browser().navigateTo('/#');
        browser().reload();
    });

    var selector = 'ul.linkList li.linkItem';

    it('should show the correct number of links', function() {
        expect(repeater(selector).count()).toEqual(expectedLinks.length);
    });

    it('should show the correct link information', function() {
// Do the other book details (isbn, author) match?
        for (var i = 0, n = expectedLinks.length; i < n; i++) {
            expect(repeater(selector).row(i))
                .toEqual(
                [
                    expectedLinks[i].rate,
                    expectedLinks[i].title,
//                    expectedLinks[i].time,
                    expectedLinks[i].user,
                    expectedLinks[i].group,
                    expectedLinks[i].comments
                ]
            );
        }
    });

    var expectedLinks = [
        {
            title : "Giraffes in love",
            url : "http://www.freemake.com/blog/wp-content/uploads/2013/07/animated-gifs-giraffes-51.gif",
            user : "MaLiMaster",
            group : "fun",
            rate : 578,
            time : 1309324245826,
            comments: []
        },
        {
            title : "Möchtegern Hausbauer",
            url : "http://i.imgur.com/RJqRpbM.jpg",
            user : "MaLiMaster",
            group : "fun",
            rate : 22,
            time : 1309424245826,
            comments: [
                {user : "tinMan", time: 1308774240669, text: "Hallo"}]
        },
        {
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
            title : "Kurios gesammelt",
            url : "http://www.heise.de/newsticker/meldung/Messesplitter-Kurioses-und-Bemerkenswertes-von-der-Computex-2217665.html",
            user : "MaLiMaster",
            group : "fun",
            rate : 15,
            time : 1308124245826,
            comments: []
        }
    ];
});