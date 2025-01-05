import {IUser} from "./src/models/user";
import {Request} from "express";

declare global {
    namespace Express {
        interface Request {
            user?: IUser
        }
    }
}

export interface AuthenticatedRequest extends Request {
    user?: IUser;
}
