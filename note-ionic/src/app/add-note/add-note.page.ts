import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, ToastController, LoadingController } from '@ionic/angular';
import { Note, EditNote } from '../model/note';
import { NoteService } from '../services/note.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.page.html',
  styleUrls: ['./add-note.page.scss'],
})
export class AddNotePage implements OnInit {

  retrievedNote: Note;
  noteProposal: EditNote;
  uuid: string;
  passedFrom: string;
  readonly: boolean;
  constructor(
    private navParams: NavParams,
    private noteService: NoteService,
    public modalController: ModalController,
    public toastController: ToastController,
    public loadingController: LoadingController,
  ) {
    this.uuid = this.navParams.get('uuid');
    this.passedFrom = this.navParams.get('passedFrom');
    this.retrievedNote = new Note();
    this.noteProposal = new EditNote();
    console.log(this.uuid, this.passedFrom);
    this.readonly = false;
    if (this.passedFrom === 'viewNote')
      this.readonly = true;
    if (this.passedFrom !== 'addNote')
      this.retrieveNote();
  }

  ngOnInit() {
  }

  async retrieveNote() {
    const loading = await this.loadingController.create({
      message: 'Retrieving Note !!!',
    });
    await loading.present();
    this.noteService.retrieveNote(this.uuid).subscribe({
      next: async success => {
        console.log(success);
        this.retrievedNote.uuid = '';
        this.retrievedNote.title = '';
        this.retrievedNote.message = '';
        this.noteProposal.uuid = '';
        this.noteProposal.noteUuid = '';
        this.noteProposal.title = ''
        this.noteProposal.message = '';
        this.retrievedNote.uuid = success.note.uuid;
        this.retrievedNote.title = success.note.title;
        this.retrievedNote.message = success.note.message;
        if (success.editNote && this.passedFrom === 'viewNote') {
          this.noteProposal.uuid = success.editNote.uuid;
          this.noteProposal.noteUuid = success.editNote.noteUuid;
          this.noteProposal.title = success.editNote.title;
          this.noteProposal.message = success.editNote.message;
        }
        await loading.dismiss();
        console.log(this.retrievedNote, this.noteProposal);
      },
      error: error => console.log(error),
    })
  }

  async addNote() {
    console.log(this.retrievedNote);
    const loading = await this.loadingController.create({
      message: 'Adding Note !!!',
    });
    await loading.present();
    this.noteService.createNote(this.retrievedNote).subscribe({
      next: async success => {
        await loading.dismiss();
        const toast = await this.toastController.create({
          message: 'Note added',
          duration: 2000
        });
        await toast.present();
        this.modalController.dismiss();
      },
    })
  }

  async proposeEditNote() {
    const noteEdit = new EditNote();
    const loading = await this.loadingController.create({
      message: 'Proposing Note !!!',
    });
    await loading.present();
    noteEdit.noteUuid = this.retrievedNote.uuid;
    noteEdit.title = this.retrievedNote.title;
    noteEdit.message = this.retrievedNote.message;
    this.noteService.proposeEditNote(noteEdit).subscribe({
      next: async success => {
        await loading.dismiss();
        const toast = await this.toastController.create({
          message: 'Note Edit Proposed.',
          duration: 2000
        });
        await toast.present();
        this.modalController.dismiss();
      },
    })
  }

  async approveNoteEdit() {
    const loading = await this.loadingController.create({
      message: 'Approving Note Edit !!!',
    });
    await loading.present();
    this.noteService.approveNoteEdit(this.noteProposal.noteUuid).subscribe({
      next: async success => {
        await loading.dismiss();
        const toast = await this.toastController.create({
          message: 'Note Proposal Approved.',
          duration: 2000
        });
        await toast.present();
        this.retrieveNote();
      }
    })
  }

  async declineNoteEdit() {
    const loading = await this.loadingController.create({
      message: 'Declining Note Edit !!!',
    });
    await loading.present();
    this.noteService.declineNoteEdit(this.noteProposal.noteUuid).subscribe({
      next: async success => {
        await loading.dismiss();
        const toast = await this.toastController.create({
          message: 'Note Proposal Declined.',
          duration: 2000
        });
        await toast.present();
        this.retrieveNote();
      }
    })
  }

}
