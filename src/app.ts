import { join } from "path";
import AutoLoad, { AutoloadPluginOptions } from "@fastify/autoload";
import { FastifyPluginAsync, FastifyServerOptions } from "fastify";
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import dbConn from "typeorm-fastify-plugin";
export interface AppOptions extends FastifyServerOptions, Partial<AutoloadPluginOptions> {}
// Pass --options via CLI arguments in command to enable these options.
const options: AppOptions = {};

const app: FastifyPluginAsync<AppOptions> = async (fastify, opts): Promise<void> => {
  // Place here your custom code!

  await Promise.all([
    fastify.register(require("@fastify/swagger")),
    fastify.register(require("@fastify/swagger-ui")),
    fastify.register(dbConn, { connection: AppDataSource }),
  ]);

  // Do not touch the following lines

  // This loads all plugins defined in routes
  // define your routes in one of these
  void fastify.register(AutoLoad, {
    dir: join(__dirname, "routes"),
    options: opts,
  });
};

export default app;
export { app, options };
