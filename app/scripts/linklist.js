/**
 * Created by martinlinggi on 30.06.14.
 */


var linkList;

/**
 * This function requests the list with the links from the server
 * @param url The url to the json file.
 * @param callback The callback is used to inform the page that the list is loaded.
 */
function requestLinkList(url, callback) {
    var request = new XMLHttpRequest();
    var err;
    request.open('GET', url);
    request.onload = function() {
        if (request.status === 200)
        {
            linkList = JSON.parse(request.response);
            if (callback) callback(err);
        }
        if (request.status === 403) {
            err = request.status;
            if (callback) callback(err);
        }
    };
    request.send(null);
}

/**
 * Adds a new link to the list
 * @param user The user name
 * @param title The title of the link
 * @param url The url of the link
 * @param group The group where the link belongs to.
 */
function addLink(user, title, url, group) {
    var time = new Date().getTime();
    linkList.push({
        'id': user + '_' + time,
        'title' : title,
        'url' : url,
        'user': user,
        'group' : group,
        'rate': 0,
        'time': time,
        'comments': []
    });
}

/**
 * Adds the value to the current vote of the selected link.
 * @param id The id of the link
 * @param value The value to add (can be + or -)
 * @returns {number} the new vote value (or undef)
 */
function voteLink(id, value)
{
    var idx = getLinklistIndex(id);
    if (idx > -1) {
        linkList[idx].rate += value;
        return linkList[idx].rate;
    }
    return undefined;
}

/**
 * Adds the commentText to the selected link.
 * @param id The id of the link
 * @param commentText The comment text
 */
function addComment(id, commentText)
{
    var idx = getLinklistIndex(id);
    if (idx > -1) {
        var comments = getComments(id);
        comments.push({
            'user': 'test',
            'time': new Date().getTime(),
            'text': commentText});
        linkList[idx].comments = comments;
    }
}


/**
 * Gets the comments from the selected link.
 * @param id The id of the link
 * @returns {*} A list of comments (or an empty list)
 */
function getComments(id) {
    var idx = getLinklistIndex(id);
    if (idx > -1) {
        return linkList[idx].comments;
    }
    return [];
}

/**
 * Gets the index of a link in the link list.
 * @param id The id of the link.
 * @returns {number} the index of the link
 */
function getLinklistIndex(id)
{
    for (var i = 0 ; i < linkList.length; i++) {
        if (linkList[i].id === id)
        {
            return i;
        }
    }
    return -1;
}

