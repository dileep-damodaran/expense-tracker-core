import * as mongoose from "mongoose";
import { IUserDocument as IUserDocument } from "./userDocument";

let userSchema = new mongoose.Schema({

    user_name: { type: String, unique: true, required: true },
    password: { type: String, unique: false, required: true },
    permission_profile: { type: String, unique: false, required: true },
    first_name: { type: String, unique: false, required: true },
    last_name: { type: String, unique: false, required: true },
    email: { type: String, unique: false, required: false },
    country_code: { type: String, unique: false, required: false },
    phone: { type: String, unique: false, required: false },
    fcm_token: { type: String, unique: false, required: false },
    is_verified: { type: Boolean, unique: false, required: true, default: false },
    is_active: { type: Boolean, unique: false, required: true, default: true },
    is_deleted: { type: Boolean, unique: false, required: true, default: false }
},
    {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

userSchema.index({ user_name: 1, email: 1, phone: 1 });

export let User: mongoose.Model<IUserDocument> = mongoose.model<IUserDocument>("user", userSchema);