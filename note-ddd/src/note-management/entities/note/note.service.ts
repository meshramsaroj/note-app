import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './note.entity';
import { MongoRepository } from 'typeorm';
import { NoteDto } from './note.dto';
import { NoteEdit } from '../propose-edit/edit-note.entity';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: MongoRepository<Note>,
  ) {}

  async create(note: NoteDto) {
    const noteObject = new Note();
    noteObject.createdOn = new Date();
    noteObject.refreshedOn = noteObject.createdOn;
    Object.assign(noteObject, note);
    return await noteObject.save();
  }

  async findNote(uuid: string) {
    const foundNote = await this.noteRepository.findOne({ uuid });
    return foundNote;
    // if( !foundNote ){
    //   throw new NotFoundException('Note not found');
    // }
  }

  // async update(uuid: string, note: NoteDto) {
  //   const foundNote = await this.noteRepository.findOne({ uuid });
  //   foundNote.title = note.title;
  //   foundNote.message = note.message;
  //   return await this.noteRepository.save(foundNote);
  // }

  // async delete(uuid) {
  //   const foundNote = await this.noteRepository.findOne({ uuid });
  //   await foundNote.remove();
  // }

  async list(skip: number, take: number) {
    const providers = await this.noteRepository.find({ skip, take });

    return {
      docs: providers,
      length: await this.noteRepository.count(),
      offset: skip,
    };
  }

  async delete(foundNote: Note) {
    // const foundNote = await this.noteRepository.findOne({uuid});
    return await foundNote.remove();
  }

  async update(provider: NoteEdit) {
    const note = await this.noteRepository.findOne({ uuid: provider.noteUuid });
    // Object.assign(note, provider);
    note.title = provider.title;
    note.message = provider.message;
    note.isProposed = false;
    return note.save();
  }

  async foundNote(uuid: string) {
    const note = await this.noteRepository.findOne({ uuid });
    note.isProposed = true;
    return note.save();
  }

  async retrieveNote(uuid: string) {
    const providers = await this.noteRepository.findOne({ uuid });
    return providers;
  }

  async deleteMany(query) {
    return await this.noteRepository.deleteMany(query);
  }

  async updateMany(expiryDate) {
    return await this.noteRepository.updateMany(
      { refreshedOn: { $lte: expiryDate } },
      { $set: { isExpired: true } },
    );
  }

  async refreshExpiredNote(note: Note) {
    note.isExpired = false;
    note.refreshedOn = new Date();
    return note.save();
  }

  async updateNoteProposedFlag(uuid: string) {
    const note = await this.noteRepository.findOne({ uuid });
    note.isProposed = false;
    return note.save();
  }
}
