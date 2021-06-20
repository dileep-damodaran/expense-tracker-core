import * as mongoose from "mongoose";
import { IPermissionProfileDocument as IPermissionProfileDocument } from "./permissionProfileDocument";

let permissionProfileSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    display_name: { type: String, required: true, unique: true },
    description: { type: String, required: false, unique: false },
    scope: { type: String, required: true, enum: ["ROOT"], default: "ROOT" },
    permissions: [String],
    active: { type: Boolean, required: true, default: true }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

export let PermissionProfile: mongoose.Model<IPermissionProfileDocument> = mongoose.model<IPermissionProfileDocument>("permissionProfile", permissionProfileSchema);


