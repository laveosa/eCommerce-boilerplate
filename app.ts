import express from "express";

import apiMasterRoute from "#src/route/api/api-master-route.js";
import webMasterRoute from "#src/route/web/web-master-route.js";
import { pathResolve } from "#src/util/helper/path-helper.js";

const PORT = process.env.PORT || 8080;
const app = express();

app.set("view engine", "ejs");
app.set("views", pathResolve("./src/view"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(pathResolve("./public"), { maxAge: "1d" }));
app.use(express.static(pathResolve("./dist/public"), { maxAge: "1d" }));

app.use("/view", express.static(pathResolve("./src/view"), { maxAge: "1d" }));
app.use(
  "/view",
  express.static(pathResolve("./dist/src/view"), { maxAge: "1d" }),
);

app.use("/src", express.static(pathResolve("./src"), { maxAge: "1d" }));
app.use("/src", express.static(pathResolve("./dist/src"), { maxAge: "1d" }));

app.use("/api", apiMasterRoute);
app.use("/", webMasterRoute);

app.listen(PORT, () =>
  console.log(`[SERVER]: server running on port: ${PORT}`),
);
