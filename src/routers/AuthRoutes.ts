import express from "express"
import { AuthController } from "../controllers/AuthController"

export const AuthRouter = express.Router()

AuthRouter.post("/login", AuthController.login)
AuthRouter.post("/register", AuthController.register)