import { ICommandHandler, CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { DeleteNoteCommand } from './delete-note.command';
import { NoteAggregateService } from '../../aggregates/note-aggregate/note-aggregate.service';

@CommandHandler(DeleteNoteCommand)
export class DeleteNoteHandler implements ICommandHandler<DeleteNoteCommand> {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly manager: NoteAggregateService,
  ) {}

  async execute(command: DeleteNoteCommand) {
    const { uuid, req } = command;
    const aggregate = this.publisher.mergeObjectContext(this.manager);
    await aggregate.deleteNote(uuid, req);
    aggregate.commit();
  }
}
