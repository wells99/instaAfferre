import axios from "axios";

export async function downloadVideoStream(videoUrl) {
  const response = await axios.get(videoUrl, {
    responseType: "stream",
    headers: {
      // importante para CDN do Instagram
      "User-Agent": "Mozilla/5.0",
      "Referer": "https://www.instagram.com/"
    }
  });

  return response.data; // stream
}
