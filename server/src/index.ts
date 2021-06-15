import "reflect-metadata";
import express from "express";
import { createServer } from "http";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import passport from "passport";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/HelloResolver";
import authRoutes from "./routes/auth";
import passportConfig from "./config/passportConfig";
require("dotenv").config();

const app = express();
const httpServer = createServer(app);

const main = async () => {
  // for cookies
  app.set("trust proxy", 1);

  // middlewares
  app.use(
    cors({
      origin: "http://localhost:3000/",
    })
  );
  app.use(require("body-parser").urlencoded({ extended: true }));
  app.use(passport.initialize());
  app.use(passport.session());

  // passport config file
  passportConfig();

  // routes
  app.use("/auth", authRoutes);

  const schema = await buildSchema({
    resolvers: [HelloResolver],
    validate: true,
  });

  const apolloServer = new ApolloServer({ schema });

  apolloServer.applyMiddleware({ app, cors: false });

  const PORT: number = Number(process.env.PORT) || 5000;
  httpServer.listen(PORT, () => {
    console.log(`Running on port http://localhost:${PORT}`);
  });
};

main();
