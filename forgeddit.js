/**
 * Created by martinlinggi on 22.05.14.
 */

window.onload = init;


/**
 * Creates the handlers for the buttons
 */
function init() {
    var addLinkButton = document.getElementById("sendLink");
    addLinkButton.onclick = addLinkHandler;

    var addTextButton = document.getElementById("sendText");
    addTextButton.onclick = addTextHandler;
    console.log("init");
}

/**
 * Handles the click on the button "send link"
 *
 * If the link-field is empty, no row is added to the table
 *
 * If the title-field is empty, the link itself is used as the title
 */
function addLinkHandler() {

    // get the values
    var titleInput = document.getElementById("linkTitle");
    var titleText = titleInput.value;

    var linkInput = document.getElementById("link");
    var link = linkInput.value;

    // create a link entry
    if (link.length > 0)
    {
        var tableNode = document.getElementById("linkTable");
        var tableBodyNodes = tableNode.getElementsByTagName("tbody");

        var trNode = document.createElement("tr");

        var rateNode = document.createElement("td");
        rateNode.innerHTML = "<a href='#'>-</a> 0 <a href='#'>+</a>";
        trNode.appendChild(rateNode);

        var  linkNode = document.createElement("td");
        var linkElement = document.createElement("a");
        linkElement.setAttribute("href", link);
        if (titleText.length > 0)
        {
            linkElement.innerHTML = titleText;
        }
        else
        {
            linkElement.innerHTML = link;
        }
        linkNode.appendChild(linkElement);
        trNode.appendChild(linkNode);

        var  timeNode = document.createElement("td");
        timeNode.innerHTML = "right now";
        trNode.appendChild(timeNode);

        var  toNode = document.createElement("td");
        toNode.innerHTML = "/r/test";
        trNode.appendChild(toNode);

        var  commentNode = document.createElement("td");
        commentNode.innerHTML = "0";
        trNode.appendChild(commentNode);

        tableBodyNodes[0].appendChild(trNode);

    }
    else
    {
        // TODO: Implemet user Feedback
        console.log("No Link provided");
    }
}

function addTextHandler() {
    console.log("Add Text Pressed");
}