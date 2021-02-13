import { Module } from '@nestjs/common';
import { CoffeesModule } from '../coffees/coffees.module';
import { DatabaseModule } from '../database/database.module';
import { CoffeeRatingService } from './coffee-rating.service';

@Module({
  imports: [DatabaseModule.register({
              type: 'postgres',
              host: 'localhost',
              password: 'pass123',
              username: 'postgres',
              database: 'postgres',
              port: 5432,     
            }), 
            CoffeesModule],
  providers: [CoffeeRatingService]
})
export class CoffeeRatingModule {}
