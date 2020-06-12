import { Injectable } from '@nestjs/common';
import { StudentDTO } from '../interfaces/student.dto';
import { of } from 'rxjs';

@Injectable()
export class StudentService {
  private studentList: StudentDTO[] = [];

  create(student: StudentDTO) {
    this.studentList.push(student);
  }

  list() {
    return of(this.studentList);
  }
  get(uuid: string) {
    let student = {} as StudentDTO;

    this.studentList.forEach(s => {
      if (s.uuid === uuid) {
        student = s;
      }
    });

    return of(student);
  }

  delete(uuid: string) {
    this.studentList = this.studentList.filter(
      student => student.uuid !== uuid,
    );
  }

  update(student: StudentDTO) {
    this.studentList = this.studentList.filter(s => {
      if (s.uuid === student.uuid) {
        s.name = student.name;
        s.marks = student.marks;
      }
      return s;
    });
  }
}
