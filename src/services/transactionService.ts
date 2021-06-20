import { Config } from "../config/config";
import { AuthenticationResult } from "../helpers/authenticationResult";
import { ITransactionDocument } from "../model/transaction/transactionDocument";
import { Transaction } from "../model/transaction/transactionDocumentSchema";


export class TransactionService {

    public static async save(transaction: ITransactionDocument): Promise<ITransactionDocument> {

        const created = await transaction.save();
        return created;
    }

    public static async getById(id: string): Promise<ITransactionDocument> {

        const transaction = await Transaction.findById(id);
        return transaction;
    }

    public static async getMany(filter: Object): Promise<ITransactionDocument[]> {

        const transactions = await Transaction.find(filter);
        return transactions;
    }

}