import {
  CLIENT_ID,
  REDIRECT_URI,
  SILENT_REFRESH_REDIRECT_URI,
  LOGIN_URL,
  ISSUER_URL,
  APP_URL,
  SERVICES,
  SELECTED_DOMAIN,
  MAIN_ACCOUNTING_SERVER,
  ACCOUNTING_SERVER,
  INVOICING_SERVER,
  SELECTED_INVOICE_SERVER,
  INFRASTRUCTURE_CONSOLE,
} from '../../constants/storage';
import axios from 'axios';
import { map } from 'rxjs/operators';
import { from } from 'rxjs/observable/from';

export default {
  getLocalStorage(key: string) {
    return localStorage.getItem(key);
  },
  clearLocalStorage() {
    localStorage.clear();
  },
  setLocalStorage(response: any) {
    localStorage.setItem(CLIENT_ID, response.clientId);
    localStorage.setItem(REDIRECT_URI, response.callbackURLs[0]);
    localStorage.setItem(SILENT_REFRESH_REDIRECT_URI, response.callbackURLs[1]);
    localStorage.setItem(LOGIN_URL, response.authorizationURL);
    localStorage.setItem(ISSUER_URL, response.authServerURL);
    localStorage.setItem(APP_URL, response.appURL);
    localStorage.setItem(SERVICES, JSON.stringify(response.services));
    this.gerServiceUrl().subscribe({
      next: (data: any) => {
        if (data.length > 0) {
          data.forEach(
            async (element: {
              type: string;
              serviceURL: string;
              name: string;
            }) => {
              await response.services.push({
                type: element.type,
                url: element.serviceURL,
                name: element.name,
              });
            },
          );
        }
        localStorage.setItem(SERVICES, JSON.stringify(response.services));
        localStorage.setItem(
          SELECTED_DOMAIN,
          this.getServiceURL(MAIN_ACCOUNTING_SERVER) ||
            this.getServiceURL(ACCOUNTING_SERVER),
        );
        const server = this.getServiceURL(INVOICING_SERVER);
        localStorage.setItem(SELECTED_INVOICE_SERVER, server);
      },
      error: (err: any) => {
        err;
      },
    });
  },
  gerServiceUrl(): any {
    const infrastructureUrl =
      this.getServiceURL(INFRASTRUCTURE_CONSOLE) + '/service/v1/list?type=';
    const accountingRequestUrl = infrastructureUrl + ACCOUNTING_SERVER;
    return from(axios.get(accountingRequestUrl)).pipe(
      map((invoicingServices: any) => {
        return invoicingServices;
      }),
    );
  },

  getServiceURL(serviceName: string) {
    const services = JSON.parse(localStorage.getItem(SERVICES) || '[]');
    for (const service of services) {
      if (service.type === serviceName) {
        return service.url;
      }
    }
  },
};
