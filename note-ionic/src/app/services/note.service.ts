import { Injectable } from '@angular/core';
import { Note, EditNote } from '../model/note';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ACCESS_TOKEN } from '../auth/token/storage-constants';
import { TokenService } from '../auth/token/token.service';
import { switchMap, debounce, debounceTime } from 'rxjs/operators';
import { ListNoteResponse, RetrieveNoteResponse } from '../model/response';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  authorizationHeader: HttpHeaders;

  constructor(
    private http: HttpClient,
    private token: TokenService,
  ) { }

  createNote(note: Note) {
    const url = 'https://training-note.castlecraft.in/api/note/v1/create';
    return this.token.getToken().pipe(
      switchMap(accessToken => {
        return this.http.post(
          url,
          {
            title: note.title,
            message: note.message,
          },
          {
            headers: {
              authorization: 'Bearer ' + accessToken,
            }
          },
        )
      }),
    )
  }

  getNoteList() {
    const url = 'https://training-note.castlecraft.in/api/note/v1/list';
    return this.token.getToken().pipe(
      debounceTime(1000),
      switchMap(accessToken => {
        return this.http.get<ListNoteResponse>(
          url,
          {
            headers: {
              authorization: 'Bearer ' + accessToken,
            }
          }
        )
      }),
    )
  }

  retrieveNote(uuid: string) {
    const url = 'https://training-note.castlecraft.in/api/note/v1/retrieve';
    return this.token.getToken().pipe(
      switchMap(accessToken => {
        return this.http.get<RetrieveNoteResponse>(
          url,
          {
            params: { uuid },
            headers: {
              authorization: 'Bearer ' + accessToken,
            }
          }
        )
      }),
    )
  }

  proposeEditNote(note: EditNote) {
    const url = 'https://training-note.castlecraft.in/api/note/v1/propose-edit';
    return this.token.getToken().pipe(
      switchMap(accessToken => {
        return this.http.post(
          url,
          {
            noteUuid: note.noteUuid,
            title: note.title,
            message: note.message,
          },
          {
            headers: {
              authorization: 'Bearer ' + accessToken,
            }
          }
        )
      })
    )
  }

  approveNoteEdit(noteUuid: string) {
    const url = 'https://training-note.castlecraft.in/api/note/v1/approve-edit';
    return this.token.getToken().pipe(
      switchMap(accessToken => {
        return this.http.post(
          url,
          {
            noteUuid: noteUuid,
          },
          {
            headers: {
              authorization: 'Bearer ' + accessToken,
            }
          }
        )
      })
    )
  }

  declineNoteEdit(noteUuid: string) {
    const url = 'https://training-note.castlecraft.in/api/note/v1/dissapprove-edit';
    return this.token.getToken().pipe(
      switchMap(accessToken => {
        return this.http.post(
          url,
          {
            noteUuid: noteUuid,
          },
          {
            headers: {
              authorization: 'Bearer ' + accessToken,
            }
          }
        )
      })
    )
  }

  deleteNote(uuid: string) {
    const url = 'https://training-note.castlecraft.in/api/note/v1/delete';
    return this.token.getToken().pipe(
      switchMap(accessToken => {
        return this.http.post(
          url,
          {
            uuid: uuid,
          },
          {
            headers: {
              authorization: 'Bearer ' + accessToken,
            }
          }
        )
      })
    )
  }

}
