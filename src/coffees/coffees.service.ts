import { HttpException, HttpStatus, Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Evento } from '../events/entities/event.entity';
import { Connection, Repository } from 'typeorm';
import { COFFEE_BRANDS } from './coffees.constants';
import coffeesConfig from './config/coffees.config';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

@Injectable({ scope: Scope.DEFAULT })
export class CoffeesService {

    constructor(
        @InjectRepository(Coffee)
        private readonly coffeeRepository: Repository<Coffee>,
        @InjectRepository(Flavor)
        private readonly flavorRepository: Repository<Flavor>,
        private readonly connection: Connection,
        private readonly configService: ConfigService,
        //@Inject(coffeesConfig.KEY)
        //private readonly coffeesConfiguration: ConfigType<typeof coffeesConfig>,
        @Inject(COFFEE_BRANDS) coffeeBrands: string[],
    ) {
        //const coffeesConfig = this.configService.get('coffees');
        //console.log(coffeesConfiguration.foo);
        console.log(coffeeBrands);
    }

    findAll(paginationQuery: PaginationQueryDto) {
        const { limit, offset } = paginationQuery;
        return this.coffeeRepository.find({
            relations: ['flavors'],
            skip: offset,
            take: limit,
        });
    }

    async findOne(id: string){
        const coffee = await this.coffeeRepository.findOne(id, {
            relations: ['flavors'],
        });
        if (!coffee) {
            throw new HttpException(`Coffee #${id} not found`, HttpStatus.NOT_FOUND);
        }
        return coffee;
    }

    async create (createCoffeDto: CreateCoffeeDto){
        //console.log(createCoffeDto instanceof CreateCoffeeDto);
        const flavors = await Promise.all(
            createCoffeDto.flavors.map(name => this.preloadFlavorByName(name)),
        );
        const coffee = this.coffeeRepository.create({
            ...createCoffeDto, 
            flavors,
        });
        return this.coffeeRepository.save(coffee);
    }

    async update (id: string, updateCoffeDto: UpdateCoffeeDto) {
        const flavors = updateCoffeDto.flavors && (await Promise.all(
            updateCoffeDto.flavors.map(name => this.preloadFlavorByName(name)),
        ));
        const coffee = await this.coffeeRepository.preload({id: +id, ...updateCoffeDto, flavors});
        if (!coffee) {
            throw new NotFoundException(`Coffe #${id} not found`);
        }
        return this.coffeeRepository.save(coffee);
    }

    async remove(id: string) {
        const coffee = await this.findOne(id);
        return this.coffeeRepository.remove(coffee);
    }

    async recommendCoffee(coffee: Coffee){
        const queryRunner = this.connection.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();
        
        try{
            coffee.recommendations++;

            const recommendEvent = new Evento();
            recommendEvent.name = 'recommend_coffe';
            recommendEvent.type = 'coffee';
            recommendEvent.payload = { coffeeId: coffee.id };
            
            await queryRunner.manager.save(coffee);
            await queryRunner.manager.save(recommendEvent);
        
            await queryRunner.commitTransaction();
        } catch (err) {
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }

    }

    private async preloadFlavorByName(name: string): Promise<Flavor> {
        const existingFlavor = await this.flavorRepository.findOne({ name });
        if (existingFlavor) {
          return existingFlavor;
        }
        return this.flavorRepository.create({ name });
      }
    }

