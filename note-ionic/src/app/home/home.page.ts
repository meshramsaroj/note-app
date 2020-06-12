import { Component, OnInit } from '@angular/core';
import { NoteService } from '../services/note.service';
import { Note } from '../model/note';
import { Router, NavigationExtras } from '@angular/router';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { AddNotePage } from '../add-note/add-note.page';
import { TokenService } from '../auth/token/token.service';
import { HttpClient } from '@angular/common/http';
import { LOGGED_IN } from '../auth/token/storage-constants';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  noteList: Array<Note>;
  name: string;
  email: string;
  picture: string;
  loggedIn: boolean;
  accessToken: string;
  roles: Array<string>;
  error: any;

  constructor(
    private noteService: NoteService,
    private router: Router,
    private modalController: ModalController,
    private token: TokenService,
    private http: HttpClient,
    public alertController: AlertController,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.loggedIn = localStorage.getItem(LOGGED_IN) ? true : false;

    this.token
      .getToken()
      .pipe(
        switchMap(token => {
          this.accessToken = token;
          return this.http.get<any>(
            this.token.config.authServerUrl + '/oauth2/profile',
            { headers: { authorization: 'Bearer ' + token } },
          );
        }),
      )
      .subscribe({
        next: profile => {
          console.log(profile);
          this.name = profile.name;
          this.email = profile.email;
          this.picture = profile.picture;
          this.roles = profile.roles;
        },
        error: error => { },
      });
  }

  ionViewWillEnter() {
    console.log('Ion view will enter');
    this.loadNoteList();
  }

  async loadNoteList() {
    this.noteService.getNoteList().subscribe({
      next: async (success) => {
        const loading = await this.loadingController.create({
          message: 'Fetching Notes !!!',
        });
        await loading.present();
        this.noteList = [];
        success.docs.forEach(note => {
          const localNote = new Note();
          localNote.uuid = note.uuid;
          localNote.title = note.title;
          localNote.message = note.message;
          localNote.isProposed = note.isProposed;
          console.log({ localNote, note });
          this.noteList.push(localNote);
        })
        await loading.dismiss();
      },
      error: error => {
        this.error = error;
      }
    });
  }

  async addNote() {
    const modal = await this.modalController.create({
      component: AddNotePage,
      componentProps: {
        uuid: '',
        passedFrom: 'addNote',
      }
    });
    await modal.present();
    modal.onDidDismiss().then(
      () => this.loadNoteList()
    );
  }

  async viewNote(uuid: string) {
    console.log({ uuid });
    const modal = await this.modalController.create({
      component: AddNotePage,
      componentProps: {
        uuid: uuid,
        passedFrom: 'viewNote',
      }
    });
    await modal.present();
    modal.onDidDismiss().then(
      () => this.loadNoteList()
    );
  }

  async proposeEditNote(uuid: string) {
    const modal = await this.modalController.create({
      component: AddNotePage,
      componentProps: {
        uuid: uuid,
        passedFrom: 'proposeEditNote',
      }
    });
    await modal.present();
    modal.onDidDismiss().then(
      () => this.loadNoteList()
    );
  }

  async deleteNote(uuid: string) {
    const loading = await this.loadingController.create({
      message: 'Deleting Note !!!',
    });
    await loading.present();
    this.noteService.deleteNote(uuid).subscribe({
      next: async success => {
        this.loadNoteList();
        await loading.dismiss();
      }
    });
  }

}
