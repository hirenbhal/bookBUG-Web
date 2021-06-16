import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Users } from "../entities/User";

interface userInterface {
  displayName: string;
  username: string;
  email: string;
  photoUrl: string;
  bio: string;
}

const passportConfig = () => {
  passport.serializeUser(function (user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function (obj: any, cb) {
    cb(null, obj);
  });

  const client_id_github: string = process.env.CLIENT_ID_GITHUB || "";
  const client_secret_github: string = process.env.CLIENT_SECRET_GITHUB || "";
  const client_id_google: string = process.env.CLIENT_ID_GOOGLE || "";
  const client_secret_google: string = process.env.CLIENT_SECRET_GOOGLE || "";

  // FOR github

  passport.use(
    new GitHubStrategy(
      {
        clientID: client_id_github,
        clientSecret: client_secret_github,
        callbackURL: "http://localhost:5000/auth/oauth/github",
        scope: ["user:email"],
      },
      async (accessToken: any, refreshToken: any, profile: any, cb: any) => {
        const email: string = profile.emails[0].value;
        const photoUrl: string = profile.photos[0].value;
        const curUser: userInterface = {
          displayName: "",
          username: "",
          email: email,
          photoUrl: photoUrl,
          bio: "",
        };
        let user = await Users.findOne({ email: email });
        if (user !== undefined) {
          return cb(null, {
            user,
            accessToken,
            refreshToken,
          });
        }
        user = await Users.create(curUser).save();
        cb(null, {
          user,
          accessToken,
          refreshToken,
        });
      }
    )
  );

  // for google

  passport.use(
    new GoogleStrategy(
      {
        clientID: client_id_google,
        clientSecret: client_secret_google,
        callbackURL: "http://localhost:5000/auth/oauth/google",
      },
      async (accessToken: any, refreshToken: any, profile: any, cb: any) => {
        const email: string = profile.emails[0].value;
        const photoUrl: string = profile.photos[0].value;
        const curUser: userInterface = {
          displayName: "",
          username: "",
          email: email,
          photoUrl: photoUrl,
          bio: "",
        };
        let user = await Users.findOne({ email: email });
        if (user !== undefined) {
          return cb(null, {
            user,
            accessToken,
            refreshToken,
          });
        }
        user = await Users.create(curUser).save();
        cb(null, {
          user,
          accessToken,
          refreshToken,
        });
      }
    )
  );
};

export default passportConfig;
