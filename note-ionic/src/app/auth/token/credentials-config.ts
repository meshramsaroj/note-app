export interface OAuth2Config {
  clientId: string;
  profileUrl: string;
  tokenUrl: string;
  authServerUrl: string;
  authorizationUrl: string;
  revocationUrl: string;
  scope: string;
  callbackUrl: string;
  secret: string;
  logoutUrl: string;
}

export const oauth2Config: OAuth2Config = {
  profileUrl: 'https://staging-accounts.castlecraft.in/oauth2/profile',
  tokenUrl: 'https://staging-accounts.castlecraft.in/oauth2/token',
  authServerUrl: 'https://staging-accounts.castlecraft.in',
  authorizationUrl:
    'https://staging-accounts.castlecraft.in/oauth2/confirmation',
  revocationUrl: 'https://staging-accounts.castlecraft.in/oauth2/revoke',
  scope: 'profile%20openid%20email%20roles',
  clientId: '769a3c75-d719-409f-afe6-ac8cc13e65c8',
  callbackUrl: 'blocks://oauth2',
  secret: '420',
  logoutUrl: '',
};
