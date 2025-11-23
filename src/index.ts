import { createServer } from "http";
import { parse } from "url";
import next from "next";
import healthHandler from "./health";

const dev = process.env.NODE_ENV !== "production";
const hostname = "0.0.0.0";
const port = Number(process.env.PORT || 8080);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url || "/", true);

    if (parsedUrl.pathname === "/health") {
      const resLike = {
        status(statusCode: number) {
          res.statusCode = statusCode;
          return this;
        },
        json(payload: unknown) {
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(payload));
        }
      };

      return healthHandler(req, resLike as any);
    }

    handle(req, res, parsedUrl);
  });

  server.listen(port, hostname, () => {
    console.log(`[blackroad-os-prism-console] listening on http://${hostname}:${port}`);
  });
});
