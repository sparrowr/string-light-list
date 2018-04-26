'use strict'

const failureColor = '#d9d2e9'

const newTaskFailure = function () {
  $('#message').text('Failure creating task')
  $('#message').css('background-color', failureColor)
}

const getAllTasksFailure = function () {
  $('#message').text('Failure getting tasks from api')
  $('#message').css('background-color', failureColor)
}

const updateTaskFailure = function () {
  $('#message').text('Failure updating task')
  $('#message').css('background-color', failureColor)
}

module.exports = {
  newTaskFailure,
  getAllTasksFailure,
  updateTaskFailure
}
