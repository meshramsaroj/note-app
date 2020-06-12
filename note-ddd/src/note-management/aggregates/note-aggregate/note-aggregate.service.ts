import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import { NoteDto } from '../../entities/note/note.dto';
import * as uuidv4 from 'uuid/v4';
import { NoteCreatedEvent } from '../../events/note-created/note-created.event';
import { NoteService } from '../../entities/note/note.service';
import { EditNoteDto } from '../../entities/propose-edit/edit-note.dto';
import { NoteEditProposedEvent } from '../../events/note-edit-proposed/note-edit-proposed.event';
import { NoteEditApprovedEvent } from '../../events/note-edit-approved/note-edit-approved.event';
import { NoteEditRevertedEvent } from '../../events/note-reverted/note-reverted.event';
import { NoteDeletedEvent } from '../../events/note-deleted/note-deleted.event';
import {
  ValidateAlreadyProposedEditService,
  ValidateNoteService,
  ValidateUserAsRegisteredManagerService,
  ValidateAuthorisedUserPolicy,
} from '../../policies';
import { ProposeEditService } from '../../entities/propose-edit/propose-edit.service';
import { from, throwError, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {
  MANAGER_PERMISSION_ERROR_MESSAGE,
  NOTE_NOT_FOUND,
  NOT_VALID_USER,
} from '../../../constants/app-strings';
import { Note } from 'src/note-management/entities/note/note.entity';
import { ExpiredNoteRefreshedEvent } from '../../events/expired-note-refreshed/expired-note-refreshed.event';

@Injectable()
export class NoteAggregateService extends AggregateRoot {
  constructor(
    private readonly noteService: NoteService,
    private readonly validateAlreadyProposedEditService: ValidateAlreadyProposedEditService,
    private readonly validateNoteService: ValidateNoteService,
    private readonly validateUserAsRegisterPolicy: ValidateUserAsRegisteredManagerService,
    private readonly validateAuthorisedUserPolicy: ValidateAuthorisedUserPolicy,
    private readonly proposedEditService: ProposeEditService,
  ) {
    super();
  }

  createNote(note: NoteDto, req) {
    note.uuid = uuidv4();
    note.createdOn = new Date();
    this.apply(new NoteCreatedEvent(note));
  }

  async list(offset: number, limit: number, search?: string, sort?: string) {
    offset = Number(offset);
    limit = Number(limit);
    return this.noteService.list(offset, limit);
  }

  async proposeEditNote(note: EditNoteDto) {
    note.uuid = uuidv4();
    await this.validateNoteService.validateNote(note.noteUuid);
    await this.validateAlreadyProposedEditService.validateAlreadyProposedEdit(
      note.noteUuid,
    );

    this.apply(new NoteEditProposedEvent(note));
  }

  async approveEditNote(note: string) {
    this.apply(new NoteEditApprovedEvent(note));
  }

  async dissapproveEditNote(uuid: string) {
    // await this.validateUserAsRegisterService.validateUserAsRegistered(uuid);
    this.apply(new NoteEditRevertedEvent(uuid));
  }

  async deleteNote(uuid: string, req) {
    const permission = await this.validateUserAsRegisterPolicy.validateAuthorisedUser(
      req,
    );
    if (!permission) {
      throw new BadRequestException(MANAGER_PERMISSION_ERROR_MESSAGE);
    }
    const note = await this.noteService.findNote(uuid);
    const editNote = await this.proposedEditService.findNoteAlreadyProposed(
      uuid,
    );
    if (!note) {
      throw new NotFoundException(NOTE_NOT_FOUND);
    }

    this.apply(new NoteDeletedEvent(note, editNote));
  }

  async refreshExpiredNote(uuid: string, req) {
    const permission = await this.validateUserAsRegisterPolicy.validateAuthorisedUser(
      req,
    );
    if (!permission) {
      throw new BadRequestException(MANAGER_PERMISSION_ERROR_MESSAGE);
    }
    this.apply(new ExpiredNoteRefreshedEvent(uuid));
  }

  retrieveNote(uuid: string, req) {
    return from(
      this.validateAuthorisedUserPolicy.validateAuthorisedUser(req),
    ).pipe(
      switchMap(permission => {
        if (!permission) {
          return throwError(new BadRequestException(NOT_VALID_USER));
        }
        return from(this.noteService.retrieveNote(uuid)).pipe(
          switchMap(note => {
            if (!note) {
              return throwError(new NotFoundException('uuid not found'));
            }
            return this.retrieveNoteAsPerUser(note, req, uuid);
          }),
        );
      }),
    );
  }

  retrieveNoteAsPerUser(note: Note, req: any, uuid: string) {
    return from(
      this.validateAuthorisedUserPolicy.validateAuthorisedManager(req),
    ).pipe(
      switchMap(managerNote => {
        if (!managerNote) {
          return of({ note, editNote: null });
        }
        return from(this.proposedEditService.ProposeEditNote(uuid)).pipe(
          switchMap(editNote => {
            // console.log(editNote[0]);
            return of({
              note,
              editNote: editNote[0],
            });
          }),
        );
      }),
    );
  }
}
