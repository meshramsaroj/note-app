import { Injectable } from '@nestjs/common';
import { MANAGER_ROLE } from '../../../constants/app-strings';

@Injectable()
export class ValidateUserAsRegisteredManagerService {
  validateAuthorisedUser(req: any) {
    if (req.token.roles.includes(MANAGER_ROLE)) {
      return true;
    }
    return false;
  }
}
