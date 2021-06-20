import * as mongoose from "mongoose";
import { ApplicationEnums } from "../../helpers/enum";
import { EnumManager } from "../../helpers/enumManager";
import { ITransactionDocument as ITransactionDocument } from "./transactionDocument";

let transactionSchema = new mongoose.Schema({
    user_id: { type: String, required: true, unique: false },
    year: { type: Number, required: true, unique: false },
    month: { type: Number, required: true, unique: false },
    date: { type: Number, required: true, unique: false },
    amount: { type: Number, required: true, unique: false },
    type: {
        type: String,
        enum: EnumManager.getNames(ApplicationEnums.TRANSACTION_MANAGEMENT.TYPE),
        required: true
    },
    description: { type: String, required: false, unique: false },
    category_id: { type: String, required: true, unique: false },
    tags_ids: { type: Array, required: true, unique: false },
    source_id: { type: String, required: true, unique: false }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

transactionSchema.index({ user_id: 1, category_id: 1, source_id: 1 });
export let Transaction: mongoose.Model<ITransactionDocument> = mongoose.model<ITransactionDocument>("transaction", transactionSchema);


