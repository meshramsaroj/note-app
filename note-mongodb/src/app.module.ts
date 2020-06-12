import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NoteModule } from './note/note.module';
import { NoteHelperController } from './note/controller/note-helper/note-helper.controller';
import { NoteHelperService } from './note/services/note-helper/note-helper.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from './config/config.module';
import { TYPEORM_CONNECTION } from './constants/typeorm.connection';

@Module({
  imports: [
    NoteModule,
    ConfigModule,
    TypeOrmModule.forRoot(TYPEORM_CONNECTION),
  ],
  controllers: [AppController, NoteHelperController],
  providers: [AppService, NoteHelperService],
})
export class AppModule {}
