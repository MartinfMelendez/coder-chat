import { Router } from "express";
import productManager from "../../data/fs/ProductManager.fs.js";

const productRouter = Router();

productRouter.get("/", async (req, res, next) => {
  try {
    const product = await productManager.read();
    return res.render("products", { product });
  } catch (error) {
    return next(error);
  }
});

productRouter.get("/:pid", async (req, res, next) => {
    try {
      const { pid } = req.params;
      const one = await productManager.readOne(pid);
      return res.render("detailsProducts", { products: one });
    } catch (error) {
      return next(error);
    }
  });

export default productRouter;
