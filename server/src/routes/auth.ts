import express from "express";
const router = express.Router();
import passport from "passport";
import { backAuthenticated } from "../middleware";

router.get("/github", passport.authenticate("github", { session: false }));

router.get(
  "/google",
  backAuthenticated,
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/oauth/github",
  backAuthenticated,
  passport.authenticate("github", { session: false }),
  (req: any, res) => {
    req.session.userID = req.user.user.id;
    req.session.displayName = req.user.user.displayName;
    req.session.username = req.user.user.username;
    req.session.photoUrl = req.user.user.photoUrl;
    req.session.bio = req.user.user.bio;
    req.session.email = req.user.user.email;
    req.session.accessToken = req.user.accessToken;
    req.session.refreshToken = req.user.refreshToken;

    // Successful authentication, redirect home.
    res.redirect("http://localhost:3000/");
  }
);

router.get(
  "/oauth/google",
  backAuthenticated,
  passport.authenticate("google", { failureRedirect: "/" }),
  (req: any, res) => {
    req.session!.userID = req.user.user.id;
    req.session.displayName = req.user.user.displayName;
    req.session.username = req.user.user.username;
    req.session.photoUrl = req.user.user.photoUrl;
    req.session.bio = req.user.user.bio;
    req.session.email = req.user.user.email;
    req.session.accessToken = req.user.accessToken;
    req.session.refreshToken = req.user.refreshToken;

    // Successful authentication, redirect home.
    res.redirect("http://localhost:3000/");
  }
);

export default router;
