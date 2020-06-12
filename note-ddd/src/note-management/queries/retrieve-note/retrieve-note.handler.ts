import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RetrieveNoteQuery } from './retrieve-note.query';
import { NoteAggregateService } from '../../aggregates/note-aggregate/note-aggregate.service';

@QueryHandler(RetrieveNoteQuery)
export class RetrieveNoteHandler implements IQueryHandler<RetrieveNoteQuery> {
  constructor(private readonly manager: NoteAggregateService) {}

  async execute(query: RetrieveNoteQuery) {
    const { req, uuid } = query;
    return this.manager.retrieveNote(uuid, req);
  }
}
