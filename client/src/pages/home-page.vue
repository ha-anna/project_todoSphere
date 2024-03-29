<script setup>
import checkEmptyIcon from '../assets/icons/check-empty-icon.svg'
import checkDoneIcon from '../assets/icons/check-done-icon.svg'
import Placeholder from '../components/placeholder-el.vue'
import AddTodo from '../components/add-todo-el.vue'
import DateHeader from '../components/date-header-el.vue'
import Popup from '../components/popup-el.vue'
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { FadeLoader } from 'vue3-spinner'

const props = defineProps({
  todos: { type: Array, required: true },
  fetchTodos: { type: Function, required: true }
})

const todoMarked = ref({ id: '', bool: false })
const loading = ref(true)

const deleteTodo = async (id) => {
  try {
    const response = await axios.delete(`${import.meta.env.VITE_API_HOST}/api/todos/${id}`)
    props.fetchTodos()
  } catch (error) {
    console.log(error)
  }
}

const markTodo = async (id, bool) => {
  try {
    const response = await axios.put(`${import.meta.env.VITE_API_HOST}/api/todos/${id}`, {
      completed: bool
    })
    props.fetchTodos()
    todoMarked.value = { id: id, bool: bool }
  } catch (error) {
    console.log(error)
  }
}

const handleUnmarkTodo = () => {
  const todo = props.todos.find((todo) => todo._id === todoMarked.value.id)
  if (todo) {
    markTodo(todo._id, false)
  }
}

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 2000)
})
</script>

<template lang="pug">
DateHeader()
.loading(v-if="loading")
  FadeLoader(:loading="true" :color="'#CB5647'")
.todolist-container(v-else)
  ul.todolist
    li(v-for="todo in todos" :key="todo._id" class="todo-item")
      button.mark-btn(type="button" @click="markTodo(todo._id, !todo.completed)")
        template(v-if="!todo.completed")
          checkEmptyIcon.icon(alt="")
          span.visually-hidden 표시
        template(v-else-if="todo.completed")
          checkDoneIcon.icon(alt="")
          span.visually-hidden 완료
      span.todo-text(:class="[todo.completed ? 'todo-text-completed' : '']") {{ todo.task }}
      button.delete-btn(type="button" @click="deleteTodo(todo._id)")
        font-awesome-icon(:icon="['fas', 'trash-can']").delete-icon
        span.visually-hidden 삭제
  AddTodo(:todos="todos" :fetchTodos="fetchTodos")
  Transition(name="fade")
    Placeholder(v-if="todos.length < 1")
Popup(:todos="todos" :todoMarked="todoMarked" :handleUnmarkTodo="handleUnmarkTodo")
</template>

<style lang="less">
.todolist-container {
  text-align: left;
  align-self: flex-start;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  margin-top: 10px;
  opacity: 1;
}

.loading {
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  margin-top: 10px;
  display: flex;
  justify-content: center;
}

.v-spinner {
  transform: translatey(300px);
  max-width: 200px;
}

.todolist {
  list-style-type: none;
  padding: 0;
}

.todo-item {
  border-bottom: @line;
  padding: 15px 0px;
  font-size: 1.1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.todo-text {
  margin-right: auto;
}

.mark-btn {
  background: none;
  margin: 0;
  padding: 0;
}

.delete-btn {
  background: none;
  cursor: pointer;
  padding: 0;
  opacity: 0;
  transition: opacity 300ms ease-in-out;
}

.todo-item:hover>.delete-btn {
  opacity: 1;
  padding: 0 10px;

  .delete-icon {
    color: @accent;
  }
}

.todo-text-completed {
  color: @text-faded;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
