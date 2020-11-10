// registration employees and employers view
document.addEventListener("DOMContentLoaded", function() {
    const showMoreButton = document.querySelectorAll('.showMoreClass');
    const description = document.querySelectorAll('.description');

    showMoreButton.forEach((item, index) => {
        item.addEventListener('click', function(e) {
            if (description[index].style.display === "none") {
                console.log('display turns block')
                console.log(index)
                $('.description').eq(index).replaceWith(description[index].textContent)
                description[index].style.display = "block";
                showMoreButton[index].textContent = "Hide";
            } else{
                console.log('display turns none')
                console.log(index)
                description[index].style.display = "none";
            }
        })
    })
})