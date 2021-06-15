import express from "express";
const router = express.Router();
import passport from "passport";
import { ensureAuthenticated, backAuthenticated } from "../middleware";

router.get("/github", backAuthenticated, passport.authenticate("github"));

router.get(
  "/google",
  backAuthenticated,
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/oauth/github",
  backAuthenticated,
  passport.authenticate("github", { failureRedirect: "/" }),
  (req: any, res) => {
    // req.session.userID = req.user.user.id;
    // req.session.name = req.user.user.name;
    // req.session.email = req.user.user.email;
    // req.session.accessToken = req.user.accessToken;
    // req.session.refreshToken = req.user.refreshToken;

    // Successful authentication, redirect home.
    res.redirect("http://localhost:3000/");
  }
);

router.get(
  "/oauth/google",
  backAuthenticated,
  passport.authenticate("google", { failureRedirect: "/" }),
  (req: any, res) => {
    // req.session.userID = req.user.user.id;
    // req.session.name = req.user.user.name;
    // req.session.email = req.user.user.email;
    // req.session.accessToken = req.user.accessToken;
    // req.session.refreshToken = req.user.refreshToken;

    // Successful authentication, redirect home.
    res.redirect("http://localhost:3000/");
  }
);

router.get("/logout", ensureAuthenticated, (req: any, res) => {
  req.session = null;
  res.redirect("http://localhost:3000/");
});

export default router;
