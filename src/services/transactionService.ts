import { Config } from "../config/config";
import { AuthenticationResult } from "../helpers/authenticationResult";
import { ApplicationEnums } from "../helpers/enum";
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

    public static async getMany(filter: Object, sortingCondition: Object): Promise<ITransactionDocument[]> {

        const transactions = await Transaction.find(filter).sort(sortingCondition);
        return transactions;
    }

    public static async getSummary(userId: string, year: number, month: number): Promise<any> {

        let baseFilter = {
            user_id: userId,
            year: year
        };

        if (month)
            baseFilter['month'] = month;

        const incomeFilter = {
            ...baseFilter,
            type: ApplicationEnums.TRANSACTION_MANAGEMENT.TYPE[ApplicationEnums.TRANSACTION_MANAGEMENT.TYPE.INCOME]
        };

        const expenseFilter = {
            ...baseFilter,
            type: ApplicationEnums.TRANSACTION_MANAGEMENT.TYPE[ApplicationEnums.TRANSACTION_MANAGEMENT.TYPE.EXPENSE]
        }

        const aggregateIncome = [
            {
                $match: incomeFilter
            },
            {
                $group: {
                    _id: '$user_id',
                    total: { $sum: '$amount' }
                }
            }
        ];

        const aggregateExpense = [
            {
                $match: expenseFilter
            },
            {
                $group: {
                    _id: '$user_id',
                    total: { $sum: '$amount' }
                }
            }
        ];

        const data = await Transaction.collection.aggregate([
            {
                $facet: {
                    income: aggregateIncome,
                    expense: aggregateExpense
                }
            }
        ]).toArray();

        const income = data && data[0] && data[0].income && data[0].income[0] && data[0].income[0].total ? data[0].income[0].total : 0
        const expense = data && data[0] && data[0].expense && data[0].expense[0] && data[0].expense[0].total ? data[0].expense[0].total : 0
        const balance = (income > expense) ? (income - expense) : 0;

        const summary = { income, expense, balance };

        return summary;
    }

}