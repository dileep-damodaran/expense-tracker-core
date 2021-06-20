export interface ITransaction {
    user_id: string,
    year: number,
    month: number,
    day: string,
    date: Date,
    amount: number,
    type: string,
    description: string,
    category_id: string,
    tag_ids: [string],
    source_id: string
}

