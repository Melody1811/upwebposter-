document.addEventListener('DOMContentLoaded', function() {
    let poyavis = document.querySelectorAll(".poyavis");
    let block1 = document.querySelectorAll(".block1");

    block1.forEach(function(element) {
        element.addEventListener("click", function(){
            poyavis.forEach(function(item) {
                if (item.style.display === "none") {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            });
        });
    });

    let modal = document.getElementById("modal");
    let openmodal = document.querySelector(".allposters");
    let closemodal = document.querySelector(".close");

    openmodal.addEventListener("click", function(){
    modal.style.display = "block";
    });

    closemodal.addEventListener("click", function(){
    modal.style.display = "none";

    });

});


document.addEventListener("DOMContentLoaded", function() {
    let clickCount = 0;
  
    document.getElementById("space1").addEventListener("click", function() {
    clickCount++;
    
    if (clickCount === 1) {
      this.src = "./img/spacee1.svg"; 
    } else if (clickCount === 2) {
      this.src = "./img/spacee2.svg"; 
    } else if (clickCount === 3) {
      this.src = "./img/spacee3.svg";
      clickCount = 0; 
    }
    });
  });