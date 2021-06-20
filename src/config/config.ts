
export class Config{

    public static get port(): number {
        return parseInt(process.env["PORT"]);
    }

    public static get access_token_secret_key(): string {
        return process.env.ACCESSTOKEN_SECRETKEY;
    }

    public static get refresh_token_secret_key(): string {
        return process.env.REFRESHTOKEN_SECRETKEY;
    }

    public static get access_token_expiry_in_minutes(): number {
        return parseInt(process.env.ACCESSTOKEN_EXPIRY_IN_MINUTES);
    }

    public static get refresh_token_expiry_in_hours(): number {
        return parseInt(process.env.REFRESHTOKEN_EXPIRY_IN_HOURS);
    }

    public static get issuer():string{
        return process.env.ISSUER;
    }

    public static get db_uri():string{
        return process.env.DB_URI;
    }

    public static get system_admin_user_name():string{
        return process.env.SYSTEM_ADMIN_USER_NAME;
    }
}