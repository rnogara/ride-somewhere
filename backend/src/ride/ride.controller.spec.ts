import { Test, TestingModule } from '@nestjs/testing';
import { RidesController } from './ride.controller';
import { RidesService } from './ride.service';

describe('RidesController', () => {
  let controller: RidesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RidesController],
      providers: [RidesService],
    }).compile();

    controller = module.get<RidesController>(RidesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
