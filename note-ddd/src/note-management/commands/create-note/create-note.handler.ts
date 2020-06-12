import { ICommandHandler, CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { CreateNoteCommand } from './create-note.command';
import { NoteAggregateService } from '../../aggregates/note-aggregate/note-aggregate.service';

@CommandHandler(CreateNoteCommand)
export class CreateNoteHandler implements ICommandHandler<CreateNoteCommand> {
  constructor(
    private readonly manager: NoteAggregateService,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateNoteCommand) {
    const { note: notePayload, req } = command;
    const aggregate = this.publisher.mergeObjectContext(this.manager);
    await aggregate.createNote(notePayload, req);
    aggregate.commit();
  }
}
