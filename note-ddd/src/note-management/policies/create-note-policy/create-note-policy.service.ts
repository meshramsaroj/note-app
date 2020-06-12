import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateNotePolicyService {
  validateAuthorizedUser(req: any) {
    if (req.token.roles.includes()) {
    }
  }
}
