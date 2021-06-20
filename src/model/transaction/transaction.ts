export interface ITransaction {
    user_id: string,
    year: number,
    month: number,
    date: string,
    amount: number,
    type: string,
    description: string,
    category_id: string,
    tags: [string],
    source_id: string
}

