import { BaseEntity, Column, ObjectIdColumn, ObjectID, Entity } from 'typeorm';
import * as uuidv4 from 'uuid/v4';

@Entity()
export class NoteEdit extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  createdOn: string;

  @Column()
  uuid: string;

  @Column()
  noteUuid: string;

  @Column()
  title: string;

  @Column()
  message: string;

  @Column()
  isApproved: boolean;

  constructor() {
    super();
    if (!this.uuid) this.uuid = uuidv4();
  }
}
