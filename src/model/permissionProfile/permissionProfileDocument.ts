import { IPermissionProfile as IPermissionProfile } from "./permissionProfile";
import * as mongoose from "mongoose";

export interface IPermissionProfileDocument extends mongoose.Document, IPermissionProfile {
}

