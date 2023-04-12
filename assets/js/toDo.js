const { response } = require("express");


function onSubmitTodo(event) {
    event.preventDefault()
 
    const todoData = $('#taskform').serializeArray()
    const requestBody = todoData.reduce((obj, item) => {
        console.log(obj, item)
        obj[item.name] = item.value;
        
        return obj;
    }, {});
    if (!todoData) {
        $('#errorMsg').html('Please fill all Mandatory Fields')
        return;
    }
    $.ajax({
        type: "POST",
        url: "/toDo/addToDo",
        data: todoData,
        success: function (response) {
            console.log("🚀 ~ file: toDo.js:26 ~ response:", response.toDoObj)

            const row = `<tr><td>${response.toDoObj.id}</td>
            <td>${response.toDoObj.todo}</td>
            
            <td><input type=checkbox  title="check" id="checkboxx" data-idd = "${response.toDoObj.id}" placeholder="tick"  onclick ="check(this)" value=${response.toDoObj.isDone}> &nbsp &nbsp &nbsp
            <button type = submit id = "button2" onclick = "updateTodo(this)" data-update = "${response.toDoObj.id}"> Update </button>
     
            </td></tr>`
            $('#toDoBody').append(row)


            // hide_loader();

        },
        error: function (response) {
            // hide_loader();

        },
    });

}


function deleted(event){
    event.preventDefault()
    $('#toDoBody').empty()
    $.ajax({
        type: "DELETE",
        url : "/toDo/deleteAll",
        success : function(response){
            console.log(response.toDoObjjj)
        }
    })
}

function check(_this){
    console.log("check is working");
    const check = $(_this).data('idd')
    $.ajax({
        type :"PUT",
        url: "/toDo/check",
        data: {check},
        success: function(response){
            console.log(response);
        }
    })
}
function updateTodo(_this){
   
    console.log("chal rha h")
    const update = $(_this).data('update')
    $.ajax({
        type :"PUT",
        url: "/toDo/update",
        data: {update},
        success:  function(response){
            $('#taskinput').val(response.toDoObj1.todo)
            console.log("hey")
            console.log(response);
        }
   })
}