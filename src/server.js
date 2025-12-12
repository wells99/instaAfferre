import "dotenv/config";
import express from "express";
import cors from "cors";
import downloadRoutes from "./routes/download.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", downloadRoutes);

app.listen(process.env.PORT, () => {
  console.log("Servidor rodando na porta " + process.env.PORT);
});
