describe('Posts test', () => {
    beforeEach(() => {
        
    })

    const INPUTNUM = ':nth-child(2) > text-control > ab-form-control-container.ng-touched > .form > .form__group > .form__control > .form__control-external-container > .form__control-container > .text-control-paint > .text-control__input-entry';

    const INPUTPASS = ':nth-child(3) > text-control > ab-form-control-container.ng-touched > .form > .form__group > .form__control > .form__control-external-container > .form__control-container > .text-control-paint > .text-control__input-entry';

    const BTN = 'ab-ui-button-v2 > .ui-btn'

    const TOKEN = { }

    it('Get page localhost', () => {
       cy.visit('http://lkk-front.abanking-dev.ru');
       cy.location('pathname', {timeout: 60000}).should('include', '/account/login');
       cy.getToken(TOKEN);
       cy.getUserInfo(TOKEN);
       cy.setTokenLocalStorage(TOKEN);
       cy.visit('http://lkk-front.abanking-dev.ru/cabinet/claims')
    });
    // it('Check presence element of page', () => {
    //     cy.exist('ab-ui-button.ng-star-inserted > .ui-btn');
    //     cy.exist('.layout-login__form');
    //     cy.exist('[data-e2e="PhoneNumber"]');
    //     cy.exist('[data-e2e="Password"]');
    //     cy.exist(BTN);
    //     cy.exist('.login-form__restore-link');
    //     cy.exist('.footer > .ng-star-inserted');
    //     cy.exist('.footer__row_last > .footer__target-link');
    // });
    // it('Check validation alerts', () => {
    //     cy.log('NUMBER');
    //     cy.get(INPUTNUM).clear();
    //     cy.get('.control-messages').should('contain', 'Поле "Логин" обязательно для заполнения');
    //     cy.get(INPUTNUM).type('912246325');
    //     cy.get('.control-messages').should('contain', 'Телефон должен состоять из 11 цифр');
    //     cy.log('PASSWORD');
    //     cy.get(INPUTPASS).clear();
    //     cy.get('.control-messages').should('contain', 'Поле "Пароль" обязательно для заполнения');
    //     cy.pause()
        
    // });
    // it('Check validation', () => {
    //     cy.login('79000007774', 'P@ssw0rd');
    //     cy.get('.isError').should('contain','Операция не удалась');
    //     cy.get('.isError').should('contain','Пользователь не найден');
    //     cy.login('79000007777', 'P@ssw0');
    //     cy.get('.isError').should('contain','Не удаётся войти. Пожалуйста, проверьте правильность написания логина и пароля');
    // })
    // it('Login', () => {
    //     cy.login('79000007777', 'P@ssw0rd');
    //     cy.get('.isError').should('not.exist');
    //     cy.url().should('contain', '/cabinet/claims');
    // });


})