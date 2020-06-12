import axios from 'axios';
import { from } from 'rxjs/observable/from';
import { switchMap, map } from 'rxjs/operators';

export default {
  getInfo() {
    return from(axios.get<any>('/info')).pipe(
      switchMap((appInfo: any) => {
        if (appInfo.message) {
          return appInfo;
        }
        return from(
          axios.get<any>(appInfo.data.authServerURL + '/info'),
        ).pipe(
          map((authInfo: any) => {
            appInfo.data.services = authInfo.data.services;
            return appInfo;
          }),
        );
      }),
    );
  },
};
