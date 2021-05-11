describe('check posts', () => {
    it('Get page App', () => {
        cy.visit('localhost:4200/');
        cy.url().should('contain', 'localhost:4200');
    });
    it('Check main page', () => {
        cy.log('Posts precence check');
        cy.get('h1').should('have.text', 'Angular Blog');
        cy.get('.posts').children().should('exist');
        cy.get('.card > .card-header > small').should('exist');
        cy.get('.card > .btn').should('exist');
        cy.get('.card > :nth-child(2) > small').should('exist');
    });
    it('Check post', () => {
        cy.get(':nth-child(1) > .card > .btn').click();
        cy.url().should('include', '/post');
        cy.get('.header > h1').should('exist');
        cy.get('strong').should('exist');
        cy.get('small').should('exist');
        // cy.get('p').should('exist');
        cy.get('.btn')
            .should('exist')
            .click();
    });

    it('Get login page', () => {
        cy.visit('localhost:4200/admin');
        cy.url().should('contain', 'admin');
        cy.get('.card').should('exist');
    });
    it('Login check validator email', () => {
        cy.login('grisha14.06.96@mail.r', '000000');
        cy.contains('Такого email нет');
        cy.clearLoginInputs();
    });
    it('Login check validator email', () => {
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false
          })
        cy.login('grisha14.06.96', '000000');
        cy.get('.btn').should('have.attr', 'disabled');
        cy.contains('Error Email');
        cy.clearLoginInputs();
    });
    it('Change body.email request', () => {
        cy.login('grisha14.06.96@mail.ru', '000000');
        cy.intercept(
            'POST', 
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBk7x-WzPnLu0rpZPSjCX4e8BPw5zGWhR0', 
            (req) => {req.body.email = 'blabla@mail.ru'}
        );
        cy.contains('Такого email нет');
        cy.clearLoginInputs();
    });
    it('Password check validator', () => {
        cy.login('grisha14.06.96@mail.ru', '000001');
        cy.contains('Неверный password');
        cy.clearLoginInputs();
    });
    it('Login success', () => {
        cy.login('grisha14.06.96@mail.ru', '000000');
    });
});
