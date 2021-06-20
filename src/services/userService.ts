import { PermissionProfile } from "../model/permissionProfile/permissionProfileDocumentSchema";
import { IUserDocument } from "../model/user/userDocument";
import { User } from "../model/user/userDocumentSchema";


export class UserService {
    
    public static create(user:IUserDocument):IUserDocument{

        return user;
    }

    public static async getById(id:string):Promise<IUserDocument>{

        const user = await User.findById(id);
        return user;
    }

    public static async getByUserName(userName:string):Promise<IUserDocument>{

        const user = await User.findOne({ user_name: userName });
        return user;
    }

    public static async getPermissions(user:IUserDocument):Promise<any>{

        let x = await PermissionProfile.findOne({ name: user.permission_profile });
        const userPermissions = x && x.permissions ? x.permissions : []
        return userPermissions;
    }
}