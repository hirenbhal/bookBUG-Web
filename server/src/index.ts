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
import session from "express-session";
import connectRedis from "connect-redis";
import redis from "redis";
require("dotenv").config();

const app = express();
const httpServer = createServer(app);

// redis connection and session in redis
const RedisStore = connectRedis(session);
let redisClient = redis.createClient({
  host: "localhost",
  port: 6379,
});

const main = async () => {
  // for cookies
  app.set("trust proxy", 1);

  // middlewares
  app.use(
    session({
      name: "qid",
      store: new RedisStore({
        client: redisClient,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: "lax", // csrf
      },
      saveUninitialized: true,
      secret: "fsdfjdasfijasfnsdfnwrjf",
      resave: false,
    })
  );
  app.use(
    cors({
      origin: "http://localhost:3000/",
    })
  );
  app.use(require("body-parser").urlencoded({ extended: true }));
  app.use(passport.initialize());

  // passport config file
  passportConfig();

  // routes
  app.use("/auth", authRoutes);

  app.get("/", (_req, res) => {
    res.send("hello");
  });

  const schema = await buildSchema({
    resolvers: [HelloResolver],
    validate: true,
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res, redisClient }),
  });

  apolloServer.applyMiddleware({ app, cors: false });

  const PORT: number = Number(process.env.PORT) || 5000;
  httpServer.listen(PORT, () => {
    console.log(`Running on port http://localhost:${PORT}`);
  });
};

main();
