import * as mongoose from "mongoose";
import { ITagDocument as ITagDocument } from "./tagDocument";

let tagSchema = new mongoose.Schema({
    user_id: { type: String, required: true, unique: false },
    name: { type: String, required: true, unique: false }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

tagSchema.index({ user_id: 1, name: 1});
export let Tag: mongoose.Model<ITagDocument> = mongoose.model<ITagDocument>("tag", tagSchema);


