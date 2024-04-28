import { Router } from "express";
import apiRouter from "./api/index.api.js";
import viewRouter from "./views/index.view.js";

const indexRouter = Router();

indexRouter.use("/api", apiRouter);
indexRouter.use("/", viewRouter);

export default indexRouter;
