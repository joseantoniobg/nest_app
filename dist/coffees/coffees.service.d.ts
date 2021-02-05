import { Coffee } from './entities/coffee.entity';
export declare class CoffeesService {
    private coffees;
    findAll(): Coffee[];
    findOne(id: string): Coffee;
    create(createCoffeDto: any): void;
    update(id: string, updateCoffeDto: any): void;
    remove(id: string): void;
}
