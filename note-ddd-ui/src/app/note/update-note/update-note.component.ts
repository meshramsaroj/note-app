import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from '../note-service/note.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.css'],
})
export class UpdateNoteComponent implements OnInit {
  noteForm = new FormGroup({
    noteUuid: new FormControl(''),
    title: new FormControl(''),
    message: new FormControl(''),
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private noteService: NoteService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.noteService
      .retrieve(this.activatedRoute.snapshot.params.uuid)
      .subscribe({
        next: response => {
          this.noteForm.controls.noteUuid.setValue(response.note.uuid);
          this.noteForm.controls.noteUuid.disable();
          this.noteForm.controls.title.setValue(response.note.title);
          this.noteForm.controls.message.setValue(response.note.message);
        },
        error: error => {},
      });
  }

  proposeNote() {
    this.noteService
      .propose(
        this.noteForm.controls.noteUuid.value,
        this.noteForm.controls.title.value,
        this.noteForm.controls.message.value,
      )
      .subscribe({
        next: data => {
          this.snackBar.open('Note Proposed Successfully...!', 'Close', {
            duration: 2000,
          });

          this.router.navigateByUrl('/list/note');
        },
        error: err => {},
      });
  }
}
