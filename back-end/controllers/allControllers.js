import { pool } from "../db.js";

// Buscar as tarefas (GET)
export const getTaf = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM todos");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar tarefas" });
  }
};

// Adicionar uma nova tarefa (POST) 
export const addTaf = async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ message: "Título é obrigatório." });

  try {
    await pool.query("INSERT INTO todos (title) VALUES (?)", [title]);
    res.status(201).json({ message: "Tarefa adicionada!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao adicionar tarefa" });
  }
};

// Deletar tarefa (DELETE )
export const deleteTaf = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM todos WHERE id = ?", [id]);
    res.json({ message: "Tarefa removida!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar tarefa" });
  }
};

// PUT
export const updateTaf = async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  try {
    await pool.query("UPDATE todos SET completed = ? WHERE id = ?", [completed, id]);
    res.json({ message: "Tarefa atualizada!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar tarefa" });
  }
};
