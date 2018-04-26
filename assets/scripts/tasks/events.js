'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const store = require('../store')
const successColor = '#d0e0e3'

const newTaskSuccess = function () {
  $('#message').text('Successfully created task')
  $('#message').css('background-color', successColor)
  showTasks()
}

const onAddNewTask = function onAddNewTask (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  // every newly-created task has the 'open' condition
  data.task.condition = 'open'
  if (store.user) {
    data.task.user_id = store.user.id
    console.log(data)
    api.addTask(data)
      .then(newTaskSuccess)
      .catch(ui.addTaskFailure)
  } else {
    data.task.id = store.tasks.length
    store.tasks.push(data.task)
    showTasks()
  }
}

const displayAddNewTask = function displayAddNewTask (task) {
  // generate "Add New Task" form with event listener
  const newTaskForm = document.createElement('form')
  const newTaskButton = document.createElement('input')
  const taskField = document.createElement('input')
  taskField.setAttribute('type', 'text')
  taskField.setAttribute('name', 'task[text]')
  taskField.setAttribute('placeholder', 'task information')
  newTaskForm.appendChild(taskField)
  newTaskButton.setAttribute('type', 'submit')
  newTaskButton.setAttribute('class', 'btn')
  newTaskButton.setAttribute('value', 'Add')
  newTaskForm.appendChild(newTaskButton)
  newTaskForm.addEventListener('submit', onAddNewTask)
  // append this form as a child of the task-area div
  document.getElementById('task-area').appendChild(newTaskForm)
}

const onClickDone = function onClickDone () {
  event.preventDefault()
  console.log('done was clicked' + this.id)
}

const onClickEdit = function onClickEdit () {
  event.preventDefault()
  console.log('edit was clicked' + this.id)
}
const displayOneTask = function displayOneTask (task) {
  // create task UI element as an inline form with read-only text
  // attach buttons with event listeners to complete and edit
  // append this element as a child of the task-area div
  console.log(task)
  const taskIdHTML = '<form class="form-inline" form id="task-'
  const taskTextHTML = '"> <div class="form-group mb-2"> <input type="text" readonly class="form-control-plaintext task" value='
  const doneButtonHTML = '> </div> <button type="submit" class="btn btn-primary mb-2 done" id="#done-'
  const editButtonHTML = '">Done</button><button type="submit" class="btn btn-primary mb-2 edit" id="#edit-'
  const postTaskHTML = '">Edit</button> </form>'
  const formId = '#task-' + task.id
  const allTheHTML = taskIdHTML + task.id + taskTextHTML + task.text + doneButtonHTML + task.id + editButtonHTML + task.id + postTaskHTML
  $('#task-area').append(allTheHTML)
  $(formId).on('click', '.done', onClickDone)
  $(formId).on('click', '.edit', onClickEdit)
}

const getAllTasksSuccess = function (data) {
  $('#message').text('Successfully got tasks from api')
  $('#message').css('background-color', successColor)
  store.tasks = data.tasks
  displayAllTasks()
}

const getTasks = function getTasks () {
  // if user, fetch user's tasks
  if (store.user) {
    // api call here
    api.getAllTasks()
      .then(getAllTasksSuccess)
      .catch(ui.getAllTasksFailure)
    return
  }
  if (!store.tasks) {
    console.log('no tasks')
    store.tasks = []
  } else {
    displayAllTasks()
  }
}

const displayAllTasks = function displayAllTasks () {
  // iterate over tasks, displaying only the ones belonging to this user
  for (let i = 0; i < store.tasks.length; i++) {
    if (!store.user) {
      displayOneTask(store.tasks[i])
    } else if (store.tasks[i].user.id === store.user.id && store.tasks[i].condition !== 'done') {
      displayOneTask(store.tasks[i])
    }
  }
}

const hideTasks = function hideTasks () {
  $('#task-area').html('')
}

const onHideTasks = function onHideTasks () {
  event.preventDefault()
  hideTasks()
}

const displayHideTasksButton = function displayHideTasksButton () {
  // display "hide all tasks" button
  const hideTasksForm = document.createElement('form')
  const hideTasksButton = document.createElement('input')
  hideTasksButton.setAttribute('type', 'submit')
  hideTasksButton.setAttribute('class', 'btn')
  hideTasksButton.setAttribute('value', 'Hide Tasks')
  hideTasksForm.appendChild(hideTasksButton)
  hideTasksForm.addEventListener('submit', onHideTasks)
  document.getElementById('task-area').appendChild(hideTasksForm)
}

const showTasks = function showTasks () {
  // show task stuff!
  console.log('showTasks in events.js was called!')
  hideTasks()
  if (store.user) {
    // if signed in, welcome user
    $('#task-area').html('<p class="welcome">Welcome, ' + store.user.email + '! Your information will be saved.<p>')
  } else {
    // if not signed in, welcome guest
    $('#task-area').html('<p class="welcome">Welcome, guest! Since you aren\'t logged in, no information will be saved when you leave or refresh this page.<p>')
  }
  // display "hide all tasks" button
  displayHideTasksButton()
  // get and display tasks
  getTasks()
  // display "add new task" form with text box
  displayAddNewTask()
}

const onShowTasks = function onShowTasks () {
  event.preventDefault()
  showTasks()
}

const addHandlers = () => {
  $('#show-task').on('submit', onShowTasks)
}

module.exports = {
  addHandlers,
  showTasks,
  hideTasks
}
