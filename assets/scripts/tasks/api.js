'use strict'

const config = require('../config')
const store = require('../store')

const addTask = function (data) {
  return $.ajax({
    url: config.apiUrl + '/tasks',
    method: 'POST',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const getAllTasks = function () {
  return $.ajax({
    url: config.apiUrl + '/tasks',
    method: 'GET',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  addTask,
  getAllTasks
}
