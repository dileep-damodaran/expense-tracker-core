import { ITransactionSource as ITransactionSource } from "./transactionSource";
import * as mongoose from "mongoose";

export interface ITransactionSourceDocument extends mongoose.Document, ITransactionSource {
}

