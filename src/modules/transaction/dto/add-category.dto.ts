import { IsNotEmpty, IsUUID } from 'class-validator';

export class AddCategoryDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
