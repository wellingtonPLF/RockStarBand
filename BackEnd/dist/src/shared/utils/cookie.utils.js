"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CookieUtil = void 0;
class CookieUtil {
    getCookieValue(request, name) {
        try {
            return request.cookies[name];
        }
        catch (e) {
            return undefined;
        }
    }
    create(response, name, value, secure, domain) {
        const config = {
            maxAge: 1000 * 60 * 60 * 24 * 365,
            httpOnly: true,
            secure: secure,
            domain: domain,
            path: "/"
        };
        response.cookie(name, value, config);
    }
    clear(response, name) {
        response.clearCookie(name);
    }
}
exports.CookieUtil = CookieUtil;
//# sourceMappingURL=cookie.utils.js.map