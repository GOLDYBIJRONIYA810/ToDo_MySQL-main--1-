
const todos = require("../models/todos")

const TODO = []
let id = 0

const index = async(req, res) => {
    try {
const findAllToDo = await todos.findAll({where :{ userId : req.user.id}})
        return res.render('ToDo',{findAllToDo})
    } catch (error) {
        console.error(error)
    }
}

const addTodo = async(req, res) => {
    try {
        const reqData = req.body;
        const userId = req.user.id;
        if (!reqData.todoData) {
            return res.send('please fill all mandatory fields') // validation
        }
        const insertData = await todos.create({
            todo: reqData.todoData,
            userId,
            isDone: false
        })
        if(!insertData){
            return res.send("Something went wrong");
        }

        return res.json({ message: 'ToDo added successfully!', status: true, toDoObj : insertData })
    } catch (error) {
        
        console.error(error)
    }
}
const deleteAll = async(req,res) => {
    try{
        
        const deleted = await todos.destroy({where: {}, truncate: true})
        return res.json({ message : 'Todo Deleted' , status:true ,toDoObjjj : deleted})
    } catch(error){
        console.error(error)
    }
}

const check = async(req,res) => {
    try{
        
        
         const checkedId = req.body.check
         console.log(checkedId);
        const result= await todos.update({ isDone: true} , {where: {Id: checkedId}})
        return res.json({ message: 'Task completed successfully!', status: true, toDoObjj : result })
    }catch (error) {
        console.error(error)

    }
}

const getSingleToDo = async(req,res)=>{
    try{
        const todoId = req.query.update;
        console.log(todoId);
        const getAToDo = await todos.findOne({where:{id:todoId}})
        if(!getAToDo.isDone){
        console.log(getAToDo);
        return res.json({message:"update task working",status:true,toDoObj:getAToDo})}

   
        
    }catch (error) {
        console.error(error)
    }
}

const updatedTask = async(req,res)=>{
    try{
        console.log(req.body)
        
        const getUpdatedTodoId = req.body.todoId;
        console.log("response from updated task",getUpdatedTodoId)


        console.log(getUpdatedTodoId);
        const updateTodo = await todos.update({todo: req.body.value},{where:{id:getUpdatedTodoId}})
        return res.json({message:"update on screen working",status:true,updatedObj:updateTodo})
    }
    catch(error){
            console.log(error)
    }
}
const userData = async(req,res)=>{
    try{
       console.log('seju')
       
        const ReturnUser = await users.findOne({where:{id:req.user.id}})
        return res.json({message:"update on screen working",status:true,object1:ReturnUser})
    }
    catch(error){
            console.log(error)
    }
}
const changeUserDetails = async(req,res)=>{
    try{
        console.log(req.body.newEmail)
        const UserDetails = await users.update({email:req.body.newEmail ,
            firstName : req.body.newFname , lastName : req.body.newLname}, {where:{id:1}})
            return res.json({message:"user details changed",status:true,object2:UserDetails})
    } catch(error){
        console.log(error)
}
}

 


module.exports = {
    index,
    addTodo,
    deleteAll,
    check,
    updatedTask,
    getSingleToDo,
    userData,
    changeUserDetails

}