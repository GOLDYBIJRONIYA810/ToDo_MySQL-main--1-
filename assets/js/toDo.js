function onSubmitTodo(event) {
    event.preventDefault()
 
    const todoData = $('#taskform').val()
    
    $.ajax({
        type: "POST",
        url: "/toDo/addToDo",
        data: {todoData},
        success: function (response) {
            console.log("🚀 ~ file: toDo.js:26 ~ response:", response.toDoObj)
            const row = `<tr><td>${response.toDoObj.id} </td>
            <td id="upy">${response.toDoObj.todo}</td>
            <td><input type=checkbox  title="check" id="checkboxx" data-id = "${response.toDoObj.id}" placeholder="tick"  onclick ="checkedBox(this)" value=${response.toDoObj.isDone}> &nbsp &nbsp &nbsp
            <button id="btn" onclick = "getTodo(this)" data-todoid = "${response.toDoObj.id}">Update</button>
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


function checkedBox(_this){
    console.log("check is working");
    const check = $(_this).data('id')
    $.ajax({
        type :"PUT",
        url: "/toDo/check",
        data: {check},
        success: function(response){
            console.log(response);
        }
    })
}
function getTodo(_this){
    console.log("updateTodo working", 
    _this);
    const update = $(_this).data('todoid');
    $.ajax({
    type:"GET",
    url: "/toDo/getSingleToDo",
    data:{update},
    success :function(response){
        console.log(response);
        $('#taskinput').val(response.toDoObj.todo)
        $('#tasksubmit').val("Update Task") ;
        $('#submitTodo').html(`
        <input type = "button" id="updatetasksubmit" value="Update Task" data-todoid=${response.toDoObj.id} onclick="updatetask(this)">`)


    }
    
})
}
function updatetask(_this){

    
    const todoId = $(_this).data('todoid');
    const value = $("#taskinput").val();
   
    console.log(todoId);
    $.ajax({
        type:"PUT",
        url:"/toDo/updatedTask",
      
        data:{todoId,value},
        success:
        function(response){
            console.log(response);
            window.location.reload();
        }
    
    })
    }

function userProfile(event){
    event.preventDefault()
    document.querySelector('#header').style.display = "none";
    document.querySelector('#header').style.pointerEvents = "none";
     document.querySelector('#main').style.display = "none";
     document.querySelector('#main').style.pointerEvents = "none";
     document.querySelector('.form').style.display = "block";
     document.querySelector('.form').style.pointerEvents = "all";
    $('#userButton').val("Home");
    $('#buTTon').html(`<input id="homeButton" type="submit" value="Home" onclick="gotoHome(event)">`);
}
function gotoHome(event){
    window.location.reload();
}           
          