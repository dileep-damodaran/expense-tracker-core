export class EnumManager{


    static getNamesAndValues<T extends number>(e: any) {
        return EnumManager.getNames(e).map(n => ({ name: n, value: e[n] as T }));
    }

    static getNames(e: any) {
        return EnumManager.getObjValues(e).filter(v => typeof v === "string") as string[];
    }

    static getValues<T extends number>(e: any) {
        return EnumManager.getObjValues(e).filter(v => typeof v === "number") as T[];
    }

    static isValueExist(e: any, v: any): boolean {
        return Object.keys(e).includes(v);
    }

    private static getObjValues(e: any): (number | string)[] {
        return Object.keys(e).map(k => e[k]);
    }
}