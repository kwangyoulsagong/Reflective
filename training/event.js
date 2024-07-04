const todayAdd = document.getElementById("today-open");
const openModal = document.getElementById("open-modal");
const closeModal = document.getElementById("close-modal");
const todoForm = document.getElementById("todo-form");
const todoList = document.getElementById("todo-list");

let modalState = false;

// 초기 할 일 목록 불러오기
document.addEventListener("DOMContentLoaded", () => {
    loadTodoList();
});

// 추가 버튼 클릭 시 모달 열기
todayAdd.addEventListener("click", () => {
    modalState = true;
    openModal.style.display = "block";
});

// 모달 닫기 버튼 클릭 시 모달 닫기
closeModal.addEventListener("click", () => {
    close()
});
function close(){
    modalState = false;
    openModal.style.display = "none";
}

// 폼 제출 이벤트 처리
todoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = document.querySelector(".todo-title").value;
    const content = document.querySelector(".todo-content").value;
    
    if (title.trim() === '' || content.trim() === '') {
        alert('제목과 내용을 모두 입력해주세요.');
        return;
    }

    // 새로운 할 일 객체 생성
    const todoItem = {
        id: new Date().getTime(), // 고유 ID 생성
        title: title,
        content: content,
        completed: false // 완료 여부
    };

    // 할 일 추가
    addTodoItem(todoItem);

    // 모달 닫기 및 폼 리셋
    close();
    todoForm.reset();
});

// 할 일 삭제 및 완료 상태 업데이트
todoList.addEventListener("change", (event) => {
    if (event.target.classList.contains("todo-checkbox")) {
        const card = event.target.closest(".todo-card");
        const todoId = parseInt(card.dataset.id);
        const isChecked = event.target.checked;
        updateTodoItem(todoId, isChecked);
    }
});

// 삭제 버튼 클릭 시 할 일 삭제
todoList.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-button")) {
        const card = event.target.closest(".todo-card");
        const todoId = parseInt(card.dataset.id);
        deleteTodoItem(todoId);
        card.remove();
    }
});

// 로컬 스토리지에서 할 일 목록 불러오기
function loadTodoList() {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.forEach(todo => {
        const card = createTodoCard(todo);
        todoList.appendChild(card);
    });
}

// 할 일 추가
function addTodoItem(todoItem) {
    const todos = getTodosFromStorage();
    todos.push(todoItem);
    localStorage.setItem("todos", JSON.stringify(todos));
    const card = createTodoCard(todoItem);
    todoList.appendChild(card);
}

// 할 일 삭제
function deleteTodoItem(id) {
    let todos = getTodosFromStorage();
    todos = todos.filter(todo => todo.id !== id);
    localStorage.setItem("todos", JSON.stringify(todos));
}

// 할 일 완료 상태 업데이트
function updateTodoItem(id, isChecked) {
    const todos = getTodosFromStorage();
    const updatedTodos = todos.map(todo => {
        if (todo.id === id) {
            todo.completed = isChecked;
        }
        return todo;
    });
    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    // 화면에서 완료 상태를 반영
    const card = document.querySelector(`.todo-card[data-id="${id}"]`);
    const cardTitle = card.querySelector(".todo-title");
    const cardContent = card.querySelector(".todo-content");
    const textDecoration = isChecked ? "line-through" : "none";
    cardTitle.style.textDecoration = textDecoration;
    cardContent.style.textDecoration = textDecoration;
}

// 로컬 스토리지에서 할 일 목록 가져오기
function getTodosFromStorage() {
    return JSON.parse(localStorage.getItem("todos")) || [];
}

// 새로운 할 일 카드 생성
function createTodoCard(todoItem) {
    const card = document.createElement("div");
    card.className = "todo-card";
    card.dataset.id = todoItem.id;

    const cardHeader = document.createElement("h3");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "todo-checkbox";
    checkbox.checked = todoItem.completed;
    const cardTitle = document.createElement("span");
    cardTitle.className = "todo-title";
    cardTitle.textContent = todoItem.title;

    cardHeader.appendChild(checkbox);
    cardHeader.appendChild(cardTitle);

    const cardContent = document.createElement("p");
    cardContent.className = "todo-content";
    cardContent.textContent = todoItem.content;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "삭제";

    card.appendChild(cardHeader);
    card.appendChild(cardContent);
    card.appendChild(deleteButton);

    // 완료된 할 일에 대해 체크박스에 줄 긋기
    const textDecoration = todoItem.completed ? "line-through" : "none";
    cardTitle.style.textDecoration = textDecoration;
    cardContent.style.textDecoration = textDecoration;

    return card;
}
