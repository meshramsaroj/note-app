import { IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class StudentDTO {
  @IsOptional()
  uuid: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  marks: number;
}
