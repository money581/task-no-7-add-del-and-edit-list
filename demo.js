//here we want creat a property by whuch we can add a new list by click submit buttuon
var form = document.getElementById('addForm');
var itemList = document.getElementById('items');
form.addEventListener('submit',addItem);
function addItem(e){
e.preventDefault();
 
//taking input
var newItem = document.getElementById('item').value
//create new li
var li = document.createElement('li')
li.className='list-group-item'
//create text node with new li 
li.appendChild(document.createTextNode(newItem));
//create delet buttn element
var deleteBtn = document.createElement('button')
deleteBtn.className='btn btn-danger btn-sm float-right delete'
deleteBtn.appendChild(document.createTextNode('x'));
li.appendChild(deleteBtn)

itemList.appendChild(li);
}
//creat remove item from list
itemList.addEventListener('click',removeItem)
function removeItem(e){
    //console.log(1)
    if (e.target.classList.contains('delete')){
        if (confirm('are u sure?')){
           var li=e.target.parentElement;
           itemList.removeChild(li)
        }
    }

}