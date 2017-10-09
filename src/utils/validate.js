const usernameValidator = username => {
  const _username = username.trim()

  if (!username) {
    return false
  }

  if (_username.length >= 20) {
    return false
  }

  return true
}

const passwordValidator = password => {
  const _password = password.trim()

  if (!_password) {
    return false
  }

  return true
}

export { usernameValidator, passwordValidator }
