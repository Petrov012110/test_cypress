describe('check posts', () => {
    it('Visit blog', () => {
        cy.visit('http://localhost:4200/');
        cy.get(':nth-child(1) > .card');
        cy.get('.posts').children()
            .should('have.length', 2)
    })
    it('Check the post', () => {
        cy.get(':nth-child(1) > .card > .btn').click();
        cy.url().should('include', '/post');
        cy.get('.header > h1').parents();
        cy.get('strong').should(($el) => {
            const text: string = $el.text();
            expect(text.length).to.be.at.least(1);
        });
        cy.get('small').should(($el) => {
            const text: string = $el.text();
            expect(text.length).to.be.at.least(1);
        });
        cy.get('p').should(($el) => {
            const text: string = $el.text();
            expect(text.length).to.be.at.least(1);
        });
        cy.go('back');
        
    })
})