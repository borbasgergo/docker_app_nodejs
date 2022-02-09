
import express from "express"
import { UserController } from "../controllers/UserController";
import { AuthMiddleware } from "../middlewares/Auth";

export const UserRouter = express.Router();

UserRouter.use(AuthMiddleware)

UserRouter.get("/", UserController.get_all)
UserRouter.get("/:id", UserController.get_one)
UserRouter.post("/", UserController.save)
UserRouter.put("/:uid", UserController.update)
UserRouter.delete("/:id", UserController.delete)

