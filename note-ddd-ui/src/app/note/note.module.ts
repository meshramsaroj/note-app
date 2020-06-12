import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { UpdateNoteComponent } from './update-note/update-note.component';
import { SharedImportsModule } from '../shared-imports/shared-imports.module';
import { NoteService } from './note-service/note.service';
import { ApprovalComponent } from './approval/approval.component';

@NgModule({
  declarations: [CreateComponent, UpdateNoteComponent, ApprovalComponent],
  imports: [CommonModule, SharedImportsModule],
  exports: [CreateComponent, UpdateNoteComponent],
  providers: [NoteService],
})
export class NoteModule {}
