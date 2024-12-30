export const JwtType = {
	NOT_AUTHORIZED: "User is not Authorized!",
	INVALID_USER: "Invalid User!",
	INVALID_AT: "Access Token is not valid, you must Sign In!",
	INVALID_RT: "Refresh Token is not valid, you must Sign In!",
	EXPIRED_AT: "Expired Access Token!",
	EXPIRED_RT: "Expired Refresh Token!"
}

export enum TokenType {
    AT_NAME = "access_token",
    RT_NAME = "refresh_token",
	ACCESS_TOKEN = 1 * 1, // 1hour * 1 = 1 hour
	REFRESH_TOKEN =  1 * 24 * 30 // 1hour * 24  * 30 = 30 days
}