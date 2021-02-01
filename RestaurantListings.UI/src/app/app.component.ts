import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

import { authCodeFlowConfig } from './auth.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private oauthService: OAuthService) {
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  get authenticated(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  onSignIn(): void {
    this.oauthService.initCodeFlow();
  }

  onSignOut(): void {
    this.oauthService.logOut();
  }
}
