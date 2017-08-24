
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
const loginUsernameField = $('#loginForm #usernameField')
const loginPasswordField = $('#loginForm #passwordField')
const loginButton = $('#loginForm button')

$('#loginForm form').submit((e) => {
  e.preventDefault()
  let isValid = true

  if (!e.target.username.value) {
    loginUsernameField.addClass('error')
    isValid = false
  } else {
    loginUsernameField.removeClass('error')    
  }
  
  if (!e.target.password.value) {
    loginPasswordField.addClass('error')
    isValid = false
  } else {
    loginPasswordField.removeClass('error')    
  }

  if (!isValid) {
    return
  } else {
    loginButton.addClass('loading')
    loginButton.prop('disabled', true)
    
    axios.post('/api/v1/auth', {
      username: e.target.username.value,
      password: e.target.password.value
    })
    .then((res) => {
      loginButton.removeClass('loading')
      loginButton.prop('disabled', false)
      window.location = "/app"
    })
    .catch((err) => {
      loginButton.removeClass('loading')
      loginButton.prop('disabled', false)
      $('#loginForm form').addClass('error')
    })
  }


})

// signup form
$('#signupForm form').submit((e) => {
  e.preventDefault()  
})