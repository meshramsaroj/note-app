import { NoteCreatedHandler } from './note-created/note-created.handler';
import { NoteEditProposedHandler } from './note-edit-proposed/note-edit-proposed.handler';
import { NoteEditApprovedHandler } from './note-edit-approved/note-edit-approved.handler';
import { NoteEditRevertedHandler } from './note-reverted/note-reverted.handler';
import { NoteDeletedHandler } from './note-deleted/note-deleted.handler';
import { ExpiredNoteRefreshedHandler } from './expired-note-refreshed/expired-note-refreshed.handler';

export const EventManager = [
  NoteCreatedHandler,
  NoteEditProposedHandler,
  NoteEditApprovedHandler,
  NoteEditRevertedHandler,
  NoteDeletedHandler,
  ExpiredNoteRefreshedHandler,
];
