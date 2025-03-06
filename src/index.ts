import { json } from "body-parser";
import express from "express";
import { cors } from "./middlewares/cors";
import { uar } from "./middlewares/uar";
import { serverConfig } from "./serverConfig";
import http from "http";
import { PostsRouter } from "./router/Posts";
import { UsersRouter } from "./router/Users";
import { NewsRouter } from "./router/News";


// sharp 压缩图片
const path = require("path");

export const app = express();

app.use(json({ limit: serverConfig.jsonMaxSize }));
app.use((req, res, next) =>
  cors(
    req,
    res,
    next,
    serverConfig.corsOrigin,
    serverConfig.corsOriginWhitelist
  )
);

app.use(uar());

app.set("view engine", "html");

// ========================================================== Routes

// ========================================================== Serving static content

app.use("/posts", express.static(path.join(__dirname, "/posts")));

app.use("/users", express.static(path.join(__dirname, "/users")));

app.use("/news", express.static(path.join(__dirname, "/news")));

app.use("/swagger", express.static("swagger"), (req, res) => {
  res.sendFile("./index.html", {
    root: serverConfig.cwd,
  });
});

app.use("/post", PostsRouter);

app.use("/user",UsersRouter);

app.use('/new',NewsRouter);

const server = http.createServer(app);

server.listen(serverConfig.port, () => {
  console.info("api-server started: ", {
    NODE_ENV: process.env.NODE_ENV,
    ...serverConfig,
  });
});
