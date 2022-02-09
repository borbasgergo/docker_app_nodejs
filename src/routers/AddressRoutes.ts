
import express from "express"
import { AddressController } from "../controllers/AddressController";
import { AuthMiddleware } from "../middlewares/Auth"

export const AddressRouter = express.Router();

AddressRouter.use(AuthMiddleware)

// get address for the given user
AddressRouter.get("/:uid", AddressController.get_addresses) // uid = user id, 

// save address to the given user
AddressRouter.post("/:uid", AddressController.save)
AddressRouter.delete("/:aid", AddressController.delete) // aid = address id

//update address at the given address id
AddressRouter.put("/:aid", AddressController.update)
