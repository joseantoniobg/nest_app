"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoffeesService = void 0;
const common_1 = require("@nestjs/common");
const create_coffee_dto_1 = require("./dto/create-coffee.dto");
let CoffeesService = class CoffeesService {
    constructor() {
        this.coffees = [
            {
                id: 1,
                name: 'Shipwrek Roast',
                brand: 'Buddy Brew',
                flavors: ['chocolate', 'vanilla'],
            }
        ];
    }
    findAll() {
        return this.coffees;
    }
    findOne(id) {
        const coffee = this.coffees.find(coffee => coffee.id === +id);
        if (!coffee) {
            throw new common_1.HttpException(`Coffee #${id} not found`, common_1.HttpStatus.NOT_FOUND);
        }
        return coffee;
    }
    create(createCoffeDto) {
        console.log(createCoffeDto instanceof create_coffee_dto_1.CreateCoffeeDto);
        this.coffees.push(createCoffeDto);
    }
    update(id, updateCoffeDto) {
        const existingCoffee = this.findOne(id);
        if (existingCoffee) {
        }
    }
    remove(id) {
        const coffeIndex = this.coffees.findIndex(coffee => coffee.id === +id);
        if (coffeIndex >= 0) {
            this.coffees.splice(coffeIndex, 1);
        }
    }
};
CoffeesService = __decorate([
    common_1.Injectable()
], CoffeesService);
exports.CoffeesService = CoffeesService;
//# sourceMappingURL=coffees.service.js.map