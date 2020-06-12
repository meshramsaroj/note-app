import { BaseEntity, ObjectID, ObjectIdColumn, Column, Entity } from 'typeorm';
import * as uuidv4 from 'uuid/v4';

@Entity()
export class Note extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  createdOn: Date;

  @Column()
  refreshedOn: Date;

  @Column()
  uuid: string;

  @Column()
  title: string;

  @Column()
  message: string;

  @Column()
  isProposed: boolean = false;

  @Column()
  isExpired: boolean = false;

  constructor() {
    super();
    if (!this.uuid) this.uuid = uuidv4();
  }
}
