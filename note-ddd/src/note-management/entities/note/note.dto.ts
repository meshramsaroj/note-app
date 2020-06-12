import { IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class NoteDto {
  @IsOptional()
  uuid: string;

  @IsOptional()
  createdOn: Date;

  @IsOptional()
  refreshedOn: Date;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  message: string;

  @IsOptional()
  @IsBoolean()
  isProposed: boolean;

  @IsOptional()
  @IsBoolean()
  isExpired: boolean;
}
