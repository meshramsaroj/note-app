import { IsOptional, IsNotEmpty } from 'class-validator';

export class EditNoteDto {
  @IsOptional()
  createdOn: string;

  @IsOptional()
  uuid: string;

  @IsNotEmpty()
  noteUuid: string;

  @IsOptional()
  title: string;

  @IsOptional()
  message: string;

  isApproved: boolean = false;
}
