describe('Posts test', () => {
    beforeEach(() => {
        cy.logInAs3('grisha14.06.96@mail.ru', '000000');
    })
    it('Set tokens', () => {
        cy.visit('localhost:4200/admin/dashboard')
    });
    it('Check presence element of page', () => {
        cy.get('input').should('exist');
        cy.get('table').should('exist');
        cy.get('tbody').find('tr').should('have.length', 2);
    });
    it('Change post', () => {
        cy.get(':nth-child(1) > :nth-child(5) > .btn').click();
        cy.get('quill-editor').should('exist');
        cy.get('#title')
            .clear()
            .type('New title');
        cy.get('.ql-editor')
            .clear()
            .type('New text');
        cy.get('.btn')
            .should('exist')
            .click();
        cy.go('back');
    });
})