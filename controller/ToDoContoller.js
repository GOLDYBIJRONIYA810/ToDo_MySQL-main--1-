const todos = require("../models/todos")

const TODO = []
let id = 0

const index = async(req, res) => {
    try {
        const findAllToDo = await todos.findAll({where : {userId : req.user.id}})
        console.log("findallworking");

        return res.render('ToDo', {findAllToDo})
    } catch (error) {
        console.error(error)
        
    }
}

const addTodo = async(req, res) => {
    try {
        const reqData = req.body;
        const userId = req.user.id;
        if (!reqData.taskinput) {
            return res.send('please fill all mandatory fields') // validation
        }
        const insertData = await todos.create({
            todo: reqData.taskinput,
            userId,
            isDone: false
        })
        if(!insertData){
            return res.send("Something went wrong");
        }

        return res.json({ message: 'ToDo added successfully!', status: true, toDoObj : insertData })
    } catch (error) {
        console.log("cgthcjy");
        console.error(error)
    }
}
const deleteAll = async(req,res) => {
    try{
        console.log("reached");
        const deleted = await todos.destroy({where: {}, truncate: true})
        return res.json({ message : 'Todo Deleted' , status:true ,toDoObjjj : deleted})
    } catch(error){
        console.error(error)
    }
}

const check = async(req,res) => {
    try{
        
        
         console.log("working");
         const checked = req.body.check
         console.log(checked);
        const result= await todos.update({ isDone: true} , {where: {Id: checked}})
        return res.json({ message: 'Task completed successfully!', status: true, toDoObjj : result })
    }catch (error) {
        console.error(error)
    }
}


module.exports = {
    index,
    addTodo,
    deleteAll,
    check
}