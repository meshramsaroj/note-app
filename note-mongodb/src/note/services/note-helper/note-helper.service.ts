import { Injectable } from '@nestjs/common';
import { NoteSampleHelperService } from '../../entities/note-sample-helper/note-sample-helper.service';
import { NoteDto } from '../../entities/note-sample-helper/note.dto';
import { UpdateNoteDto } from '../../entities/note-sample-helper/update-note.dto';

import * as uuidv4 from 'uuid/v4';

@Injectable()
export class NoteHelperService {
  constructor(private noteSampleHelper: NoteSampleHelperService) {}

  create(note: NoteDto) {
    note.uuid = uuidv4();
    return this.noteSampleHelper.create(note);
  }

  read() {
    return this.noteSampleHelper.read();
  }

  delete(uuid: string) {
    return this.noteSampleHelper.delete(uuid);
  }

  update(note: UpdateNoteDto) {
    return this.noteSampleHelper.update(note);
  }
}
