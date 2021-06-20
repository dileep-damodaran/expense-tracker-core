import { Config } from "../config/config";
import { PermissionProfile } from "../model/permissionProfile/permissionProfileDocumentSchema";
import { IUser } from "../model/user/user";
import { User } from "../model/user/userDocumentSchema";
import { ApplicationEnums } from "./enum";
import logger from "./logger";
const bcrypt = require("bcrypt");

export class Bootstrap {

    public static async initialize() {

        await Bootstrap.createPermissionProfiles();
        await Bootstrap.createSystemAdministrator();
        await Bootstrap.createDefaultConsumer();
        await Bootstrap.createDefaultPremiumConsumer();
    }

    private static async createPermissionProfiles() {

        logger.info("[Started] : Adding/Updating permission profiles.");
        const data = require("./../../init_data/permissionProfiles.json");

        let promiseCreateOrUpdatePermissionProfiles = data.map(async (x) => {

            return new Promise((resolve, reject) => {

                PermissionProfile.findOneAndUpdate({
                    name: x.name
                },
                    x,
                    {
                        upsert: true,
                        new: true
                    }).then((result) => {
                        resolve(result)
                    }).catch((err) => reject(err));
            });

        });

        await Promise.all(promiseCreateOrUpdatePermissionProfiles);

        logger.info("[Completed] : Adding/Updating permission profiles.");
    }

    private static async createSystemAdministrator() {

        logger.info("[Started] : Adding/Updating system administrator.");

        let permissionProfile = await PermissionProfile.findOne({ name: "system_admin" });

        const sysAdmin: IUser = {
            user_name: Config.system_admin_user_name,
            role: ApplicationEnums.USER_MANAGEMENT.ROLE[ApplicationEnums.USER_MANAGEMENT.ROLE.SYSADMIN],
            email: Config.system_admin_user_name,
            password: await bcrypt.hash("password@123", 10),
            permission_profile: permissionProfile.name,
            first_name: 'System',
            last_name: 'Administrator',
            country_code: '',
            phone: '',
            fcm_token: '',
            is_active: true,
            is_deleted: false,
            is_verified: true
        };

        await User.findOneAndUpdate({
            user_name: Config.system_admin_user_name
        },
            sysAdmin, {
            upsert: true,
            new: true
        });

        logger.info("[Completed] : Adding/Updating system administrator.");
    }

    private static async createDefaultConsumer() {

        logger.info("[Started] : Adding/Updating default consumer.");

        let permissionProfile = await PermissionProfile.findOne({ name: "consumer" });

        const consumer: IUser = {
            user_name: 'consumer',
            role: ApplicationEnums.USER_MANAGEMENT.ROLE[ApplicationEnums.USER_MANAGEMENT.ROLE.CONSUMER],
            email: 'consumer@test.com',
            password: await bcrypt.hash("password@123", 10),
            permission_profile: permissionProfile.name,
            first_name: 'Default',
            last_name: 'Consumer',
            country_code: '',
            phone: '',
            fcm_token: '',
            is_active: true,
            is_deleted: false,
            is_verified: true
        };

        await User.findOneAndUpdate({
            user_name: 'consumer'
        },
            consumer, {
            upsert: true,
            new: true
        });

        logger.info("[Completed] : Adding/Updating default consumer.");
    }

    private static async createDefaultPremiumConsumer() {

        logger.info("[Started] : Adding/Updating default premium consumer.");

        let permissionProfile = await PermissionProfile.findOne({ name: "consumer_plus" });

        const consumer: IUser = {
            user_name: 'consumer_plus',
            role: ApplicationEnums.USER_MANAGEMENT.ROLE[ApplicationEnums.USER_MANAGEMENT.ROLE.CONSUMER],
            email: 'consumer_plus@test.com',
            password: await bcrypt.hash("password@123", 10),
            permission_profile: permissionProfile.name,
            first_name: 'Default',
            last_name: 'Premium Consumer',
            country_code: '',
            phone: '',
            fcm_token: '',
            is_active: true,
            is_deleted: false,
            is_verified: true
        };

        await User.findOneAndUpdate({
            user_name: 'consumer_plus'
        },
            consumer, {
            upsert: true,
            new: true
        });

        logger.info("[Completed] : Adding/Updating default premium consumer.");
    }
}