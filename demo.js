//here we want creat a property by whuch we can add a new list by click submit buttuon
var form = document.getElementById('addForm');
var itemList = document.getElementById('items');
form.addEventListener('submit', addItem);
function addItem(e) {
    e.preventDefault();

    //taking input
    var newItem = document.getElementById('item').value
    //create new li
    var li = document.createElement('li')
    li.className = 'list-group-item'
    //create text node with new li 
    li.appendChild(document.createTextNode(newItem));
    //add delet buttn element with new li
    var deleteBtn = document.createElement('button')
    deleteBtn.className = 'btn btn-danger btn-sm float-right delete'
    deleteBtn.appendChild(document.createTextNode('x'));
    li.appendChild(deleteBtn)
     //add edit btn element with new li
     var editbtn = document.createElement('button')
     editbtn.className = 'btn btn-warning btn-sm float-right'
     editbtn.style='margin-right: 4px'
     editbtn.appendChild(document.createTextNode('edit'))
     li.appendChild(editbtn)

    itemList.appendChild(li);
}
//creat remove item from list
itemList.addEventListener('click', removeItem)
function removeItem(e) {
    //console.log(1)
    if (e.target.classList.contains('delete')) {
        if (confirm('are u sure?')) {
            var li = e.target.parentElement;
            itemList.removeChild(li)
        }
    }

}