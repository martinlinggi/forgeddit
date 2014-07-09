/**
 * Created by martinlinggi on 22.05.14.
 */

jQuery(document).ready(function() {

    console.log('Document ready');
    requestLinkList('links.json', function(err) {
        refreshPage();
    });
    $('#sendLink').
        on('click', onAddLink).
        attr('disabled','disabled');

    $('#link').keyup(function() {
        if($(this).val().trim() !== '') {
            $('#sendLink').removeAttr('disabled');
        }
        else {
            $('#sendLink').attr('disabled','disabled');
        }
    });


});

/**
 * Handles the click on the button "send link"
 */
function onAddLink() {

    // get the values
    var title = $('#linkTitle').val();
    var link = $('#link').val();
    var user = 'test';
    // At least a link is mandatory
    if (link.length > 0) {
        $('#link').removeClass('error');
        addLink(user, title, link, 'test');
        refreshPage();
    }
    else
    {
        console.log('Error: no link provided');
        $('#link').addClass('error');
    }
}

function refreshPage()
{
    $('.linkItem').remove();

    for (var i = linkList.length -1 ; i >= 0; i--) {
        var link = linkList[i];

        // create a link entry
        var $thumbDiv = createThumbDiv(link.url);

        var $listItem = createLinkListItem(link.id)
            .append(createRateDiv(link.rate, link.id))
            .append($thumbDiv)
            .append(createEntryDiv(link.id, link.title, link.url, link.user, link.group, link.time, link.comments));
        $('#linkList').append($listItem);
    }
}

function vote(id, value)
{
    value = voteLink(id, value);
    if (value)
    {
        $('#' + id + ' div.rate div.vote').html(value);
        console.log('Vote: ' + id + ' new Value: ' + value );
    }
}

/**
 * Creates the list-element for the link-list.
 * @returns {*|jQuery} List-element
 */
function createLinkListItem(id) {
    return $('<li>').addClass('linkItem').attr('id', id);
}

/**
 * Creates the div-element for the rate-value
 * @returns {void|jQuery} The div-element
 */
function createRateDiv(rate, id) {

    var $up = $('<div>').addClass('voteUp');
    var $down = $('<div>').addClass('voteDown');
    var $vote = $('<div>').addClass('vote').append(rate);
    var $voteDiv = $('<div>').addClass('rate').
        append($up).
        append($vote).
        append($down);
    $($up).on('click', function () {
        vote(id, +1);
    });
    $($down).on('click', function () {
        vote(id, -1);
    });
    return $voteDiv;
}

/**
 * Creates the thumbnail div-element
 * @param link The url to the image
 * @returns {*|jQuery} The div-element
 */
function createThumbDiv(link) {
    var $thumb = $('<img>').attr('src', link);
    var $link = $('<a>').attr('href', link).append($thumb);
    var $thumbDiv = $('<div>').addClass('thumb').append($link).hide();

    // If a link is provided, try to load an image. Is successful  make thumbnail visible
    $($thumb, $thumbDiv).load(function () {
        var $img = $(this);
        // Adjust size depending on ratio width <> height
        if ($img.width() > $img.height()) {
            $thumb.addClass('imageScaleH');
        }
        else {
            $thumb.addClass('imageScaleV');
        }
        $thumbDiv.show();
    });

    return $thumbDiv;
}

/**
 * Creates the entry div-element
 * @param id The id of the link
 * @param title The title from the linkTitle input field
 * @param url  The link from the link input field
 * @param user  The user name
 * @param group The group name
 * @param time The creation time
 * @param comments The comment list
 * @returns {void|jQuery}
 */
function createEntryDiv(id, title, url, user, group, time, comments) {
    if (url.length > 0 && title.length === 0) {
        title = url;
    }
    return $('<div>').addClass('entry')
        .append(createLinkHtml(title, url))
        .append(createLinkEntryInfo(time, user, group))
        .append(createLinkEntryOptions(id, comments))
        .append(createLinkEntryComments(comments));
}

/**
 * Creates the html-code for the title in the entry-div
 *
 * @param title The title either from linkTitle or textTitle input field
 * @param link  The link from the link input field
 * @returns {string}
 */
