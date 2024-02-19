<template lang="pug">
Nav(:completedCount="completedCount" :incompleteCount="incompleteCount")
router-view(:todos="todos" :fetchTodos="fetchTodos")
</template>

<script setup>
import Nav from './components/navigation-bar.vue'
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const todos = ref([])
const completedCount = computed(() => todos.value.filter((todo) => todo.completed).length)
const incompleteCount = computed(() => todos.value.filter((todo) => !todo.completed).length)

const fetchTodos = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_HOST}/api/todos`)
    todos.value = response.data
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  fetchTodos()
})
</script>
