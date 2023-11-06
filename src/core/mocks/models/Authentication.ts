class Authentication {
  private accessToken: string;
  private refreshToken: string;

  constructor(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  getAccessToken(): string {
    return this.accessToken;
  }

  getRefreshToken(): string {
    return this.refreshToken;
  }

  setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
  }

  setRefreshToken(refreshToken: string) {
    this.refreshToken = refreshToken;
  }
}

export default Authentication;
