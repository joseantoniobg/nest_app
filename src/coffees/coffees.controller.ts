import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@UsePipes(ValidationPipe)
@Controller('coffees')
export class CoffeesController {
    constructor(private readonly coffeService: CoffeesService) {}
/*    @Get('flavors')
    findAll(@Res() response) {
        response.status(200).send('This action return all the coffees');
    }

    @Get(':id')
    findById(@Param('id') id: string) {
        return `This action returns a coffe by it\'s id. id: ${id}`;
    }

    @Post()
    @HttpCode(HttpStatus.GONE)
    create(@Body() body) {
        return body;
    }*/

    @Get()
    findAll(@Query() paginationQuery: PaginationQueryDto) {
        //const { limit, offset } = paginationQuery;
        return this.coffeService.findAll(paginationQuery);
     }

    @Get(':id')
    findById(@Param('id') id: number) {
        console.log(typeof id);
        return this.coffeService.findOne('' + id);
    }

    @Post()
    create(@Body() createCoffeeDto: CreateCoffeeDto) {
        this.coffeService.create(createCoffeeDto);
        return createCoffeeDto;
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
        return this.coffeService.update(id, updateCoffeeDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.coffeService.remove(id);
    }
}
