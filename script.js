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

function myFunction() {

    var input, filter, ul, list, a, i, txtValue;

    input = document.getElementById("myInput");

    filter = input.value.toUpperCase();

    list = document.getElementsByTagName("article");

    for (i = 0; i < list.length; i++) {
        a = list[i].getElementsByClassName("lx")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            list[i].style.display = "";
        } else {
            list[i].style.display = "none";
        }
    }
}
