import { chromium } from "playwright";
import axios from "axios";

export async function getVideoFromInstagram(postUrl) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  let videoUrl = null;

  // intercepta todas as requisições feitas pela página
  page.on("request", (request) => {
    const url = request.url();

    // procura por qualquer .mp4 carregado pelo reels
    if (url.includes(".mp4")) {
      videoUrl = url;
      console.log("MP4 encontrado:", videoUrl);
    }
  });

  await page.goto(postUrl, { waitUntil: "networkidle" });

  // espera alguns segundos para o vídeo carregar de verdade
  await page.waitForTimeout(3000);

  await browser.close();

  if (!videoUrl) {
    throw new Error("Não foi possível encontrar o link do vídeo .mp4");
  }

  // download real
  const response = await axios.get(videoUrl, { responseType: "stream" });

  return response.data;
}
