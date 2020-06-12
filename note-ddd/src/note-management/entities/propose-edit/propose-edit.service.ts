import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NoteEdit } from './edit-note.entity';
import { Repository } from 'typeorm';
import { EditNoteDto } from './edit-note.dto';

@Injectable()
export class ProposeEditService {
  constructor(
    @InjectRepository(NoteEdit)
    private readonly repository: Repository<NoteEdit>,
  ) {}

  async createProposalForNoteEdit(note: EditNoteDto) {
    const editNoteObject = new NoteEdit();
    Object.assign(editNoteObject, note);
    return await editNoteObject.save();
  }

  async findNoteAlreadyProposed(uuid: string) {
    const foundNote = await this.repository.findOne({ noteUuid: uuid });
    return foundNote;
  }

  async removeProposedNote(uuid: string) {
    const foundNote = await this.repository.findOne({ noteUuid: uuid });
    return await foundNote.remove();
  }

  async deleteProposedNote(foundNote: NoteEdit) {
    return await foundNote.remove();
  }

  async deleteNoteAlreadyProposed(uuid: string) {
    const foundNote = await this.repository.findOne({ noteUuid: uuid });
    return foundNote.remove();
  }

  async ProposeEditNote(uuid: string) {
    const providers = await this.repository.find({ noteUuid: uuid });
    // console.log(providers);
    return providers;
  }
}
