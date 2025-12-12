import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Instagram Downloader está funcionando!");
});

// rota download será criada depois
import downloadRouter from "./controllers/downloadController.js";
app.use("/download", downloadRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Servidor rodando na porta http://localhost:${port}`));
