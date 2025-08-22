let todo = "";
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todoList");

todoInput.addEventListener("input", (event) => {
    todo = event.target.value;
});

const getTodos = () => {
    return JSON.parse(localStorage.getItem("todos")) || [];
};

const saveTodos = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
};

const generateIdForTodos = () => {
    const todos = getTodos();
    if (todos.length === 0) return 0;
    return todos[todos.length - 1].id + 1;
};

const renderTodo = (todoObj) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = todoObj.todo;

    const updateButton = document.createElement("button");
    updateButton.textContent = "Update";
    updateButton.classList.add("update-btn");
    updateButton.onclick = () => {
        const newValue = prompt("Update todo:", todoObj.todo);
        if (newValue && newValue.trim()) {
            const todos = getTodos();
            const updated = todos.map((t) =>
                t.id === todoObj.id ? { ...t, todo: newValue } : t
            );
            saveTodos(updated);
            span.textContent = newValue;
        }
    };

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");
    deleteButton.onclick = () => {
        const todos = getTodos().filter((t) => t.id !== todoObj.id);
        saveTodos(todos);
        li.remove();
    };

    li.appendChild(span);
    li.appendChild(updateButton);
    li.appendChild(deleteButton);

    todoList.appendChild(li);
};

const addTodo = () => {
    if (!todo.trim()) return;

    const id = generateIdForTodos();
    const newTodo = { id, todo };

    const todos = getTodos();
    saveTodos([...todos, newTodo]);

    renderTodo(newTodo);

    todoInput.value = "";
    todo = "";
};

window.addEventListener("load", () => {
    const todos = getTodos();
    todos.forEach((t) => renderTodo(t));
});
