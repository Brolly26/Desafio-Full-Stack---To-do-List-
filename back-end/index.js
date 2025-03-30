import express from "express";
import cors from "cors";
import todasRotas from "./routes/allRoutes.js";

const PORT = process.env.PORT || 3000 || 8080;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/todos", todasRotas);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
