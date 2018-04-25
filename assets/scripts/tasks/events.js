'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const store = require('../store')

const onAddNewTask = function onAddNewTask (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  // every newly-created task has the 'open' condition
  data.task.condition = 'open'
  if (store.user) {
    data.task.user_id = store.user.id
    console.log(data)
    api.addTask(data)
      .then(ui.addTaskSuccess)
      .catch(ui.addTaskFailure)
  } else {
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

const displayOneTask = function displayOneTask (task) {
  // create task UI element
  // attach buttons with event listeners to complete and edit
  // append this element as a child of the task-area div
  console.log(task)
  const taskElement = document.createElement('form')
  const editTaskButton = document.createElement('input')
  const taskInfo = document.createElement('p')
  taskInfo.setAttribute('value', task.text)
  taskElement.appendChild(taskInfo)
  editTaskButton.setAttribute('type', 'submit')
  taskElement.appendChild(editTaskButton)
  document.getElementById('task-area').appendChild(taskElement)
}

const displayAllTasks = function displayAllTasks () {
  // if user, fetch user's tasks
  if (store.user) {
    // api call here
    api.getAllTasks()
      .then(ui.getAllTasksSuccess)
      .catch(ui.getAllTasksFailure)
  }
  // if no tasks, do nothing
  // if there's no user and no tasks, do nothing
  if (!store.tasks) {
    return
  }
  // iterate over tasks, displaying only the ones belonging to this user
  for (let i = 0; i < store.tasks.length; i++) {
    if (store.tasks[i].user.id === store.user.id && store.tasks[i].condition !== 'closed') {
      displayOneTask(store.tasks[i])
    }
  }
}

const hideTasks = function hideTasks () {
  $('#task-area').html('')
}

const displayHideTasksButton = function displayHideTasksButton () {
  // display "hide all tasks" button
  const hideTasksForm = document.createElement('form')
  const hideTasksButton = document.createElement('input')
  hideTasksButton.setAttribute('type', 'submit')
  hideTasksButton.setAttribute('class', 'btn')
  hideTasksButton.setAttribute('value', 'Hide Tasks')
  hideTasksForm.appendChild(hideTasksButton)
  hideTasksForm.addEventListener('submit', hideTasks)
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
    $('#task-area').html('<p class="welcome">Welcome, guest! Since you aren\'t logged in, no information will be saved.<p>')
  }
  // display "hide all tasks" button
  displayHideTasksButton()
  // display list of tasks, each of which has "finish" and "edit" buttons
  displayAllTasks()
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
  addHandlers
}
