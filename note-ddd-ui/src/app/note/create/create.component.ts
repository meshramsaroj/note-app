import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NoteService } from '../note-service/note.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  noteForm = new FormGroup({
    title: new FormControl(''),
    message: new FormControl(''),
  });

  constructor(
    private noteService: NoteService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {}

  createNote() {
    this.noteService
      .create(
        this.noteForm.controls.title.value,
        this.noteForm.controls.message.value,
      )
      .subscribe({
        next: data => {
          this.snackBar.open('Note Created', 'Close', { duration: 3000 });
          this.router.navigateByUrl('/list/note');
        },
        error: err => {},
      });
  }
}
