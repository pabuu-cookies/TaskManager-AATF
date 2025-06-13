document.addEventListener("alpine:init", () => {
  Alpine.data("todoDashboard", () => ({
    todos: [],
    filter: "all",
    newTodoText: "",

    get filteredTodos() {
      if (this.filter === "active")
        return this.todos.filter((t) => !t.completed);
      if (this.filter === "completed")
        return this.todos.filter((t) => t.completed);
      return this.todos;
    },

    get stats() {
      return {
        total: this.todos.length,
        completed: this.todos.filter((t) => t.completed).length,
        remaining: this.todos.filter((t) => !t.completed).length,
      };
    },

    async fetchTodos() {
      try {
        const res = await fetch("/api/todos");
        this.todos = await res.json();
      } catch (e) {
        alert("Failed to load todos");
        console.error(e);
      }
    },

    async addTodo() {
      console.log("in the tododashboard", newTodoText);
      if (!this.newTodoText.trim()) return;
      try {
        const res = await fetch("/api/todos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: this.newTodoText }),
        });
        const newTodo = await res.json();
        this.todos.push(newTodo);
        this.newTodoText = "";
      } catch (e) {
        alert("Error adding task");
      }
    },

    async toggleTodo(todo) {
      try {
        const res = await fetch(`/api/todos/${todo._id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ completed: !todo.completed }),
        });
        const updated = await res.json();
        Object.assign(todo, updated);
      } catch (e) {
        alert("Error updating task");
      }
    },

    async deleteTodo(id) {
      try {
        await fetch(`/api/todos/${id}`, { method: "DELETE" });
        this.todos = this.todos.filter((t) => t._id !== id);
      } catch (e) {
        alert("Error deleting task");
      }
    },

    logout() {
      window.location.href = "/logout"; // or call a logout API
    },
  }));
});
