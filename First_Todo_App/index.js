//<form class="todo-form">
//<input type="text" class="todo-input" placeholder="Enter A Todo" />
//   <button type="submit">Add Todo</button>
// </form>;
document.addEventListener("DOMContentLoaded", () => {
  let editMode = false;
  let editingBtn = null;
  let editItem = null;
  const inputText = document.querySelector(".todo-input");
  const form = document.querySelector(".todo-form");
  const todoUl = document.querySelector(".todo-list");
  const addBtn = document.querySelector(".add-todo");
  form.addEventListener("submit", function (evt) {
    evt.preventDefault();
    if (inputText.value.trim().length > 0) {
      if (editMode) {
        addBtn.textContent = "Add Todo";
        console.log("edit", editItem);
        editItem.firstElementChild.textContent = inputText.value;
        editMode = false;
        editingBtn = null;
        [...editItem.querySelectorAll("button")][0].disabled = false;
      } else addTodoItem(inputText.value.trim());

      inputText.value = "";
    } else {
      alert("type a todo first");
    }
  });
  todoUl.addEventListener("click", function (evt) {
    if (editMode) {
      editingBtn.disabled = false;
    }
    const target = evt.target; //Edit Btn
    target.disabled = true;
    editingBtn = target;
    console.log("Target", target.tagName);
    if (target.tagName === "BUTTON") {
      if (target.innerText === "Edit") {
        editMode = true;
        editItem = target.parentElement;
        addBtn.textContent = "Edit Todo";
        inputText.value = target.previousElementSibling.textContent;
        console.log(
          "target.firstElementChild.textContent",
          target.previousElementSibling,
        );
        inputText.focus();
      } else if (target.innerText === "Remove") {
        if (editMode) {
          target.remove();
          inputText.value = "";
          addBtn.textContent = "Add Todo";
        } else {
          target.remove();
        }
      }
    }
    evt.stopPropagation();
  });
  function addTodoItem(text) {
    const li = document.createElement("li");
    const todoText = document.createElement("span");
    const editBtn = document.createElement("button");
    const removeBtn = document.createElement("button");

    todoText.textContent = text;
    editBtn.textContent = "Edit";
    removeBtn.textContent = "Remove";

    removeBtn.addEventListener("click", () => {
      li.remove();
    });

    li.append(todoText, editBtn, removeBtn);
    todoUl.prepend(li);
  }
});
