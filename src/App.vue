<script setup>
import { watch, computed } from 'vue'
import useTodo from "./composables/todo.js";

const todos_asc = computed(() => todos.value)
const {
  todos,
  content,
  category,
  addTodo,
  removeTodo,
} = useTodo();

watch(todos, (todo) => {
  localStorage.setItem('todos', JSON.stringify(todo))
}, {
  deep: true
})

</script>
<template>
  <main class="app">
    <section class="greeting">
      <h2 class="title">
        Vos taches
      </h2>
    </section>
    <section class="create-todo">
      <form id="new-todo-form">
        <h4>Qu'est ce que vous avez a faire aujourd'hui?</h4>
        <input type="text" name="content" id="content" placeholder="e.g. rediger un CDC" v-model="content" />
        <h4>Type de taches</h4>
        <div class="options">
          <label>
            <input type="radio" name="category" id="category1" value="business" v-model="category" />
            <span class="bubble business"></span>
            <div>Client</div>
          </label>

          <label>
            <input type="radio" name="category" id="category2" value="personal" v-model="category" />
            <span class="bubble personal"></span>
            <div>Personnel</div>
          </label>

        </div>
        <input @click.prevent="addTodo" type="submit" value="Enregistrer" />
      </form>
    </section>
    <section class="todo-list">
      <h3>Liste de vos taches</h3>
      <div class="list" id="todo-list">
        <div v-for="todo in todos_asc" :class="`todo-item ${todo.done && 'done'}`" :key="todo.name">
          <label>
            <input type="checkbox" v-model="todo.done" />
            <span :class="`bubble ${todo.category == 'business'
            ? 'business'
            : 'personal'
            }`"></span>
          </label>
          <div class="todo-content">
            <input type="text" v-model="todo.content" />
          </div>
          <div class="actions">
            <button class="delete" @click="removeTodo(todo)">Delete</button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
