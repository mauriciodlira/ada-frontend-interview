export interface CredentialsResponse {
    /** user login */
    login: string,
    /** expiry - the time when the token will be assumed as invalid */
    exp: number,
    /** issued at - the time when the token has been created */
    iat: number,
}