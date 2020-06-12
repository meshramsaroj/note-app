import { Module } from '@nestjs/common';
import { NoteHelperController } from './controller/note-helper/note-helper.controller';
import { NoteHelperService } from './services/note-helper/note-helper.service';
import { NoteSampleHelperService } from './entities/note-sample-helper/note-sample-helper.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteEntity } from './entities/note-sample-helper/note.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NoteEntity])],
  controllers: [NoteHelperController],
  providers: [NoteHelperService, NoteSampleHelperService],
  exports: [NoteHelperService, NoteSampleHelperService],
})
export class NoteModule {}
