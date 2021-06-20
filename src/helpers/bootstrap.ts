import { Config } from "../config/config";
import { PermissionProfile } from "../model/permissionProfile/permissionProfileDocumentSchema";
import { IUser } from "../model/user/user";
import { User } from "../model/user/userDocumentSchema";
import logger from "./logger";
const bcrypt = require("bcrypt");


export class Bootstrap{

    public static async initialize(){

        await Bootstrap.createPermissionProfiles();
        await Bootstrap.createSystemAdministrator();
    }

    private static async createPermissionProfiles(){
        
        logger.info("Starting to add/update permission profiles");
        const data = require("./../../init_data/permissionProfiles.json");

        let promiseCreateOrUpdatePermissionProfiles = data.map(async (x) => {

            return new Promise((resolve, reject) => {

                PermissionProfile.findOneAndUpdate({ 
                    name: x.name },
                     x,
                    { upsert: true, 
                        new: true
                    }).then((result) => {
                    resolve(result)
                }).catch((err) => reject(err));
            });

        });

        await Promise.all(promiseCreateOrUpdatePermissionProfiles);

        logger.info("Completed add/update permission profiles.");
    }

    private static async createSystemAdministrator() {

        logger.info("Creating/Updating a system administrator.");

        let permissionProfile = await PermissionProfile.findOne({ name: "system_admin" });

        const sysAdmin: IUser = {
            user_name: Config.system_admin_user_name,
            email: Config.system_admin_user_name,
            password: await bcrypt.hash("password@123", 10),
            permission_profile: permissionProfile.name,
            first_name:'System',
            last_name:'Administrator',
            country_code:'',
            phone: '',
            fcm_token:'',
            is_active:true, 
            is_deleted:false, 
            is_verified: true
        };

        await User.findOneAndUpdate({ 
            user_name: Config.system_admin_user_name
        }, 
        sysAdmin, { 
            upsert: true, 
            new: true
        });

        logger.info("Finished creating/updating a system administrator.");
    }
}