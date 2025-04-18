import axios from "axios";

const api = axios.create({
  baseURL: "https://desafio-full-stack-to-do-list-production.up.railway.app/todos"
});

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export const getTodos = () => api.get<Todo[]>("/");
export const addTodo = (title: string) => api.post("/", { title });
export const deleteTodo = (id: number) => api.delete(`/${id}`);
export const updateTodo = (id: number, completed: boolean) =>
  api.put(`/${id}`, { completed });
