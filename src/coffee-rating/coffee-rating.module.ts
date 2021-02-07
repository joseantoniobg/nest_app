import { Module } from '@nestjs/common';
import { CoffeesController } from 'src/coffees/coffees.controller';
import { CoffeesModule } from 'src/coffees/coffees.module';
import { CoffeesService } from 'src/coffees/coffees.service';
import { DatabaseModule } from 'src/database/database.module';
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
