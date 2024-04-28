import { Router } from "express";
import productManager from "../../data/fs/ProductManager.fs.js";
import isPhoto from "../../middleware/isPhoto.js";
import uploader from "../../middleware/multer.mid.js";


const productRouter = Router();

export default productRouter;

async function create(req, res, next) {
  try {
    //const { title, photo, category, price, stock } = req.params;
    //const data = { title, photo, category, price, stock };
    const data = req.body;
    const one = await productManager.create(data);
    return res.status(201).json({ response: one, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ response: "ERROR", success: false });
  }
}

async function read(req, res, next) {
  try {
    // const { category } = req.query;
    const all = await productManager.read();
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
    const one = await productManager.readOne(nid);
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
    const one = await productManager.update(nid, data);
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
    const one = await productManager.destroy(nid);
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

productRouter.get("/", read);
productRouter.get("/:nid", readOne);
productRouter.post("/", uploader.single("photo"), isPhoto, create);
productRouter.put("/:nid", update);
productRouter.delete("/:nid", destroy);
