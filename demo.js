
//console.log("aman")
var form = document.getElementById("addForm");
var itemList = document.getElementById("items");
var filter = document.getElementById("filter");
var editbutton = document.getElementById("editbtn");
var editingItemId = null;

form.addEventListener("submit", addItem);
function addItem(e) {
  e.preventDefault();
  console.log(e);

  //taking input
  var newItem = document.getElementById("item").value;
  var newDescription = document.getElementById("description").value;

  //create new li
  var li = document.createElement("li");
  li.className = "list-group-item";

  //create text node with new li
  li.innerHTML = `<span>${newItem}</span> <span>${newDescription}</span>`;

  //li.appendChild(document.createTextNode(newDescription));
  //add delet buttn element with new li
  var deleteBtn = document.createElement("button");
  deleteBtn.className = "btn btn-danger btn-sm float-right delete";
  deleteBtn.appendChild(document.createTextNode("x"));
  li.appendChild(deleteBtn);

  //add edit btn element with new li
  var editbtn = document.createElement("button");
  editbtn.className = "btn btn-warning btn-sm float-right edit";
  editbtn.style = "margin-right: 4px";
  editbtn.appendChild(document.createTextNode("edit"));
  li.appendChild(editbtn);

  itemList.appendChild(li);

  const obj = {
    newItem,
    newDescription
  };

  if (editingItemId === null) {
    axios
      .post(
        "https://crudcrud.com/api/f56f0cdaa72d4b8ead1bc460fa8088f9/firstdatacrud",
        obj
      )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log("err");
      });
  } else {
    axios
      .put(
        `https://crudcrud.com/api/f56f0cdaa72d4b8ead1bc460fa8088f9/firstdatacrud/${editingItemId}`,
        obj
      )
      .then((response) => {
        console.log("Item updated");
        editingItemId = null;
      });
  }
  document.getElementById('addTask').value = "Submit"
  form.reset();
}


window.addEventListener("DOMContentLoaded", () => {
  axios
    .get(
      "https://crudcrud.com/api/f56f0cdaa72d4b8ead1bc460fa8088f9/firstdatacrud"
    )
    .then((response) => {
      console.log(response);
      for (var i = 0; i < response.data.length; i++) {
        var li = document.createElement("li");
        li.className = "list-group-item";
        li.id = response.data[i]._id;

        var deleteBtn = document.createElement("button");
        deleteBtn.className = "btn btn-danger btn-sm float-right delete";
        deleteBtn.appendChild(document.createTextNode("x"));
        var editbtn = document.createElement("button");
        editbtn.id = response.data[i]._id;

        // console.log(editbtn.id)
        editbtn.className = "btn btn-warning btn-sm float-right edit";
        editbtn.style = "margin-right: 4px";
        editbtn.appendChild(document.createTextNode("edit"));
        li.innerHTML = `<span>${response.data[i].newItem}</span> <span>${response.data[i].newDescription}</span>`;

        li.appendChild(deleteBtn);
        li.appendChild(editbtn);
        itemList.appendChild(li);

        // newItem.textContent=""
      }
    })
    .catch((err) => {
      console.log("err");
    });
});
//creat remove item from list
itemList.addEventListener("click", removeItem);
function removeItem(e) {
  //console.log(1)
  if (e.target.classList.contains("delete")) {
    if (confirm("are u sure?")) {
      var li = e.target.parentElement;
      const id = li.id;
      //console.log(id)

      axios
        .delete(
          `https://crudcrud.com/api/f56f0cdaa72d4b8ead1bc460fa8088f9/firstdatacrud/${id}`
        )
        .then(() => {
          li.remove();
        });
    }
  }
}
// Filter event
filter.addEventListener("keyup", filterItems);
// Filter Items
function filterItems(e) {
  // convert text to lowercase
  var text = e.target.value.toLowerCase();
  // Get lis
  var items = itemList.getElementsByTagName("li");

  // Convert to an array
  Array.from(items).forEach(function (item) {
    var itemName = item.firstChild.textContent;
    if (itemName.toLowerCase().indexOf(text) != -1) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

itemList.addEventListener("click", edit);
function edit(e) {
  if (e.target.classList.contains("edit")) {
    // console.log( e.target.parentElement)
    document.getElementById('addTask').value = "Update"
    const itemId = e.target.parentElement.id;
    let newInput = document.getElementById("item");
    let description = document.getElementById("description");

    const item = document.getElementById(itemId);
    newInput.value = item.firstChild.textContent;
    description.value = item.children[1].textContent;
    e.target.parentElement.remove();
    // console.log(newInput.value)
    editingItemId = itemId;
  }
}
