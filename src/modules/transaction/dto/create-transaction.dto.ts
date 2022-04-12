import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateTransactionDto {
  @IsUUID()
  id_from: string;

  @IsNotEmpty()
  @IsUUID()
  id_to: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  label: string;
}
