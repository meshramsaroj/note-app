import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NoteEntity } from './note.entity';
import { Repository } from 'typeorm';
import { NoteDto } from './note.dto';
import { UpdateNoteDto } from './update-note.dto';

@Injectable()
export class NoteSampleHelperService {
  constructor(
    @InjectRepository(NoteEntity)
    private readonly noteRepository: Repository<NoteEntity>,
  ) {}

  async create(note: NoteDto) {
    const noteObject = new NoteEntity();
    Object.assign(noteObject, note);
    return await noteObject.save();
  }

  async read() {
    return await this.noteRepository.find();
  }

  async update(payload: UpdateNoteDto) {
    const foundNote = await this.noteRepository.findOne({ uuid: payload.uuid });
    Object.assign(foundNote, payload);
    return await foundNote.save();
  }

  async delete(uuid: string) {
    const foundNote = await this.noteRepository.findOne({ uuid });
    await foundNote.remove();
  }
}
