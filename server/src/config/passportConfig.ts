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
        cb(null, {
          accessToken,
          refreshToken,
        });
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
        // const email = profile.emails[0].value;
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
        cb(null, {
          accessToken,
          refreshToken,
        });
        //   }
        // } catch (error) {
        //   console.log(error);
        // }
      }
    )
  );
};

export default passportConfig;
