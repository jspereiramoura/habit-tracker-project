import { DataSource, DataSourceOptions } from "typeorm";
import { DB_CONFIG } from "./dbConfig";

const AppDataSource = new DataSource({
  ...(DB_CONFIG as DataSourceOptions)
});

export default AppDataSource;
