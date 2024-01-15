import { TypeOrmModuleOptions } from '@nestjs/typeorm';

class DatabaseConfigs {
  public getTypeOrmConfigs(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/../../../migrations/*{.ts,.js}'],
      migrationsTableName: 'migrations',
      synchronize: false,
    } as TypeOrmModuleOptions;
  }
}

const databaseConfigs = new DatabaseConfigs();
export default databaseConfigs;
