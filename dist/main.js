"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const path_1 = require("path");
const app_module_1 = require("./app.module");
const dotenv = require("dotenv");
dotenv.config();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configservice = app.get(config_1.ConfigService);
    app.enableCors();
    app.useStaticAssets((0, path_1.join)(__dirname, '..', './src/public'));
    app.setBaseViewsDir((0, path_1.join)(__dirname, '..', './src/views'));
    app.setViewEngine('hbs');
    await app.listen(configservice.get('APP_PORT'));
}
bootstrap();
//# sourceMappingURL=main.js.map