'use strict'

const store = require('../store')
const events = require('./events')
const failureColor = '#d9d2e9'
const successColor = '#d0e0e3'

const newTaskSuccess = function () {
  $('#message').text('Successfully created task')
  $('#message').css('background-color', successColor)
  events.showTasks()
}

const newTaskFailure = function () {
  $('#message').text('Failure creating task')
  $('#message').css('background-color', failureColor)
}

const getAllTasksSuccess = function (data) {
  $('#message').text('Successfully got tasks from api')
  $('#message').css('background-color', successColor)
  store.tasks = data.tasks
}

const getAllTasksFailure = function () {
  $('#message').text('Failure getting tasks from api')
  $('#message').css('background-color', failureColor)
}

module.exports = {
  newTaskSuccess,
  newTaskFailure,
  getAllTasksSuccess,
  getAllTasksFailure
}
