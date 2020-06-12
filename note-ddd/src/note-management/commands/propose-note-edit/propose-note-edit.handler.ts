import { ICommandHandler, CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { ProposeNoteEditCommand } from './propose-note-edit.command';
import { NoteAggregateService } from '../../aggregates/note-aggregate/note-aggregate.service';

@CommandHandler(ProposeNoteEditCommand)
export class ProposeNoteEditHandler
  implements ICommandHandler<ProposeNoteEditCommand> {
  constructor(
    private readonly manager: NoteAggregateService,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: ProposeNoteEditCommand) {
    const { note } = command;
    const aggregate = this.publisher.mergeObjectContext(this.manager);
    await aggregate.proposeEditNote(note);
    aggregate.commit();
  }
}
