import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const passportConfig = () => {
  passport.serializeUser(function (user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function (obj: any, cb) {
    cb(null, obj);
  });

  const client_id_github: string = "bbfa88c36b1da0120aaf";
  const client_secret_github: string =
    "4c80c7e311dbfa288a0c7218e5ea3267af5222d6";
  const client_id_google: string =
    "215024360667-e64iuu3pit9qhrihc7r7m51hhv7h3o43.apps.googleusercontent.com";
  const client_secret_google: string = "FcM-R-T72_31mScReMllsfWE";

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
        console.log(profile);
        // try {
        //   const email = profile.emails[0].value;
        //   const data = await pool.query(
        //     `SELECT * FROM users WHERE(email = '${email}')`
        //   );
        //   let user = data.rows[0];
        //   if (!user) {
        //     await pool.query(
        //       `INSERT INTO users VALUES('${uuidv4()}', 'mahaveer', '${email}')`
        //     );
        //     user = await pool.query(
        //       `SELECT * FROM users WHERE(email = '${email}')`
        //     );
        //     user = user.rows[0];
        //   }
        //   cb(null, {
        //     user,
        //     accessToken,
        //     refreshToken,
        //   });
        // } catch (error) {
        //   console.log(error);
        // }
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
        const email = profile.emails[0].value;
        console.log(profile);
        // try {
        //   const data = await pool.query(
        //     `SELECT * FROM users WHERE(email = '${email}')`
        //   );
        //   let user = data.rows[0];
        //   if (!user) {
        //     await pool.query(
        //       `INSERT INTO users VALUES('${uuidv4()}', 'mahaveer', '${email}')`
        //     );
        //     user = await pool.query(
        //       `SELECT * FROM users WHERE(email = '${email}')`
        //     );
        //     user = user.rows[0];
        //     cb(null, {
        //       user,
        //       accessToken,
        //       refreshToken,
        //     });
        //   }
        // } catch (error) {
        //   console.log(error);
        // }
      }
    )
  );
};

export default passportConfig;
