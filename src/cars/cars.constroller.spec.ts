import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { Car } from './interfaces/car.interface';

describe('carsController', () => {
  let carsController: CarsController;
  let carsService: CarsService;

  beforeEach(() => {
    carsService = new CarsService();
    carsController = new CarsController(carsService);
  });

  describe('findAll', () => {
    it('should return an array of cars', async () => {
      const result: Car[] = [
        {
          id: 'asd',
          model: 'testmodel',
          brand: 'testbrand',
        },
      ];
      jest.spyOn(carsService, 'findAll').mockImplementation(() => result);

      expect(await carsController.getAllCars()).toBe(result);
    });
  });
  describe('create', () => {
    it('should return an array of cars', async () => {
      const car = {
        id: 'testId',
        model: 'testmodel',
        brand: 'testbrand',
      };
      jest.spyOn(carsService, 'create').mockImplementation(() => car);

      expect(await carsController.createCar(car)).toBe(car);
    });
  });
  //   describe('getCarById', () => {
  //     it('should return an array of cars', async () => {
  //       const result: Car[] = [
  //         {
  //           id: 'asd',
  //           model: 'testmodel',
  //           brand: 'testbrand',
  //         },
  //       ];

  //       const id = 'asd';
  //       jest.spyOn(carsService, 'findOneById').mockImplementation();

  //       expect(await carsController.getCarById(id)).toBe(result);
  //     });
  //   });
});
