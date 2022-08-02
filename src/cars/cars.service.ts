import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto } from './dtos/create-car.dto';
import { UpdateCarDto } from './dtos/update-car.dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    // {
    //   id: uuid(),
    //   brand: 'Toyota',
    //   model: 'Corola',
    // },
    // {
    //   id: uuid(),
    //   brand: 'Honda',
    //   model: 'Civic',
    // },
    // {
    //   id: uuid(),
    //   brand: 'Jeep',
    //   model: 'Cherokee',
    // },
  ];
  findAll() {
    return this.cars;
  }

  findOneById(id: string) {
    const car = this.cars.find((e) => id === e.id);
    if (!car) {
      throw new NotFoundException(`Car with id ${id} not found`);
    }
    return car;
  }

  create(createCarDto: CreateCarDto) {
    const car: Car = {
      id: uuid(),
      ...createCarDto,
    };
    const find = this.cars.find((e) => e.id === car.id);
    if (find) {
      throw new NotFoundException(`Car with id ${car.id} already exists`);
    }
    this.cars.push(car);
    return car;
  }

  update(id: string, updateCarDto: UpdateCarDto) {
    let carDB = this.findOneById(id);

    if (updateCarDto.id && updateCarDto.id !== id)
      throw new BadRequestException(`Car id is not valid inside body`);

    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        carDB = { ...carDB, ...updateCarDto, id };
        return carDB;
      }

      return car;
    });

    return carDB;
  }

  delete(id: string) {
    const car = this.findOneById(id);
    this.cars = this.cars.filter((car) => car.id !== id);
  }

  fillCarsWidthSeedData(cars: Car[]) {
    this.cars = cars;
  }
}
