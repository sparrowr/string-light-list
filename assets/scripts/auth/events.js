'use strict'

// const getFormFields = require('../../lib/get-form-fields')
const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const store = require('../store')

const onSignUp = function onSignUp (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

const onSignIn = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

const onChangePassword = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}

const onSignOut = function (event) {
  event.preventDefault()
  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

const showSignUp = function showSignUp () {
  event.preventDefault()
  hideAuth()
  const signUpForm = document.createElement('form')
  signUpForm.setAttribute('class', 'border')
  signUpForm.setAttribute('id', 'sign-up')
  const emailField = document.createElement('input')
  emailField.setAttribute('type', 'email')
  emailField.setAttribute('name', 'credentials[email]')
  emailField.setAttribute('placeholder', 'email address')
  signUpForm.appendChild(emailField)
  const passwordField = document.createElement('input')
  passwordField.setAttribute('type', 'password')
  passwordField.setAttribute('name', 'credentials[password]')
  passwordField.setAttribute('placeholder', 'password')
  signUpForm.appendChild(passwordField)
  const passwordConfirmField = document.createElement('input')
  passwordConfirmField.setAttribute('type', 'password')
  passwordConfirmField.setAttribute('name', 'credentials[confirm_password]')
  passwordConfirmField.setAttribute('placeholder', 'confirm password')
  signUpForm.appendChild(passwordConfirmField)
  const submitButton = document.createElement('input')
  submitButton.setAttribute('type', 'submit')
  submitButton.setAttribute('class', 'btn')
  submitButton.setAttribute('value', 'Sign up!')
  signUpForm.appendChild(submitButton)
  signUpForm.addEventListener('submit', onSignUp)
  document.getElementById('auth-area').appendChild(signUpForm)
}

const showSignIn = function showSignIn () {
  event.preventDefault()
  hideAuth()
  const signInForm = document.createElement('form')
  signInForm.setAttribute('class', 'border')
  signInForm.setAttribute('id', 'sign-up')
  const emailField = document.createElement('input')
  emailField.setAttribute('type', 'email')
  emailField.setAttribute('name', 'credentials[email]')
  emailField.setAttribute('placeholder', 'email address')
  signInForm.appendChild(emailField)
  const passwordField = document.createElement('input')
  passwordField.setAttribute('type', 'password')
  passwordField.setAttribute('name', 'credentials[password]')
  passwordField.setAttribute('placeholder', 'password')
  signInForm.appendChild(passwordField)
  const submitButton = document.createElement('input')
  submitButton.setAttribute('type', 'submit')
  submitButton.setAttribute('class', 'btn')
  submitButton.setAttribute('value', 'Sign in!')
  signInForm.appendChild(submitButton)
  signInForm.addEventListener('submit', onSignIn)
  document.getElementById('auth-area').appendChild(signInForm)
}

const showChangePassword = function showChangePassword () {
  event.preventDefault()
  hideAuth()
  const changePasswordForm = document.createElement('form')
  changePasswordForm.setAttribute('class', 'border')
  changePasswordForm.setAttribute('id', 'change-password')
  const oldPasswordField = document.createElement('input')
  oldPasswordField.setAttribute('type', 'password')
  oldPasswordField.setAttribute('name', 'passwords[old]')
  oldPasswordField.setAttribute('placeholder', 'old password')
  changePasswordForm.appendChild(oldPasswordField)
  const newPasswordField = document.createElement('input')
  newPasswordField.setAttribute('type', 'password')
  newPasswordField.setAttribute('name', 'passwords[new]')
  newPasswordField.setAttribute('placeholder', 'new password')
  changePasswordForm.appendChild(newPasswordField)
  const submitButton = document.createElement('input')
  submitButton.setAttribute('type', 'submit')
  submitButton.setAttribute('class', 'btn')
  submitButton.setAttribute('value', 'Change password!')
  changePasswordForm.appendChild(submitButton)
  changePasswordForm.addEventListener('submit', onChangePassword)
  document.getElementById('auth-area').appendChild(changePasswordForm)
}

const hideAuth = function hideAuth () {
  $('#auth-area').html('')
  $('#game-area').html('')
}

const showAuth = function showAuth () {
  // show some authy things!
  hideAuth()
  $('#auth-area').html('<p class="warning">This is a student front-end project sending data to an educational API. There is no privacy policy! Please don\'t use credentials you have used anywhere important.<p>')
  if (store.user) {
    // show change password and sign out
    const changePasswordShow = document.createElement('form')
    const changePasswordShowButton = document.createElement('input')
    changePasswordShowButton.setAttribute('type', 'submit')
    changePasswordShowButton.setAttribute('class', 'btn')
    changePasswordShowButton.setAttribute('value', 'Change password')
    changePasswordShow.appendChild(changePasswordShowButton)
    changePasswordShow.addEventListener('submit', showChangePassword)
    document.getElementById('auth-area').appendChild(changePasswordShow)

    // doesn't display a form, just instantly does the thing
    const signOut = document.createElement('form')
    const signOutButton = document.createElement('input')
    signOutButton.setAttribute('type', 'submit')
    signOutButton.setAttribute('class', 'btn')
    signOutButton.setAttribute('value', 'Sign out')
    signOut.appendChild(signOutButton)
    signOut.addEventListener('submit', onSignOut)
    document.getElementById('auth-area').appendChild(signOut)
  } else {
    const signUpShow = document.createElement('form')
    const signUpShowButton = document.createElement('input')
    signUpShowButton.setAttribute('type', 'submit')
    signUpShowButton.setAttribute('class', 'btn')
    signUpShowButton.setAttribute('value', 'Sign up')
    signUpShow.appendChild(signUpShowButton)
    signUpShow.addEventListener('submit', showSignUp)
    document.getElementById('auth-area').appendChild(signUpShow)

    const signInShow = document.createElement('form')
    const signInShowButton = document.createElement('input')
    signInShowButton.setAttribute('type', 'submit')
    signInShowButton.setAttribute('class', 'btn')
    signInShowButton.setAttribute('value', 'Sign in')
    signInShow.appendChild(signInShowButton)
    signInShow.addEventListener('submit', showSignIn)
    document.getElementById('auth-area').appendChild(signInShow)
  }
}

const onShowAuth = function onShowAuth () {
  event.preventDefault()
  showAuth()
}

const addHandlers = () => {
  $('#show-auth').on('submit', onShowAuth)
}

module.exports = {
  addHandlers
}
