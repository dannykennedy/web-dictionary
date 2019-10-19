function getAudio() {
    var audioElem = this.parentElement.getElementsByTagName("audio")[0];
    var source = audioElem.getAttribute("data-src");
    audioElem.setAttribute("src", source);
    audioElem.style.display = "block";
    this.style.display = "none";
}

// Add "click to open"
var coll = document.getElementsByClassName("audio-button");
var i;
for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", getAudio);
}

// See when someone navigates to a particular word, e.g. njamed.com/#mimih, and open that card
function processUrl() {
    //Open card that we're navigating to.
    if (window.location.hash) {
        const wordToOpen = window.location.hash.split("#")[1];
        console.log(wordToOpen);

        let card = document.getElementById(wordToOpen);

        if (card) {
            //Need to pad the top, otherwise navbar will hide them
            card.style.paddingTop = "100px";
            card.classList.add("padded");
            //Open the card
            card.getElementsByClassName("collapsible")[0].click();
        }
    }
}

// Remove padding from hash elements
window.onscroll = function() {
    if (document.getElementsByClassName("padded")) {
        document.getElementsByClassName("padded")[0].style.paddingTop = "0px";
    }
};

function hashHandler(event) {
    const wordToOpen = event.newURL.split("#")[1];
    console.log("The hash has changed to: " + wordToOpen);
    let btn = document
        .getElementById(wordToOpen)
        .getElementsByClassName("collapsible")[0];
    btn.click();
}
window.addEventListener("hashchange", hashHandler, false);

// Add "click to open"
var coll = document.getElementsByClassName("collapsible");
var i;
for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", openCard);
}

function openCard() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;

    var pos = this.getElementsByClassName("ps")[0];

    var css = ".collapsible:hover {color: white;}";
    var style = document.createElement("style");

    if (content.style.display === "block") {
        content.style.display = "none";
        this.style.color = "black";
        pos.style.color = "brown";

        let collapsibles = document.getElementsByClassName("collapsible");
        for (var i = 0; i < collapsibles.length; i++) {
            collapsibles[i].appendChild(style);
        }
    } else {
        content.style.display = "block";
        this.style.color = "white";
        pos.style.color = "white";
        //Keep the card looking good
        this.style.borderBottomLeftRadius = "0px";
        this.style.borderBottomRightRadius = "0px";
    }
}

function filterWords() {
    var input, filter, ul, list, headwords, i, j, txtValue;

    // Get value from search box, convert to upper case
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();

    // Get all entries
    list = document.getElementsByTagName("article");

    for (i = 0; i < list.length; i++) {
        // Get list of words to search:
        // headwords, English reverses, variants, dialect variations
        wordsToSearch = list[i].querySelectorAll(".lx, .re, .va, .ur");

        // Loop through all words and look for the substring
        let found = false;
        for (j = 0; j < wordsToSearch.length; j++) {
            txtValue =
                wordsToSearch[j].textContent || wordsToSearch[j].innerText;

            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                found = true;
            }
        }

        // If there's not a substring match, hide the entry
        if (found == true) {
            list[i].style.display = "";
        } else {
            list[i].style.display = "none";
        }
    }
}

// MODAL

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("help");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

document.getElementById("current-year").innerHTML = new Date().getFullYear();
