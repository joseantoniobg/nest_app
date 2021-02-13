import { BadRequestException, HttpException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { COFFEE_BRANDS } from './coffees.constants';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
});

describe('CoffeesService', () => {
  let service: CoffeesService;
  let coffeeRepository: MockRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
      CoffeesService, 
      { provide: Connection, useValue: {} },
      { provide: getRepositoryToken(Flavor), useValue: createMockRepository() },
      { provide: getRepositoryToken(Coffee), useValue: createMockRepository() },
      { provide: ConfigService, useValue: {} },
      { provide: COFFEE_BRANDS, useValue: {} },
    ],
    }).compile();

    service = module.get<CoffeesService>(CoffeesService);
    //service = await module.resolve(CoffeesService);
    coffeeRepository = module.get<MockRepository>(getRepositoryToken(Coffee));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    describe('when coffee with id exists', () => {
      it('should return the coffee object', async () => {
        const coffeeId = '1';
        const expectedCoffee = {};
        coffeeRepository.findOne.mockReturnValue(expectedCoffee);
        const coffee = await service.findOne(coffeeId);
        expect(coffee).toEqual(expectedCoffee);
      });
    });
    describe('when the id is a number and is not found', () => {
      it('should throw the "NotFoundException"', async () => {
          const coffeeId = '-1';
          const expectedCoffee = {};
          coffeeRepository.findOne.mockReturnValue(expectedCoffee);
          try{
            await service.findOne(coffeeId);
          } catch (err) {
            expect(err).toBeInstanceOf(NotFoundException);
            expect(err.message).toEqual(`Coffee #${coffeeId} not found`);
          }
        });
      });
    });
    describe('when the id is not a number', () => {
      it('should throw the "BadRequestException"', async () => {
          const coffeeId = 'notANumber';
          const expectedCoffee = {};
          coffeeRepository.findOne.mockReturnValue(expectedCoffee);
          try{
            await service.findOne(coffeeId);
          } catch (err) {
            expect(err).toBeInstanceOf(BadRequestException);
            expect(err.message).toEqual(`Validation failed. \"NaN\" is not an integer number`);
          }
        });
      });
    });