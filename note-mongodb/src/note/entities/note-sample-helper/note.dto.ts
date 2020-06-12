import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class NoteDto {
  @IsOptional()
  @IsString()
  uuid: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  message: string;
}
