
// modal
$('#signupButton').click(() => {
  $('.ui.modal').modal('show')
})

$('.ui.modal').modal('setting', {
  onApprove: () => {
    $('#loginForm form').submit()
    return false
  },
  onDeny: () => {
    return
  }
})

// login form
$('#loginForm form').submit((e) => {
  e.preventDefault()
})

// signup form
$('#signupForm form').submit((e) => {
  e.preventDefault()  
})