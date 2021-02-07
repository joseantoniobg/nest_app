import { Injectable, Module, Scope } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evento } from 'src/events/entities/event.entity';
import { Connection } from 'typeorm';
import { COFFEE_BRANDS } from './coffees.constants';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import coffeesConfig from './config/coffees.config';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

//class MockCoffeeService { }

// class ConfigService {}
// class DevelopmentConfgService {}
// class ProductionConfigService {}

@Injectable()
export class CoffeeBrandsFactory {
  create () {
    return ['buddy brew', 'nescafe'];
  }
}

@Module({ imports: [
                    TypeOrmModule.forFeature([Coffee, Flavor, Evento]), 
                    ConfigModule.forFeature(coffeesConfig),
                  ], 
          controllers: [CoffeesController], 
          //providers: [{provide: CoffeesService, useValue: new MockCoffeeService()}], 
          providers: [CoffeesService, 
            CoffeeBrandsFactory,
            //{ provide: ConfigService, useClass: process.env.NODE_ENV === 'development' ? DevelopmentConfgService : ProductionConfigService },
            { provide: COFFEE_BRANDS, 
              useFactory: async (con: Connection): Promise<string[]> => {
                //const coffeeBrands = await con.query('SELECT DISTINCT brand FROM coffee;');
                const coffeeBrands = await Promise.resolve(['buddy brew', 'nescafe']);
                console.log('[!] Async factory!');
                return coffeeBrands;
              }, 
              inject: [CoffeeBrandsFactory, Connection], 
              scope: Scope.TRANSIENT,
            }],
          exports: [CoffeesService]
        })
export class CoffeesModule {}
