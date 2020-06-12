import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentService } from './student/student.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, StudentService],
})
export class AppModule {}
