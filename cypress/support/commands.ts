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
type Token = {
  access_token?: string,
  expires_in?: string,
  refreshToken?: string,
  guid?: string,
  roles?: string
}

declare namespace Cypress {
  interface Chainable {
     setDataInput(control: string, data: string): Chainable<Element>;
     exist(element: string): Chainable<Element>;
     login(number: string, password: string): Chainable<Element>;
     getToken(el:Token): Chainable<Element>;
     getUserInfo(el:Token): Chainable<Element>;
     setTokenLocalStorage(el:Token): Chainable<Element>;
     inpPassportData(): Chainable<Element>;
     checkStepId(id: number): Chainable<Element>;
  }
}

// -- This is a parent command --
Cypress.Commands.add('login', (number: string, password: string) => {

  cy.get('[data-name="PhoneNumber"]')
    .clear()
    .type(number);
  cy.get('[data-name="Password"]')
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
Cypress.Commands.add('logInAs3', (Useremail: string, Userpwd: string) => {
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

Cypress.Commands.add('getToken', (token: Token) => {
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

Cypress.Commands.add('getUserInfo', (token: Token) => {
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

Cypress.Commands.add('setTokenLocalStorage', (token: Token) => {
  window.localStorage.setItem('myApp_storage__USER_CREDENTIALS_STORE_KEY', JSON.stringify(token));
});






Cypress.Commands.add('setDataInput', (control: string, data: string) => {
    cy.get(`[data-name="${control}"`)
      .within(() => {
              cy.get('input')
                .type(data);
      });
})

Cypress.Commands.add('inpPassportData', () => {
  cy.setDataInput("IBR_TAB_BUSINESS_REGISTRATION_CLIENT_INFORMATION_G_passportInfo_C_row2_secondName", 'Петров');
  cy.setDataInput("IBR_TAB_BUSINESS_REGISTRATION_CLIENT_INFORMATION_G_passportInfo_C_row3_firstName", 'Гриша');
  cy.setDataInput("IBR_TAB_BUSINESS_REGISTRATION_CLIENT_INFORMATION_G_passportInfo_C_row4_patronymic", 'Викторович');
  cy.setDataInput("IBR_TAB_BUSINESS_REGISTRATION_CLIENT_INFORMATION_G_passportInfo_C_row5_seriesPassport", '8754');
  cy.setDataInput("IBR_TAB_BUSINESS_REGISTRATION_CLIENT_INFORMATION_G_passportInfo_C_row5_numberPassport", '554468');
  cy.setDataInput("IBR_TAB_BUSINESS_REGISTRATION_CLIENT_INFORMATION_G_passportInfo_C_row6_issued", 'уфмс россии по сверд обл гор екатеринбурга');
  cy.setDataInput("IBR_TAB_BUSINESS_REGISTRATION_CLIENT_INFORMATION_G_passportInfo_C_row7_issueDate", '14.04.1999');
  cy.setDataInput("IBR_TAB_BUSINESS_REGISTRATION_CLIENT_INFORMATION_G_passportInfo_C_row7_issueCode", '658998');
  cy.setDataInput("IBR_TAB_BUSINESS_REGISTRATION_CLIENT_INFORMATION_G_passportInfo_C_row8_birthDate", '14.03.1985');
  cy.get('[data-name="IBR_TAB_BUSINESS_REGISTRATION_CLIENT_INFORMATION_G_passportInfo_C_row8_sex"]')
    .click()
    .within(() => {
      cy.get('.drop-down-list__item')
        .first()
        .click()
    });
  cy.setDataInput("IBR_TAB_BUSINESS_REGISTRATION_CLIENT_INFORMATION_G_passportInfo_C_row9_birthPlace", 'гор. Екатеринбург');
  cy.get('[data-name="RegionOrCity"]')
    .click()
    .type('екатери')
    .within(() => {
      cy.get('.drop-down-list__item')
        .first()
        .click()
    });
  cy.get('[data-name="Street"]')
    .click()
    .type('студенч')
    .within(() => {
      cy.get('.drop-down-list__item')
        .first()
        .click()
    });
});

Cypress.Commands.add('getIdFromUrl', (id: string) => {
  cy.location().then((url) => {
    id = (url + '').split("/").pop();
  })
});

Cypress.Commands.add('checkStepId', (id: number) => {
  cy.intercept('GET', `http://lkk-front.abanking-dev.ru/lk-api/api/document/details/*`, (req) => {
    req.continue((res) => {
        expect(res.body).to.have.property('StepId', id);
        expect(res.statusCode).to.eq(200);
    })
  });
});

