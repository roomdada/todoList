import { ref } from 'vue'

export default function useTodo() {
  const todos = ref([])
  const content = ref('')
  const category = ref(null)

  const addTodo = () => {
    todos.value.push({
      content: content.value,
      category: category.value,
      done: false,
      createdAt : new Date().getTime()
    })
  
    content.value = ''
    category.value = null
  }

  const removeTodo = (todo) => {
    todos.value = todos.value.filter((t) => t !== todo)
  }

  return {
    todos,
    content,
    category,
    addTodo,
    removeTodo,
  }

}
