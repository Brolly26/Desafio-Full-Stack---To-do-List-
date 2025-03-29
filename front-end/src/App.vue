<template>
  <div>
    <button
      @click="toggleTheme"
      class="fixed top-4 right-4 px-3 py-1 bg-gray-200 text-black rounded shadow z-50"
      :class="{ 'bg-gray-800 text-white': isDark }"
    >
      {{ isDark ? "☀️ Claro" : "🌙 Escuro" }}
    </button>

    <TodoList />
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, onMounted } from "vue";
import TodoList from "./components/TodoList.vue";

const isDark = ref(false);

const toggleTheme = () => {
  isDark.value = !isDark.value;
};

watchEffect(() => {
  document.body.classList.toggle("dark-mode", isDark.value);
});

onMounted(() => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") isDark.value = true;

  watchEffect(() => {
  document.body.classList.toggle("dark-mode", isDark.value)
});
});
</script>
