import {DataSource} from "typeorm";
import {CovidCase} from "./entity/CovidCase";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  entities: [CovidCase]
})

export const TestAppDataSource = new DataSource({
  type: "sqlite",
  database: "test-database.sqlite",
  entities: [CovidCase]
})

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err)
  })
