import rateLimit from "express-rate-limit";

// limite global
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: "App ainda em testes por favor tente novamente em breve",
});