import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
    private coffees: Coffee[] = [
        {
            id: 1,
            name: 'Shipwrek Roast',
            brand: 'Buddy Brew',
            flavors: ['chocolate', 'vanilla'],
        }
    ];

    findAll() {
        return this.coffees;
    }

    findOne(id: string){
        const coffee = this.coffees.find(coffee => coffee.id === +id);
        if (!coffee) {
            throw new HttpException(`Coffee #${id} not found`, HttpStatus.NOT_FOUND);
        }
        return coffee;
    }

    create (createCoffeDto: any){
        console.log(createCoffeDto instanceof CreateCoffeeDto);
        this.coffees.push(createCoffeDto);
    }

    update (id: string, updateCoffeDto: any) {
        const existingCoffee = this.findOne(id);
        if (existingCoffee) {

        }
    }

    remove(id: string) {
        const coffeIndex = this.coffees.findIndex(coffee => coffee.id === +id);
        if (coffeIndex >= 0) {
            this.coffees.splice(coffeIndex, 1);
        }
    }
}
