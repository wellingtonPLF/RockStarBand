"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const os_1 = __importDefault(require("os"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
async function bootstrap() {
    const port = 3000;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, cors_1.default)({
        origin: ["https://supervisionary.netlify.app", "http://192.168.0.14:5173", "http://localhost:5173"],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    }));
    app.use((0, cookie_parser_1.default)());
    app.use((0, express_session_1.default)({
        secret: 'your-secret-key',
        resave: true,
        saveUninitialized: true,
        cookie: { secure: true }
    }));
    await app.listen(port, "0.0.0.0", () => {
        const networkInterfaces = os_1.default.networkInterfaces();
        for (const interfaceName in networkInterfaces) {
            for (const iface of networkInterfaces[interfaceName]) {
                if (!iface.internal && iface.family === 'IPv4') {
                    console.log(`Server is accessible at: ${iface.address}:${port}`);
                }
            }
        }
        console.log("\nO servidor esta Rodando em ");
        console.log("http://localhost:" + port + "/");
    });
}
bootstrap();
//# sourceMappingURL=main.js.map