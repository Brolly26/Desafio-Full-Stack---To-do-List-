<template>
  <div
    class="max-w-xl w-full mx-auto mt-10 p-6 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-green-500"
  >
    <div class="" style="margin-bottom: 15px">
      <h1 class="text-2xl font-extrabold mb-4 text-center text-gray-800 font-sans">
        ✍️Lista de Tarefas
      </h1>
    </div>
    <div
      style="margin-bottom: 20px !important"
      class="bg-white w-[301px] flex-1 rounded-3xl p-2 border border-green-300"
    >
      <form @submit.prevent="handleAddTodo" class="flex items-center gap-2 mb-6 h-[24px]">
        <input
          v-model="newTodo"
          type="text"
          placeholder="Nova tarefa"
          class="bg-white flex-1 text-gray-700 rounded-3xl p-2 focus:outline-none focus:ring-0 focus:border-transparent"
        />
        <button
          type="submit"
          class="px-4 py-2 rounded-3xl bg-green-500 text-white hover:bg-green-700 active:scale-95 transition"
        >
          Adicionar
        </button>
      </form>
    </div>
    <div v-if="loading" class="text-center text-gray-500">Carregando tarefas...</div>
    <TransitionGroup name="fade" tag="ul" v-else-if="todos.length > 0" class="space-y-2">
      <li
        v-for="todo in todos"
        :key="todo.id"
        class="relative overflow-hidden p-3 rounded-lg flex justify-between items-center transition-all duration-500 group"
        :class="[
          justCompleted.has(todo.id)
            ? 'bg-green-500'
            : todo.completed
            ? 'bg-white  border-green-500'
            : 'bg-gray-50 border border-green-300',
        ]"
        style="margin-bottom: 20px"
      >
        <transition name="fade-success">
          <div
            v-if="justCompleted.has(todo.id)"
            class="absolute inset-0 flex items-center justify-center font-semibold z-10 text-white bg-green-500 opacity-0 animate-fadein-smooth"
          >
            ✅ Feito com sucesso!
          </div>
        </transition>
        <span
          :class="[
            'transition-all duration-300 z-20',
            todo.completed ? 'line-through text-gray-400' : 'text-gray-800 ',
          ]"
        >
          {{ todo.title }}
        </span>

        <div class="flex gap-2 z-20">
          <button
            v-if="!todo.completed"
            @click="toggleComplete(todo)"
            class="p-2 rounded-full bg-green-500 hover:bg-green-600 text-white transition"
          >
            <Check class="w-4 h-4" />
          </button>

          <button
            @click="deleteTodo(todo.id)"
            class="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white transition"
          >
            <Trash class="w-4 h-4" />
          </button>
        </div>
      </li>
    </TransitionGroup>

    <p v-else class="text-center text-gray-500">Nenhuma tarefa ainda.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  getTodos,
  addTodo,
  updateTodo,
  type Todo,
  deleteTodo as deleteTodoFromAPI,
} from "../services/todoService";
import { Trash, Check } from "lucide-vue-next";

const todos = ref<Todo[]>([]);
const newTodo = ref("");
const loading = ref(true);

const loadTodos = async () => {
  loading.value = true;
  const response = await getTodos();
  todos.value = response.data;
  loading.value = false;
};

const handleAddTodo = async () => {
  const trimmed = newTodo.value.trim();
  if (!trimmed) return;
  await addTodo(trimmed);
  playSound("pop.mp3");
  newTodo.value = "";
  loadTodos();
};

const justCompleted = ref<Set<number>>(new Set());

const toggleComplete = async (todo: Todo) => {
  await updateTodo(todo.id, !todo.completed);
  playSound("right.wav");

  loadTodos();

  if (!todo.completed) {
    justCompleted.value.add(todo.id);
    setTimeout(() => {
      justCompleted.value.delete(todo.id);
    }, 2000);
  }
};

const deleteTodoById = async (id: number) => {
  await deleteTodoFromAPI(id);
  playSound("delete.mp3");
  loadTodos();
};

const deleteTodo = (id: number) => {
  if (confirm("Tem certeza que deseja excluir esta tarefa?")) {
    deleteTodoById(id);
  }
};

onMounted(() => {
  loadTodos();
});

const playSound = (file: string) => {
  const audio = new Audio(`/sounds/${file}`);
  audio.play();
};


</script>

<style scoped>
/* ========== DARK MODE MANUAL ========== */

.dark-mode {
  background-color: #111827;
  color: #f3f4f6;
}

/* Fundo do container principal */
.dark-mode .max-w-xl {
  background-color: #1f2937 !important;
  border-color: #10b981 !important; 
}

/* Caixa de input + formulário */
.dark-mode .bg-white {
  background-color: #374151 !important; 
  color: #f3f4f6 !important;
}

/* Texto principal */
.dark-mode .text-gray-800 {
  color: #f3f4f6 !important;
}

/* Texto apagado (tarefa concluída) */
.dark-mode .text-gray-400 {
  color: #9ca3af !important;
}

/* Tarefas não concluídas */
.dark-mode .bg-gray-50 {
  background-color: #1e293b !important;
  border-color: #4ade80 !important; 
}

/* Input */
.dark-mode input {
  background-color: #374151 !important;
  color: #f3f4f6 !important;
  border-color: #4ade80 !important;
}

/* Botões */
.dark-mode button {
  background-color: #10b981 !important; 
  color: white;
}

.dark-mode button:hover {
  background-color: #059669 !important;
}

@keyframes fadein-smooth {
  0% {
    opacity: 0;
    background-color: transparent;
  }
  50% {
    opacity: 0.6;
    background-color: rgba(34, 197, 94, 0.7);
  }
  100% {
    opacity: 1;
    background-color: rgba(34, 197, 94, 0.8);
  }
}

.animate-fadein-smooth {
  animation: fadein-smooth 0.8s ease-out forwards;
}

.fade-success-enter-active,
.fade-success-leave-active {
  transition: opacity 0.5s ease;
}
.fade-success-enter-from,
.fade-success-leave-to {
  opacity: 0;
}
</style>
