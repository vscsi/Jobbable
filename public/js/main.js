// registration employees and employers view
// document.addEventListener("DOMContentLoaded", function() {
    const showMoreButton = document.querySelectorAll('.showMoreClass');
    const description = document.querySelectorAll('.description');
    const how_to_apply = document.querySelectorAll('.how_to_apply');
    // showMoreButton.forEach((item, index) => {
    //     item.addEventListener('click', function(e) {
    //         if (description[index].style.display === "none") {
    //             // console.log('display turns block')
    //             // console.log(index)
    //             $('.description').eq(index).replaceWith(description[index].textContent)
    //             description[index].style.display = "block";
    //             showMoreButton[index].textContent = "Hide";
    //         } else{
        //             // console.log('display turns none')
        //             // console.log(index)
    //             description[index].style.display = "none";
    //         }
    //     })
    // })
    for(let i = 0; i< how_to_apply.length; i++){
        $('.how_to_apply').eq(i).replaceWith(how_to_apply[i].textContent);
    }
    
    
// })