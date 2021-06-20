import { IUserDocument } from "../model/user/userDocument";


export class AuthenticationResult {

    public authenticated: boolean;
    public refreshToken: string;
    public accessToken: string;
    public user: IUserDocument;
    public error: string;

    constructor(authenticated: boolean, refreshToken: string, accessToken: string, user: IUserDocument, error: string) {
        this.authenticated = authenticated;
        this.refreshToken = refreshToken;
        this.accessToken = accessToken;
        this.user = user;
        this.error = error;

    }
}