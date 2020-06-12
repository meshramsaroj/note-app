import { ICommandHandler, EventPublisher, CommandHandler } from '@nestjs/cqrs';
import { ApproveNoteEditCommand } from './approve-note-edit.command';
import { NoteAggregateService } from '../../aggregates/note-aggregate/note-aggregate.service';

@CommandHandler(ApproveNoteEditCommand)
export class ApproveNoteEditHandler
  implements ICommandHandler<ApproveNoteEditCommand> {
  constructor(
    private readonly manager: NoteAggregateService,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: ApproveNoteEditCommand) {
    const { noteUuid } = command;
    const aggregate = this.publisher.mergeObjectContext(this.manager);
    await aggregate.approveEditNote(noteUuid);
    aggregate.commit();
  }
}
