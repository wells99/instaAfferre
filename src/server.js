import "dotenv/config";
import express from "express";
import cors from "cors";
import downloadRoutes from "./routes/download.js";
import {globalLimiter} from "./middlewares/rateLimits.js"

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", downloadRoutes);
app.use(globalLimiter)

// saúde da API
app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.listen(3000, () => {
  console.log("Servidor rodando na porta " + 3000);
});
