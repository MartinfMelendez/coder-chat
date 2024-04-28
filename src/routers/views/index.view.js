import { Router } from "express";
import userRouter from "./users.views.js";
import productRouter from "./products.views.js";

const viewRouter = Router();

viewRouter.use("/users", userRouter);
viewRouter.use("/products", productRouter);

viewRouter.get("/", (req,res,next) =>{
    try {
        return res.render("index", {title: "Home"})
    } catch (error) {
        return next(error)
    }
});

viewRouter.get("/chat", async(req,res,next)=>{
    try {
        return res.render("chat", {tittle: "Chat"})
    } catch (error) {
        return next(error)
    }
})

export default viewRouter;
