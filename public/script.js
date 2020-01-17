var youtubeVideos = {
    barrk: ["fdT36gy5Iwk"],
    dilebang: ["LLf6Ww3DOZg"],
    ngarrbek: ["UDTDC0g7lhc"],
    kurdukadji: ["OLN4F3TAIlI"],
    manmorlak: ["ef9BTppiNOs"],
    kudjewk: ["s8f-E6MX_u0"],
    mankolhde: ["s8f-E6MX_u0"],
    Manginburru: ["oAnYGo9tM68"],
    kinga: ["yYZvaEVQ5Jo"],
    kinje: ["jUndhLHRMxk"],
    rdardda: ["SVncU6il89M"],
    nan: ["-9uBU6M4eb4"],
    duruk: ["-9uBU6M4eb4"],
    re: ["mBw-vGTiiAs"],
    kokok: ["mBw-vGTiiAs"],
    dja: ["2jFWd9UQRkY"],
    wurdurd: ["7k8t2kt0uY8"],
    kakkak: ["oDFW5c0eynQ"],
    bonome: ["B2FD6qgXyTM"],
    nawaran: ["CUg-fwXSdmc"],
    nabiwo: ["B99MHf4SAfY"],
    bininj: ["PRuAXIukjT0"],
    bobbidj: ["B99MHf4SAfY"],
    budjiked: ["CwDnaoTt-Kc"],
    kawk: ["Is-qGjF02_E"],
    adjbud: ["rmLVxRS_Sxs"],
    baleh: ["3PMhYgLNCR0"],
    bang: ["UCliPHwJbio"],
    bangkerreng: ["TWQYlrxnVs0"],
    baye: ["8rKQDUetQLQ"],
    bobo: ["btPBmE6zWHY"],
    borrkke: ["PRuAXIukjT0"],
    daluk: ["iZOHcpzzbAI"],
    delek: ["tVkLnvX0SFs"],
    djenj: ["cULr5HWMB7E"],
    kaluk: ["e-4_pR1ZdTs"],
    karrme: ["UCliPHwJbio"],
    kunborrk: ["PRuAXIukjT0"],
    kunmadj: ["na8Wxv3hQ2c"],
    kunj: ["kKmISBjkl_o"],
    kunkerri: ["IecCxA2_riE"],
    kunwardde: ["WsT6W_XEXoQ"],
    mandudjmi: ["gDlWqvLGMzU"],
    manme: ["h_y9nnPOz6A"],
    mawah: ["eY17eNqrDKQ"],
    mayahme: ["IZV-ZAYi--g"],
    Nawalabik: ["AmpQV-m8CgA"],
    ngalkangila: ["mVvMkbUD3hg"],
    ngalmangiyi: ["YvDSKag58p0"],
    ngun: ["-g9VEeWgHK4"],
    njalehnjale: ["UCliPHwJbio"],
    norne: ["zVsqfFa7VyY"],
    ngardderrhwo: ["AYGd4yqAEmI"],
    nuk: ["U18WbIbQKSA"],
    wirlarrk: ["cHrA6ADAIvg"],
    wurdyaw: ["xpTJydky31I"],
    yuwn: ["UCliPHwJbio"]
}
// other potential videos:
// https://www.youtube.com/watch?v=mvot4Bwi4Jg
// https://www.youtube.com/watch?v=SNXVi1zdub0

function fetchAudio() {
    var sound = document.createElement("audio");
    sound.controls = "controls";
    sound.src = this.getAttribute("data-src");
    sound.type = "audio/mpeg";
    this.parentElement.appendChild(sound);
    this.style.display = "none";
    sound.play();
}

var vimeoVideos = {
    manngukmanj: ["94624139"],
    mandjedj: ["62984950"],
    mandjungkurrk: ["62984950"],
    burdebme: ["205979348"],
    kunak: ["205979348"],
    kunngobarn: ["160059928"],
    dowen: ["105725482"],
    bim: ["49526055"],
    bukirri: ["92009110"],
    rongmang: ["90834965"],
    rarrk: ["100871631"],
    ngalwakadj: ["180011184"]
}

function embedVideo(headword, cardButton) {
    var baseUrl, videoSources;
    if (youtubeVideos[headword]){
        baseUrl = "https://www.youtube.com/embed/";
        videoSources = youtubeVideos[headword];
    } else if (vimeoVideos[headword]){
        baseUrl = "https://player.vimeo.com/video/";
        videoSources = vimeoVideos[headword];
    } else {
        return;
    }

    var mediaDiv = document.createElement("div");
    mediaDiv.classList = "media-item resp-container";
    for (var i = 0; i < videoSources.length; i++) {
        console.log(videoSources[i]);
        var frame = document.createElement("iframe");
        frame.setAttribute("src", baseUrl + videoSources[i]);
        frame.setAttribute("frameborder", "0");
        frame.setAttribute("allow", "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture");
        frame.setAttribute('allowFullScreen', '');
        frame.classList = "resp-iframe";
        mediaDiv.appendChild(frame);
    }
    var contentArea = cardButton.parentElement.getElementsByClassName("content")[0];
    if (contentArea) {
        contentArea.appendChild(mediaDiv);
    }
}



// Add "fetchAudio"
var coll = document.getElementsByClassName("audio-button");
var i;
for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", fetchAudio);
}

// See when someone navigates to a particular word, e.g. njamed.com/#mimih, and open that card
function processUrl() {
    //Open card that we're navigating to.
    if (window.location.hash) {
        var wordToOpen = window.location.hash.split("#")[1];
        console.log(wordToOpen);

        var card = document.getElementById(wordToOpen);

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
window.onscroll = function () {
    if (document.getElementsByClassName("padded")) {
        if (document.getElementsByClassName("padded")[0]) {
            document.getElementsByClassName("padded")[0].style.paddingTop =
                "0px";
        }
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

    var headword = this.getElementsByClassName("lx")[0].innerHTML;
    embedVideo(headword, this);

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
btn.onclick = function () {
    modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

document.getElementById("current-year").innerHTML = new Date().getFullYear();
