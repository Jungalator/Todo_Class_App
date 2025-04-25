"use strict";
import { LocaleStorage } from "./halpers.js/localeStorage_Class.js";
import { DOM } from "./halpers.js/dom_class.js";
import { Item } from "./halpers.js/item_class.js";

class TodoItem extends Item {
  constructor({ id, text, completed = false }) {
    super(id, text);
    this.completed = completed;
  }
}

class TodoApp {
  constructor() {
    this.dom = new DOM();
    this.todosStorage = new LocaleStorage("todos");
    this.todoList = this.todosStorage.GetItem();
    this.todoInput = this.dom.query("[data-add-todo-input]");
    this.todoContainer = this.dom.query("[data-todo-container]");
    this.bindEvents();
    this.render();
  }

  addTodo(text) {
    const newTodo = new TodoItem({
      id: Date.now(),
      text: text,
    });
    this.todoList.push(newTodo);
    this.todosStorage.SetItem(this.todoList);
    this.render();
  }

  removeTodo(id) {
    this.todoList = this.todoList.filter((todo) => todo.id !== id);
    this.todosStorage.SetItem(this.todoList);
    this.render();
  }

  toggleTodo(id) {
    const todo = this.todoList.find((todo) => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.todosStorage.SetItem(this.todoList);
      this.render();
    }
  }

  bindEvents() {
    this.todoInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && e.target.value.trim()) {
        //Метод для добавления todo
        this.addTodo(e.target.value.trim());
        this.todoInput.value = "";
      }
    });

    this.todoContainer.addEventListener("click", (e) => {
      const el = e.target;
      const id = Number(el.dataset.id);
      if (el.classList.contains("removeBtn")) {
        this.removeTodo(id);
      } else if (el.classList.contains("todoItem")) {
        this.toggleTodo(id);
      }
    });
  }

  render() {
    this.todoContainer.innerHTML = "";
    this.todoList.forEach((todo) => {
      const todoItem = this.dom.create(
        "div",
        "",
        "todoItem",
        todo.completed ? "completed" : undefined
      );
      todoItem.dataset.id = todo.id;

      const todoItemText = this.dom.create("span", todo.text);

      const removeBtn = this.dom.create("button", "Удалить", "removeBtn");
      removeBtn.dataset.id = todo.id;
      removeBtn.disabled = !todo.completed;

      todoItem.appendChild(todoItemText);
      todoItem.appendChild(removeBtn);
      this.todoContainer.prepend(todoItem);
    });
  }
}

new TodoApp();
