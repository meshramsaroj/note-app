import { Module } from '@nestjs/common';
import { NoteController } from './controllers/note/note.controller';
import { AggregateManager } from './aggregates';
import { CommandManager } from './commands';
import { EventManager } from './events';
import { NoteEntitiesModule } from './entities/entities.module';
import { QueryManager } from './queries';
import { ValidateAlreadyProposedEditService } from './policies/validate-already-proposed-edit/validate-already-proposed-edit.service';
import { ValidateNoteService } from './policies/validate-note/validate-note.service';
import { ValidateUserAsRegisteredManagerService } from './policies/validate-user-as-registered-manager/validate-user-as-registered-manager.service';
import { ValidateAuthorisedUserPolicy } from './policies/validate-authorised-user/validate-authorised-user.service';
import { NoteSchedulers } from './schedulers';

@Module({
  controllers: [NoteController],
  imports: [NoteEntitiesModule],
  providers: [
    ValidateAlreadyProposedEditService,
    ValidateNoteService,
    ...AggregateManager,
    ...CommandManager,
    ...EventManager,
    ...QueryManager,
    ...NoteSchedulers,
    ValidateUserAsRegisteredManagerService,
    ValidateAuthorisedUserPolicy,
  ],
  exports: [
    NoteEntitiesModule,
    ValidateAlreadyProposedEditService,
    ValidateNoteService,
  ],
})
export class NoteManagementModule {}
