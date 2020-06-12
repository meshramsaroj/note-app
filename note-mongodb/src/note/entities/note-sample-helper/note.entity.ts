import { Entity, BaseEntity, Column, ObjectIdColumn, ObjectID } from 'typeorm';
import * as uuidv4 from 'uuid/v4';

@Entity()
export class NoteEntity extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  uuid: string;

  @Column()
  title: string;

  @Column()
  message: string;

  constructor() {
    super();
    if (!this.uuid) {
      this.uuid = uuidv4();
    }
  }
}
