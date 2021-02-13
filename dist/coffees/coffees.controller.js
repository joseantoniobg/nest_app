"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoffeesController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const protocol_decorator_1 = require("../common/decorators/protocol.decorator");
const public_decorator_1 = require("../common/decorators/public.decorator");
const pagination_query_dto_1 = require("../common/dto/pagination-query.dto");
const parse_int_pipe_1 = require("../common/pipes/parse-int.pipe");
const coffees_service_1 = require("./coffees.service");
const create_coffee_dto_1 = require("./dto/create-coffee.dto");
const update_coffee_dto_1 = require("./dto/update-coffee.dto");
let CoffeesController = class CoffeesController {
    constructor(coffeService) {
        this.coffeService = coffeService;
    }
    async findAll(protocol, paginationQuery) {
        console.log(protocol);
        return this.coffeService.findAll(paginationQuery);
    }
    findById(id) {
        return this.coffeService.findOne('' + id);
    }
    create(createCoffeeDto) {
        this.coffeService.create(createCoffeeDto);
        return createCoffeeDto;
    }
    update(id, updateCoffeeDto) {
        return this.coffeService.update(id, updateCoffeeDto);
    }
    remove(id) {
        return this.coffeService.remove(id);
    }
};
__decorate([
    swagger_1.ApiForbiddenResponse({ description: 'Forbidden.' }),
    public_decorator_1.Public(),
    common_1.Get(),
    openapi.ApiResponse({ status: 200, type: [require("./entities/coffee.entity").Coffee] }),
    __param(0, protocol_decorator_1.Protocol('https')), __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, pagination_query_dto_1.PaginationQueryDto]),
    __metadata("design:returntype", Promise)
], CoffeesController.prototype, "findAll", null);
__decorate([
    public_decorator_1.Public(),
    common_1.Get(':id'),
    openapi.ApiResponse({ status: 200, type: require("./entities/coffee.entity").Coffee }),
    __param(0, common_1.Param('id', parse_int_pipe_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CoffeesController.prototype, "findById", null);
__decorate([
    common_1.Post(),
    openapi.ApiResponse({ status: 201, type: require("./dto/create-coffee.dto").CreateCoffeeDto }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_coffee_dto_1.CreateCoffeeDto]),
    __metadata("design:returntype", void 0)
], CoffeesController.prototype, "create", null);
__decorate([
    common_1.Patch(':id'),
    openapi.ApiResponse({ status: 200, type: require("./entities/coffee.entity").Coffee }),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_coffee_dto_1.UpdateCoffeeDto]),
    __metadata("design:returntype", void 0)
], CoffeesController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    openapi.ApiResponse({ status: 200, type: require("./entities/coffee.entity").Coffee }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CoffeesController.prototype, "remove", null);
CoffeesController = __decorate([
    swagger_1.ApiTags('coffees'),
    common_1.UsePipes(common_1.ValidationPipe),
    common_1.Controller('coffees'),
    __metadata("design:paramtypes", [coffees_service_1.CoffeesService])
], CoffeesController);
exports.CoffeesController = CoffeesController;
//# sourceMappingURL=coffees.controller.js.map