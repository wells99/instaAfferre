import express from "express";
import { getVideoFromInstagram } from "../utils/instagramScraper.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "URL do reels é obrigatória" });
    }

    const stream = await getVideoFromInstagram(url);

    res.setHeader("Content-Type", "video/mp4");
    stream.pipe(res);

  } catch (err) {
    console.error("Erro ao processar download:", err);
    res.status(500).json({ error: "Erro ao baixar o vídeo" });
  }
});

router.get("/", async (req,res) => {
      res.send("OK");
});

export default router;
