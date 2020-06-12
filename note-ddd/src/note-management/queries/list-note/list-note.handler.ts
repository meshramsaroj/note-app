import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ListNoteQuery } from './list-note.query';
import { NoteAggregateService } from '../../aggregates/note-aggregate/note-aggregate.service';

@QueryHandler(ListNoteQuery)
export class ListNoteHandler implements IQueryHandler<ListNoteQuery> {
  constructor(private readonly manager: NoteAggregateService) {}

  async execute(query: ListNoteQuery) {
    const { offset, limit, search, sort } = query;
    return this.manager.list(offset, limit, search, sort);
  }
}
