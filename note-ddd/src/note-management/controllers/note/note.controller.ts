import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Req,
  Get,
  Query,
} from '@nestjs/common';
import { NoteDto } from '../../entities/note/note.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateNoteCommand } from '../../commands/create-note/create-note.command';
import { TokenGuard } from '../../../auth/guards/token.guard';
import { ListNoteQuery } from '../../queries/list-note/list-note.query';
import { EditNoteDto } from '../../entities/propose-edit/edit-note.dto';
import { ProposeNoteEditCommand } from '../../commands/propose-note-edit/propose-note-edit.command';
import { ApproveNoteEditCommand } from '../../commands/approve-note-edit/approve-note-edit.command';
// import { RoleGuard } from 'src/auth/guards/role.guard';
import { DissapprovedNoteEditCommand } from '../../commands/dissapprove-note/dissapprove-note.command';
import { DeleteNoteCommand } from '../../commands/delete-note/delete-note.command';
import { RetrieveNoteQuery } from '../../queries/retrieve-note/retrieve-note.query';
import { RefreshExpiredNoteCommand } from '../../commands/refresh-expired-note/refresh-expired-note.command';

@Controller('note')
export class NoteController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('v1/create')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @UseGuards(TokenGuard)
  createContext(@Body() note: NoteDto, @Req() req) {
    // console.log(req.token);
    return this.commandBus.execute(new CreateNoteCommand(note, req));
  }

  @Get('v1/list')
  @UseGuards(TokenGuard)
  getNoteList(
    @Query('offset') offset: number,
    @Query('limit') limit: number,
    @Query('search') search?: string,
    @Query('sort') sort?: string,
  ) {
    return this.queryBus.execute(
      new ListNoteQuery(offset, limit, search, sort),
    );
  }

  @Post('v1/propose-edit')
  @UseGuards(TokenGuard)
  proposeEdit(@Body() note: EditNoteDto) {
    return this.commandBus.execute(new ProposeNoteEditCommand(note));
  }

  @Post('v1/approve-edit')
  @UseGuards(TokenGuard)
  approveEdit(@Body('noteUuid') noteUuid: string) {
    return this.commandBus.execute(new ApproveNoteEditCommand(noteUuid));
  }

  @Post('v1/dissapprove-edit')
  @UseGuards(TokenGuard)
  dissapproved(@Body('noteUuid') noteUuid: string) {
    return this.commandBus.execute(new DissapprovedNoteEditCommand(noteUuid));
  }

  @Post('v1/delete')
  @UseGuards(TokenGuard)
  deleteNote(@Body('uuid') uuid, @Req() req) {
    return this.commandBus.execute(new DeleteNoteCommand(uuid, req));
  }

  @Get('v1/retrieve')
  @UseGuards(TokenGuard)
  getRetrieveNote(@Query('uuid') uuid: string, @Req() req) {
    return this.queryBus.execute(new RetrieveNoteQuery(uuid, req));
  }

  @Post('v1/refresh-expired-note')
  @UseGuards(TokenGuard)
  refreshExpiredNoteCommand(@Body('uuid') uuid: string, @Req() req) {
    return this.commandBus.execute(new RefreshExpiredNoteCommand(uuid, req));
  }
}
