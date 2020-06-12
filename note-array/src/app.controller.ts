import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Param,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { StudentDTO } from './interfaces/student.dto';
import * as uuidv4 from 'uuid/v4';
import { StudentService } from './student/student.service';
import { UpdateStudentDTO } from './interfaces/update-student.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly studentService: StudentService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('student/v1/create')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  createStudent(@Body() student: StudentDTO) {
    student.uuid = uuidv4();
    this.studentService.create(student);
  }

  @Get('student/v1/list')
  listStudents() {
    return this.studentService.list();
  }

  @Get('student/v1/get')
  getStudent(@Query('uuid') uuid: string) {
    return this.studentService.get(uuid);
  }

  @Post('student/v1/update')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  updateStudent(@Body() student: UpdateStudentDTO) {
    this.studentService.update(student);
  }

  @Post('student/v1/delete')
  deleteStudent(@Body('uuid') uuid: string) {
    this.studentService.delete(uuid);
  }
}
