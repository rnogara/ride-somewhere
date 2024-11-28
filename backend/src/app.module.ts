import { Module } from '@nestjs/common';
import { RidesModule } from './ride/ride.module';
import { UsersModule } from './users/users.module';
import { DriversModule } from './drivers/drivers.module';
import { DatabaseModule } from './database/database.module';
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
