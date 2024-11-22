import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        type: 'postgres',
        host: 'db',
        port: 5432,
        username: 'root',
        password: 'password',
        database: 'postgres',
        autoLoadEntities: true,
        synchronize: true,
        entities: [__dirname + '/entities/*.entity.{js,ts}'],
        logging: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
