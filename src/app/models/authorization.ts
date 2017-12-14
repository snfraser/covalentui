export interface IAuthorization {

  /** The access token.*/
  access_token: string;

  /** Token used to refresh the access token.*/
  refresh_token: string;

  /** Type of token - e.g. Bearer, Basic etc*/
  token_type: string;

  /** Scope - ??*/
  scope: string;

  /** Time to expiration of token (secs).*/
  expires_in: number;

}
