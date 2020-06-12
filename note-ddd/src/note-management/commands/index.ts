import { CreateNoteHandler } from './create-note/create-note.handler';
import { ProposeNoteEditHandler } from './propose-note-edit/propose-note-edit.handler';
import { ApproveNoteEditHandler } from './approve-note-edit/approve-note-edit.handler';
import { DissapprovedNoteEditHandler } from './dissapprove-note/dissapprove-note.handler';
import { DeleteNoteHandler } from './delete-note/delete-note.handler';
import { RefreshExpiredNoteHandler } from './refresh-expired-note/refresh-expired-note.handler';

export const CommandManager = [
  CreateNoteHandler,
  ProposeNoteEditHandler,
  ApproveNoteEditHandler,
  DissapprovedNoteEditHandler,
  DeleteNoteHandler,
  RefreshExpiredNoteHandler,
];
