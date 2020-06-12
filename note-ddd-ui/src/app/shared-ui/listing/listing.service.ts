import { Injectable } from '@angular/core';
import { StorageService } from '../../common/services/storage/storage.service';
import { APP_URL, ACCESS_TOKEN } from '../../constants/storage';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import {
  HandleError,
  HttpErrorHandler,
} from '../../common/services/http-error-handler/http-error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class ListingService {
  handleError: HandleError;

  authorizationHeader: HttpHeaders;

  constructor(
    private storageService: StorageService,
    httpErrorHandler: HttpErrorHandler,
    private http: HttpClient,
  ) {
    this.handleError = httpErrorHandler.createHandleError('ListingService');
    this.authorizationHeader = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN),
    });
  }
  delete(uuid) {
    return this.http.post(
      '/api/note/v1/delete',
      { uuid },
      { headers: this.authorizationHeader },
    );
  }

  findModels(
    model: string,
    filter = '',
    sortOrder = 'asc',
    pageNumber = 0,
    pageSize = 10,
  ) {
    const baseUrl = this.storageService.getInfo(APP_URL);

    const url = `${baseUrl}/api/${model}/v1/list`;
    const params = new HttpParams()
      .set('limit', pageSize.toString())
      .set('offset', (pageNumber * pageSize).toString())
      .set('search', filter)
      .set('sort', sortOrder);
    return this.http.get(url, { headers: this.authorizationHeader, params });
  }
}
