document.addEventListener('DOMContentLoaded', ()=>{
    fetch('http://localhost:5000/getEverything')
        .then(response => response.json())
        .then(data => loadHTMLTable(data['data']));
    
})

const loadHTMLTable = (data) => {
    console.log(data)
    const table = document.querySelector('table tbody')
    if(data.length === 0){
        table.innerHTML = '<tr><td class="no-data" colspan="5">No data</td></tr>'
    }
}