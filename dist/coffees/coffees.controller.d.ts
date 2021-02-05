import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
export declare class CoffeesController {
    private readonly coffeService;
    constructor(coffeService: CoffeesService);
    findAll(paginationQuery: any): import("./entities/coffee.entity").Coffee[];
    findById(id: number): import("./entities/coffee.entity").Coffee;
    create(createCoffeeDto: CreateCoffeeDto): CreateCoffeeDto;
    update(id: string, updateCoffeeDto: UpdateCoffeeDto): void;
    remove(id: string): void;
}
