import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";

import { PORT } from "./constants";

const app = express();

app.use(cors({ credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(compression());

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
