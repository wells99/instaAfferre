import { Router } from "express";
import axios from "axios";

const router = Router();

router.post("/download", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "Envie a URL do Reels." });
    }

    // 🔥 Chamada correta à FastSaverAPI
    const response = await axios.get("https://fastsaverapi.com/get-info", {
      params: {
        url, // URL do reels
        token: process.env.FAST_SAVER_API_KEY, // seu token
      },
    });

    const data = response.data;

    // Verificação do novo padrão de resposta
    if (!data || !data.download_url) {
      return res.status(400).json({
        error: "FastSaverAPI não retornou download_url.",
        details: data,
      });
    }

    res.json({
      success: true,
      videoUrl: data.download_url,
      thumb: data.thumb,
      caption: data.caption,
      type: data.type,
    });

  } catch (err) {
    console.error("Erro FastSaverAPI:", err.response?.data || err.message);

    res.status(500).json({
      error: "Falha ao extrair vídeo via FastSaverAPI.",
      details: err.response?.data || err.message,
    });
  }
});

export default router;
