enum TRANSACTION_TYPE {
    EXPENSE,
    INCOME
}

enum USER_ROLE {
    SYSADMIN,
    CONSUMER
}



export class ApplicationEnums{

    static USER_MANAGEMENT = {
        ROLE :USER_ROLE
    }

    static TRANSACTION_MANAGEMENT = {
        TYPE :TRANSACTION_TYPE
    }

}