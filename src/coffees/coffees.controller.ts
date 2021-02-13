import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiForbiddenResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Protocol } from '../common/decorators/protocol.decorator';
import { Public } from '../common/decorators/public.decorator';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@ApiTags('coffees')
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

    //@SetMetadata('isPublic', true)
    //@ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiForbiddenResponse({description: 'Forbidden.'})
    @Public()
    @Get()
    async findAll(@Protocol('https') protocol: string, @Query() paginationQuery: PaginationQueryDto) {
        //const { limit, offset } = paginationQuery;
        //await new Promise(resolve => setTimeout(resolve, 3500));
        console.log(protocol);
        return this.coffeService.findAll(paginationQuery);
     }

    @Public()
    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: number) {
        //console.log(typeof id);

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
