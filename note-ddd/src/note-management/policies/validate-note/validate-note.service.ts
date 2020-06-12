import { Injectable, NotFoundException } from '@nestjs/common';
import { NoteService } from '../../entities/note/note.service';

@Injectable()
export class ValidateNoteService {
  constructor(private readonly noteService: NoteService) {}

  async validateNote(uuid: string) {
    const foundNote = await this.noteService.findNote(uuid);
    if (!foundNote) {
      throw new NotFoundException('Note does note exist , provide valid uuid');
    }
    return foundNote;
  }
}
