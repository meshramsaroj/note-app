import { IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class UpdateStudentDTO {
  @IsNotEmpty()
  uuid: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  marks: number;
}
