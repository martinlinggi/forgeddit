/**
 * Created by martinlinggi on 22.05.14.
 */

jQuery(document).ready(function() {

    console.log('Document ready');
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

    // At least a link is mandatory
    if (link.length > 0) {
        addLinkListEntry(title, link, text);
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

    // At least the title is mandatory
    if (title.length > 0) {
        addLinkListEntry(title, link, text);
    }
    else
    {
        console.log('Error: No text provided.');
        // TODO: Inform the user about the error
    }
}

function onRemoveText() {
    // TODO: Implement it
}

/**
 * Creates the list-element for the link-list.
 * @param title Title of the entry
 * @param link  Link of the element
 * @param text  Text of the Element
 * @returns {*|jQuery} List-element
 */
function createLinkListItem() {
    return $('<li>').addClass('linkItem');
}

/**
 * Creates the div-element for the rate-value
 * @returns {void|jQuery} The div-element
 */
function createRateDiv() {
    return $('<div>').addClass('rate').append('<p>+</p><p>0</p><p>-</p>');
}

/**
 * Creates a new entry in the link list
 * @param title The title either from linkTitle or textTitle input field
 * @param link  The link from the link input field
 * @param text  The text from the text input field
 */
function addLinkListEntry(title, link, text)
{
    // create a link entry
    var $thumbDiv = createThumbDiv(link);

    var $listItem = createLinkListItem()
        .append(createRateDiv())
        .append($thumbDiv)
        .append(createEntryDiv(title, link, text ))
        .append(createResetDiv());
    $('#linkList').prepend($listItem);

    // If a link is provided, try to load an image. Is successful  make thumbnail visible
    if (link.lenght > 0) {
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
 * @param link  The link from the link input field
 * @param text  The text from the text input field
 * @returns {void|jQuery}
 */
function createEntryDiv(title, link, text) {
    if (link.length > 0 && title.length === 0) {
        title = link;
    }
    var $entryItem = $('<div>').addClass('entry')
        .append(createLinkHtml(title, link, text))
        .append('<p class="info">Subbmitted a few Seconds ago from <a href="#">TestUser</a> to <a href="#">/r/Fun</a></p>')
        .append('<p class="actionList">' +
            '<a href="#">0 Comments</a>' +
            '<a href="#">Share</a>' +
            '<a href="#">Hide</a>' +
            '<a href="#">Blame</a>' +
            '<a href="#">Remove</a>');
    return $entryItem;
}

/**
 * Creates a (empty) div for layout-clearing
 * @returns {*|jQuery} The div-element
 */
function createResetDiv()
{
    return $('<div>').addClass('reset');
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