import { ITransaction as ITransaction } from "./transaction";
import * as mongoose from "mongoose";

export interface ITransactionDocument extends mongoose.Document, ITransaction {
}

