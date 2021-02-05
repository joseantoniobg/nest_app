import { CoffeesService } from './coffees.service';
export declare class CoffeesController {
    private readonly coffeService;
    constructor(coffeService: CoffeesService);
    findAll(paginationQuery: any): import("./entities/coffee.entity").Coffee[];
    findById(id: string): import("./entities/coffee.entity").Coffee;
    create(body: any): void;
    update(id: string, body: any): void;
    remove(id: string): void;
}
