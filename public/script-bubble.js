var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {

        this.classList.toggle("active");
        var content = this.nextElementSibling;
        
        var pos = this.getElementsByClassName("ps")[0];

        if (content.style.display === "block") {
            content.style.display = "none";
            this.style.color = 'black';
            pos.style.color = 'brown';
        } else {
            content.style.display = "block";
            this.style.color = 'white';
            pos.style.color = 'white';
            //Keep the card looking good
            this.style.borderBottomLeftRadius = '0px';
            this.style.borderBottomRightRadius = '0px';
        }

    });
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

            txtValue = wordsToSearch[j].textContent || wordsToSearch[j].innerText;

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
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("help");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

document.getElementById("current-year").innerHTML = new Date().getFullYear();













