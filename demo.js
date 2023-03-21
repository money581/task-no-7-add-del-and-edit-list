//here we want creat a property by whuch we can add a new list by click submit buttuon
console.log("aman")
var form = document.getElementById('addForm');
var itemList = document.getElementById('items');
var filter = document.getElementById('filter');
 editbutton = document.getElementById('editbtn')

form.addEventListener('submit', addItem);
function addItem(e) {
    e.preventDefault();
    console.log(e)

    //taking input
    var newItem = document.getElementById('item').value
    var newDescription = document.getElementById('description').value
    
    //create new li
    var li = document.createElement('li')
    li.className = 'list-group-item'
    //create text node with new li 
    li.appendChild(document.createTextNode(newItem +' '+newDescription));
    //li.appendChild(document.createTextNode(newDescription));
    //add delet buttn element with new li
    var deleteBtn = document.createElement('button')
    deleteBtn.className = 'btn btn-danger btn-sm float-right delete'
    deleteBtn.appendChild(document.createTextNode('x'));
    li.appendChild(deleteBtn)
     //add edit btn element with new li
     
     var editbtn = document.createElement('button')
    
     editbtn.className = 'btn btn-warning btn-sm float-right edit'
     editbtn.style='margin-right: 4px'
     editbtn.appendChild(document.createTextNode('edit'))
     li.appendChild(editbtn)

    itemList.appendChild(li);
    //add date in local storage item as key and its description as value
    //var storeDatainLocal =localStorage.setItem("userName",newItem)
    //var storeDatainLocal =localStorage.setItem("userDescription",newDescription)
    // noe we can store data in form of object
    // const obj={
    //   newItem,
    //   newDescription,
    // }
    // localStorage.setItem("data",JSON.stringify(obj))
    //now we can update that data in local sgtorage not delete when we update data
     const obj={
      newItem,
      newDescription,
    }
    if (localStorage.getItem('data') == null){
      localStorage.setItem('data','[]')
    }
    var old_Data=JSON.parse(localStorage.getItem('data'));
    old_Data.push(obj);
    localStorage.setItem("data",JSON.stringify(old_Data))

  
    
    
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
    localStorage.removeItem('data')

}
// Filter event
filter.addEventListener('keyup', filterItems);
// Filter Items
function filterItems(e){
    // convert text to lowercase
    var text = e.target.value.toLowerCase();
    // Get lis
    var items = itemList.getElementsByTagName('li');
    // Convert to an array
    Array.from(items).forEach(function(item){
      var itemName = item.firstChild.textContent;
      if(itemName.toLowerCase().indexOf(text) != -1){
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }
//function editList(currElem){

  //alert('test');
  // if (currElem.textContent == "done"){
  //   currElem.textContent ="edit"
  //   let currListName = currElem.parentElement.firstChild.value
    
  //   let currEditname = document.createElement('li')
  //   currEditname.className="list-group-item"
  //   currEditname.textContent=currListName
  //     currElem.parentElement.firstChild.replaceWith(currEditname)
  // }
  // else {
  //   currElem.textContent="done"
  //   //console.log(currElem.parentElement)
  //   let currListName = currElem.parentElement.firstChild.textContent
   
  //   //console.log(currListName)
  //   let currInput = document.createElement('input')
  //   currInput.type='text'
  //   currInput.className="form-control mr-2"
  // currInput.value=currListName
  // //console.log(currInput)
  // currElem.parentElement.firstChild.replaceWith(currInput)
  // }
//   let addTaskBtn=document.getElementById('addTask')
//   let saveTaskBtn=document.getElementById('saveTask')
//   addTaskBtn.style.display='none'
//   saveTaskBtn.style.display='block'
//   // let currListName = currElem.parentElement.firstChild.textContent
  
//   // let newInput = document.getElementById('item')
//   // newInput.value=currListName
 

 
// //   form.addEventListener('submit', addItem);
// // function addItem(e) {
// //     e.preventDefault();
// //     console.log(e)
// //     let newEditItem=document.getElementById('item').value
// //     console.log(newEditItem)
// //     //currElem.parentElement.firstChild.textContent.replaceWith(newEditItem)
// // }
 
// }
//creat remove item from list
itemList.addEventListener('click', editItem)
function editItem(e) {
   
    let addTaskBtn=document.getElementById('addTask')
  let saveTaskBtn=document.getElementById('saveTask')
   addTaskBtn.style.display='none'
  saveTaskBtn.style.display='block'
    if (e.target.classList.contains('edit')) {
      
     let currElem = e.target.parentElement
     console.log(currElem)
    
 let newInput = document.getElementById('item')
 newInput.value=currElem.firstChild.textContent
 form.addEventListener('click', updateItem)
function updateItem(e) {
e.preventDefault()
e.stopPropagation()
  if (e.target.classList.contains('updatebtn')){
    
    var currValue = document.getElementById('item')
    console.log(currValue.value)
     console.log(currElem)

    addTaskBtn.style.display='block'
    saveTaskBtn.style.display='none'
    currElem.firstChild.textContent=currValue.value
    
  }
}
    }
}