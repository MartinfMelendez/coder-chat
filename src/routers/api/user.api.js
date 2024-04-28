import { Router } from "express";
import userManager from "../../data/fs/UserManager.fs.js";
import isText from "../../middleware/isText.mid.js";
import uploader from "../../middleware/multer.mid.js";
import isPhoto from "../../middleware/isPhoto.js";

const userRouter = Router();

export default userRouter;

async function create(req, res, next) {
  try {
    //const { photo, email, password } = req.params;
    //const data = { photo, email, password };
    const data = req.body;
    console.log(req.file)
    const one = await userManager.create(data);
    return res.status(201).json({ response: one, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ response: "ERROR", success: false });
  }
}

async function read(req, res, next) {
  try {
    //const { email } = req.query;
    const all = await userManager.read();
    return res.status(200).json({ response: all, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      response: "ERROR",
      success: false,
    });
  }
}

async function readOne(req, res, next) {
  try {
    const { nid } = req.params;
    const one = await userManager.readOne(nid);
    if (one) {
      return res.status(200).json({
        response: one,
        success: true,
      });
    } else {
      const error = new Error("Not Found");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return res.status(error.statusCode).json({
      response: error.message,
      succes: false,
    });
  }
}

async function update(req, res, next) {
  try {
    const { nid } = req.params;
    const data = req.body;
    const one = await userManager.update(nid, data);
    return res.json({
      statusCode: 200,
      message: "Update ID: " + one.id,
    });
  } catch (error) {
    return next(error);
  }
}

async function destroy(req, res, next) {
  try {
    const { nid } = req.params;
    const one = await userManager.destroy(nid);
    if (one) {
      return res.json({
        statusCode: 200,
        response: one,
      });
    }
  } catch (error) {
    return next(error);
  }
}

userRouter.post("/", uploader.single("photo"),isPhoto,isText, create);
userRouter.get("/", read);
userRouter.get("/:nid", readOne);
userRouter.put("/:nid", update);
userRouter.delete("/:nid", destroy);
