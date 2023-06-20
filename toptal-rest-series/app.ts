import express, { response } from "express";
import * as http from "http";
import * as winston from "winston";
import * as expressWinston from "express-winston";
import cors from "cors";
import { CommonRoutesConfig } from "./common/common.routes.config";
import { UsersRoutes } from "./users/users.routes.config";
import { AuthRoutes } from "./auth/auth.routes.config";
import debug from "debug";
import dotenv from "dotenv";
const dotenvResult = dotenv.config();
if (dotenvResult.error) {
  throw dotenvResult.error;
}

import permissionMiddleware from "./common/middleware/common.permission.middleware";
import { PermissionFlag } from "./common/middleware/common.permissionflag.enum";

import rateLimit from "express-rate-limit";

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = 3000;
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug("app");

const loginLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const usersLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: async (request: express.Request, response: express.Response) => {
    if (
      permissionMiddleware.hasPermission(
        request,
        response,
        PermissionFlag.PAID_PERMISSION
      )
    ) {
      return 15;
    } else {
      return 3;
    }
  },
  message: async (request: express.Request, response: express.Response) => {
    if (
      permissionMiddleware.hasPermission(
        request,
        response,
        PermissionFlag.PAID_PERMISSION
      )
    ) {
      return "You can only make 15 requests every minute.";
    } else return "You can only make 3 requests every minute.";
  },
});

// Apply the rate limiting middleware to auth requests
app.use(`/auth`, loginLimiter);
app.use(`/users`, usersLimiter);

app.use(express.json());
app.use(cors());

const loggerOptions: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true })
  ),
};

if (!process.env.DEBUG) {
  loggerOptions.meta = false; // when not debugging, make terse
}

app.use(expressWinston.logger(loggerOptions));

routes.push(new UsersRoutes(app));
routes.push(new AuthRoutes(app));

const runningMessage = `Server running at http://localhost:${port}`;
app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).send(runningMessage);
});
server.listen(port, () => {
  routes.forEach((route: CommonRoutesConfig) => {
    debugLog(`Routes configured for ${route.getName()}`);
  });
  console.log(runningMessage);
});
