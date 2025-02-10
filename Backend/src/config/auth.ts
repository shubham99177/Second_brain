import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as LinkedInStrategy } from "passport-linkedin-oauth2";
import User from "../Models/user.model";
import dotenv from "dotenv";

dotenv.config();

console.log(process.env.GOOGLE_CLIENT_ID);

// 🔹 Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    async (_accessToken, _refreshToken, profile, done) => {
      let user = await User.findOne({
        providerId: profile.id,
        provider: "google",
      });

      if (!user) {
        user = await new User({
          name: profile.displayName,
          email: profile.emails?.[0]?.value,
          providerId: profile.id,
          provider: "google",
          avatar: profile.photos?.[0]?.value,
        }).save();
      }

      done(null, user);
    }
  )
);

// 🔹 LinkedIn Strategy
// passport.use(
//   new LinkedInStrategy(
//     {
//       clientID: process.env.LINKEDIN_CLIENT_ID!,
//       clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
//       callbackURL: "http://localhost:5000/auth/linkedin/callback",
//       scope: ["r_liteprofile", "r_emailaddress"],
//     },
//     async (_accessToken, _refreshToken, profile, done) => {
//       let user = await User.findOne({
//         providerId: profile.id,
//         provider: "linkedin",
//       });

//       if (!user) {
//         user = await new User({
//           name: profile.displayName,
//           email: profile.emails?.[0]?.value,
//           providerId: profile.id,
//           provider: "linkedin",
//           avatar: profile.photos?.[0]?.value,
//         }).save();
//       }

//       done(null, user);
//     }
//   )
// );
