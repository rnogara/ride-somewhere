import { Module } from '@nestjs/common';
import { RidesModule } from './rides/rides.module';
import { UsersModule } from './users/users.module';
import { DriversModule } from './drivers/drivers.module';
import { DatabaseModule } from './database/db.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    RidesModule,
    UsersModule,
    DriversModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
