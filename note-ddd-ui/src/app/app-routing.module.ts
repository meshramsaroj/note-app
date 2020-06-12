import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListingComponent } from './shared-ui/listing/listing.component';
import { AuthGuard } from './common/guards/auth-guard/auth.guard.service';
import { HomeComponent } from './shared-ui/home/home.component';
import { CreateComponent } from './note/create/create.component';
import { UpdateNoteComponent } from './note/update-note/update-note.component';
import { ApprovalComponent } from './note/approval/approval.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },

  { path: 'create', component: CreateComponent },
  { path: 'note/:uuid', component: UpdateNoteComponent },

  {
    path: 'list/:model',
    component: ListingComponent,
    canActivate: [AuthGuard],
  },

  { path: 'approve/:uuid', component: ApprovalComponent },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
