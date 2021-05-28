import 'cypress-file-upload';

describe('Open IP test', () => {
    const TOKEN = {};
    const ID = '';
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
        cy.location('pathname', { timeout: 60000 }).should('include', 'detail');
    });

    it('Should upload files', () => {
        cy.get(
            '[data-name="IBR_TAB_BUSINESS_REGISTRATION_CLIENT_INFORMATION_G_passportCopy_C_row1_passportMain"]')
            .within(() => {
                cy.get('input')
                    .attachFile({ filePath: 'assets/passportPage1.jpg'});
            });
        cy.get(
            '[data-name="IBR_TAB_BUSINESS_REGISTRATION_CLIENT_INFORMATION_G_passportCopy_C_row1_passportRegistration"]')
            .within(() => {
                    cy.get('input')
                    .attachFile({ filePath: 'assets/passportPage1.jpg'});
            });
        cy.get(
            '[data-name="IBR_TAB_BUSINESS_REGISTRATION_CLIENT_INFORMATION_G_passportCopy_C_row1_passportClientPhoto"]')
            .within(() => {
                    cy.get('input')
                    .attachFile({ filePath: 'assets/passportPage1.jpg'});
            });
    });
    it('Should fill form', () => {
        cy.inpPassportData();
        cy.get('[data-name="BuildingTypeInitial"]')
            .within(() => {
                cy.get('input')
                    .click()
                cy.get('.drop-down-list__item')
                    .first()
                    .click()
            });
        cy.get('[data-name="BuildingNumberInitial"]')
            .within(() => {
                cy.get('input')
                    .type('1')
                cy.get('.drop-down-list__item')
                    .first()
                    .click()
            })
        cy.get('[data-name="BuildingTypeInitial"]')
            .within(() => {
                cy.get('input')
                    .click()
                cy.get('.drop-down-list__item')
                    .first()
                    .click()
            });
        cy.get('[data-name="FlatType"]')
            .within(() => {
                cy.get('input')
                    .click()
                cy.get('.drop-down-list__item')
                    .first()
                    .click()
            });
        cy.get('[data-name="FlatNumber"]')
            .within(() => {
                cy.get('input')
                    .type('14')
            });
        cy.get('[data-name="RoomType"]')
            .within(() => {
                cy.get('input')
                    .click()
                cy.get('.drop-down-list__item')
                    .first()
                    .click()
            });
        cy.get('[data-name="RoomNumber"]')
            .within(() => {
                cy.get('input')
                    .type('14')
            });
        cy.get('[data-name="IBR_TAB_BUSINESS_REGISTRATION_CLIENT_INFORMATION_G_otherDocuments_C_row1_tin"]')
            .within(() => {
                cy.get('input').type('155453301472')
            });
        cy.get('[data-name="IBR_TAB_BUSINESS_REGISTRATION_CLIENT_INFORMATION_G_otherDocuments_C_row1_slid"]')
            .within(() => {
                cy.get('input').type('32290748672')
            });
        
        cy.checkStepId(50).as('checkStatusCode');
        cy.get('ab-ui-button-v2.ng-star-inserted > .ui-btn').click();
        cy.wait('@checkStatusCode')

        cy.get('.global-alert_error').should('not.exist');
    });

    it('Should pass step 2', () => {
        cy.get('[data-name="IBR_TAB_BUSINESS_REGISTRATION_ACTIVITY_ADN_TAXES_G_OKVED_C1_okved"]')
            .within(() => {
                cy.get('button').click();
            });
        cy.get('checkbox-tree')
            .find('checkbox-tree-item')
            .then(count => {
                const listingCount = Cypress.$(count).length;
                expect(count).to.have.length(listingCount);
            });
            
        cy.get('checkbox-tree-item.ng-tns-c434-45 > .checkbox-tree-item > .checkbox-tree-item__container > .checkbox-tree-item__row > .checkbox-tree-item__col_input > .checkbox-tree > .checkbox-tree__label > .checkbox-tree__box > .checkbox-tree__marker > .svg').click();

        cy.get('.okved-select-control-modal-footer')
            .within(() => {
                cy.get('button').contains('Добавить').click();
            });
        cy.checkStepId(90).as('checkStatusCode');
        cy.get('button').contains('Отправить на проверку').click();
        cy.wait('@checkStatusCode')
        
    });
    
});