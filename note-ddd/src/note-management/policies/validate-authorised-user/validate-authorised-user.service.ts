import { Injectable } from '@nestjs/common';
import { USER_ROLE, MANAGER_ROLE } from '../../../constants/app-strings';
import { of } from 'rxjs';

@Injectable()
export class ValidateAuthorisedUserPolicy {
  validateAuthorisedUser(req: any) {
    const roles = [USER_ROLE, MANAGER_ROLE];
    if (req.token.roles.some(role => roles.includes(role))) {
      return of(true);
    }
    return of(false);
  }

  validateAuthorisedManager(req: any) {
    if (req.token.roles.includes(MANAGER_ROLE)) {
      return of(true);
    }

    return of(false);
  }
}
