// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', (number, password) => {

  cy.get(':nth-child(2) > text-control > ab-form-control-container.ng-touched > .form > .form__group > .form__control > .form__control-external-container > .form__control-container > .text-control-paint > .text-control__input-entry')
    .clear()
    .type(number);
  cy.get(':nth-child(3) > text-control > ab-form-control-container.ng-touched > .form > .form__group > .form__control > .form__control-external-container > .form__control-container > .text-control-paint > .text-control__input-entry')
    .clear()
    .type(password);
  cy.get('ab-ui-button-v2 > .ui-btn').click();
});

Cypress.Commands.add('exist', (element) => {
  cy.get(element).should('exist');
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// -- This will auth token command --
Cypress.Commands.add('logInAs3', (Useremail, Userpwd) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('EXTERNAL_API')}AIzaSyBk7x-WzPnLu0rpZPSjCX4e8BPw5zGWhR0`,
    body: {
      email: Useremail,
      password: Userpwd,
      returnSecureToken: true
    }
  })
    .its('body')
    .then((body) => {
      const expDate = new Date(new Date().getTime() + +body.expiresIn * 1000)
      window.localStorage.setItem('fb-token', body.idToken);
      window.localStorage.setItem('fb-token-exp', expDate.toString());
    });
});

Cypress.Commands.add('getToken', (token) => {
  cy.request({
    method: 'POST',
    url: `sso/connect/token`,
    form: true,
    body: {
      username: '79000007777',
      password: 'P@ssw0rd',
      client_id: 'artsofte',
      client_secret: 'artsofteSecret',
      scope: 'offline_access ApiResource_LK legal_info openid IdentityServerApi',
      grant_type: 'password'
    }
  })
    .its('body')
    .then((body) => {
      token.access_token = body.access_token;
      token.expires_in = body.expires_in;
      token.refreshToken = body.refresh_token;
    });
});

Cypress.Commands.add('getUserInfo', (token) => {
  cy.request({
    method: 'GET',
    url: `sso/connect/userinfo`,
    headers: {
      'Authorization': `Bearer ${(token.access_token)}`
    }
  })
    .its('body')
    .then((body) => {
      token.guid = body.sub;
      token.roles = body.role;
    });
});

Cypress.Commands.add('setTokenLocalStorage', (token) => {
  window.localStorage.setItem('myApp_storage__USER_CREDENTIALS_STORE_KEY', JSON.stringify(token));
});
