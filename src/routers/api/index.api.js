import { Router } from "express";
import userRouter from "./user.api.js";
import productRouter from "./product.api.js";

const apiRouter = Router();

apiRouter.use("/users", userRouter);
apiRouter.use("/reals", productRouter)

export default apiRouter;