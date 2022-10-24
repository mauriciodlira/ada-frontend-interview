/** Extracted information from JWT returned from the API */
export interface UserInfo {
    login: string;
    expiresAt: number;
}