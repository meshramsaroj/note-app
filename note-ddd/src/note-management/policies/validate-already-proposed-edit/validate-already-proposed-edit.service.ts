import { Injectable, BadRequestException } from '@nestjs/common';
import { ProposeEditService } from '../../entities/propose-edit/propose-edit.service';

@Injectable()
export class ValidateAlreadyProposedEditService {
  constructor(private readonly proposeEditService: ProposeEditService) {}

  async validateAlreadyProposedEdit(uuid: string) {
    const foundNoteEdit = await this.proposeEditService.findNoteAlreadyProposed(
      uuid,
    );
    if (foundNoteEdit) {
      throw new BadRequestException('Edit proposal already exist');
    }
  }
}
