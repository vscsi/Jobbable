// registration employees and employers view
document.addEventListener("DOMContentLoaded", function() {
    const showMoreButton = document.querySelectorAll('.showMoreClass');
    const description = document.querySelectorAll('.description');
    
    showMoreButton.forEach((item, index) => {
      item.addEventListener('click', function(e) {
        if (description[index].style.display === "none") {
            $('.description').eq(index).replaceWith(description[index].textContent)
                description[index].style.display = "block";
                showMoreButton[index].innerHTML = "Hide";
            } else {
                description[index].style.display = "none";
            }
        })
    })
})