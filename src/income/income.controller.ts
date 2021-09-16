import { Controller, Get } from '@nestjs/common';
import { IncomeService } from './income.service';

@Controller('income')
export class IncomeController {
  constructor(private readonly _incomeService: IncomeService) {}

  @Get()
  findAll(): string[] {
    return this._incomeService.getAll();
  }
}
