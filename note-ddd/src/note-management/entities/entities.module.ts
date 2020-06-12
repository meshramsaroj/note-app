import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './note/note.entity';
import { NoteService } from './note/note.service';
import { CqrsModule } from '@nestjs/cqrs';
import { ProposeEditService } from './propose-edit/propose-edit.service';
import { NoteEdit } from './propose-edit/edit-note.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Note, NoteEdit]), CqrsModule],
  providers: [NoteService, ProposeEditService],
  exports: [NoteService, ProposeEditService],
})
export class NoteEntitiesModule {}
