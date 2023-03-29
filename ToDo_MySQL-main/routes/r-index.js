const rToDo = require('./r-ToDo')

module.exports = (app) => {
    app.use("/toDo", rToDo)
}
