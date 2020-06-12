import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ACCESS_TOKEN } from 'src/app/constants/storage';
// import { DefaultFlexOffsetDirective } from '@angular/flex-layout';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  authorizationHeader: HttpHeaders;

  constructor(private http: HttpClient) {
    this.authorizationHeader = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN),
    });
  }

  create(title, message) {
    return this.http.post<any>(
      '/api/note/v1/create',
      {
        title,
        message,
      },
      { headers: this.authorizationHeader },
    );
  }

  propose(uuid, title, message) {
    return this.http.post(
      '/api/note/v1/propose-edit',
      {
        noteUuid: uuid,
        title,
        message,
      },
      { headers: this.authorizationHeader },
    );
  }

  delete(uuid) {
    return this.http.post('/api/note/v1/delete', {
      uuid,
    });
  }

  read() {
    return this.http.get<any>('/api/note/v1/list', {
      headers: this.authorizationHeader,
    });
  }

  retrieve(uuid: string) {
    return this.http.get<any>('/api/note/v1/retrieve?uuid=' + uuid, {
      headers: this.authorizationHeader,
    });
  }

  approve(uuid) {
    return this.http.post(
      '/api/note/v1/approve-edit',
      { noteUuid: uuid },
      { headers: this.authorizationHeader },
    );
  }

  dissapprove(uuid) {
    return this.http.post(
      '/api/note/v1/dissapprove-edit',
      { noteUuid: uuid },
      { headers: this.authorizationHeader },
    );
  }

  submit(offset, limit) {
    // console.log(offset,limit)params
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('offset', offset.toString());

    return this.http.get('/api/note/v1/list', {
      headers: this.authorizationHeader,
      params,
    });
  }
}
