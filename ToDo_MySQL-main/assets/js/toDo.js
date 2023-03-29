function onSubmitTodo(event) {
    event.preventDefault()
    const todoData = $('#taskform').serializeArray()
    const requestBody = todoData.reduce((obj, item) => {
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
            const row = `<tr><td>${response.toDoObj.toDoId}</td>
            <td>${response.toDoObj.toDoData}</td>
            <td><input type=checkbox value=${response.toDoObj.isToDoDone}></td></tr>`
            $('#toDoBody').append(row)


            // hide_loader();

        },
        error: function (response) {
            // hide_loader();

        },
    });

}
