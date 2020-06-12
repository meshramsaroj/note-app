import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { NoteHelperService } from '../../services/note-helper/note-helper.service';
import { NoteDto } from '../../entities/note-sample-helper/note.dto';
import { UpdateNoteDto } from '../../entities/note-sample-helper/update-note.dto';

@Controller('note-helper')
export class NoteHelperController {
  constructor(private noteHelperService: NoteHelperService) {}

  @Post('v1/create')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  createNote(@Body() note: NoteDto) {
    return this.noteHelperService.create(note);
  }

  @Get('v1/read')
  readNotes() {
    return this.noteHelperService.read();
  }

  @Post('v1/update')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  updateNote(@Body() note: UpdateNoteDto) {
    return this.noteHelperService.update(note);
  }

  @Post('v1/delete')
  deleteNote(@Body() body) {
    if (!body.uuid) throw new BadRequestException('UUID must be presnt');
    return this.noteHelperService.delete(body.uuid);
  }
}
