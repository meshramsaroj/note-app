import { TestBed } from '@angular/core/testing';

import { NoteService } from './note.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('NoteService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    }),
  );

  it('should be created', () => {
    const service: NoteService = TestBed.get(NoteService);
    expect(service).toBeTruthy();
  });
});
