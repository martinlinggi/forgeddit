/**
 * Created by martinlinggi on 22.05.14.
 */


var linkList;

jQuery(document).ready(function() {

    console.log('Document ready');
    var url = "links.json";
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = function() {
        if (request.status == 200)
        {
            getLinkList(request.response);
        }
    };
    request.send(null);

    $('#sendText').bind('click', onAddText);
    $('#sendLink').bind('click', onAddLink);

});



/**
 * Handles the click on the button "send link"
 */
function onAddLink() {

    // get the values
    var title = $('#linkTitle').val();
    var link = $('#link').val();
    var text = '';
    var creationTime = new Date().getTime();

    // At least a link is mandatory
    if (link.length > 0) {
        addLinkListEntry(title, link, text, 'testUser', 'testGroup', 0, creationTime);
    }
    else
    {
        console.log('Error: no link provided');
        // TODO: Inform the user about the error
    }
}

/**
 * Handles the click on the button "send text"
 */
function onAddText() {

    // get the values
    var title = $('#textTitle').val();
    var link = '';
    var text = $('#text').val();
    var creationTime = new Date().getTime();

    // At least the title is mandatory
    if (title.length > 0) {
        addLinkListEntry(title, link, text, 'testUser', 'testGroup', 0, creationTime - 2000);
    }
    else
    {
        console.log('Error: No text provided.');
        // TODO: Inform the user about the error
    }
}

function getLinkList(responseText)
{
    linkList = JSON.parse(responseText);
    refreshLinkList();
}

function refreshLinkList()
{
    $('.linkItem').remove();

    for (var i = linkList.length -1 ; i >= 0; i--) {
        var link = linkList[i];

        // create a link entry
        var $thumbDiv = createThumbDiv(link.url, link.id);

        var $listItem = createLinkListItem()
            .append(createRateDiv(link.rate))
            .append($thumbDiv)
            .append(createEntryDiv(link.title, link.url, link.text, link.user, link.group, link.time));
        $('#linkList').append($listItem);

        // If a link is provided, try to load an image. Is successful  make thumbnail visible
        if (link.url.lenght > 0) {
            $('img', $thumbDiv).load(function () {
                var $img = $(this);
                // Adjust size depending on ratio width <> height
                if ($img.width() > $img.height()) {
                    $img.css('height', '100%').css('width', 'auto');
                }
                else {
                    $img.css('height', 'auto').css('width', '100%');
                }
                $thumbDiv.show();
            });
        }
    }
}

function onRemoveText() {
    // TODO: Implement it
}

/**
 * Creates the list-element for the link-list.
 * @returns {*|jQuery} List-element
 */
function createLinkListItem() {
    return $('<li>').addClass('linkItem');
}

/**
 * Creates the div-element for the rate-value
 * @returns {void|jQuery} The div-element
 */
function createRateDiv(rate, id) {
    return $('<div>').addClass('rate').append('<p>+</p><p>' + rate + '</p><p>-</p>');
}

/**
 * Creates a new entry in the link list
 * @param title The title either from linkTitle or textTitle input field
 * @param url  The link from the link input field
 * @param text  The text from the text input field
 * @param user  The user name
 * @param group The group name
 * @param rate The rate value
 * @param time The creation time
 */
function addLinkListEntry(title, url, text, user, group, rate, time)
{
    linkList.push({
        "id": user + "_" + new Date().getTime(),
        "title" : title,
        "url" : url,
        "text": text,
        "user": user,
        "group" : group,
        "rate": rate,
        "time": time
    });
    refreshLinkList();

}

/**
 * Creates the thumbnail div-element
 * @param link The url to the image
 * @returns {*|jQuery} The div-element
 */
function createThumbDiv(link) {
    return $('<div>').addClass('thumb').append('<img src="' + link + '">').hide();
}

/**
 * Creates the entry div-element
 * @param title The title either from linkTitle or textTitle input field
 * @param url  The link from the link input field
 * @param text  The text from the text input field
 * @param user  The user name
 * @param group The group name
 * @param time The creation time
 * @returns {void|jQuery}
 */
function createEntryDiv(title, url, text, user, group, time) {
    if (url.length > 0 && title.length === 0) {
        title = url;
    }
    return $('<div>').addClass('entry')
        .append(createLinkHtml(title, url, text))
        .append('<p class="info">Subbmitted ' + getCreationTimeAsText(time) + ' from <a href="#">' + user + '</a> to <a href="#">' + group + '</a></p>')
        .append('<p class="actionList">' +
            '<a href="#">0 Comments</a>' +
            '<a href="#">Share</a>' +
            '<a href="#">Hide</a>' +
            '<a href="#">Blame</a>' +
            '<a href="#">Remove</a>');
}

/**
 * Creates the html-code for the title in the entry-div
 *
 * @param title The title either from linkTitle or textTitle input field
 * @param link  The link from the link input field
 * @param text  The text from the text input field
 * @returns {string}
 */
function createLinkHtml(title, link, text)
{
    // A link and a title is provided
    if (link.length > 0 && title.length > 0) {
        return '<p class="link"><a href="' + link + '">' + title + '</a></p>';
    }
    // A link without a title is provided
    else if (link.length > 0 && title.length === 0) {
        return '<p class="link"><a href="' + link + '">' + link + '</a></p>';
    }
    // A title and a text is provided
    else if (title.length > 0 && text.length > 0) {
        return '<p class="link"><a href="#">' + title + '</a></p>';
    }
    // A title without a text is provided
    else if (title.length > 0 && text.length === 0) {
        return '<p class="link">' + title + '</p>';
    }
    // Fallback: should not occur
    else {
        return '<p class="link">...</p>';
    }
}

function getCreationTimeAsText(creationTime)
{
    var millis = new Date().getTime() - creationTime;
    var oneSec = 1000;
    var oneMin = oneSec*60;
    var oneHour = oneMin*60;
    var oneDay = oneHour*24;
    var oneWeek = oneDay*7;
    var oneMonth = oneDay*31;
    var oneYear = oneDay*365;
    if (millis < oneSec) {
        return 'just now';
    }
    else if (millis < 10 * oneSec) {  // 1 second steps
        return Math.round(millis / 1000) + ' seconds ago';
    }
    else if (millis < oneMin) {  //  10 seconds steps
        return Math.round(millis / oneSec * 10 ) * 10 + ' seconds ago';
    }
    else if (millis < oneMin * 10) {  // 1 minute steps
        return Math.round(millis / oneMin) + ' minutes ago';
    }
    else if (millis < oneHour) {  // 10 minute steps
        return Math.round(millis / 10 * oneMin) * 10 + ' minutes ago';
    }
    else if (millis < oneDay) {  // 1 hour steps
        return Math.round(millis / oneHour) + ' hours ago';
    }
    else if (millis < oneWeek) {  //  1 day steps
        return Math.round(millis / oneDay) + ' days ago';
    }
    else if (millis < oneMonth) {  //  1 week steps
        return Math.round(millis / oneWeek) + ' weeks ago';
    }
    else if (millis < oneYear) {  //  1 week steps
        return Math.round(millis / oneMonth) + ' months ago';
    }
    else {
        return Math.round(millis / oneYear) + ' months ago';
    }

}