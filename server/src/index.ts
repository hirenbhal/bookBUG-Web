import express from "express";
import cors from "cors";
import passport from "passport";
import authRoutes from "./routes/auth";
import logger from "morgan";
import passportConfig from "./config/passportConfig";
require("dotenv").config();

const main = async () => {
  const app = express();

  // for cookies
  app.set("trust proxy", 1);

  // middlewares
  app.use(
    cors({
      origin: "http://localhost:3000/",
    })
  );
  app.use(require("body-parser").urlencoded({ extended: true }));
  app.use(logger("dev"));
  app.use(passport.initialize());
  app.use(passport.session());

  // passport config file
  passportConfig();

  // routes
  app.use("/auth", authRoutes);

  app.get("/", (_req, res) => {
    res.send("hello");
  });

  const PORT: number = Number(process.env.PORT) || 5000;
  app.listen(5000, () => {
    console.log(`Running on port ${PORT}`);
  });
};

main();
