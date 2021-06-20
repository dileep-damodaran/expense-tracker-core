import * as mongoose from "mongoose";
import { ITransactionSourceDocument as ITransactionSourceDocument } from "./transactionSourceDocument";

let transactionSourceSchema = new mongoose.Schema({
    user_id: { type: String, required: true, unique: false },
    name: { type: String, required: true, unique: false }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

transactionSourceSchema.index({ user_id: 1, name: 1 });
export let TransactionSource: mongoose.Model<ITransactionSourceDocument> = mongoose.model<ITransactionSourceDocument>("transactionSource", transactionSourceSchema);


