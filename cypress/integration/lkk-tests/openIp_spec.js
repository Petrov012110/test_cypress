import 'cypress-file-upload';

describe('Open IP test', () => {
    const TOKEN = {}
    it('Should authorized', () => {
        cy.visit('http://lkk-front.abanking-dev.ru');
        cy.getToken(TOKEN);
        cy.getUserInfo(TOKEN);
        cy.setTokenLocalStorage(TOKEN);
        cy.visit('http://lkk-front.abanking-dev.ru/cabinet/claims');
        cy.url().should('contain', 'cabinet/claims');
        cy.get('.loader', { "timeout": 12000 })
            .find('.loader__item')
            .should('not.be.visible');
    });
    it('Should open page IP', () => {
        cy.get('.claims-action__item_open-ip > .claims-action__item-button').click();
        cy.location('pathname', {timeout: 60000}).should('include', 'detail');
    });
    
    it('Should upload files', () => {
        cy.get(':nth-child(2) > ab-file-uploader-control.ng-star-inserted > ab-form-control-container.ng-untouched > .form > .form__group > .form__control > .form__control-external-container > .form__control-container > .ng-untouched > .file-uploader > .file-uploader__wrapper > .text-control-paint > .file-uploader__input')
            .attachFile({ filePath: 'assets/passportPage1.jpg', allowEmpty: true });
    })
})