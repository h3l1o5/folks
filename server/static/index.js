
// modal
$('#signupButton').click(() => {
  $('.ui.modal').modal('show')
})

$('.ui.modal').modal('setting', {
  onApprove: () => {
    $('#signupForm form').submit()
    return false
  },
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
      localStorage.setItem('jwt', res.data.token)
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
const signupUsernameField = $('#signupForm #usernameField')
const signupEmailField = $('#signupForm #emailField')
const signupPasswordGroupField = $('#signupForm #passwordGroupField')
const signupButton = $('.positive.button')
const cancelButton = $('.deny.button')

const signupUsernameInput = $('#signupForm #usernameField input')
const signupEmailInput = $('#signupForm #emailField input')
const signupPasswordInput = $('#signupForm #passwordField input')
const signupPasswordComfirmationInput = $('#signupForm #passwordComfirmationField input')


$('#signupForm form').submit((e) => {
  e.preventDefault()
  let isValid = true

  if (!e.target.username.value) {
    signupUsernameField.addClass('error')
    isValid = false
  } else {
    signupUsernameField.removeClass('error')    
  }

  if (!e.target.email.value) {
    signupEmailField.addClass('error')
    isValid = false
  } else {
    signupEmailField.removeClass('error')    
  }

  if (e.target.password.value !== e.target.passwordComfirmation.value) {
    signupPasswordGroupField.addClass('error')
    isValid = false
  } else {
    signupPasswordGroupField.removeClass('error')    
  }

  if (!isValid) {
    return 
  } else {
    signupButton.addClass('loading')
    signupButton.addClass('disabled')
    cancelButton.addClass('disabled')
    signupUsernameInput.prop('disabled', true)
    signupEmailInput.prop('disabled', true)
    signupPasswordInput.prop('disabled', true)
    signupPasswordComfirmationInput.prop('disabled', true)
    
    
    axios.post('/api/v1/users', {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value
    })
    .then((res) => {
      signupButton.removeClass('loading')
      $('#signupForm form').addClass('success')
    })
    .catch((err) => {
      signupButton.removeClass('loading')
      signupButton.removeClass('disabled')
      cancelButton.removeClass('disabled')  
      signupUsernameInput.prop('disabled', false)
      signupEmailInput.prop('disabled', false)
      signupPasswordInput.prop('disabled', false)
      signupPasswordComfirmationInput.prop('disabled', false)  
      $('#signupForm form').addClass('error')
      $('#signupForm form .error.message p').html(err.response.data.error.message)

      if (err.response.data.error.code === 'USERNAME') {
        signupUsernameField.addClass('error')    
      } else {
        signupUsernameField.removeClass('error')            
      }

      if (err.response.data.error.code === 'EMAIL') {
        signupEmailField.addClass('error')
      } else {
        signupEmailField.removeClass('error')        
      }
    })
  }
})