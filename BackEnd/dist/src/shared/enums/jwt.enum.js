"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenType = exports.JwtType = void 0;
exports.JwtType = {
    NOT_AUTHORIZED: "User is not Authorized!",
    INVALID_USER: "Invalid User!",
    INVALID_AT: "Access Token is not valid, you must Sign In!",
    INVALID_RT: "Refresh Token is not valid, you must Sign In!",
    EXPIRED_AT: "Expired Access Token!",
    EXPIRED_RT: "Expired Refresh Token!"
};
var TokenType;
(function (TokenType) {
    TokenType["AT_NAME"] = "access_token";
    TokenType["RT_NAME"] = "refresh_token";
    TokenType[TokenType["ACCESS_TOKEN"] = 1] = "ACCESS_TOKEN";
    TokenType[TokenType["REFRESH_TOKEN"] = 720] = "REFRESH_TOKEN";
})(TokenType || (exports.TokenType = TokenType = {}));
//# sourceMappingURL=jwt.enum.js.map