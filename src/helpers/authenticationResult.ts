

export class AuthenticationResult{

    public  authenticated : boolean;
    public  refreshToken : string;
    public  accessToken : string;
    public  error : string;

    constructor(authenticated : boolean,refreshToken : string,accessToken : string,error:string) {
        this.authenticated = authenticated;
        this.refreshToken = refreshToken;
        this.accessToken = accessToken;
        this.error = error;

    }
}