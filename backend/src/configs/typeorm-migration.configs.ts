import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import databaseConfigs from './db.configs';

config();
const typeOrmOptions = databaseConfigs.getTypeOrmConfigs();
export default new DataSource(typeOrmOptions as DataSourceOptions);
