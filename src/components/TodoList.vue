<!--todo 暂未完成组件的css优化 仅完成功能实现-->
<template>
  <section class="todoapp">
    <header class="header">
      <input type="text" class="new-todo" placeholder="想干的事" @keyup.enter="addTodo" v-model="newTodo" />
    </header>
    <section clas="main">
      <input type="checkbox" class="toggle-all" id="toggle-all" v-model="allDone" />
      <label for="toggle-all">Mark all as complete</label>

      <ul class="todo-list">
        <li class="todo" v-for="todo in filtertodo" :key="todo.id">
          <div class="view">
            <input type="checkbox" class="toggle" v-model="todo.completed" />
            <label>{{ todo.title }}</label>
            <button class="destroy" @click="removeTodo(todo)"></button>
          </div>
        </li>
      </ul>
    </section>
    <footer class="footer" v-show="todos.length" v-cloak>
      <span class="todo-count">
        <strong>{{ remaining }}</strong>
      </span>
      <span class="todo-choose">
        <button class="clear-completed todo-do" @click="showAll">All</button>
        <button class="clear-completed todo-do" @click="showActive">Active</button>
        <button class="clear-completed todo-do" @click="showCompleted">Completed</button>
      </span>
    </footer>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ref } from 'vue'
import type { Ref } from 'vue'

const newTodo = ref('')
/**
 * 使用两个数组记录todoList
 * 便于下文实现状态切换
 */
const filtertodo: Ref<Array<Record<string, any>>> = ref([])
const todos: Ref<Array<Record<string, any>>> = ref([])
/**
 * 添加待办事项
 */
const addTodo = () => {
  if (newTodo.value === '') return
  filtertodo.value.push({
    id: filtertodo.value.length + 1,
    title: newTodo.value,
    completed: false
  })
  todos.value.push({
    id: todos.value.length + 1,
    title: newTodo.value,
    completed: false
  })
  newTodo.value = ''
}

/**
 * 计算剩余事项
 */
const remaining = computed(() => todos.value.filter((todo) => !todo.completed).length)

/**
 * 选中所有待办事项
 */
const allDone = computed({
  get: function () {
    return remaining.value === 0
  },
  set: function (value) {
    filtertodo.value.forEach((todo) => {
      todo.completed = true
    })
  }
})

/**
 * 删除待办事项
 */
const removeTodo = (item: Record<string, any>) => {
  filtertodo.value = todos.value.filter((todo) => todo.id !== item.id)
  todos.value = todos.value.filter((todo) => todo.id !== item.id)
}

/**
 * 分别展示
 * 1. 所有待办事项
 * 2. 未完成事项
 * 3. 已完成事项
 */
const showAll = () => {
  filtertodo.value = todos.value
}

const showActive = () => {
  filtertodo.value = todos.value.filter((todo) => !todo.completed)
}

const showCompleted = () => {
  filtertodo.value = todos.value.filter((todo) => todo.completed)
}
</script>
