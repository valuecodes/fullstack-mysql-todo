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
    .then(data => insertRowIntoTable(data['data']))
}

function insertRowIntoTable(data){
    const table = document.querySelector('table tbody')
}

const loadHTMLTable = (data) => {
    const table = document.querySelector('table tbody')
    let tableHtml = ''

    if(data.length === 0){
        table.innerHTML = '<tr><td class="no-data" colspan="6">No data</td></tr>'
        return
    }

    data.forEach(({id,name,todo,date_added})=> {
        tableHtml += `
        <tr>
            <td>${id}</td>
            <td>${name}</td>
            <td>${todo}</td>
            <td>${new Date(date_added).toLocaleString()}</td>
            <td><button class="delete-row" data-id=${id}></button></td>
            <td><button></button></td>
        </tr>`
    });

    table.innerHTML = tableHtml
}