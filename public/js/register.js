// registration employees and employers view
$(document).ready(function() {
  const select = document.getElementById('mySelect')
  // const employerOption = select.options[2];
  let click = 0;

  select.addEventListener('input', function(e) {
    let optionTarget = e.target.value;
    if (optionTarget == 'employer' && click === 0) {
      $('.form :nth-child(7)').append(
        `<div class='inputfield' id='businessRegNo'>
        <label>Business Registration Number</label>
        <input name="businessRegNo" type="text" class="input">
        </div>
        
        <div class='inputfield' id='payment'>
        <label>Do you want to upgrade to premium plan?</label>
        <input name="payment" type="checkbox" class="input">
        </div>
        `
        );
        click++;
        console.log(click);
      } else {
        click = 0;
        $('#businessRegNo').remove()
        $('#payment').remove();
      }
  })
})
