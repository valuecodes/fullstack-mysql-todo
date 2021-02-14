document.addEventListener('DOMContentLoaded', ()=>{
    fetch('http://localhost:5000/getEverything')
        .then(response => response.json())
        .then(data => loadHTMLTable(data['data']));
})

const addBtn = document.getElementById('add-todo-button')

addBtn.onclick = () => {
    const userInput = document.getElementById('user-input')
    const user = userInput.value
    const todoInput = document.getElementById('todo-input')
    const todo = todoInput.value
    todoInput.value = ''
    fetch('http://localhost:5000/insert',{
        headers: {'Content-type': 'application/json'},
        method : 'POST',
        body: JSON.stringify({user: user,todo: todo})
    })
    .then(response => response.json())
    .then(() => location.reload())
}

const completeTodo = (id) => {
    fetch('http://localhost:5000/complete/'+id,{
        headers: {'Content-type': 'application/json'},
        method : 'PATCH',
    })
}

const deleteTodo = (id) => {
    fetch('http://localhost:5000/delete/'+id,{
        headers: {'Content-type': 'application/json'},
        method : 'DELETE',
    })
    .then(response => response.json())
    .then(() => location.reload())
}

const loadHTMLTable = (data) => {
    const table = document.querySelector('table tbody')
    let tableHtml = ''

    if(data.length === 0){
        table.innerHTML = '<tr><td class="no-data" colspan="6">No data</td></tr>'
        return
    }
    data.forEach(({id,name,todo,date_added,completed})=> {
        tableHtml += `
        <tr>
            <td>${id}</td>
            <td>${name}</td>
            <td>${todo}</td>
            <td>${new Date(date_added).toLocaleString()}</td>
            <td><input onclick='completeTodo(${id})' type='checkbox' ${completed&&'checked'}/></td>
            <td><button onclick='deleteTodo(${id})' class="delete-row">Delete</button></td>
        </tr>`
    });
    table.innerHTML = tableHtml
}