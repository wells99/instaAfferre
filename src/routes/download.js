import { Router } from "express";
import axios from "axios";

const router = Router();

router.post("/download", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "Envie a URL do Reels." });
    }

    // 1️⃣ FastSaverAPI
    const { data } = await axios.get("https://fastsaverapi.com/get-info", {
      params: {
        url,
        token: process.env.FAST_SAVER_API_KEY,
      },
    });

    if (!data?.download_url) {
      return res.status(400).json({
        error: "FastSaverAPI não retornou download_url",
        details: data,
      });
    }

    const videoUrl = data.download_url;

    // 2️⃣ Baixar o vídeo como stream
    const videoResponse = await axios.get(videoUrl, {
      responseType: "stream",
      headers: {
        // 🔥 MUITO IMPORTANTE
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        Referer: "https://www.instagram.com/",
      },
    });

    // 3️⃣ Headers corretos
    res.setHeader("Content-Type", "video/mp4");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="reels.mp4"'
    );

    // 4️⃣ Stream direto para o cliente
    videoResponse.data.pipe(res);

  } catch (err) {
    console.error("Erro no download:", err.response?.data || err.message);
    res.status(500).json({
      error: "Falha ao baixar o vídeo.",
    });
  }
});


export default router;
