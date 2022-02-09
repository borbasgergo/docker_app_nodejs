import { Request, response, Response } from "express";
import { Address } from "../domains/Address";
import { del, find_address, get_addresses_for_user, refresh, save } from "../repos/AddressRepository";

export class AddressController {

    public static async get_addresses(req: Request, res: Response) {

        const for_user = req.params.uid;

        const addresses: Address[] = await get_addresses_for_user(for_user)

        if(addresses.length) {

            return res.json({
                error: false,
                addresses
            })
        }

        return res.json({
            error: true,
            msg: "No addresses for the given user!"
        })

    }

    public static async save(req: Request, res: Response) {

        const uid = req.params.uid;

        const { street, house } = req.body;

        if(street.length == 0) {
            return res.json({
                error: true,
                msg: "Street must be written!"
            })
        }

        const addr = await save(new Address(street, house), uid)

        if (addr) {

            return res.json({
                error: false,
                addr
            })
            
        } 

        return res.json({
            error: true,
            msg: "Address couldn't be created!"
        })
    }


    public static async delete(req: Request, res: Response) {

        const aid = req.params.aid;


        const addr = await del(aid);

        if (addr) {

            return res.json({
                error: false,
                addr
            })
            
        } 

        return res.json({
            error: true,
            msg: "Address couldn't be deleted!"
        })
    }

    public static async update(req: Request, res: Response) {

        const aid = req.params.aid;

        const { street, house } = req.body;

        const current_addr = await find_address(aid);

        if( !current_addr ) {
            return res.json({ error: true, msg: "No address with the given id!"})
        }

        if( street?.length != 0 ) {
            current_addr.street = street;
        }
        if( house.length != 0) {
            current_addr.house = house;
        }
        
        const addr = await refresh(current_addr)

        if (addr) {

            return res.json({
                error: false,
                addr
            })
            
        } 

        return res.json({
            error: true,
            msg: "Address couldn't be updated!"
        })
    }
}