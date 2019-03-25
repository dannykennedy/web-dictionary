var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {

        this.classList.toggle("active");
        var content = this.nextElementSibling;

        if (content.style.display === "block") {
            content.style.display = "none";
            this.style.color = 'black';
        } else {
            content.style.display = "block";
            this.style.color = 'white';
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
        // headwords, English reverses, variants
        wordsToSearch = list[i].querySelectorAll(".lx, .re, .va");

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
