import {DataSource} from "typeorm";
import {CovidCase} from "./entity/CovidCase";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: process.env.NODE_ENV === "test" ? "test-database.sqlite" : "database.sqlite",
  entities: [CovidCase],
})

AppDataSource.initialize()
  .then(() => {
    AppDataSource.synchronize()
    console.log("Data Source has been initialized!")
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err)
  })
