import { Injectable } from '@nestjs/common';

@Injectable()
export class IncomeService {
  getAll(): string[] {
    return ['one', 'two'];
  }
}
