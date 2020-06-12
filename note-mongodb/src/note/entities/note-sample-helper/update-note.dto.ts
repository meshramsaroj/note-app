import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateNoteDto {
  @IsNotEmpty()
  uuid: string;

  @IsOptional()
  title: string;

  @IsOptional()
  message: string;
}
