import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  username: 'nest',
  password: 'nest1234',
  port: 33061,
  host: 'localhost',
  database: 'nest',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
};
