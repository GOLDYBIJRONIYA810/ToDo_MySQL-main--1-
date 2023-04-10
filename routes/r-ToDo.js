const router = require('express').Router()
const toDoController = require('../controller/ToDoContoller')

router.get('/', toDoController.index)
router.post('/addToDo', toDoController.addTodo)
router.delete('/deleteAll', toDoController.deleteAll)

module.exports = router