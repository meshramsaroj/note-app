import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedUIModule } from './shared-ui/shared-ui.module';
import { AppService } from './app.service';
// import { ItemComponent } from './test/item/item.component';
import { FormsModule } from '@angular/forms';
import { NoteModule } from './note/note.module';
// import { RouterModule } from '@angular/router';
// import { UpdateComponent } from './update/update.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NoteModule,
    FormsModule,
    AppRoutingModule,
    OAuthModule.forRoot(),
    SharedUIModule,
  ],

  providers: [AppService, { provide: OAuthStorage, useValue: localStorage }],
  bootstrap: [AppComponent],
})
export class AppModule {}
