import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NoteService } from '../note-service/note.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.css'],
})
export class ApprovalComponent implements OnInit {
  uuid;
  oldTitle;
  oldMessage;
  proposedTitle;
  proposedMessage;
  responseData;

  constructor(
    private noteService: NoteService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.activatedRoute;
    this.noteService
      .retrieve(this.activatedRoute.snapshot.params.uuid)
      .subscribe({
        next: response => {
          this.responseData = response.editNote;
          // console.log(response);
          if (response.editNote) {
            this.oldTitle = response.note.title;
            this.oldMessage = response.note.message;
            this.proposedTitle = response.editNote.title;
            this.proposedMessage = response.editNote.message;
          }

          this.oldTitle = response.note.title;
          this.oldMessage = response.note.message;
        },
      });

    // console.log(this.noteForm)
    // console.log(this.activatedRoute);
  }
  userRoll() {}

  approveNote() {
    this.noteService.approve(
      this.noteService
        .approve(this.activatedRoute.snapshot.params.uuid)
        .subscribe({
          next: data => {
            // console.log(data);
            this.snackBar.open('Note Updated', 'Close', { duration: 2000 });
            this.router.navigateByUrl('/list/note');
          },

          error: err => {},
        }),
    );
  }

  dissApproveNote() {
    this.noteService.dissapprove(
      this.noteService
        .dissapprove(this.activatedRoute.snapshot.params.uuid)
        .subscribe({
          next: data => {
            this.snackBar.open('Note Proposal Diss-approved', 'Close', {
              duration: 4000,
            });
            this.router.navigateByUrl('/list/note');
          },
          error: err => {},
        }),
    );
  }

  goTOProposeNote() {
    this.router.navigateByUrl('/note/:');
  }
}
