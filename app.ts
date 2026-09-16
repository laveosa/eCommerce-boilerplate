import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";

import apiMasterRoute from "#src/route/api/api-master-route.js";
import webMasterRoute from "#src/route/web/web-master-route.js";
import { pathResolve } from "#src/util/helper/path-helper.js";
import { connectDB } from "#src/util/config/mongo-db-config.js";
import { attachUserMiddleware } from "#src/util/middleware/attach-user-middleware.js";
import { cookieSessionMiddleware } from "#src/util/middleware/cookie-session-middleware.js";
import { mongoSessionMiddleware } from "#src/util/middleware/mongo-session-middleware.js";
import {
  csrfProtection,
  getCsrfToken,
} from "#src/util/middleware/csrf-middleware.js";
import { typeDefs } from "#src/const/scheme/graphql-shemas/main-type-defs.js";
import { resolvers } from "#src/resolvers/main-resolver.js";

const PORT = process.env.PORT || 8080;
const app = express();
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

app.set("view engine", "ejs");
app.set("views", pathResolve("./src/view"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET || "your-secret-key-1"));

app.use(cookieSessionMiddleware);
// app.use(mongoSessionMiddleware);

app.use(csrfProtection);
app.use((req, res, next) => {
  res.locals.csrfToken = getCsrfToken(req, res);
  next();
});

app.use((req, res, next) => {
  res.locals.flashMessage = req.session.flashMessage || null;
  delete req.session.flashMessage;
  next();
});

app.use(express.static(pathResolve("./public"), { maxAge: "1d" }));
app.use(express.static(pathResolve("./dist/public"), { maxAge: "1d" }));

app.use("/view", express.static(pathResolve("./src/view"), { maxAge: "1d" }));
app.use(
  "/view",
  express.static(pathResolve("./dist/src/view"), { maxAge: "1d" }),
);

app.use("/src", express.static(pathResolve("./src"), { maxAge: "1d" }));
app.use("/src", express.static(pathResolve("./dist/src"), { maxAge: "1d" }));

app.use(attachUserMiddleware);

app.use("/api", apiMasterRoute);
app.use("/", webMasterRoute);

const startServer = async (): Promise<void> => {
  await connectDB();
  await apolloServer.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(apolloServer),
  );

  app.listen(PORT, () => {
    console.log(`[SERVER]: Server running on http://localhost:${PORT}`);
    console.log(
      `[GRAPHQL]: Endpoint ready at http://localhost:${PORT}/graphql`,
    );
  });
};

await startServer();
