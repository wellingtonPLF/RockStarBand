import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import os from 'os';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import cors from 'cors';

async function bootstrap() {
  const port = 3000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(cors({
      origin: ["https://supervisionary.netlify.app", "http://192.168.0.14:5173", "http://localhost:5173"],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE']
  }));
  app.use(cookieParser());
  app.use(session({
    secret: 'your-secret-key',
    resave: true,
    saveUninitialized: true, 
    cookie: { secure: true } // Set `secure: true` in production if using HTTPS
  })); 

  //Running ************************************************************************
  await app.listen(port, "0.0.0.0", () => {
    const networkInterfaces = os.networkInterfaces();
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
