import * as mongoose from "mongoose";
import { ICategoryDocument as ICategoryDocument } from "./categoryDocument";

let categorySchema = new mongoose.Schema({
    user_id: { type: String, required: true, unique: false },
    name: { type: String, required: true, unique: false },
    is_default: { type: Boolean, required: true, unique: false },
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

categorySchema.index({ user_id: 1, is_default: 1 });
export let Category: mongoose.Model<ICategoryDocument> = mongoose.model<ICategoryDocument>("category", categorySchema);


