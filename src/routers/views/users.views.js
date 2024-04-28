import { Router } from "express";
import userManager from "../../data/fs/UserManager.fs.js";

const userRouter = Router();

userRouter.get("/", async (req, res, next) => {
  try {
    const users = await userManager.read();
    return res.render("users", { users });
  } catch (error) {
    return next(error);
  }
});

userRouter.get("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const one = await userManager.readOne(uid);
    return res.render("detailsUsers", { users: one });
  } catch (error) {
    return next(error);
  }
});


export default userRouter;
