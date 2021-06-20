export class FormattedResponse{

    private _success : boolean;
    private _data : any;
    private _error : any;

    constructor(success : boolean,data : any,error : any) {
        this._success = success;
        this._data = data;
        this._error = error;
    }
}