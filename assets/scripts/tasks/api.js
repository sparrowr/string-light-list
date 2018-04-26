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

const updateTask = function (id, data) {
  return $.ajax({
    url: config.apiUrl + '/tasks/' + id,
    method: 'PATCH',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

module.exports = {
  addTask,
  getAllTasks,
  updateTask
}
