import { chromium } from "playwright";
import axios from "axios";

export async function getVideoFromInstagram(postUrl) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  let videoUrl = null;

  // intercepta todas as requisições feitas pela página
  page.on("request", (request) => {
    const url = request.url();

    if (url.includes(".mp4")) {
      videoUrl = url;
      console.log("MP4 encontrado:", videoUrl);
    }
  });

  await page.goto(postUrl, { waitUntil: "networkidle" });
  await page.waitForTimeout(3000);

  await browser.close();

  if (!videoUrl) {
    throw new Error("Não foi possível encontrar o MP4");
  }

  // 🔥 importante: pegar stream do axios
  const response = await axios.get(videoUrl, {
    responseType: "stream"
  });

  return response.data; // stream direto
}
