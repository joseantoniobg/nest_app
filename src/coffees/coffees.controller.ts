import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { CoffeesService } from './coffees.service';

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
    findAll(@Query() paginationQuery) {
        //const { limit, offset } = paginationQuery;
        return this.coffeService.findAll();
     }

    @Get(':id')
    findById(@Param('id') id: string) {
        return this.coffeService.findOne(id);
    }

    @Post()
    create(@Body() body) {
        this.coffeService.create(body);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body) {
        return this.coffeService.update(id, body);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.coffeService.remove(id);
    }
}
