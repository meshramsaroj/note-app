import { UserManager, User } from 'oidc-client';
import { CLIENT_ID, APP_URL, ISSUER_URL } from '../../constants/storage';
export { User };

export default {
  async getUserManager() {
    const url = 'http://localhost:8081'; // todo proxy
    const settings: any = {
      authority: localStorage.getItem(ISSUER_URL),
      client_id: localStorage.getItem(CLIENT_ID),
      redirect_uri: url + '/callback', // +  `/index.html`,
      silent_redirect_uri: url + `/silent-refresh.html`,
      post_logout_redirect_uri: localStorage.getItem(APP_URL), // todo login router
      response_type: 'id_token token',
      scope: 'openid roles email',
      loadUserInfo: false,
    };
    let _userManager: UserManager;
    _userManager = await new UserManager(settings);
    return _userManager;
  },
  async getUser(): Promise<User> {
    const manager = await this.getUserManager();
    return manager.getUser();
  },

  async login(): Promise<void> {
    const manager = await this.getUserManager();
    return manager.signinRedirect();
  },
  async renewToken(): Promise<User> {
    const manager = await this.getUserManager();
    return manager.signinSilent();
  },
  async logout(): Promise<void> {
    const manager = await this.getUserManager();
    return manager.signoutRedirect();
  },
};
