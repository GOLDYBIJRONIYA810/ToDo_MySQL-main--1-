
function onSubmitTodo(event) {
    event.preventDefault()
 
    const todoData = $('#taskform').serializeArray()
    const requestBody = todoData.reduce((obj, item) => {
        console.log(obj, item)
        obj[item.name] = item.value;
        console.log('hey' , obj, item)
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
            
            <td><input type=checkbox id="checkboxx" title="check"  data-idd= "${response.toDoObj.id}" placeholder="tick" onclick="check(this)" value=${response.toDoObj.isDone}>
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
