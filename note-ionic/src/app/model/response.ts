import { Note, EditNote } from './note';

export interface ListNoteResponse {
    docs: Array<any>;
    length: number;
    offset: number;
}

export interface RetrieveNoteResponse {
    note: Note;
    editNote: EditNote;
}