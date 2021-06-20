export interface ITransaction {

    user_id: string,
    date: Date,
    amount: number,
    type: string,
    description: string,
    category_id: string,
    tags: [string],
    source_id: string
}

