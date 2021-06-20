export interface IUser {
    user_name: string,
    role: string,
    password: string,
    permission_profile: string,
    first_name: string,
    last_name: string,
    email: string,
    country_code: string,
    phone: string,
    fcm_token: string,
    is_verified: boolean,
    is_active: boolean,
    is_deleted: boolean
}