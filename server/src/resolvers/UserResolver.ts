import { MyContext } from "src/config/types";
import { Ctx, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class UserResolver {
  @Query(() => String)
  Me(@Ctx() { req }: MyContext) {
    const val = req.session.userID;
    if (val === undefined) return "fuck";
    return "worked";
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) => {
      req.session.destroy((err) => {
        res.clearCookie("qid");
        if (err) {
          resolve(false);
          return;
        }
        resolve(true);
      });
    });
  }
}