function createLinkHtml(title, link)
{
    var $div = $('<div>').addClass('link');
    // A link and a title is provided
    if (link.length > 0 && title.length > 0) {
        return $($div).append($('<a>', {href: link, text: title}));
    }
    // A link without a title is provided
    else if (link.length > 0 && title.length === 0) {
        return $($div).append($('<a>', {href: link, text: link}));
    }
    // Fallback: should not occur
    else {
        return $div;
    }
}

function createLinkEntryInfo(time, user, group)
{
    var $userLink =  $('<a>').attr({href: '#'}).append(user);
    var $groupLink =  $('<a>').attr({href: '#'}).append(group);
    return $('<div>').addClass('info').
        append('Submitted ' + getCreationTimeAsText(time) + ' from ').
        append($userLink).
        append(' to ').
        append($groupLink);
}

function createLinkEntryOptions(id, comments)
{
    var $div = $('<div>').addClass('actionList');
    var $menu = $('<ul>').addClass('menu');
    var $comments = $('<li>').addClass('menuItem').append(comments.length + ' Comments');
    $($comments).on('click', function() {
        if (comments.length > 0) {
            $('#' + id + ' div.entry div.commentList').toggle();
        }
    });
    var $addComment = $('<li>').addClass('menuItem').append('Add Comment');
    $($addComment).on('click', function() {
        $('#addComment').remove();
        $('#' + id + ' div.entry').append(createLinkEntryCommentEditor(id));
    });
    $menu.append($comments);
    $menu.append($addComment);
    $div.append($menu);
    return $div;
}

function createLinkEntryComments(comments)
{
    var $divList = $('<div>').addClass('commentList').hide();
    for (var i = 0; i < comments.length; i++) {
        var $divItem = $('<div>').addClass('commentItem');
        var $user = $('<div>').addClass('commentUser').append(comments[i].user);
        var $time = $('<div>').addClass('commentTime').append(getCreationTimeAsText(comments[i].time));
        var $text = $('<div>').addClass('commentText').append(comments[i].text);
        $divList.append($divItem.append($user).append($time).append($text));
    }
    return $divList;
}

function createLinkEntryCommentEditor(id)
{
    var $commentEdit = $('<div>').addClass('commentEditor').attr('id', 'addComment');
    var $textField = $('<textarea>').
        attr('id', 'commentId').
        attr('name', 'commentId').
        attr('cols', '50').
        attr('rows', '3');
    var $send = $('<input>').
        attr('id', 'sendCommentText').
        attr('type', 'button').
        attr('value', 'Send Comment');
    var $cancel = $('<input>').
        attr('id', 'cancelCommentText').
        attr('type', 'button').
        attr('value', 'Cancel');
    var $form = $('<form>').
        append($textField).
        append($('<div>').addClass('commentButtons').
            append($cancel).
            append($send));
    $commentEdit.append($form);

    $($send).attr('disabled','disabled');
    $($textField).keyup(function() {
        if($(this).val().trim() !== '') {
            $($send).removeAttr('disabled');
        }
        else {
            $($send).attr('disabled','disabled');
        }
    });

    $($send).on('click', function() {
        var commentText = $('textarea#commentId').val();
        if (commentText.length > 0)
        {
            console.log('--> addComment activated.');
            addComment(id, commentText);
            var newComments = getComments(id);
            var $divCommentOptions = createLinkEntryOptions(id, newComments);
            $('#'+ id + ' div.entry div.actionList').replaceWith($divCommentOptions);
            var $divComments = createLinkEntryComments(newComments);
            $('#'+ id + ' div.entry div.commentList').replaceWith($divComments);
            $('#addComment').remove();
        }
    });
    $($cancel).on('click', function() {
        $('#addComment').remove();
    });
    return $commentEdit;
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
        return Math.round(millis / oneSec) + ' seconds ago';
    }
    else if (millis < oneMin) {  //  10 seconds steps
        return Math.round(millis / (oneSec * 10) ) * 10 + ' seconds ago';
    }
    else if (millis < oneMin * 10) {  // 1 minute steps
        return Math.round(millis / oneMin) + ' minutes ago';
    }
    else if (millis < oneHour) {  // 10 minute steps
        return Math.round(millis / (10 * oneMin)) * 10 + ' minutes ago';
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
    else if (millis < oneYear) {  //  1 month steps
        return Math.round(millis / oneMonth) + ' months ago';
    }
    else {  // 1 year steps
        return Math.round(millis / oneYear) + ' years ago';
    }
}