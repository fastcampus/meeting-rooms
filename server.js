import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// API 프록시
app.use(
  "/api",
  createProxyMiddleware({
    target: "https://api.fastfive.co.kr",
    changeOrigin: true,
    pathRewrite: { "^/api": "" },
    onProxyReq: (proxyReq) => {
      proxyReq.setHeader("origin", "https://members.fastfive.co.kr");
      proxyReq.setHeader("referer", "https://members.fastfive.co.kr/");
    },
  })
);

// 정적 파일 서빙
app.use(express.static(path.join(__dirname, "dist")));

// SPA 라우팅
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
