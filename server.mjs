import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { createServer } from "node:http";

const root = process.cwd();
const port = Number(process.env.PORT || 5173);
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".md": "text/markdown; charset=utf-8"
};

createServer((req, res) => {
  const urlPath = decodeURIComponent(new URL(req.url, `http://localhost:${port}`).pathname);
  const safePath = normalize(urlPath).replace(/^(\.\.[/\\])+/, "");
  let filePath = join(root, safePath);

  if (!existsSync(filePath) || statSync(filePath).isDirectory()) {
    filePath = join(root, "index.html");
  }

  res.setHeader("Content-Type", types[extname(filePath)] || "application/octet-stream");
  createReadStream(filePath).pipe(res);
}).listen(port, () => {
  console.log(`Themis prototype running at http://localhost:${port}`);
});
