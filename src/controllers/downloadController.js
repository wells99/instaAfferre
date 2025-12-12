import express from "express";
import { getVideoFromInstagram } from "../utils/instagramScraper.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { url } = req.body;

  try {
    const stream = await getVideoFromInstagram(url);

    // 🔥 Cabeçalhos necessários para que o vídeo chegue íntegro
    res.setHeader("Content-Type", "video/mp4");
    res.setHeader("Content-Disposition", "attachment; filename=reels.mp4");

    // 🔥 Streaming direto do vídeo para o cliente
    stream.pipe(res);

  } catch (error) {
    console.error("Erro ao processar download:", error);
    res.status(500).json({ error: "Falha ao baixar o vídeo." });
  }
});

export default router;
